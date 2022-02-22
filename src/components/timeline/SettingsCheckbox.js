import PropTypes from "prop-types";

export default function SettingsCheckbox({
  checked,
  toggleCheckbox,
  id,
  children,
}) {
  return (
    <div className="input-group">
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={toggleCheckbox}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}

SettingsCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
