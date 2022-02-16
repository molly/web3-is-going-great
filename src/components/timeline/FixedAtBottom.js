import PropTypes from "prop-types";
import useIsBrowserRendering from "../../hooks/useIsBrowserRendering";

import ScrollToTop from "./ScrollToTop";
import GriftCounter from "./GriftCounter";

export default function FixedAtBottom({
  headerInView,
  shouldRenderGriftCounter,
  scrollToTop,
  currentRunningScamTotal,
}) {
  const isBrowserRendering = useIsBrowserRendering();

  if (!isBrowserRendering) {
    return null;
  }

  return (
    <div className="fix-at-bottom">
      {!headerInView && <ScrollToTop scrollToTop={scrollToTop} />}
      {shouldRenderGriftCounter && (
        <GriftCounter total={currentRunningScamTotal} />
      )}
    </div>
  );
}

FixedAtBottom.propTypes = {
  headerInView: PropTypes.bool.isRequired,
  shouldRenderGriftCounter: PropTypes.bool.isRequired,
  scrollToTop: PropTypes.func.isRequired,
  currentRunningScamTotal: PropTypes.number.isRequired,
};
