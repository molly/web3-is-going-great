import { collection, getDoc, doc } from "firebase/firestore/lite";
import { db } from "./functions";

export const getEntry = async (id) => {
  if (!id.match(/\d{4}-\d{2}-\d{2}-\d{1,}/)) {
    throw new Error("invalid-argument");
  }
  const entriesCollection = collection(db, "entries");
  const docRef = doc(entriesCollection, id);
  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists()) {
    throw new Error("not-found");
  }
  return docSnapshot.data();
};
