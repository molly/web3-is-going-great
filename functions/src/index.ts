import { getEntries } from "./entries";
import { updateRssOnChange, serveRss } from "./rss";
import { updateWeb1OnChange, serveWeb1 } from "./web1";

exports.getEntries = getEntries;

exports.updateRssOnChange = updateRssOnChange;
exports.serveRss = serveRss;

exports.updateWeb1OnChange = updateWeb1OnChange;
exports.serveWeb1 = serveWeb1;
