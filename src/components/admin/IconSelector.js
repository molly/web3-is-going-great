import PropTypes from "prop-types";

import { ALL_ICONS } from "../../constants/icons";

import Select from "react-select";
import { useMemo } from "react";

export default function IconSelector({ updateEntry, value }) {
  const selectorOptions = useMemo(
    () =>
      Object.keys(ALL_ICONS)
        .sort((a, b) => {
          const aText = ALL_ICONS[a].text;
          const bText = ALL_ICONS[b].text;
          if (aText < bText) {
            return -1;
          }
          if (aText > bText) {
            return 1;
          }
          return 0;
        })
        .reduce((acc, key) => {
          acc.push({ value: key, label: ALL_ICONS[key].text });
          return acc;
        }, []),
    []
  );

  const onChange = ({ value }) => {
    const selectedIcon = ALL_ICONS[value];
    if (selectedIcon.type === "fa") {
      updateEntry({ faicon: selectedIcon.value, icon: "" });
    } else {
      updateEntry({ icon: selectedIcon.value, faicon: "" });
    }
  };

  return (
    <Select
      instanceId="iconSelector"
      options={selectorOptions}
      placeholder="Icon"
      onChange={onChange}
      value={value ? { value, label: ALL_ICONS[value].text } : null}
    ></Select>
  );
}

IconSelector.propTypes = {
  updateEntry: PropTypes.func.isRequired,
  value: PropTypes.string,
};
