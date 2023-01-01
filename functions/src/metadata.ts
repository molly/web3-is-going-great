import { firestore } from "./config/firebase";
import * as functions from "firebase-functions";
import { Change } from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/v1/firestore";
import { DocumentData, FieldPath } from "firebase-admin/firestore";

interface MetadataUpdate {
  entryCount?: number;
  griftTotal?: number;
}

const hasScamTotal = (documentData: DocumentData | null) =>
  documentData !== null && documentData.scamAmountDetails?.total > 0;

const getGriftChange = async (change: Change<DocumentSnapshot>) => {
  let griftChange = 0;
  const beforeChangeData = change.before.exists ? change.before.data() : null;
  if (change.after.exists) {
    const afterChangeData =
      change.after.data() as FirebaseFirestore.DocumentData; // Already did exists check above
    if (beforeChangeData) {
      if (hasScamTotal(beforeChangeData) && hasScamTotal(afterChangeData)) {
        // There was an existing entry with a scamAmount.total, so subtract the previous scam amount
        // and add the new one to pick up any changes
        griftChange =
          afterChangeData.scamAmountDetails.total -
          beforeChangeData.scamAmountDetails.total;
      } else if (hasScamTotal(beforeChangeData)) {
        // The existing entry had a scam total but it was deleted
        griftChange -= beforeChangeData.scamAmountDetails.total;
      } else if (hasScamTotal(afterChangeData)) {
        // There was an existing entry without a scam total, but a value was added
        griftChange = afterChangeData.scamAmountDetails.total;
      }
    } else if (hasScamTotal(afterChangeData)) {
      // New entry with scam total
      griftChange = afterChangeData.scamAmountDetails.total;
    }
  } else {
    // Document was deleted; subtract scam total if it's set
    if (beforeChangeData && hasScamTotal(beforeChangeData)) {
      griftChange -= beforeChangeData.scamAmountDetails.total;
    }
  }
  return griftChange;
};

export const updateMetadata = functions.firestore
  .document("/entries/{docId}")
  .onWrite(async (change) => {
    const metadataDocRef = await firestore
      .collection("metadata")
      .doc("metadata");
    const metadataSnapshot = await metadataDocRef.get();
    const update: MetadataUpdate = {};

    // Get the number of entries
    if (change.after.exists && !change.before.exists) {
      // New entry, update counter accordingly
      const previousEntryCount = metadataSnapshot.get("entryCount");
      update.entryCount = previousEntryCount + 1;
    } else if (change.before.exists && !change.after.exists) {
      // Entry was deleted
      const previousEntryCount = metadataSnapshot.get("entryCount");
      update.entryCount = previousEntryCount - 1;
    }

    // Get the new grift counter value
    const griftChange = await getGriftChange(change);
    if (griftChange !== 0) {
      const previousGriftTotal = metadataSnapshot.get("griftTotal");
      update.griftTotal = previousGriftTotal + griftChange;
    }

    // Commit the change if one needs to be made
    if (Object.keys(update).length > 0) {
      await metadataDocRef.update({ ...update });
    }
  });

export const recalculateGriftTotal = functions.https.onRequest(
  async (req, res) => {
    const entriesDb = await firestore.collection("entries");
    const entriesSnapshot = await entriesDb
      .where(new FieldPath("scamAmountDetails", "total"), ">", 0)
      .get();

    let griftTotal = 0;
    entriesSnapshot.forEach((child) => {
      const data = child.data();
      griftTotal += data.scamAmountDetails.total;
    });

    await firestore
      .collection("metadata")
      .doc("metadata")
      .update({ griftTotal });
    res.status(204).end();
  }
);

export const recalculateEntryCount = functions.https.onRequest(
  async (req, res) => {
    const entriesSnapshot = await firestore.collection("entries").get();

    await firestore
      .collection("metadata")
      .doc("metadata")
      .update({ entryCount: entriesSnapshot.size });
    res.status(204).end();
  }
);

export const getEntryCount = functions.https.onRequest(async (req, res) => {
  const entriesSnapshot = await firestore
    .collection("entries")
    .where("date", "<", "2022-01-01")
    .get();
  res.send({ size: entriesSnapshot.size });
});
