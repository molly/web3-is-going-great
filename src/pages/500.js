import useIsBrowserRendering from "../hooks/useIsBrowserRendering";
import useWindowWidth from "../hooks/useWindowWidth";

import Header from "../components/timeline/Header";
import Error from "../components/Error";

export default function FiveHundred() {
  const isBrowserRendering = useIsBrowserRendering();
  const windowWidth = useWindowWidth();
  return (
    <>
      <Header
        isBrowserRendering={isBrowserRendering}
        windowWidth={windowWidth}
      />
      <div className="timeline-page content-wrapper">
        <article className="single-timeline-wrapper">
          <Error />
        </article>
      </div>
    </>
  );
}
