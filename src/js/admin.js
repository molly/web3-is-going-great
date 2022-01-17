import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from "firebase/auth";
import { trimEmptyFields } from "./entry";
import { addAttribution, uploadEntry } from "./db/admin";

export const auth = getAuth();
export const signIn = (password) =>
  signInWithEmailAndPassword(auth, "molly.white5@gmail.com", password);

export const signOut = () => fbSignOut(auth);

export const upload = async (rawEntry, rawAttribution) => {
  const { entry, attribution } = trimEmptyFields(rawEntry, rawAttribution);
  const promises = [uploadEntry(entry)];
  if (attribution) {
    promises.push([addAttribution(attribution)]);
  }
  await Promise.all(promises);
};
