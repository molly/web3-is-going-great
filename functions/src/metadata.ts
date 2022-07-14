import { firestore } from "./config/firebase";
import * as functions from "firebase-functions";

const hasScamTotal = (obj: { scamTotal?: any }) =>
  "scamTotal" in obj && typeof obj.scamTotal === "number";

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
        if (hasScamTotal(beforeChangeData) && hasScamTotal(afterChangeData)) {
          // There was an existing entry with a scamTotal, so remove the before scamTotal
          // and add the new one to pick up any changes
          griftChange = afterChangeData.scamTotal - beforeChangeData.scamTotal;
        } else if (hasScamTotal(beforeChangeData)) {
          // The existing entry had a scamTotal but it was deleted
          griftChange -= beforeChangeData.scamTotal;
        } else if (hasScamTotal(afterChangeData)) {
          // There was an existing entry without a scamTotal, but a value was added
          griftChange = afterChangeData.scamTotal;
        }
      } else if (hasScamTotal(afterChangeData)) {
        // New entry with scamTotal
        griftChange = afterChangeData.scamTotal;
      }
    } else {
      // Document was deleted; subtract scamTotal if it's set
      const beforeChangeData = change.before.exists
        ? change.before.data()
        : null;
      if (beforeChangeData && hasScamTotal(beforeChangeData)) {
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

export const getGriftCounterTotal = functions.https.onRequest(
  async (req, res) => {
    const metadata = await firestore
      .collection("metadata")
      .doc("metadata")
      .get();
    const griftTotal = await metadata.get("griftTotal");
    res
      .set("Cache-Control", "public, max-age=300, s-maxage=600")
      .status(200)
      .send({ total: griftTotal });
  }
);
