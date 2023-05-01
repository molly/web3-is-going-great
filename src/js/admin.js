import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from "firebase/auth";
import { trimEmptyFields } from "./entry";
import {
  addImageAttribution,
  addEntryAttribution,
  uploadEntry,
} from "../db/admin";

export const auth = getAuth();
export const signIn = (password) =>
  signInWithEmailAndPassword(auth, "molly.white5@gmail.com", password);

export const signOut = () => fbSignOut(auth);

export const upload = async (
  rawEntry,
  rawImageAttribution,
  rawEntryAttribution
) => {
  const trimmed = trimEmptyFields(
    rawEntry,
    rawImageAttribution,
    rawEntryAttribution
  );
  const promises = [];
  if ("entry" in trimmed) {
    promises.push(uploadEntry(trimmed.entry));
  }
  if ("imageAttribution" in trimmed) {
    promises.push(addImageAttribution(trimmed.imageAttribution));
  }
  if ("entryAttribution" in trimmed) {
    promises.push(addEntryAttribution(trimmed.entryAttribution));
  }
  await Promise.all(promises);
  return promises[0];
};
