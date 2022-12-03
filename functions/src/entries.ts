import { firestore } from "./config/firebase";
import * as functions from "firebase-functions";

export const moveEntry = functions.https.onRequest(async (req, res) => {
  const collection = await firestore.collection("entries");
  const documentRef = collection.doc(req.body.currentId);
  const document = (await documentRef.get()).data();
  if (document) {
    const newDocumentRef = await collection.doc(req.body.newId);
    if (!(await newDocumentRef.get()).exists) {
      newDocumentRef.set(document);
      await documentRef.delete();
      res.status(200).end();
    } else {
      res.status(400).send(`Document already exists at ${req.body.newId}`);
    }
  }
  res.status(400).send(`Document not located at ${req.body.currentId}`);
});

export const runTransform = functions.https.onRequest(async (req, res) => {
  const entriesSnapshot = await firestore.collection("entries").get();

  const entriesPromises = entriesSnapshot.docs.map(async (child) => {
    const data = child.data();
    let text = data.body;

    let modifiedFlag = false;

    if (/(?<!\d) ?[—–] ?(?![\d$])/.test(text)) {
      text = text.replace(/(?<!\d) ?[—–] ?(?![\d$])/g, " — ");
      modifiedFlag = true;
    }

    if (/[‘’“”]/.test(text)) {
      text = text.replace(/[‘’]/g, "'");
      text = text.replace(/[“”]/g, '"');
      modifiedFlag = true;
    }

    if (modifiedFlag) {
      return child.ref.update({ body: text });
    }
    return Promise.resolve();
  });

  Promise.all(entriesPromises)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});
