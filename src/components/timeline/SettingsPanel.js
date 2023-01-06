import PropTypes from "prop-types";
import { useAppState } from "../../context/AppContext";
import SettingsCheckbox from "../Checkbox";

export default function SettingsPanel({
  setIsSettingsPanelShown,
  isAnimationPaused,
  toggleFlamesAnimation,
  isGriftCounterExpanded,
  toggleShowGriftCounter,
  isGriftCounterCountingUp,
  toggleIsGriftCounterCountingUp,
}) {
  const { useDarkMode, useSansSerif, toggleUseSansSerif, toggleDarkMode } =
    useAppState();

  return (
    <div className="settings-panel">
      <div className="header-and-close">
        <h2>Settings</h2>
        <button onClick={() => setIsSettingsPanelShown(false)}>
          <i className="fas fa-xmark" aria-hidden={true}></i>
          <span className="sr-only">Close settings panel</span>
        </button>
      </div>
      <h3>Appearance</h3>
      <div className="settings-section">
        <SettingsCheckbox
          id="use-sans-serif-font"
          checked={!!useSansSerif}
          toggleCheckbox={toggleUseSansSerif}
        >
          Use sans-serif font
        </SettingsCheckbox>
        <SettingsCheckbox
          id="use-dark-mode"
          checked={!!useDarkMode}
          toggleCheckbox={toggleDarkMode}
        >
          Force dark mode
        </SettingsCheckbox>
      </div>
      <h3>Grift counter</h3>
      <div className="settings-section">
        <SettingsCheckbox
          id="show-grift-counter"
          checked={isGriftCounterExpanded}
          toggleCheckbox={toggleShowGriftCounter}
        >
          Show grift counter
        </SettingsCheckbox>
        <SettingsCheckbox
          id="animate-flames"
          checked={!isAnimationPaused}
          toggleCheckbox={toggleFlamesAnimation}
        >
          Animate flames
        </SettingsCheckbox>
        <div className="radio-group">
          <h4>Grift counter direction</h4>
          <div className="input-group">
            <input
              type="radio"
              id="count-up"
              name="grift-direction"
              value="count-up"
              checked={isGriftCounterCountingUp}
              onChange={toggleIsGriftCounterCountingUp}
            />
            <label htmlFor="count-up">Start at $0 and add as you scroll</label>
          </div>
          <div className="input-group">
            <input
              type="radio"
              id="count-down"
              name="grift-direction"
              value="count-down"
              checked={!isGriftCounterCountingUp}
              onChange={toggleIsGriftCounterCountingUp}
            />
            <label htmlFor="count-down">
              Start at total amount scammed and subtract as you scroll
            </label>
          </div>
        </div>
        <a className="help-text" href="/faq#grift-counter" target="_blank">
          What's the grift counter?
        </a>
      </div>
    </div>
  );
}

SettingsPanel.propTypes = {
  setIsSettingsPanelShown: PropTypes.func.isRequired,

  isAnimationPaused: PropTypes.bool, // Can be null
  toggleFlamesAnimation: PropTypes.func.isRequired,

  isGriftCounterExpanded: PropTypes.bool.isRequired,
  toggleShowGriftCounter: PropTypes.func.isRequired,

  isGriftCounterCountingUp: PropTypes.bool.isRequired,
  toggleIsGriftCounterCountingUp: PropTypes.func.isRequired,
};
