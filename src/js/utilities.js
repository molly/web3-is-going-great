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

export const stripHtml = function (html) {
  return html.replace(/<[^>]+>/g, "").replace("&nbsp;", " ");
};

export const getImageDimensions = (imageSrc) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ height: img.height, width: img.width });
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = imageSrc;
  });

export function truncateToNearestWord(str, length, startPosition = 0) {
  if (typeof str !== "string" || (startPosition === 0 && str.length < length)) {
    return str;
  }

  let toTrim;
  if (startPosition) {
    const startIndex = str.indexOf(" ", startPosition);
    toTrim = str.slice(startIndex + 1); // +1 trims off the space too
  } else {
    // Slice anyway to copy (to avoid mutations)
    toTrim = str.slice();
  }

  if (toTrim.length < length) {
    return toTrim;
  }

  const endIndex = toTrim.lastIndexOf(" ", length);
  return toTrim.slice(0, endIndex);
}

// Set key/value on URL query params without losing existing ones.
// If the key already exists in the params it will be overwritten.
// Returns URL for convenience
export const updateUrlWithQueryParam = (key, value) => {
  const query = new URLSearchParams(window.location.search);
  query.set(key, value);
  const permalink = `${window.location.origin}${
    window.location.pathname
  }?${query.toString()}`;
  window.history.pushState(null, null, permalink);
  return permalink;
};

export const copy = (obj) => JSON.parse(JSON.stringify(obj));
