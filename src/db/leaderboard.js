import {
  collection,
  orderBy,
  query,
  limit,
  startAt,
  where,
  FieldPath,
  getDocs,
} from "firebase/firestore/lite";
import _orderBy from "lodash.orderby";
import findLastIndex from "lodash.findlastindex";
import { formatISO, addDays } from "date-fns";
import { db } from "./db";

const LEADERBOARD_LIMIT = 50;
const scamTotalPath = new FieldPath("scamAmountDetails", "total");
const hasScamAmountPath = new FieldPath("scamAmountDetails", "hasScamAmount");

const getHighestScamTotal = async (dbCollection) => {
  const highestScamSnapshot = await getDocs(
    query(dbCollection, orderBy(scamTotalPath, "desc"), limit(1))
  );
  const highestScamEntry = highestScamSnapshot.docs[0];
  return highestScamEntry.get(scamTotalPath);
};

export const getEntriesForLeaderboard = async ({
  dateRange,
  cursor,
  direction,
  sortKey,
  sortDirection,
} = {}) => {
  cursor = parseInt(cursor, 10);
  if (isNaN(cursor)) {
    cursor = null;
  }
  const resp = { entries: [], hasNext: false, hasPrev: false };
  const dbCollection = collection(db, "entries");

  let q = dbCollection;
  if ((dateRange && dateRange.shortLabel !== "all") || sortKey === "date") {
    // Due to Firestore limitations, firestore can't do the sorting along with the filtering :(
    q = query(q, where(hasScamAmountPath, "==", true));

    if (dateRange && dateRange.shortLabel !== "all") {
      const startDate = formatISO(dateRange.startDate, {
        representation: "date",
      });
      const endDate = formatISO(addDays(dateRange.endDate, 1), {
        representation: "date",
      });

      q = query(q, where("id", ">=", startDate), where("id", "<", endDate));
    }
    const snapshot = await getDocs(q);
    snapshot.forEach((child) => {
      resp.entries.push({ _key: child.id, ...child.data() });
    });

    // Sort
    if (sortKey === "date") {
      resp.entries = _orderBy(resp.entries, (entry) => entry.date, [
        sortDirection || "desc",
      ]);
    } else {
      resp.entries = _orderBy(
        resp.entries,
        (entry) => entry.scamAmountDetails.total,
        [sortDirection || "desc"]
      );
    }

    if (dateRange && dateRange.shortLabel !== "all") {
      // Get scam total
      resp.scamTotal = resp.entries.reduce(
        (total, entry) => total + entry.scamAmountDetails.total,
        0
      );
    }

    // Limit to <= LEADERBOARD_LIMIT entries, set pagination flags accordingly
    if (!cursor) {
      if (resp.entries.length > LEADERBOARD_LIMIT) {
        resp.hasNext = true;
        resp.entries = resp.entries.slice(0, LEADERBOARD_LIMIT);
      }
      return resp;
    } else if (direction === "prev") {
      const cursorIndex = findLastIndex(
        resp.entries,
        (entry) => entry.scamAmountDetails.total >= cursor
      );
      const startIndex = Math.max(cursorIndex - LEADERBOARD_LIMIT, 0);
      resp.hasNext = cursorIndex < resp.entries.length;
      resp.hasPrev = startIndex > 0;
      resp.entries = resp.entries.slice(startIndex, cursorIndex);
    } else {
      const cursorIndex = resp.entries.findIndex(
        (entry) => entry.scamAmountDetails.total <= cursor
      );
      const endIndex = cursorIndex + LEADERBOARD_LIMIT;
      resp.hasNext = endIndex < resp.entries.length;
      resp.hasPrev = cursorIndex > 0;
      resp.entries = resp.entries.slice(cursorIndex, endIndex);
    }
  } else {
    // This can be paginated normally
    let orderByDirection;
    if (sortDirection === "asc") {
      orderByDirection = direction === "next" ? "asc" : "desc";
    } else {
      orderByDirection = direction === "next" ? "desc" : "asc";
    }

    q = query(
      q,
      where(scamTotalPath, ">", 0),
      orderBy(scamTotalPath, orderByDirection)
    );

    if (cursor) {
      // TODO: Potential bug with entries with same total
      q = query(q, startAt(cursor));
    }
    q = query(q, limit(LEADERBOARD_LIMIT + 1));
    const snapshot = await getDocs(q);

    if (direction === "next") {
      snapshot.forEach((child) => {
        if (resp.entries.length < LEADERBOARD_LIMIT) {
          resp.entries.push({ _key: child.id, ...child.data() });
        } else {
          resp.hasNext = true;
        }
      });
    } else {
      snapshot.forEach((child) => {
        resp.entries.push({ _key: child.id, ...child.data() });
        if (resp.entries.length >= LEADERBOARD_LIMIT) {
          resp.hasNext = true;
        }
      });
      resp.entries.reverse();
      if (resp.entries.length > 50) {
        resp.entries = resp.entries.slice(1);
      }
    }

    if (cursor) {
      const highestScamAmount = await getHighestScamTotal(dbCollection);
      resp.hasPrev =
        resp.entries[0].scamAmountDetails.total !== highestScamAmount;
    }
  }

  return resp;
};
