import { firestore, storage } from "./config/firebase";
import * as functions from "firebase-functions";

import * as path from "path";
import * as fs from "fs";
import * as ejs from "ejs";

import { Entry } from "./types";
import * as moment from "moment";

export const updateWeb1OnChange = functions.firestore
  .document("/entries/{docId}")
  .onWrite(async () => {
    const snapshot = await firestore
      .collection("entries")
      .orderBy("id", "desc")
      .limit(1000)
      .get();

    const web1Data: {
      storageUrlPrefix: string;
      entries: Entry[];
    } = {
      storageUrlPrefix:
        "https://storage.googleapis.com/web3-334501.appspot.com",
      entries: [],
    };

    snapshot.forEach((child) => {
      const entry = child.data() as Entry;
      web1Data.entries.push({
        ...entry,
        dateString: moment(entry.date, "YYYY-MM-DD").format("MMMM D, YYYY"),
      });
    });

    const ejsFile = fs.readFileSync(path.resolve(__dirname, "../ejs/web1.ejs"));
    const html = ejs.render(ejsFile.toString(), web1Data);

    const file = await storage
      .bucket("web3-334501.appspot.com")
      .file("static/web1.html");
    await file
      .createWriteStream({ metadata: { contentType: "html" } })
      .end(html);
  });

export const serveWeb1 = functions.https.onRequest(async (_, res) => {
  const stream = await storage
    .bucket("web3-334501.appspot.com")
    .file("static/web1.html")
    .createReadStream();

  stream.on("error", () => {
    return res.status(500);
  });

  res.contentType("html");
  stream.pipe(res);
});
