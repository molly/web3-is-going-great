import * as admin from "firebase-admin";
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

  // Fetch one more entry than we actually want so we can set a flag to determine if there are more entries remaining
  const query = await admin
    .database()
    .ref("/entries")
    .orderByKey()
    .limitToFirst(limit + 1);

  let snapshot: admin.database.DataSnapshot;
  if (!data.cursor) {
    snapshot = await query.once("value");
  } else {
    snapshot = await query.startAfter(data.cursor).once("value");
  }

  // Returning snapshot.val() will give us an unordered object, so convert to an array before returning to preserve
  // order
  const entries: object[] = [];
  let hasMore = false;
  snapshot.forEach((child) => {
    if (entries.length < limit) {
      entries.push({ _key: child.key, ...child.val() });
    } else {
      hasMore = true;
    }
  });

  if (!entries) {
    throw new functions.https.HttpsError("internal", "something went wrong");
  }
  return { entries, hasMore };
});
