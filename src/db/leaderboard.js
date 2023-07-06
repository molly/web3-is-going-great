import {
  collection,
  query,
  where,
  FieldPath,
  getDocs,
} from "firebase/firestore/lite";
import _orderBy from "lodash.orderby";
import findIndex from "lodash.findindex";
import { formatISO, addDays } from "date-fns";
import { db } from "./db";

const LEADERBOARD_LIMIT = 50;
const hasScamAmountPath = new FieldPath("scamAmountDetails", "hasScamAmount");

const sortEntries = ({ entries, sortKey, sortDirection }) => {
  if (sortKey === "date") {
    // Sort by date
    return _orderBy(entries, (entry) => entry.date, [sortDirection || "desc"]);
  } else {
    // Sort by scam amount, pre-recovery
    return _orderBy(
      entries,
      (entry) => entry.scamAmountDetails.preRecoveryAmount,
      [sortDirection || "desc"]
    );
  }
};

const paginateEntries = ({ entries, cursor, direction }) => {
  // This will be merged with resp
  const respModifications = {};

  if (!cursor) {
    // No cursor specified, just grab the first LEADERBOARD_LIMIT entries
    if (entries.length > LEADERBOARD_LIMIT) {
      respModifications.hasNext = true;
      respModifications.entries = entries.slice(0, LEADERBOARD_LIMIT);
    }
    return respModifications;
  } else {
    let cursorIndex = findIndex(entries, (entry) => entry.id === cursor);
    if (direction === "prev") {
      const startIndex = Math.max(cursorIndex - LEADERBOARD_LIMIT, 0);
      respModifications.hasNext = cursorIndex < entries.length;
      respModifications.hasPrev = startIndex > 0;
      respModifications.entries = entries.slice(startIndex, cursorIndex);
    } else {
      cursorIndex += 1;
      const endIndex = cursorIndex + LEADERBOARD_LIMIT;
      respModifications.hasNext = endIndex < entries.length;
      respModifications.hasPrev = cursorIndex > 0;
      respModifications.entries = entries.slice(cursorIndex, endIndex);
    }
  }

  return respModifications;
};

export const getEntriesForLeaderboard = async ({
  dateRange,
  cursor,
  direction,
  sortKey,
  sortDirection,
} = {}) => {
  let resp = { entries: [], hasNext: false, hasPrev: false };

  // Set up initial query
  const dbCollection = collection(db, "entries");
  let q = query(dbCollection, where(hasScamAmountPath, "==", true));

  // Filter query by date range if that's specified
  if (dateRange && dateRange.shortLabel !== "all") {
    const startDate = formatISO(dateRange.startDate, {
      representation: "date",
    });
    const endDate = formatISO(addDays(dateRange.endDate, 1), {
      representation: "date",
    });

    q = query(q, where("id", ">=", startDate), where("id", "<", endDate));
  }

  // Perform query
  const snapshot = await getDocs(q);
  snapshot.forEach((child) => {
    resp.entries.push({ _key: child.id, ...child.data() });
  });

  // Sort
  resp.entries = sortEntries({ entries: resp.entries, sortKey, sortDirection });

  // Calculate scamTotal if query was limited by date range (otherwise we just use the all-time scamTotal in the DB)
  if (dateRange && dateRange.shortLabel !== "all") {
    resp.scamTotal = resp.entries.reduce(
      // Intentionally using total here and not preRecoveryAmount, to match grift counter approach
      (total, entry) => total + entry.scamAmountDetails.total,
      0
    );
  }

  resp = {
    ...resp,
    ...paginateEntries({ entries: resp.entries, cursor, direction }),
  };

  return resp;
};
