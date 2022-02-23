import React, { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { usePopper } from "react-popper";

export default function TimelineEntryContent({ children, glossary }) {
  const entrySpanRef = useRef(null);
  const contentRef = useRef(null);

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

  const getNoJsEntryHtml = () =>
    children.replace(
      /<button.*?id="(.*?)".*?>(.*?)<\/button>/g,
      '<a href="/glossary#$1" target="_blank" class="define-target">$2</a>'
    );
  const [hydratedBody, setHydratedBody] = useState(getNoJsEntryHtml());

  const close = useCallback((event) => {
    if (!event.target.classList.contains("define-target")) {
      document.removeEventListener("click", close);
      setActiveTarget(null);
      const expanded = entrySpanRef.current.querySelectorAll(
        "[aria-expanded='true']"
      );
      for (let i = 0; i < expanded.length; i++) {
        expanded[i].setAttribute("aria-expanded", false);
      }
    }
  }, []);

  // Clean up event handlers on unmount
  useEffect(() => {
    return () => document.removeEventListener("click", close);
  }, [close]);

  // Hydrate define-targets with proper a11y roles so I don't have to
  // rely on remembering to do it every time I add a new entry
  // (I will not remember)
  useEffect(() => {
    const el = document.createElement("div");
    el.innerHTML = children;
    const defineTargets = el.querySelectorAll(".define-target");
    for (let i = 0; i < defineTargets.length; i++) {
      defineTargets[i].setAttribute("aria-hasPopup", "dialog");
      defineTargets[i].setAttribute("aria-expanded", "false");
    }
    setHydratedBody(el.innerHTML);
  }, [children]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.focus();
    }
  });

  const onEntryClick = (event) => {
    if (event.target.classList.contains("define-target")) {
      if (activeTarget) {
        setActiveTarget(null);
      } else {
        event.target.setAttribute("aria-expanded", "true");
        setActiveTarget(event.target);
        document.addEventListener("click", close);
      }
    }
  };

  const safelyGetGlossaryField = (field) => {
    if (activeTarget && activeTarget.id && glossary) {
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
      <div ref={contentRef} tabIndex={0}>
        <div className="space-between">
          <b>{term}</b>
          <button onClick={() => close}>
            <i className="fas fa-xmark" aria-hidden={true}></i>
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
          role="dialog"
        >
          {renderPopoverContents()}
          <div ref={setArrowElement} style={styles.arrow} className="arrow" />
        </div>
      )}

      <span
        ref={entrySpanRef}
        dangerouslySetInnerHTML={{
          __html: hydratedBody,
        }}
        onClick={onEntryClick}
      />
    </div>
  );
}

TimelineEntryContent.propTypes = {
  children: PropTypes.string.isRequired,
  glossary: PropTypes.object,
};
