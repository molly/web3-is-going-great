import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";

import FILTERS from "../../constants/filters";
import { sentenceCase } from "../../js/utilities";

const MOBILE_BREAKPOINT = 768;

export default function Filters() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < MOBILE_BREAKPOINT
  );
  const [isFilterGroupExpanded, setIsFilterGroupExpanded] = useState(!isMobile);

  const handleResize = useCallback(() => {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      if (!isMobile) {
        setIsMobile(true);
        setIsFilterGroupExpanded(false);
      }
    } else {
      setIsMobile(false);
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

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
          disabled={!isMobile}
          onClick={() => setIsFilterGroupExpanded(!isFilterGroupExpanded)}
        >
          <h2>Filter{!isMobile && ":"}</h2>
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
