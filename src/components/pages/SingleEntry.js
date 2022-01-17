import React from "react";
import { useQuery } from "react-query";
import useGA from "../../js/hooks/useGA";
import useWindowWidth from "../../js/hooks/useWindowWidth";

import { getEntry } from "../../js/db/singleEntry";

import Header from "../timeline/Header";
import BackBar from "../shared/BackBar";
import Entry from "../timeline/Entry";
import Loader from "../shared/Loader";
import Error from "../shared/Error";
import Footer from "../shared/Footer";
import { useParams } from "react-router-dom";

export default function Timeline() {
  useGA();
  const windowWidth = useWindowWidth();
  const { id } = useParams();
  const {
    data: entry,
    isLoading,
    isError,
    error,
    // eslint-disable-next-line no-unused-vars
    ...rest
  } = useQuery("entry", () => getEntry(id), {
    retry: (_, error) => {
      // No point in retrying on 4xxs
      return (
        error.message !== "not-found" && error.message !== "invalid-argument"
      );
    },
  });

  const renderEntry = () => {
    let runningScamTotal = 0;
    return (
      <article className="single-timeline-wrapper">
        <Entry
          className="single even"
          key={entry.id}
          entry={entry}
          windowWidth={windowWidth}
          runningScamTotal={runningScamTotal}
        />
      </article>
    );
  };

  const renderBody = () => {
    if (isLoading) {
      return <Loader />;
    } else if (isError) {
      let message;
      if (
        error.message === "not-found" ||
        error.message === "invalid-argument"
      ) {
        message = "No entry with this ID.";
      }
      return <Error customMessage={message} />;
    }
    return renderEntry();
  };

  return (
    <>
      <Header windowWidth={windowWidth} />
      <BackBar customText="Go to full timeline" />
      <div
        className="timeline-page content-wrapper"
        aria-busy={isLoading}
        aria-live="polite"
      >
        {renderBody()}
      </div>
      <Footer />
    </>
  );
}
