import * as functions from "firebase-functions";
import { AlgoliaEntry } from "./types";

export const transformEntryForSearch = functions
  .region("us-central1")
  .https.onCall(async (data: AlgoliaEntry) => {
    return {
      objectID: data.objectID, // Required for Algolia
      id: data.id,
      readableId: data.readableId,
      title: data.title.replace(/<[^>]+>/gm, "").replace(/&nbsp;/g, " "),
      body: data.body.replace(/<[^>]+>/gm, "").replace(/&nbsp;/g, " "),
      date: data.date,
      blockchain: data.filters.blockchain,
      tech: data.filters.tech,
      collection: data.collection,
      theme: data.filters.theme,
    };
  });
