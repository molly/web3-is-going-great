import { collection, getDoc, doc, setDoc } from "firebase/firestore/lite";
import { db } from "./db";
import { compareCaseInsensitive } from "./utils";
import { stripHtml } from "../js/utilities";

export const uploadEntry = async (entry) => {
  const entriesCollection = collection(db, "entries");
  let idIncrementor = -1;
  let key;
  let docRef;
  let docSnapshot;

  // Find the first available key for this date
  do {
    idIncrementor += 1;
    key = `${entry.date}-${idIncrementor}`;
    docRef = doc(entriesCollection, key);
    docSnapshot = await getDoc(docRef);
  } while (docSnapshot.exists());

  entry.id = key;

  await setDoc(docRef, entry);
};

export const addAttribution = (field) => async (entry) => {
  const attributionCollection = collection(db, "attribution");
  const docRef = doc(attributionCollection, field);
  const docSnapshot = await getDoc(docRef);
  const { entries } = docSnapshot.data();

  // Find the first item alphabetically after this one
  const indexToInsertBefore = entries.findIndex(
    (e) =>
      compareCaseInsensitive(
        entry.sortKey || stripHtml(entry.text),
        e.sortKey || stripHtml(e.text)
      ) === -1
  );

  entries.splice(indexToInsertBefore, 0, entry);

  await setDoc(docRef, { entries });
};

export const addImageAttribution = addAttribution("images");
export const addEntryAttribution = addAttribution("entries");
