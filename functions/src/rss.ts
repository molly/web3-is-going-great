import { firestore, storage } from "./config/firebase";
import * as functions from "firebase-functions";

import * as path from "path";
import * as fs from "fs";
import * as ejs from "ejs";

import { Entry, RssEntry } from "./types";
import axios from "axios";

const STORAGE_URL_PREFIX =
  "https://storage.googleapis.com/web3-334501.appspot.com";

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
      const title = childData.title
        .replace(/<[^>]+>/gm, "")
        .replace(/&nbsp;/g, " ");
      rssData.entries.push({
        ...childData,
        title,
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
    const stagingFile = await storage
      .bucket("web3-334501.appspot.com")
      .file("static/stagedRss.xml");
    await stagingFile.save(xml);
    await stagingFile.setMetadata({
      contentType: "application/atom+xml;charset=UTF-8",
    });

    try {
      const resp = await axios.get("http://validator.w3.org/feed/check.cgi", {
        params: {
          output: "soap12",
          url: `${STORAGE_URL_PREFIX}/static/stagedRss.xml`,
        },
      });

      if (
        resp &&
        resp.data &&
        resp.data.search(/<m:validity>\s*true\s*<\/m:validity>/gm) > -1
      ) {
        // Valid XML, carry on
        const file = await storage
          .bucket("web3-334501.appspot.com")
          .file("static/rss.xml");
        await file.save(xml);
        await file.setMetadata({
          contentType: "application/atom+xml;charset=UTF-8",
        });
      } else {
        throw new Error("Invalid XML");
      }
    } catch (err) {
      throw new Error("Something is wrong with XML validation");
      console.log(err);
    }
  });
