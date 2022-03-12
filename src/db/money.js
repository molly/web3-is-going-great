import { collection, getDoc, doc } from "firebase/firestore/lite";
import { db } from "./db";

export const getMoney = async () => {
  const moneyCollection = collection(db, "money");

  const moneyDocSnapshot = await getDoc(doc(moneyCollection, "money"));
  const money = moneyDocSnapshot.data();

  return money;
};
