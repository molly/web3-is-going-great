import moment from "moment";

export const sentenceCase = function (str) {
  if (typeof str !== "string" || !str.length) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

export const humanizeDate = function (date) {
  const m = moment(date);
  return m.format("LL");
};

export const isWrappedInParagraphTags = function (html) {
  if (typeof html !== "string") {
    return false;
  }
  return html.substring(0, 3) === "<p>";
};
