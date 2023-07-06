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
import CustomHead from "../../components/CustomHead";
import BackBar from "../../components/BackBar";
import SimpleHeader from "../../components/SimpleHeader";
import DatePicker from "../../components/charts/DatePicker";
import LeaderboardPaginator from "../../components/charts/LeaderboardPaginator";
import { getMetadata } from "../../db/metadata";

export async function getServerSideProps(context) {
  const {
    cursor,
    direction,
    startDate,
    endDate,
    dateRange,
    sortKey,
    sortDirection,
  } = context.query;

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
        sortKey,
        sortDirection,
      }),
      cursor: cursor || null,
      direction: direction || "next",
      startDate: startDate || null,
      endDate: endDate || null,
      dateRangeParam: dateRange || null,
      scamTotal: metadata.griftTotal,
      sortKey: sortKey || null,
      sortDirection: sortDirection || null,
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
  sortKey,
  sortDirection,
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
    ["entries", dateRange, cursor, direction, sortKey, sortDirection],
    () =>
      getEntriesForLeaderboard({
        dateRange,
        cursor,
        direction,
        sortKey,
        sortDirection,
      }),
    {
      initialData: initialEntries,
      refetchOnMount: false,
    }
  );

  const sortTable = (newSortKey) => {
    const newQuery = { ...router.query };
    if ("cursor" in newQuery) {
      delete newQuery.cursor;
    }

    if (newSortKey !== "amount") {
      // Amount is the default sortKey so no need to explicitly set it
      newQuery.sortKey = newSortKey;
    } else {
      delete newQuery.sortKey;
    }

    if (sortKey === newSortKey || (newSortKey === "amount" && !sortKey)) {
      // Key's staying the same, direction's changing
      if (sortDirection === "asc") {
        delete newQuery.sortDirection;
      } else {
        newQuery.sortDirection = "asc";
      }
    } else {
      // Key changed
      delete newQuery.sortDirection;
    }
    router.push({ query: newQuery });
  };

  const renderScamTotal = () => {
    const amount =
      dateRange.shortLabel === "all" ? scamTotal : queryResult.data.scamTotal;
    if (!amount) {
      return null;
    }

    let dateRangeStr = `since ${format(dateRange.startDate, "MMMM d, yyyy")}`;
    if (
      "shortLabel" in dateRange &&
      /\d{4}/.test(dateRange.shortLabel) &&
      dateRange.shortLabel !== `${new Date().getFullYear()}`
    ) {
      // For the ranges that are a single year.
      // If it is the current year, we still want to use the "since" wording from above
      // to convey that it is an ongoing time range.
      dateRangeStr = `in ${dateRange.shortLabel}`;
    } else if (!("shortLabel" in dateRange)) {
      dateRangeStr = `from ${dateRange.label}`;
    }

    return (
      <div className="scam-total">{`${formatDollarString(amount, {
        cents: false,
      })} has been lost to hacks, scams, fraud, and other disasters in ${dateRangeStr}.`}</div>
    );
  };

  const renderColumnSortButton = (colSortKey) => {
    let iconName = "sort";
    let newDirection = "desc";
    if (colSortKey === "date") {
      if (sortKey === "date") {
        if (sortDirection === "asc") {
          iconName = "sort-down";
        } else {
          iconName = "sort-up";
          newDirection = "asc";
        }
      }
    } else {
      if (!sortKey) {
        if (sortDirection === "asc") {
          iconName = "sort-down";
        } else {
          iconName = "sort-up";
          newDirection = "asc";
        }
      }
    }
    const icon = (
      <>
        <i className={`fas fa-${iconName}`}></i>
        <span className="sr-only">{`Sort table by ${
          sortKey || "amount"
        }, ${newDirection}ending`}</span>
      </>
    );
    return <button onClick={() => sortTable(colSortKey)}>{icon}</button>;
  };

  const renderHeaderInfoIcon = (faqAnchor) => {
    return (
      <Link href={`/faq${faqAnchor ? `#${faqAnchor}` : ""}`} target="_blank">
        <i className="fas fa-circle-info" aria-hidden={true} />
        <span className="sr-only">More info</span>
      </Link>
    );
  };

  const renderEntryScamAmount = (scamAmountDetails) => {
    if ("textOverride" in scamAmountDetails) {
      return (
        <span
          dangerouslySetInnerHTML={{ __html: scamAmountDetails.textOverride }}
        />
      );
    } else if ("lowerBound" in scamAmountDetails) {
      return `${formatDollarString(scamAmountDetails.lowerBound, {
        cents: false,
      })} – ${formatDollarString(scamAmountDetails.upperBound, {
        cents: false,
      })}`;
    } else {
      return formatDollarString(scamAmountDetails.preRecoveryAmount, {
        cents: false,
      });
    }
  };

  const renderTableBody = () => {
    if (queryResult.isFetching) {
      return (
        <tbody>
          <tr className="loading-row">
            <td colSpan={4}>
              <span className="loading-wrapper">
                <span
                  className="loading-animation"
                  role="alert"
                  aria-label="Loading"
                />
              </span>
            </td>
          </tr>
        </tbody>
      );
    } else if (queryResult.data.entries.length === 0) {
      return (
        <tbody>
          <tr className="loading-row">
            <td colSpan={4} className="empty-row">
              There are no entries in this time period.
            </td>
          </tr>
        </tbody>
      );
    }
    return (
      <tbody>
        {queryResult.data?.entries?.map((entry) => (
          <tr
            key={entry.id}
            onClick={() => router.push(`/?id=${entry.readableId}`)}
          >
            <td>
              <Link href={`/?id=${entry.readableId}`}>
                <span dangerouslySetInnerHTML={{ __html: entry.shortTitle }} />
              </Link>
            </td>
            <td>{humanizeDate(entry.date)}</td>
            <td className="number">
              {renderEntryScamAmount(entry.scamAmountDetails)}
            </td>
            <td className="number">
              {"recovered" in entry.scamAmountDetails &&
                formatDollarString(entry.scamAmountDetails.recovered, {
                  cents: false,
                })}
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <>
      <CustomHead
        title="Leaderboard – Web3 is Going Just Great"
        description="List of hacks and scams by dollar amount"
        urlPath="chart/top"
      />
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
                <th className="date-column">
                  Date {renderColumnSortButton("date")}
                </th>
                <th className="amount-column">
                  Amount {renderHeaderInfoIcon("dollar-amounts")}{" "}
                  {renderColumnSortButton("amount")}
                </th>
                <th className="recovered-column">
                  Recovered {renderHeaderInfoIcon("recovered")}
                </th>
              </tr>
            </thead>
            {renderTableBody()}
          </table>
          <LeaderboardPaginator
            {...queryResult.data}
            standalone={true}
            sortKey={sortKey}
          />
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
  sortKey: PropTypes.oneOf(["date"]), // If undefined, table is sorted by amount
  sortDirection: PropTypes.oneOf(["asc", "desc"]), // If undefined, default to desc
};
