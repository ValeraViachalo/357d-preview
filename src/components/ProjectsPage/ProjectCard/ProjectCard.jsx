import React from "react";

import "./ProjectCard.scss";
import Image from "next/image";
import { Button } from "@/utils/Button/Button";

export const ProjectCard = ({ data }) => {
  const description = data.description;
  const price = description.price;

  return (
    <div className="card">
      <div className="card__image">
        <Image
          alt={`project ${data.name}`}
          src={data.image}
          fill
          className="card__image-item"
        />
      </div>
      <div className="info">
        <div className="info__wrapper">
          <div className="list">
            <div className="list__item small-text">
              <p dangerouslySetInnerHTML={{ __html: description.adress }} />
              <span className="line" />
            </div>
            <div className="list__item small-text">
              <p className="text-wrapper">
                {description?.type && <span className="text">{description?.type.text}</span>}
                {description?.status && <span className="text">{description?.status.text}</span>}
              </p>
              <span className="line" />
            </div>
            <div className="list__item small-text">
              <p className="text-wrapper">
                {description?.about && description?.about.map((currI, aboutIndex) => (
                  <span className="text" key={aboutIndex}>{`${currI.text} ${currI.value}`}</span>
                ))}
              </p>
              <span className="line" />
            </div>
            <div className="list__item small-text">
              <p className="text-wrapper">
                <span className="text">{`${price.text} €${price.value}`}</span>
              </p>
              <span className="line" />
            </div>
          </div>
          <h1>{data.title}</h1>
          <Button
            href={data.button.href}
            text={data.button.text}
            classes="info__button"
          />
        </div>
      </div>
    </div>
  );
};
