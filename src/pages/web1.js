import PropTypes from "prop-types";
import Link from "next/link";

import Header from "../components/timeline/Header";
import Entry from "../components/timeline/Entry";
import Error from "../components/Error";

import { getAllEntries } from "../db/entries";
import { EntryPropType } from "../js/entry";

export async function getServerSideProps(context) {
  let props = { entries: null, hasPrev: false, hasNext: false };
  const { cursor, direction } = context.query;
  try {
    props = await getAllEntries({ cursor, direction: direction || "next" });
  } catch (err) {
    // pass and leave entries null
    console.error(err);
  }
  return { props };
}

export default function Web1({ entries, hasPrev, hasNext }) {
  const renderEntries = () =>
    entries.map((entry) => (
      <Entry key={entry.id} entry={entry} className="single" />
    ));

  const renderNavigation = () => {
    return (
      <nav className="navigation-bar">
        <div className="contents flex-between">
          {hasPrev ? (
            <Link href={`/web1?cursor=${entries[0].id}&direction=prev`}>
              <a>← Previous</a>
            </Link>
          ) : (
            <span />
          )}
          {hasNext ? (
            <Link
              href={`/web1?cursor=${
                entries[entries.length - 1].id
              }&direction=next`}
            >
              <a>→ Next</a>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    );
  };

  return (
    <>
      <Header nojs={true} />
      {renderNavigation()}
      <div className="timeline-page content-wrapper">
        <article className="single-timeline-wrapper">
          {entries ? renderEntries() : <Error />}
        </article>
      </div>
      {renderNavigation()}
    </>
  );
}

Web1.propTypes = {
  entries: PropTypes.arrayOf(EntryPropType),
  hasPrev: PropTypes.bool,
  hasNext: PropTypes.bool,
};
