import PropTypes from "prop-types";
import useGA from "../../hooks/useGA";
import useWindowWidth from "../../hooks/useWindowWidth";

import { getEntry } from "../../db/singleEntry";
import { getGlossaryEntries } from "../../db/glossary";

import Header from "../../components/timeline/Header";
import BackBar from "../../components/BackBar";
import Entry from "../../components/timeline/Entry";
import Footer from "../../components/Footer";
import Error from "../../components/Error";
import { EntryPropType } from "../../js/entry";
import CustomEntryHead from "../../components/CustomEntryHead";
import { getMetadata } from "../../db/metadata";

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

export default function SingleEntry({
  entry,
  allCollections,
  glossary,
  error = null,
}) {
  useGA();

  const windowWidth = useWindowWidth();

  const renderEntry = () => {
    return (
      <article className="single-timeline-wrapper">
        <Entry
          className="single even"
          key={entry.id}
          entry={entry}
          windowWidth={windowWidth}
          allCollections={allCollections}
          glossary={glossary}
        />
      </article>
    );
  };

  const renderBody = () => {
    if (!entry) {
      let message;
      if (error === 404) {
        message = "No entry with this ID.";
      } else {
        message = "Something went wrong.";
      }
      return <Error customMessage={message} />;
    }
    return renderEntry();
  };

  return (
    <>
      <CustomEntryHead entry={entry} />
      <Header windowWidth={windowWidth} />
      <BackBar customText="Go to full timeline" />
      <div className="timeline-page content-wrapper">{renderBody()}</div>
      <Footer />
    </>
  );
}

SingleEntry.propTypes = {
  entry: EntryPropType,
  error: PropTypes.oneOf([404, 500]),
  allCollections: PropTypes.object.isRequired,
  glossary: PropTypes.object.isRequired,
};
