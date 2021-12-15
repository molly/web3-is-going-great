import { firestore, storage } from "./config/firebase";
import * as functions from "firebase-functions";

import * as path from "path";
import * as fs from "fs";
import * as ejs from "ejs";

import { Entry, RssEntry } from "./types";

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
      storageUrlPrefix:
        "https://storage.googleapis.com/web3-334501.appspot.com",
      entries: [],
    };

    let lastUpdated: Date | null = null;
    snapshot.forEach((child) => {
      const childLastUpdated = child.updateTime.toDate();
      if (lastUpdated === null || lastUpdated < childLastUpdated) {
        lastUpdated = childLastUpdated;
      }
      rssData.entries.push({
        ...(child.data() as Entry),
        createdAt: child.createTime.toDate().toISOString(),
        updatedAt: childLastUpdated.toISOString(),
      });
    });
    if (lastUpdated !== null) {
      rssData.updated = (lastUpdated as Date).toISOString();
    }

    const ejsFile = fs.readFileSync(path.resolve(__dirname, "../ejs/rss.ejs"));
    const html = ejs.render(ejsFile.toString(), rssData);

    const file = await storage
      .bucket("web3-334501.appspot.com")
      .file("static/rss.xml");
    await file.createWriteStream().end(html);
  });

export const serveRss = functions.https.onRequest(async (_, res) => {
  const stream = await storage
    .bucket("web3-334501.appspot.com")
    .file("static/rss.xml")
    .createReadStream();

  res.contentType("application/atom+xml");
  stream.on("error", () => {
    return res.status(500);
  });

  stream.pipe(res);
});
