import { collection, getDoc, doc } from "firebase/firestore/lite";
import { db } from "./db";

export const getAttribution = async () => {
  const attributionCollection = collection(db, "attribution");
  const docRef = doc(attributionCollection, "images");
  const docSnapshot = await getDoc(docRef);
  return docSnapshot.data();
};
