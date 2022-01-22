import { useEffect, useState } from "react";
import Head from "next/head";

import { STORAGE_URL } from "../constants/urls";

import { stripHtml, getImageDimensions } from "../js/utilities";
import { EntryPropType } from "../js/entry";

export default function CustomEntryHead({ entry }) {
  const [isWaitingForImageDimensions, setIsWaitingForImageDimensions] =
    useState(true);
  const [imageDimensions, setImageDimensions] = useState({
    height: 630,
    width: 1200,
  });

  const imageSrc =
    entry && entry.image && entry.image.src
      ? `${STORAGE_URL}/entryAssets/${entry.image.src}`
      : null;

  useEffect(() => {
    if (entry && entry.image && entry.image.src) {
      getImageDimensions(imageSrc)
        .then((dimensions) => {
          setImageDimensions(dimensions);
          setIsWaitingForImageDimensions(false);
        })
        .catch(() => {
          setIsWaitingForImageDimensions(false);
        });
    } else {
      setIsWaitingForImageDimensions(false);
    }
  }, [entry, imageSrc]);

  if (!entry) {
    return null;
  }

  const title = stripHtml(entry.title);
  const description = stripHtml(entry.body);

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={description} key="description" />
      <meta
        property="og:url"
        key="ogurl"
        content={`https://web3isgoinggreat.com/single/${entry.id}`}
      />
      <meta property="og:title" key="ogtitle" content={title} />
      <meta
        property="og:description"
        key="ogdescription"
        content={description}
      />
      {imageSrc && (
        <>
          <meta property="og:image" key="ogimage" content={imageSrc} />
          <meta name="twitter:image" key="twitterimage" content={imageSrc} />
          <meta
            name="twitter:image:alt"
            key="twitterimagealt"
            content={entry.image.alt || "Image"}
          />
        </>
      )}
      {imageSrc && !isWaitingForImageDimensions && (
        <>
          <meta
            property="og:image:width"
            key="ogwidth"
            content={`${imageDimensions.width}`}
          />
          <meta
            property="og:image:height"
            key="ogheight"
            content={`${imageDimensions.height}`}
          />
        </>
      )}
      <meta name="twitter:title" key="twittertitle" content={title} />
      <meta
        name="twitter:description"
        key="twitterdescription"
        content={description}
      />
    </Head>
  );
}

CustomEntryHead.propTypes = {
  entry: EntryPropType,
};
