/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import PropTypes from "prop-types";
import { getEntry } from "../../db/singleEntry";
import { EntryPropType } from "../../js/entry";

import CustomHead from "../../components/CustomHead";
import BackBar from "../../components/BackBar";
import SimpleHeader from "../../components/SimpleHeader";
import Footer from "../../components/Footer";

const BUCKET_PATH = "https://storage.googleapis.com/tweet-archives";

export async function getServerSideProps(context) {
  const props = {};
  const id = context.params.id;
  if (id.length < 2) {
    props.error = 404;
    return { props };
  }

  [props.entryId, props.linkIndex] = id;
  props.linkIndex = parseInt(props.linkIndex, 10);
  try {
    props.entry = await getEntry(props.entryId);
  } catch (err) {
    if (err.message === "not-found" || err.message === "invalid-argument") {
      props.error = 404;
    } else {
      props.error = 500;
    }
  }
  return { props };
}

export default function TweetArchive({ entryId, linkIndex, entry }) {
  const link = entry.links[linkIndex];

  const renderArchiveImage = (tweetIndex, imageIndex) => {
    const imagePath = `${BUCKET_PATH}/${entryId}/${linkIndex}/assets/${tweetIndex}-${imageIndex}.webp`;
    const archivesForTweet = link.archiveTweetAssets[tweetIndex];
    const imageIndexStr = imageIndex.toString();

    let alt = "Image";
    if ("alt" in archivesForTweet && imageIndexStr in archivesForTweet["alt"]) {
      alt = archivesForTweet["alt"][imageIndexStr];
    }

    return (
      <div key={`${tweetIndex}-${imageIndex}`}>
        <h4>{`Image #${parseInt(imageIndex, 10) + 1}:`}</h4>
        <div className="image-wrapper">
          <a href={imagePath} target="_blank" rel="noreferrer">
            <img src={imagePath} alt={alt} />
          </a>
        </div>
      </div>
    );
  };

  const renderArchiveImages = (tweetIndex) => {
    const archivesForTweet = link.archiveTweetAssets[tweetIndex];
    if ("images" in archivesForTweet) {
      let images = [];
      for (let i = 0; i < archivesForTweet.images; i++) {
        images.push(renderArchiveImage(tweetIndex, i));
      }
      return images;
    }
  };

  const renderArchiveLinks = (tweetIndex) => {
    const archivesForTweet = link.archiveTweetAssets[tweetIndex];
    if ("links" in archivesForTweet) {
      return (
        <>
          <h4>Links:</h4>
          <ul>
            {archivesForTweet.links.map((href) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noreferrer">
                  {href}
                </a>
              </li>
            ))}
          </ul>
        </>
      );
    }
  };

  const renderArchiveAssetsForTweet = (tweetIndex) => {
    return (
      <Fragment key={tweetIndex}>
        <h3>{`Tweet #${parseInt(tweetIndex, 10) + 1}`}</h3>
        {renderArchiveImages(tweetIndex)}
        {renderArchiveLinks(tweetIndex)}
      </Fragment>
    );
  };

  const renderArchiveAssetsColumn = () => {
    if ("archiveTweetAssets" in link) {
      const tweetKeys = Object.keys(link.archiveTweetAssets);
      tweetKeys.sort();
      return (
        <div className="tweet-assets">
          {tweetKeys.map(renderArchiveAssetsForTweet)}
        </div>
      );
    }
    return null;
  };

  const screenshotPath = `${BUCKET_PATH}/${entryId}/${linkIndex}/screenshot.webp`;
  return (
    <>
      <CustomHead
        title="Archived tweet – Web3 is Going Just Great"
        description="Archived tweet used as a source in Web3 is Going Just Great"
        urlPath={`archive/${entryId}/${linkIndex}`}
      />
      <SimpleHeader>Archived tweet</SimpleHeader>
      <BackBar />
      <div className="content-wrapper">
        <div className="tweet-archive">
          <div className="tweet">
            <h2>
              <a href={link.href} target="_blank" rel="noreferrer">
                <span
                  dangerouslySetInnerHTML={{
                    __html: link.linkText,
                  }}
                />
              </a>
              {link.extraText && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: link.extraText,
                  }}
                />
              )}
              :
            </h2>
            <div className="image-wrapper">
              <a href={screenshotPath} target="_blank" rel="noopener">
                <img src={screenshotPath} alt={link.archiveTweetAlt} />
              </a>
            </div>
          </div>
          {renderArchiveAssetsColumn()}
        </div>
      </div>
      <Footer />
    </>
  );
}

TweetArchive.propTypes = {
  entryId: PropTypes.string.isRequired,
  linkIndex: PropTypes.number.isRequired,
  entry: EntryPropType,
};
