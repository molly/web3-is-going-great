import { firestore, storage } from "./config/firebase";
import * as functions from "firebase-functions";

import * as path from "path";
import * as fs from "fs";
import * as ejs from "ejs";

import { Entry, RssEntry } from "./types";
import axios from "axios";

const STORAGE_URL_PREFIX = "https://storage.googleapis.com/primary-web3";
const STATIC_STORAGE_URL_PREFIX = "https://storage.googleapis.com/static-web3";
const writeFeed = async (xml: string): Promise<void> => {
  const file = await storage.bucket("static-web3").file("rss.xml");
  await file.save(xml);
  await file.setMetadata({
    contentType: "application/atom+xml;charset=UTF-8",
  });
};

export const updateRssOnChange = functions.firestore
  .document("/entries/{docId}")
  .onWrite(async () => {
    const snapshot = await firestore
      .collection("entries")
      .orderBy("id", "desc")
      .limit(20)
      .get();

    const rssData: {
      updated?: string;
      storageUrlPrefix: string;
      entries: RssEntry[];
    } = {
      storageUrlPrefix: STORAGE_URL_PREFIX,
      entries: [],
    };

    let lastUpdated: Date | null = null;
    snapshot.forEach((child) => {
      const childLastUpdated = child.updateTime.toDate();
      if (lastUpdated === null || lastUpdated < childLastUpdated) {
        lastUpdated = childLastUpdated;
      }
      const childData = child.data() as Entry;
      const body = childData.body.replace(/<button.*?>(.*?)<\/button>/g, "$1");
      const title = childData.title
        .replace(/<[^>]+>/gm, "")
        .replace(/&nbsp;/g, " ");
      rssData.entries.push({
        ...childData,
        title,
        body,
        createdAt: child.createTime.toDate().toISOString(),
        updatedAt: childLastUpdated.toISOString(),
      });
    });
    if (lastUpdated !== null) {
      rssData.updated = (lastUpdated as Date).toISOString();
    }

    const ejsFile = fs.readFileSync(path.resolve(__dirname, "../ejs/rss.ejs"));
    const xml = ejs.render(ejsFile.toString(), rssData).replace(/&nbsp;/g, " ");

    // Record XML to a staging URL so we can validate it with the W3 validator
    let resp;
    try {
      const stagingFile = await storage
        .bucket("static-web3")
        .file("stagedRss.xml");
      await stagingFile.save(xml);
      await stagingFile.setMetadata({
        contentType: "application/atom+xml;charset=UTF-8",
      });

      resp = await axios.get("http://validator.w3.org/feed/check.cgi", {
        params: {
          output: "soap12",
          url: `${STATIC_STORAGE_URL_PREFIX}/stagedRss.xml?refresh=${Date.now()}`,
        },
        timeout: 40000,
      });
    } catch (err) {
      // validator.w3.org has been going offline once in a while lately, which shouldn't
      // also take down the RSS feed for this site
      functions.logger.warn(
        "Something went wrong with XML validation; proceeding to write feed.",
        err
      );
      await writeFeed(xml);
      return;
    }

    if (
      resp &&
      resp.data &&
      resp.data.search(/<m:validity>\s*true\s*<\/m:validity>/gm) > -1
    ) {
      // Valid XML, carry on
      functions.logger.debug("Writing feed...");
      await writeFeed(xml);
    } else {
      functions.logger.error("Invalid XML");
      // Throw to be picked up by alerting in GCP
      throw new Error("Invalid XML");
    }
  });
