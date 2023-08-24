/* eslint-disable @next/next/no-img-element */
import PropTypes from "prop-types";
import { getEntry } from "../../db/singleEntry";
import { EntryPropType } from "../../js/entry";

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
    return (
      <div key={`${tweetNumber}-${imageNumber}`}>
        <h3>{`Tweet #${tweetNumber}, image #${imageNumber}:`}</h3>
        <div className="image-wrapper">
          <a href={imagePath} target="_blank" rel="noreferrer">
            <img src={imagePath} />
          </a>
        </div>
      </div>
    );
  };

  const renderArchiveAssetsColumn = () => {
    if ("archiveTweetAssets" in entry.links[linkIndex]) {
      return (
        <div className="tweet-assets">
          <h2>Tweet images:</h2>
          {entry.links[linkIndex].archiveTweetAssets.map(renderArchiveAsset)}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="content-wrapper">
      <div className="tweet-archive">
        <div className="tweet">
          <h2>Tweet:</h2>
          <div className="image-wrapper">
            <img
              src={`${BUCKET_PATH}/${entryId}/${linkIndex}/screenshot.png`}
            />
          </div>
        </div>
        {renderArchiveAssetsColumn()}
      </div>
    </div>
  );
}

TweetArchive.propTypes = {
  entryId: PropTypes.string.isRequired,
  linkIndex: PropTypes.number.isRequired,
  entry: EntryPropType,
};
