"use client";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import "./RevealingSection.scss";

export const RevealingSection = ({ data }) => {
  const [openedIndex, setOpenedIndex] = useState(false);
  console.log(data);

  return (
    <div className="revealing-section">
      {data.title && (
        <h1 className="title">
          {data.title}
          <span className="line" />
        </h1>
      )}
      <div className="revealing-list">
        {data.revealingSections.map((currentSection, sectionIndex) => (
          <RevealingItem
            data={currentSection}
            key={sectionIndex}
            openedIndex={openedIndex}
            setOpenedIndex={setOpenedIndex}
            index={sectionIndex}
          />
        ))}
      </div>
    </div>
  );
};

const RevealingItem = ({ data, openedIndex, setOpenedIndex, index }) => {
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  const handleOnClick = () => {
    if (openedIndex !== index) {
      setOpenedIndex(index);
    } else {
      setOpenedIndex(null);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      // Convert pixel height to vw
      const pixelHeight = contentRef.current.scrollHeight;
      const vwHeight = (pixelHeight / window.innerWidth) * 100;
      setHeight(openedIndex === index ? vwHeight + 1 : 0);
    }
  }, [openedIndex, index]);

  return (
    <div
      className={classNames("revealing-item", {
        "revealing-item__active": openedIndex === index,
      })}
    >
      <div className="head" onClick={handleOnClick}>
        <h2 className="second-mobile">- {data.title}</h2>
        <div className="head__line-wrapper">
          <span className="head__line" />
          <span className="head__line" />
        </div>
      </div>
      <div 
        className="body" 
        style={{
          height: `${height}vw`,
        }}
      >
        <div ref={contentRef} className="body__content" dangerouslySetInnerHTML={{ __html: data.text }} />
      </div>
    </div>
  );
};
