import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { usePopper } from "react-popper";

export default function TimelineEntryContent({ children, glossary }) {
  const [activeTarget, setActiveTarget] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(activeTarget, popperElement, {
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
      {
        name: "preventOverflow",
        options: {
          padding: 10,
        },
      },
    ],
  });

  const close = useCallback((event) => {
    if (!event.target.classList.contains("define-target")) {
      document.removeEventListener("click", close);
      setActiveTarget(null);
    }
  }, []);

  useEffect(() => {
    return () => document.removeEventListener("click", close);
  }, [close]);

  const onEntryClick = (event) => {
    if (event.target.classList.contains("define-target")) {
      setActiveTarget(event.target);
      document.addEventListener("click", close);
    }
  };

  const safelyGetGlossaryField = (field) => {
    if (activeTarget && activeTarget.id) {
      if (glossary.entries[activeTarget.id]) {
        return glossary.entries[activeTarget.id][field];
      }
    }
    return "";
  };

  const renderPopoverContents = () => {
    const term = safelyGetGlossaryField("term");
    const definition = safelyGetGlossaryField("definition");
    if (!term || !definition) {
      return null;
    }
    return (
      <div>
        <div className="space-between">
          <b>{term}</b>
          <button onClick={() => close}>
            <i className="fas fa-xmark"></i>
            <span className="sr-only">Close definition</span>
          </button>
        </div>
        <span dangerouslySetInnerHTML={{ __html: definition }} />
      </div>
    );
  };

  return (
    <div className="timeline-body-text-wrapper">
      {activeTarget && (
        <div
          ref={setPopperElement}
          style={{ ...styles.popper }}
          {...attributes.popper}
          className="definition-popover"
        >
          {renderPopoverContents()}
          <div ref={setArrowElement} style={styles.arrow} className="arrow" />
        </div>
      )}

      <span
        dangerouslySetInnerHTML={{ __html: children }}
        onClick={onEntryClick}
      />
    </div>
  );
}

TimelineEntryContent.propTypes = {
  children: PropTypes.string.isRequired,
  glossary: PropTypes.object.isRequired,
};
