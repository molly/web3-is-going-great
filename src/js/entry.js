import PropTypes from "prop-types";

export const EMPTY_ENTRY = {
  body: "",
  date: "",
  faicon: "",
  icon: "",
  filters: {
    blockchain: [],
    tech: [],
    theme: [],
  },
  links: [{ linkText: "", href: "", extraText: "" }],
  title: "",
  image: { src: "", alt: "", caption: "" },
  scamTotal: 0,
};

export const LinkFieldPropType = PropTypes.shape({
  linkText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  extraText: PropTypes.string,
});

export const EntryPropType = PropTypes.shape({
  id: PropTypes.string,
  filters: PropTypes.shape({
    theme: PropTypes.arrayOf(PropTypes.string).isRequired,
    tech: PropTypes.arrayOf(PropTypes.string),
    blockchain: PropTypes.arrayOf(PropTypes.string),
  }),
  color: PropTypes.string,
  faicon: PropTypes.string,
  icon: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    link: PropTypes.string,
    caption: PropTypes.string,
  }),
  body: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(LinkFieldPropType),
  scamTotal: PropTypes.number,
});
