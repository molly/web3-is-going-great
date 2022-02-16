import { firestore } from "./config/firebase";
import * as functions from "firebase-functions";

export const updateGriftTotal = functions.firestore
  .document("/entries/{docId}")
  .onWrite(async (change) => {
    let griftChange = 0;
    if (change.after.exists) {
      const afterChangeData =
        change.after.data() as FirebaseFirestore.DocumentData; // Already did exists check above
      const beforeChangeData = change.before.exists
        ? change.before.data()
        : null;
      if (beforeChangeData) {
        // There was an existing entry, so remove the before scamTotal and add the new one to pick up any changes
        griftChange = afterChangeData.scamTotal - beforeChangeData.scamTotal;
      } else {
        // New entry
        griftChange = afterChangeData.scamTotal;
      }
    } else {
      // Document was deleted; subtract scamTotal if it's set
      const beforeChangeData = change.before.exists
        ? change.before.data()
        : null;
      if (
        beforeChangeData &&
        "scamTotal" in beforeChangeData &&
        beforeChangeData.scamTotal !== 0
      ) {
        griftChange -= beforeChangeData.scamTotal;
      }
    }

    // Commit the change if one needs to be made
    if (griftChange !== 0) {
      const metadataDocRef = await firestore
        .collection("metadata")
        .doc("metadata");
      const metadataSnapshot = await metadataDocRef.get();
      const previousGriftTotal = metadataSnapshot.get("griftTotal");
      await metadataDocRef.update({
        griftTotal: previousGriftTotal + griftChange,
      });
    }
  });

export const recalculateGriftTotal = functions.https.onRequest(
  async (req, res) => {
    const entriesSnapshot = await firestore.collection("entries").get();

    let griftTotal = 0;
    entriesSnapshot.forEach((child) => {
      const data = child.data();
      if ("scamTotal" in data && typeof data.scamTotal === "number") {
        griftTotal += data.scamTotal;
      }
    });

    await firestore
      .collection("metadata")
      .doc("metadata")
      .update({ griftTotal });
    res.status(204).end();
  }
);
