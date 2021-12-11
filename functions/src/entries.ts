import { firestore, FieldPath } from "./config/firebase";
import * as functions from "firebase-functions";

type EntryQuery = {
  limit?: number;
  cursor?: string;
  tech?: string[];
  theme?: string[];
  blockchain?: string[];
};

const DEFAULT_LIMIT = 10;

export const getEntries = functions.https.onCall(async (data: EntryQuery) => {
  const limit = data?.limit ?? DEFAULT_LIMIT;

  let query = await firestore
    .collection("entries")
    .orderBy(FieldPath.documentId());

  let snapshot;
  if (!data.cursor) {
    snapshot = await query.get();
  } else {
    snapshot = await query.startAfter(data.cursor).get();
  }

  const entries: object[] = [];
  let hasMore = false;
  snapshot.forEach((child) => {
    if (entries.length < limit) {
      entries.push({ _key: child.id, ...child.data() });
    } else {
      hasMore = true;
    }
  });

  if (!entries) {
    throw new functions.https.HttpsError("internal", "something went wrong");
  }
  return { entries, hasMore };
});
