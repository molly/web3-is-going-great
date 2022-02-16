import PropTypes from "prop-types";
import { useState, useMemo, useCallback } from "react";
import useIsBrowserRendering from "../../hooks/useIsBrowserRendering";

import {
  getLocalStorage,
  LOCALSTORAGE_KEYS,
  setLocalStorage,
} from "../../js/localStorage";

import ScrollToTop from "./ScrollToTop";
import GriftCounter from "./GriftCounter";
import SettingsPanel from "./SettingsPanel";

export default function FixedAtBottom({
  headerInView,
  shouldRenderGriftCounter,
  scrollToTop,
  runningGriftTotal,
  griftTotal,
}) {
  const isBrowserRendering = useIsBrowserRendering();
  const prefersReducedMotion = useMemo(() => {
    if (isBrowserRendering) {
      const result = window.matchMedia("(prefers-reduced-motion: reduce)");
      return result && result.matches;
    }
    return null;
  }, [isBrowserRendering]);

  const [isSettingsPanelShown, setIsSettingsPanelShown] = useState(false);
  const [isGriftCounterExpanded, setIsGriftCounterExpanded] = useState(
    getLocalStorage(LOCALSTORAGE_KEYS.griftCounterExpanded, true)
  );
  const [isGriftCounterCountingUp, setIsGriftCounterCountingUp] = useState(
    getLocalStorage(LOCALSTORAGE_KEYS.griftCounterCountUp, true)
  );
  const [isAnimationPaused, setIsAnimationPaused] = useState(
    getLocalStorage(LOCALSTORAGE_KEYS.flamesAnimationPaused, null) ||
      prefersReducedMotion ||
      null
  );

  const makeToggleFunction = useCallback(
    (isToggledOn, toggleFn, localStorageKey = null) =>
      () => {
        if (isToggledOn) {
          if (localStorageKey) {
            setLocalStorage(localStorageKey, false);
          }
          toggleFn(false);
        } else {
          if (localStorageKey) {
            setLocalStorage(localStorageKey, true);
          }
          toggleFn(true);
        }
      },
    []
  );

  const toggleShowSettingsPanel = makeToggleFunction(
    isSettingsPanelShown,
    setIsSettingsPanelShown
  );
  const toggleShowGriftCounter = makeToggleFunction(
    isGriftCounterExpanded,
    setIsGriftCounterExpanded,
    LOCALSTORAGE_KEYS.griftCounterExpanded
  );
  const toggleIsGriftCounterCountingUp = makeToggleFunction(
    isGriftCounterCountingUp,
    setIsGriftCounterCountingUp,
    LOCALSTORAGE_KEYS.griftCounterCountUp
  );
  const toggleFlamesAnimation = makeToggleFunction(
    isAnimationPaused,
    setIsAnimationPaused,
    LOCALSTORAGE_KEYS.flamesAnimationPaused
  );

  if (!isBrowserRendering) {
    return null;
  }

  const renderSettingsButton = () => (
    <button
      onClick={toggleShowSettingsPanel}
      title={`${isSettingsPanelShown ? "Hide" : "Show"} settings panel`}
      className="fixed-at-bottom-button"
    >
      <i className="fas fa-gear" aria-hidden={true}>
        <span className="sr-only">
          {`${isSettingsPanelShown ? "Hide" : "Show"} settings panel`}
        </span>
      </i>
    </button>
  );

  return (
    <div className="fix-at-bottom">
      {!headerInView && <ScrollToTop scrollToTop={scrollToTop} />}
      {renderSettingsButton()}
      {isSettingsPanelShown && (
        <SettingsPanel
          setIsSettingsPanelShown={setIsSettingsPanelShown}
          isAnimationPaused={isAnimationPaused}
          toggleFlamesAnimation={toggleFlamesAnimation}
          isGriftCounterExpanded={isGriftCounterExpanded}
          toggleShowGriftCounter={toggleShowGriftCounter}
          isGriftCounterCountingUp={isGriftCounterCountingUp}
          toggleIsGriftCounterCountingUp={toggleIsGriftCounterCountingUp}
        />
      )}
      {shouldRenderGriftCounter && isGriftCounterExpanded && (
        <GriftCounter
          runningGriftTotal={runningGriftTotal}
          griftTotal={griftTotal}
          isGriftCounterCountingUp={isGriftCounterCountingUp}
          isAnimationPaused={isAnimationPaused}
        />
      )}
    </div>
  );
}

FixedAtBottom.propTypes = {
  headerInView: PropTypes.bool.isRequired,
  shouldRenderGriftCounter: PropTypes.bool.isRequired,
  scrollToTop: PropTypes.func.isRequired,
  runningGriftTotal: PropTypes.number.isRequired,
  griftTotal: PropTypes.number.isRequired,
};
