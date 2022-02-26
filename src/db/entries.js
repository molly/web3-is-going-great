import {
  collection,
  orderBy,
  query,
  limit,
  startAfter,
  startAt,
  where,
  FieldPath,
  getDocs,
} from "firebase/firestore/lite";
import { db } from "./db";

const DEFAULT_LIMIT = 10;

const getFirstEntryId = async (dbCollection) => {
  const firstEntrySnapshot = await getDocs(
    query(query(dbCollection, orderBy("id", "desc")), limit(1))
  );
  const firstEntry = firstEntrySnapshot.docs[0];
  return firstEntry.id;
};

export const getEntries = async ({
  limit: entriesLimit,
  sort,
  theme,
  tech,
  blockchain,
  collection: entriesCollection,
  cursor,
  startAtId,
} = {}) => {
  const resp = {
    entries: [],
    hasPrev: null, // This is only set if there's a cursor
    hasNext: false,
  };
  const respLimit = entriesLimit ? entriesLimit : DEFAULT_LIMIT;

  const dbCollection = collection(db, "entries");
  let q = query(
    dbCollection,
    orderBy("id", !!sort && sort === "Ascending" ? "asc" : "desc")
  );

  if (entriesCollection) {
    q = query(q, where("collection", "array-contains", entriesCollection));
  } else if (theme && theme.length) {
    q = query(
      q,
      where(new FieldPath("filters", "theme"), "array-contains-any", theme)
    );
  } else if (tech && tech.length) {
    q = query(
      q,
      where(new FieldPath("filters", "tech"), "array-contains-any", tech)
    );
  } else if (blockchain && blockchain.length) {
    q = query(
      q,
      where(
        new FieldPath("filters", "blockchain"),
        "array-contains-any",
        blockchain
      )
    );
  }

  if (cursor) {
    q = query(q, startAfter(cursor));
  } else if (startAtId) {
    q = query(q, startAt(startAtId));
  }
  q = query(q, limit(respLimit + 1));
  const snapshot = await getDocs(q);

  snapshot.forEach((child) => {
    if (resp.entries.length < respLimit) {
      resp.entries.push({ _key: child.id, ...child.data() });
    } else {
      resp.hasNext = true;
    }
  });

  // Check if this is the first entry available
  if (cursor || startAtId) {
    const firstId = cursor || startAtId;
    const firstEntryId = await getFirstEntryId(dbCollection);
    resp.hasPrev = firstEntryId !== firstId;
  }

  return resp;
};

const ALL_ENTRIES_LIMIT = 50;
export const getAllEntries = async ({ cursor, direction }) => {
  const resp = {
    entries: [],
    hasPrev: false,
    hasNext: false,
  };

  const dbCollection = collection(db, "entries");

  let q = query(
    dbCollection,
    orderBy("id", direction === "prev" ? "asc" : "desc")
  );

  // Get this page of entries
  if (cursor) {
    q = query(q, startAfter(cursor));
  }

  // Limit query
  q = query(q, limit(ALL_ENTRIES_LIMIT + 1));
  const snapshot = await getDocs(q);

  if (direction === "next") {
    snapshot.forEach((child) => {
      if (resp.entries.length < ALL_ENTRIES_LIMIT) {
        resp.entries.push({ _key: child.id, ...child.data() });
      } else {
        resp.hasNext = true;
      }
    });
  } else {
    snapshot.forEach((child) => {
      resp.entries.push({ _key: child.id, ...child.data() });
      if (resp.entries.length === ALL_ENTRIES_LIMIT) {
        resp.hasNext = true;
      }
    });
    resp.entries.reverse();
    if (resp.entries.length > 50) {
      resp.entries = resp.entries.slice(1);
    }
  }

  // Check if the first entry in this group is also the first document in the
  // collection or if there are newer entries that could be fetched
  if (cursor) {
    const firstEntryId = await getFirstEntryId(dbCollection);
    if (resp.entries[0].id !== firstEntryId) {
      resp.hasPrev = true;
    }
  }

  return resp;
};
