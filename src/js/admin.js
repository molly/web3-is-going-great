import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { functions } from "./functions";
import { trimEmptyFields } from "./entry";

export const auth = getAuth();
export const signIn = (password) =>
  signInWithEmailAndPassword(auth, "molly.white5@gmail.com", password);

export const signOut = () => fbSignOut(auth);

export const upload = async (rawEntry, rawAttribution) => {
  const { entry, attribution } = trimEmptyFields(rawEntry, rawAttribution);
  const resp = await httpsCallable(functions, "uploadEntry")(entry);
  if (attribution) {
    await httpsCallable(functions, "addAttribution")(attribution);
  }
  return resp;
};
