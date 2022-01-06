import { firestore, storage } from "./config/firebase";
import * as functions from "firebase-functions";

import * as path from "path";
import * as fs from "fs";
import * as ejs from "ejs";

import { Entry } from "./types";
import * as moment from "moment";

type FilterObj = {
  [key: string]: string;
};

type Filters = {
  theme: FilterObj;
  tech: FilterObj;
  blockchain: FilterObj;
};

const FILTERS: Filters = {
  theme: {
    badIdea: "Bad idea",
    bug: "Bug",
    bummer: "Bummer",
    environment: "Environment",
    fakeNews: "Fake news",
    goodNews: "Good news",
    hack: "Hack or scam",
    hmm: "Hmm",
    rugPull: "Rug pull",
    shady: "Shady business",
  },
  tech: {
    gaming: "blockchain gaming",
    currency: "cryptocurrency",
    dao: "DAO",
    dapps: "dApps",
    defi: "DeFi",
    metaverse: "metaverse",
    nft: "NFT",
  },
  blockchain: {
    avalanche: "Avalanche",
    bitcoin: "Bitcoin",
    bsc: "BSC",
    ethereum: "Ethereum",
    flow: "Flow",
    litecoin: "Litecoin",
    polygon: "Polygon",
    solana: "Solana",
    wax: "WAX",
  },
};

export const updateWeb1OnChange = functions.firestore
  .document("/entries/{docId}")
  .onWrite(async () => {
    const snapshot = await firestore
      .collection("entries")
      .orderBy("id", "desc")
      .limit(1000)
      .get();

    const web1Data: {
      storageUrlPrefix: string;
      entries: Entry[];
    } = {
      storageUrlPrefix:
        "https://storage.googleapis.com/web3-334501.appspot.com",
      entries: [],
    };

    snapshot.forEach((child) => {
      const entry = child.data() as Entry;
      web1Data.entries.push({
        ...entry,
        filters: {
          theme: entry.filters.theme
            ? entry.filters.theme.map((theme) => FILTERS.theme[theme])
            : [],
          tech: entry.filters.tech
            ? entry.filters.tech.map((tech) => FILTERS.tech[tech])
            : [],
          blockchain: entry.filters.blockchain
            ? entry.filters.blockchain.map((bc) => FILTERS.blockchain[bc])
            : [],
        },
        dateString: moment(entry.date, "YYYY-MM-DD").format("MMMM D, YYYY"),
      });
    });

    const ejsFile = fs.readFileSync(path.resolve(__dirname, "../ejs/web1.ejs"));
    const html = ejs.render(ejsFile.toString(), web1Data);

    const file = await storage
      .bucket("web3-334501.appspot.com")
      .file("static/web1.html");
    await file
      .createWriteStream({ metadata: { contentType: "html" } })
      .end(html);
  });

export const serveWeb1 = functions.https.onRequest(async (_, res) => {
  const stream = await storage
    .bucket("web3-334501.appspot.com")
    .file("static/web1.html")
    .createReadStream();

  stream.on("error", () => {
    return res.status(500);
  });

  res.contentType("html");
  stream.pipe(res);
});
