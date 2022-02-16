import PropTypes from "prop-types";

export default function SettingsPanel({
  setIsSettingsPanelShown,
  isAnimationPaused,
  toggleFlamesAnimation,
  isGriftCounterExpanded,
  toggleShowGriftCounter,
  isGriftCounterCountingUp,
  toggleIsGriftCounterCountingUp,
}) {
  return (
    <div className="settings-panel">
      <div className="header-and-close">
        <h3>Settings</h3>
        <button onClick={() => setIsSettingsPanelShown(false)}>
          <i className="fas fa-xmark" aria-hidden={true}></i>
          <span className="sr-only">Close settings panel</span>
        </button>
      </div>
      <div className="input-group">
        <input
          type="checkbox"
          id="show-grift-counter"
          name="show-grift-counter"
          checked={isGriftCounterExpanded}
          onChange={toggleShowGriftCounter}
        />
        <label htmlFor="show-grift-counter">Show grift counter</label>
      </div>
      <div className="input-group">
        <input
          type="checkbox"
          id="animate-flames"
          name="animate-flames"
          checked={!isAnimationPaused}
          onChange={toggleFlamesAnimation}
        />
        <label htmlFor="animate-flames">Animate flames</label>
      </div>
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
