import { collection, getDoc, doc, setDoc } from "firebase/firestore/lite";
import { db } from "./functions";

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

function compare(a, b) {
  const aT = a.text.toLowerCase().replace(/[^a-z0-9]/, "");
  const bT = b.text.toLowerCase().replace(/[^a-z0-9]/, "");
  if (aT < bT) {
    return -1;
  }
  if (aT > bT) {
    return 1;
  }
  return 0;
}

export const addAttribution = async (entry) => {
  const attributionCollection = collection(db, "attribution");
  const docRef = doc(attributionCollection, "images");
  const docSnapshot = await getDoc(docRef);
  const { entries } = docSnapshot.data();
  entries.push({
    text: entry.text,
    href: entry.href,
  });
  entries.sort(compare);

  await setDoc(docRef, { entries });
};
