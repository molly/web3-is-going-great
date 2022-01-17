import { collection, getDoc, doc } from "firebase/firestore/lite";
import { db } from "./functions";

export const getAttribution = async () => {
  const entriesCollection = collection(db, "attribution");
  const docRef = doc(entriesCollection, "images");
  const docSnapshot = await getDoc(docRef);
  return docSnapshot.data();
};
