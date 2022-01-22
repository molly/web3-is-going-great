import Header from "../components/timeline/Header";
import Error from "../components/Error";

export default function FourOhFour() {
  return (
    <>
      <Header />
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
