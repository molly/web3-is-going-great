import Header from "../components/timeline/Header";
import Error from "../components/Error";

export default function FiveHundred() {
  return (
    <>
      <Header />
      <div className="timeline-page content-wrapper">
        <article className="single-timeline-wrapper">
          <Error />
        </article>
      </div>
    </>
  );
}
