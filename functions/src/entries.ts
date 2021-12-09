import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

type EntryQuery = {
  limit?: number;
};

export const getEntries = functions.https.onCall(async (data: EntryQuery) => {
  const limit = data?.limit ?? 10;

  const snapshot = await admin
    .database()
    .ref("/entries")
    .orderByChild("date")
    .limitToLast(limit)
    .once("value");

  const entries: object[] = [];
  snapshot.forEach((child) => {
    entries.push(child.val());
  });
  if (!entries) {
    throw new functions.https.HttpsError("internal", "something went wrong");
  }
  return entries;
});
