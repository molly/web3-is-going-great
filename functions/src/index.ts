import { initialize } from "./config/firebase";
import { getEntries } from "./entries";

initialize();

exports.getEntries = getEntries;
