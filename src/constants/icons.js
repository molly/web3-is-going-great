import FILTERS from "./filters";

export const ICON_PATHS = {
  hack: "robber.png",
  hacker: "robber.png",
  hmm: "wtf.png",
  layoffs: "layoffs.png",
  rug: "rug.png",
  shady: "shades.png",
};

export const ALL_ICONS = {
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
  burst: {
    type: "fa",
    value: "burst",
    text: FILTERS.theme.collapse,
  },
  biohazard: {
    type: "fa",
    value: "biohazard",
    text: FILTERS.theme.contagion,
  },

  hack: { type: "img", value: "hack", text: FILTERS.theme.hack },
  hmm: { type: "img", value: "hmm", text: FILTERS.theme.hmm },
  layoffs: { type: "img", value: "layoffs", text: FILTERS.theme.layoffs },
  rug: { type: "img", value: "rug", text: FILTERS.theme.rugPull },
  shady: { type: "img", value: "shady", text: FILTERS.theme.shady },
};
