import { firestore } from "./config/firebase";
import * as functions from "firebase-functions";
import { SocialNetwork, SocialPostGroup } from "./types";

const NETWORKS: SocialNetwork[] = ["twitter", "mastodon", "bluesky"];
const ID_FORMATS = {
  twitter: /\d+/,
  mastodon: /\d+/,
  bluesky: /[a-z0-9]+/,
};

export const addSocialPostIds = functions.https.onRequest(async (req, res) => {
  const collection = await firestore.collection("entries");
  const documentRef = collection.doc(req.body.entryId);
  const document = await documentRef.get();
  const data = await document.data();

  if (document) {
    const existingSocialPostIds = data?.socialPostIds || {};

    const update: SocialPostGroup = existingSocialPostIds;
    const response: SocialPostGroup = {};
    let hasErrors = false;

    for (const network of NETWORKS) {
      if (
        network in req.body &&
        req.body[network] !== null &&
        req.body[network] !== undefined
      ) {
        if (ID_FORMATS[network].test(req.body[network])) {
          update[network] = req.body[network];
          response[network] = "Success";
        } else {
          hasErrors = true;
          response[network] = `Error: malformed ${network} ID`;
        }
      }
    }

    if (Object.keys(update).length > 0) {
      await document.ref.update({ socialPostIds: update });

      if (hasErrors) {
        res.status(200).json({ update: true, error: true, ...response });
      } else {
        res.status(200).json({ update: true, error: false, ...response });
      }
    } else {
      // No update made
      if (hasErrors) {
        res.status(400).json({ update: false, error: true, ...response });
      } else {
        res.status(200).json({ update: false, error: false });
      }
    }
  } else {
    res.status(404).send(`No document with ID ${req.body.entryId}`);
  }
});
