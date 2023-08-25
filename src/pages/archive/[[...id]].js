/* eslint-disable @next/next/no-img-element */
import PropTypes from "prop-types";
import { getEntry } from "../../db/singleEntry";
import { EntryPropType } from "../../js/entry";

import CustomHead from "../../components/CustomHead";
import BackBar from "../../components/BackBar";
import SimpleHeader from "../../components/SimpleHeader";
import Footer from "../../components/Footer";

const BUCKET_PATH = "https://storage.cloud.google.com/tweet-archives";

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
  const renderArchiveAsset = (asset) => {
    const match = asset.match(/^(\d+)-(\d+)\./);
    const tweetNumber = parseInt(match[1], 10) + 1;
    const imageNumber = parseInt(match[2], 10) + 1;
    const imagePath = `${BUCKET_PATH}/${entryId}/${linkIndex}/assets/${asset}`;

    let alt = "Image";
    if ("archiveTweetAssetsAlt" in entry.links[linkIndex]) {
      alt = entry.links[linkIndex]["archiveTweetAssetsAlt"][asset];
    }

    return (
      <div key={`${tweetNumber}-${imageNumber}`}>
        <h3>{`Tweet #${tweetNumber}, image #${imageNumber}:`}</h3>
        <div className="image-wrapper">
          <a href={imagePath} target="_blank" rel="noreferrer">
            <img src={imagePath} alt={alt} />
          </a>
        </div>
      </div>
    );
  };

  const renderArchiveAssetsColumn = () => {
    if ("archiveTweetAssets" in entry.links[linkIndex]) {
      return (
        <div className="tweet-assets">
          <h2>Images from tweet:</h2>
          {entry.links[linkIndex].archiveTweetAssets.map(renderArchiveAsset)}
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
              <a
                href={entry.links[linkIndex].href}
                target="_blank"
                rel="noreferrer"
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: entry.links[linkIndex].linkText,
                  }}
                />
              </a>
              {entry.links[linkIndex].extraText && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: entry.links[linkIndex].extraText,
                  }}
                />
              )}
              :
            </h2>
            <div className="image-wrapper">
              <a href={screenshotPath} target="_blank" rel="noopener">
                <img
                  src={screenshotPath}
                  alt={entry.links[linkIndex].archiveTweetAlt}
                />
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
