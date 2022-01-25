import { collection, getDoc, doc } from "firebase/firestore/lite";
import { db } from "./db";

export const getAttribution = async () => {
  const attributionCollection = collection(db, "attribution");

  const imagesDocRef = doc(attributionCollection, "images");
  const imagesDocSnapshot = await getDoc(imagesDocRef);
  const images = imagesDocSnapshot.data();

  const entriesDocRef = doc(attributionCollection, "entries");
  const entriesDocSnapshot = await getDoc(entriesDocRef);
  const entries = entriesDocSnapshot.data();

  return { images, entries };
};
