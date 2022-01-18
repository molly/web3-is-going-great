import PropTypes from "prop-types";
import Header from "../components/timeline/Header";
import Entry from "../components/timeline/Entry";
import Error from "../components/Error";

import { getAllEntries } from "../db/entries";
import { EntryPropType } from "../js/entry";

export async function getServerSideProps() {
  const props = { entries: null };
  try {
    const entries = await getAllEntries();
    props.entries = entries;
  } catch (err) {
    // pass and leave entries null
  }

  return { props };
}

export default function Web1({ entries }) {
  const renderEntries = () =>
    entries.map((entry) => (
      <Entry key={entry.id} entry={entry} className="single" />
    ));

  return (
    <>
      <Header nojs={true} i />
      <div className="timeline-page content-wrapper">
        <article className="single-timeline-wrapper">
          {entries ? renderEntries() : <Error />}
        </article>
      </div>
    </>
  );
}

Web1.propTypes = {
  entries: PropTypes.arrayOf(EntryPropType),
};
