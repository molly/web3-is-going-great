import * as functions from "firebase-functions";

export const transformEntryForSearch = functions
  .region("us-central1")
  .https.onCall(async (data) => {
    return {
      objectID: data.objectID, // Required for Algolia
      id: data.id,
      title: data.title.replace(/<[^>]+>/gm, "").replace(/&nbsp;/g, " "),
      body: data.body.replace(/<[^>]+>/gm, "").replace(/&nbsp;/g, " "),
      date: data.date,
      blockchain: data.filters.blockchain,
      tech: data.filters.tech,
      theme: data.filters.theme,
    };
  });
