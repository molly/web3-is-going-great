import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { EntryPropType } from "../../js/entry";

import { formatDollarString, humanizeDate } from "../../js/utilities";
import { getEntriesForLeaderboard } from "../../db/entries";

import Link from "next/link";
import BackBar from "../../components/BackBar";
import SimpleHeader from "../../components/SimpleHeader";
import DatePicker from "../../components/charts/DatePicker";
import { useQuery } from "react-query";

export async function getServerSideProps() {
  return {
    props: {
      initialEntries: await getEntriesForLeaderboard({
        limit: 50,
      }),
    },
  };
}

export default function Top({ initialEntries }) {
  const router = useRouter();
  const [dateRange, setDateRange] = useState(null);

  const getFilteredEntries = useCallback(() => {
    if (dateRange) {
      return getEntriesForLeaderboard(dateRange);
    }
    return getEntriesForLeaderboard();
  }, [dateRange]);

  const queryResult = useQuery(["entries", dateRange], getFilteredEntries, {
    initialData: initialEntries,
    refetchOnMount: false,
  });

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
              {queryResult.data.entries.map((entry) => (
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
  initialEntries: PropTypes.shape({
    entries: PropTypes.arrayOf(EntryPropType).isRequired,
    hasNext: PropTypes.bool.isRequired,
    hasPrev: PropTypes.bool,
  }).isRequired,
};
