import Image from "next/image";
import React from "react";

import "./ProjectsAbout.scss"

export default function ProjectsAbout({ data }) {
  return (
    <section className="projects container" id="projects">
      <p>{data?.title}</p>
      <div className="projects__list">
        {data.sections.length &&
          data.sections.map((currCard, cardIndex) => (
            <div className="card" key={cardIndex}>
              <div className="top">
                <p>{currCard?.title}</p>
                <p className="small-text">{currCard?.text}</p>
              </div>
              {currCard?.image && (
                <Image src={currCard?.image} width={160} height={160} alt="" className="card__image" />
              )}
            </div>
          ))}
      </div>
    </section>
  );
}
