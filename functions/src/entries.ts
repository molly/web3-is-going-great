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
  const entriesCollection = await firestore.collection("entries").get();

  const entriesPromises = entriesCollection.docs.map(async (child) => {
    const data = child.data();
    if ("scamAmountDetails" in data) {
      const total = data.scamAmountDetails.total || 0;
      return child.ref.update({
        scamAmountDetails: {
          total: total,
          hasScamAmount: total > 0,
          preRecoveryAmount: total,
        },
      });
    } else {
      return child.ref.update({
        scamAmountDetails: {
          total: 0,
          hasScamAmount: false,
          preRecoveryAmount: 0,
        },
      });
    }
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
