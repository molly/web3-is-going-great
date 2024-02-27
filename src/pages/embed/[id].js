import PropTypes from "prop-types";
import useGA from "../../hooks/useGA";
import useWindowWidth from "../../hooks/useWindowWidth";

import { getGlossaryEntries } from "../../db/glossary";
import { getEntry } from "../../db/singleEntry";

import CustomEntryHead from "../../components/CustomEntryHead";
import Error from "../../components/Error";
import Entry from "../../components/timeline/Entry";
import { getMetadata } from "../../db/metadata";
import { EntryPropType } from "../../js/entry";

export async function getServerSideProps(context) {
  const props = { entry: null };
  try {
    props.entry = await getEntry(context.params.id);
  } catch (err) {
    if (err.message === "not-found" || err.message === "invalid-argument") {
      props.error = 404;
    } else {
      props.error = 500;
    }
  }
  props.glossary = await getGlossaryEntries();
  const metadata = await getMetadata();
  props.allCollections = metadata.collections;
  return { props };
}

export default function EmbedEntry({
  entry,
  allCollections,
  glossary,
  error = null,
}) {
  useGA();

  const windowWidth = useWindowWidth();

  if (!entry) {
    let message;
    if (error === 404) {
      message = "No entry with this ID.";
    } else {
      message = "Something went wrong.";
    }
    return <Error customMessage={message} />;
  }
  return (
    <>
      <CustomEntryHead entry={entry} />
      <article className="embed-wrapper">
        <Entry
          className="single even"
          key={entry.id}
          entry={entry}
          windowWidth={windowWidth}
          allCollections={allCollections}
          glossary={glossary}
        />
      </article>
    </>
  );
}

EmbedEntry.propTypes = {
  entry: EntryPropType,
  error: PropTypes.oneOf([404, 500]),
  allCollections: PropTypes.object.isRequired,
  glossary: PropTypes.object.isRequired,
};
