import { collection, getDoc, doc } from "firebase/firestore/lite";
import { db } from "./db";
import { compareCaseInsensitive } from "./utils";

export const getAllGlossaryEntries = async () => {
  const glossaryCollection = collection(db, "glossary");

  const entriesDocRef = doc(glossaryCollection, "entries");
  const entriesDocSnapshot = await getDoc(entriesDocRef);
  const entries = entriesDocSnapshot.data();

  const entriesArray = Object.values(entries);
  entriesArray.sort((a, b) => compareCaseInsensitive(a.term, b.term));

  return { entries: entriesArray };
};
