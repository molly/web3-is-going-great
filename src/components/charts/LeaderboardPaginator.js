import PropTypes from "prop-types";
import { EntryPropType } from "../../js/entry";
import Link from "next/link";

export default function LeaderboardPaginator({ hasPrev, hasNext, entries }) {
  return (
    <div className="leaderboard-paginator">
      {hasPrev ? (
        <Link
          href={`/charts/top?cursor=${entries[0].scamAmountDetails.total}&direction=prev`}
        >
          <i className="fas fa-chevron-left" />
        </Link>
      ) : (
        <span />
      )}
      {hasNext ? (
        <Link
          href={`/charts/top?cursor=${
            entries[entries.length - 1].scamAmountDetails.total
          }&direction=next`}
        >
          <i className="fas fa-chevron-right" />
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
LeaderboardPaginator.propTypes = {
  entries: PropTypes.arrayOf(EntryPropType).isRequired,
  hasNext: PropTypes.bool.isRequired,
  hasPrev: PropTypes.bool,
};
