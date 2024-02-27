import * as escapeHtml from "escape-html";
import * as https from "https";
import sizeOf from "image-size";
import { getEntry } from "../../db/singleEntry";

const BASE_RESPONSE = {
  type: "rich",
  version: "1.0",
  author_name: "Molly White",
  author_url: "https://www.mollywhite.net/",
  provider_name: "Web3 is Going Just Great",
  provider_url: "https://www.web3isgoinggreat.com/",
  width: 600,
  height: 600,
};

const getImageUrl = (image) => {
  if (image && image.src) {
    return `https://primary-cdn.web3isgoinggreat.com/entryImages/${
      image.isLogo ? "logos/" : ""
    }resized/${image.src.split(".")[0]}_${image.isLogo ? "300" : "500"}.webp`;
  }
  return null;
};

const getImageSize = async (imageUrl) => {
  return new Promise((resolve, reject) => {
    https.get(imageUrl, function (response) {
      const chunks = [];
      response
        .on("data", function (chunk) {
          chunks.push(chunk);
        })
        .on("end", function () {
          const buffer = Buffer.concat(chunks);
          const dimensions = sizeOf(buffer);
          resolve({
            thumbnail_width: dimensions.width,
            thumbnail_height: dimensions.height,
          });
        })
        .on("error", function (error) {
          reject(error);
        });
    });
  });
};

const getEmbedXml = (response) => {
  const xmlRows = Object.entries(response).map(
    ([key, value]) => `<${key}>${escapeHtml(value)}</${key}>\n`
  );
  return `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
  <oembed>
    ${xmlRows.join("")}
  </oembed>
  `;
};

export default async function handler(req, res) {
  // Validate required query parameter
  const { url, maxwidth, maxheight, format } = req.query;
  if (!url) {
    res.status(404).json({ error: "URL is required" });
    return;
  }

  // Validate protocol
  const parsed = new URL(url);
  if (!["https:", "http:"].includes(parsed.protocol)) {
    res.status(404).json({ error: `Unsupported protocol: ${parsed.protocol}` });
    return;
  }

  // Validate domain
  const domain = parsed.hostname.split(".").slice(-2).join(".");
  if (
    ![
      "web3isgoinggreat.com",
      "web3isgoingjustgreat.com",
      "w3igg.com",
      "web3isgreat.com",
    ].includes(domain)
  ) {
    res.status(404).json({ error: `Unsupported domain: ${domain}` });
    return;
  }

  // Create base response
  let response = {
    ...BASE_RESPONSE,
    ...(maxwidth && { width: parseInt(maxwidth, 10) }),
    ...(maxheight && { height: parseInt(maxheight, 10) }),
  };

  // Try to get post ID for URLs referencing a specific post
  let id;
  if (parsed.searchParams.has("id")) {
    id = parsed.searchParams.get("id");
  } else if (
    parsed.pathname.startsWith("/embed/") ||
    parsed.pathname.startsWith("/single/")
  ) {
    id = parsed.pathname.split("/").pop();
  }

  if (id) {
    const entry = await getEntry(id);
    response.title = entry.title;
    response.html = `<iframe title="${entry.title}" height="${response.height}" width="${response.width}" src="https://www.web3isgoinggreat.com/embed/${id}" frameborder="0" sandbox=""></iframe>`;
    const imageUrl = getImageUrl(entry.image);
    if (imageUrl) {
      response.thumbnail_url = imageUrl;
      response = { ...response, ...(await getImageSize(imageUrl)) };
    }
  } else {
    // Generic embed
    response.html = `<iframe title="Web3 is Going Just Great" height="${response.height}" width="${response.width}" src="https://www.web3isgoinggreat.com/${parsed.pathname}${parsed.search}" frameborder="0" sandbox=""></iframe>`;
    response.thumbnail_url =
      "https://primary-cdn.web3isgoinggreat.com/monkey_500.webp";
    response.thumbnail_width = 490;
    response.thumbnail_height = 461;
  }

  if (format === "xml") {
    res.setHeader("Content-Type", "text/xml");
    res.send(getEmbedXml(response));
  } else {
    // Default to JSON if format is unspecified
    res.json(response);
  }
}
