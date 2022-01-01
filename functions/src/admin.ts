import { firestore } from "./config/firebase";
import * as functions from "firebase-functions";
import { Entry } from "./types";
import { DocumentSnapshot } from "firebase-functions/v1/firestore";

export const uploadEntry = functions.https.onCall(
  async (entry: Entry, context: functions.https.CallableContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Authentication required"
      );
    }
    const collectionRef = await firestore.collection("entries");
    let idIncrementor = -1;
    let key: string;
    let docRef: any;
    let docSnapshot: DocumentSnapshot;

    // Find the first available key for this date
    do {
      idIncrementor += 1;
      key = `${entry.date}-${idIncrementor}`;
      docRef = collectionRef.doc(key);
      docSnapshot = await docRef.get();
    } while (docSnapshot.exists);

    entry.id = key;
    await docRef.set(entry);
  }
);
