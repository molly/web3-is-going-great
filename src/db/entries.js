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

export const getEntries = async (data) => {
  const resp = {
    entries: [],
    hasPrev: null, // This is only set if there's a cursor
    hasNext: false,
  };

  const respLimit = data && data.limit ? limit : DEFAULT_LIMIT;

  const entriesCollection = collection(db, "entries");
  let q = query(
    entriesCollection,
    orderBy("id", data && data.sort === "Ascending" ? "asc" : "desc")
  );

  if (data && data.theme && data.theme.length) {
    q = query(
      q,
      where(new FieldPath("filters", "theme"), "array-contains-any", data.theme)
    );
  } else if (data && data.tech && data.tech.length) {
    q = query(
      q,
      where(new FieldPath("filters", "tech"), "array-contains-any", data.tech)
    );
  } else if (data && data.blockchain && data.blockchain.length) {
    q = query(
      q,
      where(
        new FieldPath("filters", "blockchain"),
        "array-contains-any",
        data.blockchain
      )
    );
  }

  if (data && data.cursor) {
    q = query(q, startAfter(data.cursor));
  } else if (data && data.startAtId) {
    q = query(q, startAt(data.startAtId));
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
  if (data && data.cursor) {
    const firstEntrySnapshot = await getDocs(
      query(entriesCollection, limit(1))
    );
    const firstEntry = firstEntrySnapshot.docs[0];
    if (firstEntry.get("id") !== data.cursor) {
      resp.hasPrev = true;
    }
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

  const entriesCollection = collection(db, "entries");

  let q = query(
    entriesCollection,
    orderBy("id", direction === "prev" ? "asc" : "desc")
  );

  // Check if this is the first entry available
  if (cursor) {
    const firstEntrySnapshot = await getDocs(query(q, limit(1)));
    const firstEntry = firstEntrySnapshot.docs[0];
    if (firstEntry.get("id") !== cursor) {
      resp.hasPrev = true;
    }
  }

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

  return resp;
};
