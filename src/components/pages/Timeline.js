import React, { useState } from "react";
import { useQuery } from "react-query";
import { getEntries } from "../../js/functions";

import Header from "../timeline/Header";
import Filters from "../timeline/Filters";
import Entry from "../timeline/Entry";
import Loader from "../timeline/Loader";
import Footer from "../timeline/Footer";

export default function Timeline() {
  const [filters, setFilters] = useState({
    limit: 2,
    theme: [],
    tech: [],
    blockchain: [],
  });

  const { isLoading, isError, data } = useQuery("entries", async () =>
    getEntries(filters)
  );

  const renderEntries = () => {
    return (
      <article className="timeline">
        {data.map((entry, ind) => {
          let className = ind % 2 === 0 ? "even" : "odd";
          if (ind === 0) {
            className += " first";
          }
          return <Entry key={entry.id} entry={entry} className={className} />;
        })}
      </article>
    );
  };

  const renderBody = () => {
    if (isLoading) {
      return <Loader />;
    } else if (isError) {
      return <span>Error</span>;
    }
    return renderEntries();
  };

  return (
    <>
      <Header />
      <Filters filters={filters} setFilters={setFilters} />
      <div className="content-wrapper" aria-busy={isLoading}>
        {renderBody()}
      </div>
      <Footer />
    </>
  );
}
