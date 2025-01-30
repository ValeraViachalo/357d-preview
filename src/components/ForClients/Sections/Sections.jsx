import React from "react";
import './Sections.scss';
import { RevealingSection } from "./RevealingSection/RevealingSection";

export default function SectionsForClient({ data }) {
  const handleBlock = (sectionData, index) => {
    switch (sectionData.type) {
      case "text-title": 
        return <TextTitleSection data={sectionData} key={index}/>
      case "revealing":
        return <RevealingSection data={sectionData} key={index} />
    }
  } 

  return (
    <section className="section-wrapper container">
      {data.map((currSection, mainIndex) => (
        <div
          className="section"
          key={`${currSection.slug}-${mainIndex}`}
          id={currSection.slug}
        >
          <p>{currSection.title}</p>
          {currSection.blocks.map((currBlock, blockIndex) =>  handleBlock(currBlock, blockIndex))}
        </div>
      ))}
    </section>
  );
}

const TextTitleSection = ({ data }) => {
  return (
    <div className="text-title">
      {data.title && (
        <h1 className="title">
          {data.title}
          <span className="line" />
        </h1>
      )}
      <div className="text">
        <p
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
      </div>
    </div>
  )
}
