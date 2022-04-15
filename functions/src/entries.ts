import { firestore } from "./config/firebase";
import * as functions from "firebase-functions";
import { Entry } from "./types";

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

export const migrate = functions.https.onRequest(async (req, res) => {
  const collection = await firestore.collection("entries");
  const querySnapshot = await collection.get();
  querySnapshot.forEach((child) => {
    const childData = child.data() as Entry;
    if (!childData.readableId) {
      const strippedTitle = childData.title
        .replace(/<[^>]+>/gm, "")
        .replace(/&nbsp;/g, " ")
        .replace(/\./g, "-")
        .replace(/[^a-zA-Z0-9\- ]/g, "")
        .toLowerCase()
        .replace(/^(an?|the) /m, "");

      const readableId = encodeURIComponent(strippedTitle.replace(/ /g, "-"));
      child.ref.update({ readableId });
    }
  });
  res.status(200).send();
});
