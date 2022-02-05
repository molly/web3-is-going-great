import { collection, getDoc, doc } from "firebase/firestore/lite";
import { db } from "./db";
import { compareCaseInsensitive } from "./utils";

export const getGlossaryEntries = async () => {
  const glossaryCollection = collection(db, "glossary");

  const entriesDocRef = doc(glossaryCollection, "entries");
  const entriesDocSnapshot = await getDoc(entriesDocRef);
  const entries = entriesDocSnapshot.data();

  return { entries };
};

export const getSortedGlossaryEntries = async () => {
  const { entries } = await getGlossaryEntries();

  const entriesArray = Object.values(entries);
  entriesArray.sort((a, b) => compareCaseInsensitive(a.term, b.term));

  return { entries: entriesArray };
};
