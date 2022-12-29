import PropTypes from "prop-types";
import { EntryPropType } from "../../js/entry";

import { getEntries } from "../../db/entries";

import Link from "next/link";
import BackBar from "../../components/BackBar";
import SimpleHeader from "../../components/SimpleHeader";
import { formatDollarString, humanizeDate } from "../../js/utilities";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  return {
    props: {
      entries: await getEntries({ limit: 50, orderByField: "scamTotal" }),
    },
  };
}

export default function Top({ entries }) {
  const router = useRouter();
  return (
    <>
      <SimpleHeader>Hacks and scams by dollar amount</SimpleHeader>
      <BackBar />
      <div className="content-wrapper">
        <article className="generic-page chart-page">
          <table className="leaderboard">
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {entries.entries.map((entry) => (
                <tr
                  key={entry.id}
                  onClick={() => router.push(`/?id=${entry.readableId}`)}
                >
                  <td>
                    <Link href={`/?id=${entry.readableId}`}>
                      <span
                        dangerouslySetInnerHTML={{ __html: entry.shortTitle }}
                      />
                    </Link>
                  </td>
                  <td>{humanizeDate(entry.date)}</td>
                  <td className="number">
                    {formatDollarString(entry.scamTotal, { cents: false })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
    </>
  );
}

Top.propTypes = {
  entries: PropTypes.shape({
    entries: PropTypes.arrayOf(EntryPropType).isRequired,
    hasNext: PropTypes.bool.isRequired,
    hasPrev: PropTypes.bool,
  }).isRequired,
};
