import { collection, getDoc, doc } from "firebase/firestore/lite";
import { db } from "./db";
import { getNumericId } from "./entries";

export const getEntry = async (id) => {
  const numericId = await getNumericId(id);
  if (!numericId) {
    throw new Error("invalid-argument");
  }
  const entriesCollection = collection(db, "entries");
  const docRef = doc(entriesCollection, numericId);
  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists()) {
    throw new Error("not-found");
  }
  return docSnapshot.data();
};
