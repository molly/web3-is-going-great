import React from "react";
import Header from "../timeline/Header";
import Filters from "../timeline/Filters";
import Entry from "../timeline/Entry";
import Footer from "../timeline/Footer";

export default function Timeline() {
  const entries = [];
  return (
    <>
      <Header />
      <Filters />
      <article className="timeline">
        {entries.map((entry) => (
          <Entry key={entry.id} entry={entry} />
        ))}
      </article>
      <Footer />
    </>
  );
}
