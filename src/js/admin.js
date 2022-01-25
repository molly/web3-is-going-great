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
  const { entry, imageAttribution, entryAttribution } = trimEmptyFields(
    rawEntry,
    rawImageAttribution,
    rawEntryAttribution
  );
  const promises = [uploadEntry(entry)];
  if (imageAttribution) {
    promises.push(addImageAttribution(imageAttribution));
  }
  if (entryAttribution) {
    promises.push(addEntryAttribution(entryAttribution));
  }
  await Promise.all(promises);
};
