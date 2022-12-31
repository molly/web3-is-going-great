import useIsBrowserRendering from "../hooks/useIsBrowserRendering";

import Header from "../components/timeline/Header";
import Error from "../components/Error";
import useWindowWidth from "../hooks/useWindowWidth";

export default function FourOhFour() {
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
          <Error
            customMessage={
              <>
                <p>Page not found.</p>
                <p>
                  If you think something is supposed to be here, please let
                  Molly know there's an issue.
                </p>
              </>
            }
          />
        </article>
      </div>
    </>
  );
}
