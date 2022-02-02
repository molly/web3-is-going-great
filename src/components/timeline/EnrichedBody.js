import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { usePopper } from "react-popper";

export default function EnrichedBody({ children, glossary }) {
  const [activeTarget, setActiveTarget] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(activeTarget, popperElement);

  const clickOff = useCallback((event) => {
    if (!event.target.classList.contains("define-target")) {
      document.removeEventListener("click", clickOff);
      setActiveTarget(null);
    }
  }, []);

  useEffect(() => {
    return () => document.removeEventListener("click", clickOff);
  }, [clickOff]);

  const callback = (event) => {
    if (event.target.classList.contains("define-target")) {
      setActiveTarget(event.target);
      document.addEventListener("click", clickOff);
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
        <div>
          <b>{term}</b>
        </div>
        <span dangerouslySetInnerHTML={{ __html: definition }} />
      </div>
    );
  };

  return (
    <>
      {activeTarget && (
        <div
          ref={setPopperElement}
          style={{ ...styles.popper }}
          {...attributes.popper}
          className="definition-popover"
        >
          {renderPopoverContents()}
        </div>
      )}

      <span
        id="bodyContainer"
        dangerouslySetInnerHTML={{ __html: children }}
        onClick={callback}
      />
    </>
  );
}

EnrichedBody.propTypes = {
  children: PropTypes.string.isRequired,
  glossary: PropTypes.object.isRequired,
};
