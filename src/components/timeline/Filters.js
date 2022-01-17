import { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import FILTERS, { EMPTY_FILTERS_STATE } from "../../constants/filters";
import { sentenceCase } from "../../js/utilities";

export default function Filters({ filters, setFilters, windowWidth }) {
  const [isFilterGroupExpanded, setIsFilterGroupExpanded] = useState(false);

  const renderFilterGroup = (filter) => {
    return (
      <Select
        key={filter}
        className="filter-select"
        options={Object.entries(FILTERS[filter]).map(([key, value]) => ({
          value: key,
          label: value,
        }))}
        isClearable={true}
        isMulti={true}
        placeholder={sentenceCase(filter)}
        styles={{
          menu: (provided) => ({ ...provided, width: "200px" }),
        }}
        onChange={(values) => {
          setFilters({
            ...EMPTY_FILTERS_STATE,
            [filter]: values.map((v) => v.value),
          });
        }}
        value={filters[filter].map((v) => ({
          value: v,
          label: FILTERS[filter][v],
        }))}
      />
    );
  };

  return (
    <div className="timeline-filter-wrapper">
      <section className="timeline-filter">
        <button
          className="expand-filters-button"
          aria-controls="filters-expandable"
          aria-expanded={windowWidth === "lg" ? null : isFilterGroupExpanded}
          disabled={windowWidth === "lg"}
          onClick={() => setIsFilterGroupExpanded(!isFilterGroupExpanded)}
        >
          <h2>Filter{windowWidth !== "sm" && ":"}</h2>
          <i className="fas fa-caret-down"></i>
        </button>
        <div
          id="filters-expandable"
          className={`filters-expandable ${
            isFilterGroupExpanded && "expanded"
          }`}
        >
          {Object.keys(FILTERS).map(renderFilterGroup)}
          <button
            className="sort-button"
            onClick={() =>
              setFilters({
                ...filters,
                sort: filters.sort === "Ascending" ? "Descending" : "Ascending",
              })
            }
          >
            <i
              className={`fas fa-caret-${
                filters.sort === "Ascending" ? "up" : "down"
              }`}
              aria-hidden={true}
            ></i>{" "}
            {filters.sort}
          </button>
        </div>
      </section>
    </div>
  );
}

Filters.propTypes = {
  filters: PropTypes.shape({
    theme: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(FILTERS.theme)))
      .isRequired,
    tech: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(FILTERS.tech)))
      .isRequired,
    blockchain: PropTypes.arrayOf(
      PropTypes.oneOf(Object.keys(FILTERS.blockchain))
    ).isRequired,
    sort: PropTypes.string.isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  windowWidth: PropTypes.oneOf(["sm", "md", "lg"]),
};
