import { collection, getDoc, doc } from "firebase/firestore/lite";
import { db } from "./db";

export const getMetadata = async () => {
  const metadataCollection = collection(db, "metadata");

  const metadataDocSnapshot = await getDoc(doc(metadataCollection, "metadata"));
  const metadata = metadataDocSnapshot.data();

  return metadata;
};
