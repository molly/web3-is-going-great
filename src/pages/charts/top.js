import { useRouter } from "next/router";
import { useState } from "react";
import PropTypes from "prop-types";
import { EntryPropType } from "../../js/entry";

import { formatDollarString, humanizeDate } from "../../js/utilities";
import { getEntriesForLeaderboard } from "../../db/entries";

import Link from "next/link";
import BackBar from "../../components/BackBar";
import SimpleHeader from "../../components/SimpleHeader";
import DatePicker from "../../components/DatePicker";

export async function getServerSideProps() {
  return {
    props: {
      entries: await getEntriesForLeaderboard({
        limit: 50,
        omitLongRunningScams: true,
      }),
    },
  };
}

export default function Top({ entries }) {
  const router = useRouter();
  const [dateRange, setDateRange] = useState(null);

  return (
    <>
      <SimpleHeader>Hacks and scams by dollar amount</SimpleHeader>
      <BackBar />
      <div className="content-wrapper">
        <article className="chart-page">
          <div className="table-filters">
            <DatePicker setDateRange={setDateRange} />
          </div>
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
                    {formatDollarString(entry.scamAmountDetails.total, {
                      cents: false,
                    })}
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
