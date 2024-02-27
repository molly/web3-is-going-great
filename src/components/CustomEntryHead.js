import Head from "next/head";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { EntryPropType } from "../js/entry";

import { getImageUrl } from "../js/images";
import { getImageDimensions, stripHtml } from "../js/utilities";

export default function CustomEntryHead({
  entry,
  collectionDescription,
  additionalHead,
}) {
  const [isWaitingForImageDimensions, setIsWaitingForImageDimensions] =
    useState(true);
  const [imageDimensions, setImageDimensions] = useState({
    height: 630,
    width: 1200,
  });

  const imageSrc = entry?.image?.src ? getImageUrl(entry.image) : null;

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

  const title = collectionDescription || stripHtml(entry.title);
  const description = collectionDescription || stripHtml(entry.body);

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={description} key="description" />
      <meta
        property="og:url"
        key="ogurl"
        content={`https://web3isgoinggreat.com/single/${entry.readableId}`}
      />
      <meta property="og:title" key="ogtitle" content={title} />
      <meta
        property="og:site_name"
        key="ogsitename"
        content="Web3 is Going Just Great"
      />
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
            property="og:image:alt"
            key="ogimagealt"
            content={entry.image.alt || "Image"}
          />
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
      <link
        rel="alternate"
        type="application/json+oembed"
        href={`https://www.web3isgoinggreat.com/api/oembed?url=https://www.web3isgoinggreat.com/single/${entry.id}&format=json`}
      />
      <link
        rel="alternate"
        type="application/xml+oembed"
        href={`https://www.web3isgoinggreat.com/api/oembed?url=https://www.web3isgoinggreat.com/single/${entry.id}&format=xml`}
      />
      {additionalHead}
    </Head>
  );
}

CustomEntryHead.propTypes = {
  entry: EntryPropType,
  collectionDescription: PropTypes.string,
  additionalHead: PropTypes.node,
};
