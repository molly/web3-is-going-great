import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export function initialize(): void {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: functions.config().web3.privatekey.replace(/\\n/g, "\n"),
      projectId: functions.config().web3.projectid,
      clientEmail: functions.config().web3.clientemail,
    }),
    databaseURL: "https://web3-334501-default-rtdb.firebaseio.com/",
    databaseAuthVariableOverride: {
      uid: "public-service",
    },
  });
}
