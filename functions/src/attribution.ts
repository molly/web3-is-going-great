import { firestore } from "./config/firebase";
import * as functions from "firebase-functions";
import { AttributionEntry } from "./types";

function compare(a: AttributionEntry, b: AttributionEntry) {
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
  async (entry: AttributionEntry, context: functions.https.CallableContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Authentication required"
      );
    }

    const docRef = await firestore.collection("attribution").doc("images");
    const attributionEntries = (await docRef.get()).get("entries");
    attributionEntries.push({
      text: entry.text,
      href: entry.href,
    });
    attributionEntries.sort(compare);
    await docRef.update("entries", attributionEntries);
  }
);
