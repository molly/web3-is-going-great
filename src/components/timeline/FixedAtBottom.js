import PropTypes from "prop-types";

import { useState, useMemo, useCallback, useEffect } from "react";
import useIsBrowserRendering from "../../hooks/useIsBrowserRendering";

import {
  getLocalStorage,
  LOCALSTORAGE_KEYS,
  setLocalStorage,
} from "../../js/localStorage";
import { fallback } from "../../js/utilities";

import ScrollToTop from "./ScrollToTop";
import GriftCounter from "./GriftCounter";
import SettingsPanel from "./SettingsPanel";
import FireworksAnimation from "./FireworksAnimation";

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
    getLocalStorage(LOCALSTORAGE_KEYS.griftCounterCountUp, false)
  );
  const [isAnimationPaused, setIsAnimationPaused] = useState(
    fallback(
      getLocalStorage(LOCALSTORAGE_KEYS.flamesAnimationPaused, null),
      prefersReducedMotion
    )
  );
  const [isFireworksAnimationPaused, setIsFireworksAnimationPaused] = useState(
    fallback(
      getLocalStorage(LOCALSTORAGE_KEYS.fireworksAnimationPaused, null),
      prefersReducedMotion
    )
  );

  useEffect(() => {
    // Need to update this value once the browser rendering check passes, otherwise this remains null
    // regardless of prefers-reduced-motion settings
    if (prefersReducedMotion !== null) {
      if (isAnimationPaused === null) {
        setIsAnimationPaused(prefersReducedMotion);
      }
      if (isFireworksAnimationPaused === null) {
        setIsFireworksAnimationPaused(prefersReducedMotion);
      }
    }
  }, [prefersReducedMotion, isAnimationPaused, isFireworksAnimationPaused]);

  const fireworksEnabled = false; // Turning this off after $10B milestone, leaving code for the next milestone
  const shouldRenderFireworks = useMemo(
    () =>
      fireworksEnabled &&
      !isFireworksAnimationPaused &&
      !isGriftCounterCountingUp &&
      shouldRenderGriftCounter &&
      isGriftCounterExpanded,
    [
      fireworksEnabled,
      isFireworksAnimationPaused,
      isGriftCounterCountingUp,
      shouldRenderGriftCounter,
      isGriftCounterExpanded,
    ]
  );

  const makeToggleFunction = useCallback(
    (isToggledOn, toggleFn, localStorageKey = null) =>
      () => {
        if (localStorageKey) {
          setLocalStorage(localStorageKey, !isToggledOn);
        }
        toggleFn(!isToggledOn);
      },
    []
  );

  const toggleShowSettingsPanel = useMemo(
    () => makeToggleFunction(isSettingsPanelShown, setIsSettingsPanelShown),
    [makeToggleFunction, isSettingsPanelShown]
  );
  const toggleShowGriftCounter = useMemo(
    () =>
      makeToggleFunction(
        isGriftCounterExpanded,
        setIsGriftCounterExpanded,
        LOCALSTORAGE_KEYS.griftCounterExpanded
      ),
    [makeToggleFunction, isGriftCounterExpanded]
  );
  const toggleIsGriftCounterCountingUp = useMemo(
    () =>
      makeToggleFunction(
        isGriftCounterCountingUp,
        setIsGriftCounterCountingUp,
        LOCALSTORAGE_KEYS.griftCounterCountUp
      ),
    [makeToggleFunction, isGriftCounterCountingUp]
  );
  const toggleFlamesAnimation = useMemo(
    () =>
      makeToggleFunction(
        isAnimationPaused,
        setIsAnimationPaused,
        LOCALSTORAGE_KEYS.flamesAnimationPaused
      ),
    [makeToggleFunction, isAnimationPaused]
  );
  const toggleFireworksAnimation = useMemo(
    () =>
      makeToggleFunction(
        isFireworksAnimationPaused,
        setIsFireworksAnimationPaused,
        LOCALSTORAGE_KEYS.fireworksAnimationPaused
      ),
    [makeToggleFunction, isFireworksAnimationPaused]
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
    <>
      {shouldRenderFireworks && <FireworksAnimation />}
      <div className="fix-at-bottom">
        {!headerInView && <ScrollToTop scrollToTop={scrollToTop} />}
        {renderSettingsButton()}
        {isSettingsPanelShown && (
          <SettingsPanel
            setIsSettingsPanelShown={setIsSettingsPanelShown}
            isAnimationPaused={isAnimationPaused}
            toggleFlamesAnimation={toggleFlamesAnimation}
            isFireworksAnimationPaused={isFireworksAnimationPaused}
            toggleFireworksAnimation={toggleFireworksAnimation}
            fireworksEnabled={fireworksEnabled}
            isGriftCounterExpanded={isGriftCounterExpanded}
            toggleShowGriftCounter={toggleShowGriftCounter}
            isGriftCounterCountingUp={isGriftCounterCountingUp}
            toggleIsGriftCounterCountingUp={toggleIsGriftCounterCountingUp}
          />
        )}
        {shouldRenderGriftCounter && isGriftCounterExpanded && (
          <GriftCounter
            onClick={toggleShowSettingsPanel}
            runningGriftTotal={runningGriftTotal}
            griftTotal={griftTotal}
            isGriftCounterCountingUp={isGriftCounterCountingUp}
            isAnimationPaused={isAnimationPaused}
          />
        )}
      </div>
    </>
  );
}

FixedAtBottom.propTypes = {
  headerInView: PropTypes.bool.isRequired,
  shouldRenderGriftCounter: PropTypes.bool.isRequired,
  scrollToTop: PropTypes.func.isRequired,
  runningGriftTotal: PropTypes.number.isRequired,
  griftTotal: PropTypes.number.isRequired,
};
