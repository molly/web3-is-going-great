import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { EMPTY_FILTERS_STATE } from "../../constants/filters";

import FILTERS from "../../constants/filters";
import { sentenceCase } from "../../js/utilities";
import { usePrevious } from "../../js/usePrevious";

export default function Filters({ filters, setFilters, windowWidth }) {
  const [isFilterGroupExpanded, setIsFilterGroupExpanded] = useState(
    windowWidth !== "sm"
  );

  const previousWidth = usePrevious(windowWidth);

  useEffect(() => {
    if (
      !isFilterGroupExpanded &&
      previousWidth !== "sm" &&
      windowWidth === "sm"
    ) {
      setIsFilterGroupExpanded(false);
    }
  }, [isFilterGroupExpanded, previousWidth, windowWidth]);

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
          aria-expanded={isFilterGroupExpanded}
          disabled={windowWidth !== "sm"}
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
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  windowWidth: PropTypes.oneOf(["sm", "md", "lg"]),
};
