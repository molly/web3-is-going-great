import * as admin from "firebase-admin";

admin.initializeApp();

export const firestore = admin.firestore();
export const FieldPath = admin.firestore.FieldPath;
export const storage = admin.storage();
