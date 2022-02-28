import { FieldPath, firestore, storage } from "./config/firebase";
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
  const query = collection.where(new FieldPath("image", "isLogo"), "==", true);
  const querySnapshot = await query.get();
  const imageNames: string[] = [];
  querySnapshot.forEach((child) => {
    const childData = child.data() as Entry;
    if (childData.image?.src) {
      imageNames.push(childData.image.src);
    }
  });

  const bucket = await storage.bucket("primary-web3");
  const [files] = await bucket.getFiles({ prefix: "entryImages/logos" });
  files.forEach(async (file) => {
    if (file.name.endsWith("_150.webp") || file.name.endsWith("_500.webp")) {
      await file.delete();
    }
  });
  res.json({ imageNames });
});
