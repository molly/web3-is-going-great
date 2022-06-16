import PropTypes from "prop-types";

import FILTERS from "../../constants/filters";

import Select from "react-select";

const ALL_ICONS = {
  poo: { type: "fa", value: "poo", text: FILTERS.theme.badIdea },
  bug: { type: "fa", value: "bug", text: FILTERS.theme.bug },
  fire: { type: "fa", value: "fire", text: FILTERS.theme.environment },
  "face-frown": {
    type: "fa",
    value: "face-frown",
    text: FILTERS.theme.bummer,
  },
  gavel: { type: "fa", value: "gavel", text: FILTERS.theme.law },
  newspaper: { type: "fa", value: "newspaper", text: FILTERS.theme.reporting },
  paintbrush: { type: "fa", value: "paintbrush", text: FILTERS.theme.artTheft },
  repeat: { type: "fa", value: "repeat", text: FILTERS.theme.washTrade },
  "thumbs-up": { type: "fa", value: "thumbs-up", text: FILTERS.theme.goodNews },
  "face-grimace": {
    type: "fa",
    value: "face-grimace",
    text: FILTERS.theme.yikes,
  },
  collapse: {
    type: "fa",
    value: "burst",
    text: FILTERS.theme.collapse,
  },

  hack: { type: "img", value: "hack", text: FILTERS.theme.hack },
  hmm: { type: "img", value: "hmm", text: FILTERS.theme.hmm },
  rug: { type: "img", value: "rug", text: FILTERS.theme.rugPull },
  shady: { type: "img", value: "shady", text: FILTERS.theme.shady },
};

export default function IconSelector({ updateEntry, value }) {
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
      options={Object.entries(ALL_ICONS).map(([key, value]) => ({
        value: key,
        label: value.text,
      }))}
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
