import clsx from "clsx";
import PropTypes from "prop-types";

export default function Checkbox({
  checked,
  toggleCheckbox,
  id,
  children,
  className,
}) {
  return (
    <div className={clsx("input-group", className)}>
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

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
