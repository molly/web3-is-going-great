import { firestore } from "./config/firebase";
import * as functions from "firebase-functions";
import { AttributionEntry } from "./types";

function compare(
  a: { text: string; href: string },
  b: { text: string; href: string }
) {
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

export const getAttribution = functions.https.onCall(async () => {
  const docSnapshot = await firestore
    .collection("attribution")
    .doc("images")
    .get();
  return docSnapshot.data();
});

export const addAttribution = functions.https.onCall(
  async (data: AttributionEntry) => {
    const docRef = await firestore.collection("attribution").doc("images");
    const attributionEntries = (await docRef.get()).get("entries");
    attributionEntries.push({
      text: data.text,
      href: data.href,
    });
    attributionEntries.sort(compare);
    await docRef.update("entries", attributionEntries);
  }
);
