import { getEntries } from "./entries";
import { addAttribution, getAttribution } from "./attribution";
import { uploadEntry } from "./admin";

import { updateRssOnChange, serveRss } from "./rss";
import { updateWeb1OnChange, serveWeb1 } from "./web1";

exports.getEntries = getEntries;

exports.getAttribution = getAttribution;

exports.updateRssOnChange = updateRssOnChange;
exports.serveRss = serveRss;

exports.updateWeb1OnChange = updateWeb1OnChange;
exports.serveWeb1 = serveWeb1;

// Admin
exports.uploadEntry = uploadEntry;
exports.addAttribution = addAttribution;
