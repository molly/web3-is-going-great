import { firestore, FieldPath } from "./config/firebase";
import * as functions from "firebase-functions";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { EntryQuery } from "./types";

const DEFAULT_LIMIT = 10;

export const getEntries = functions.https.onCall(async (data?: EntryQuery) => {
  const limit = data?.limit ?? DEFAULT_LIMIT;
  let query = await firestore
    .collection("entries")
    .orderBy("id", data?.sort === "Ascending" ? "asc" : "desc");

  if (data?.theme?.length) {
    query = query.where(
      new FieldPath("filters", "theme"),
      "array-contains-any",
      data.theme
    );
  } else if (data?.tech?.length) {
    query = query.where(
      new FieldPath("filters", "tech"),
      "array-contains-any",
      data.tech
    );
  } else if (data?.blockchain?.length) {
    query = query.where(
      new FieldPath("filters", "blockchain"),
      "array-contains-any",
      data.blockchain
    );
  }

  let snapshot: any;
  if (data?.cursor) {
    snapshot = await query.startAfter(data.cursor);
  } else if (data?.startAtId) {
    snapshot = await query.startAt(data.startAtId);
  } else {
    snapshot = query;
  }
  snapshot = await snapshot.limit(limit + 1).get();

  const entries: object[] = [];
  let hasMore = false;
  snapshot.forEach((child: QueryDocumentSnapshot) => {
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
