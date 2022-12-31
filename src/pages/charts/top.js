import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import PropTypes from "prop-types";
import { EntryPropType } from "../../js/entry";

import { formatDollarString, humanizeDate } from "../../js/utilities";
import { getEntriesForLeaderboard } from "../../db/leaderboard";
import { getDateRangeFromQueryParams } from "../../js/datepicker";
import { format } from "date-fns";

import Link from "next/link";
import BackBar from "../../components/BackBar";
import SimpleHeader from "../../components/SimpleHeader";
import DatePicker from "../../components/charts/DatePicker";
import LeaderboardPaginator from "../../components/charts/LeaderboardPaginator";
import { getMetadata } from "../../db/metadata";

export async function getServerSideProps(context) {
  const { cursor, direction, startDate, endDate, dateRange } = context.query;

  const promises = [
    getDateRangeFromQueryParams({
      startDate,
      endDate,
      dateRange,
    }),
    getMetadata(),
  ];

  const [initialDateRange, metadata] = await Promise.all(promises);
  return {
    props: {
      initialEntries: await getEntriesForLeaderboard({
        cursor,
        direction: direction || "next",
        dateRange: initialDateRange,
      }),
      cursor: cursor || null,
      direction: direction || "next",
      startDate: startDate || null,
      endDate: endDate || null,
      dateRangeParam: dateRange || null,
      scamTotal: metadata.griftTotal,
    },
  };
}

export default function Top({
  initialEntries,
  cursor,
  direction,
  startDate,
  endDate,
  dateRangeParam,
  scamTotal,
}) {
  const router = useRouter();
  const [dateRange, setDateRange] = useState(
    getDateRangeFromQueryParams({
      startDate,
      endDate,
      dateRange: dateRangeParam,
    })
  );

  const queryResult = useQuery(
    ["entries", dateRange, cursor, direction],
    () => getEntriesForLeaderboard({ dateRange, cursor, direction }),
    {
      initialData: initialEntries,
      refetchOnMount: false,
    }
  );

  const renderScamTotal = () => {
    const amount =
      dateRange.shortLabel === "all" ? scamTotal : queryResult.data.scamTotal;
    if (!amount) {
      return null;
    }

    let dateRangeStr = `since ${format(dateRange.startDate, "MMMM d, yyyy")}`;
    if ("shortLabel" in dateRange && /\d{4}/.test(dateRange.shortLabel)) {
      // For the ranges that are a single year
      dateRangeStr = `in ${dateRange.shortLabel}`;
    } else if (!("shortLabel" in dateRange)) {
      dateRangeStr = `from ${dateRange.label}`;
    }

    return (
      <div className="scam-total">{`${formatDollarString(amount, {
        cents: false,
      })} has been lost to hacks, scams, and fraud ${dateRangeStr}`}</div>
    );
  };

  return (
    <>
      <SimpleHeader>Hacks and scams by dollar amount</SimpleHeader>
      <BackBar />
      <div className="content-wrapper">
        <article className="chart-page">
          <div className="table-filters">
            <div>
              <DatePicker dateRange={dateRange} setDateRange={setDateRange} />
            </div>
            <LeaderboardPaginator {...queryResult.data} />
          </div>
          {renderScamTotal()}
          <table className="leaderboard">
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {queryResult.data?.entries?.map((entry) => (
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
          <LeaderboardPaginator {...queryResult.data} standalone={true} />
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
    scamTotal: PropTypes.number,
  }).isRequired,
  cursor: PropTypes.string,
  direction: PropTypes.oneOf(["next", "prev"]),
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  dateRangeParam: PropTypes.string,
  scamTotal: PropTypes.number.isRequired,
};
