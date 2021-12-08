import * as functions from "firebase-functions";
import * as express from "express";
import { getAllEntries } from "./entries";

const app = express();

app.get("/entries", getAllEntries);

exports.app = functions.https.onRequest(app);
