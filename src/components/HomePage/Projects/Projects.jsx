import React from "react";
import "./Projects.scss";
import Image from "next/image";
import { Button } from "@/utils/Button/Button";
import Link from "next/link";
import { LinkAnim } from "@/utils/LinkAnim/LinkAnim";

export default function ProjectsHome({ data }) {
  return (
    <section className="projects">
      <h3 className="title container">{data.title}</h3>

      <div className="card-wrapper">
        {data.list.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
      <Link href={data.button.href} className="projects__button">
        <div style={{ position: "relative" }}>
          <h3 className="projects__button-wrapper">
            <p className="projects__button-text-wrapper">
              {data.button.text.split("").map((letter, index) => (
                <span
                  className="projects__button-text"
                  key={`projects-letter-${index}`}
                  style={{ transitionDelay: `${index * 0.01}s` }}
                >
                  {letter !== " " ? letter : (<>&nbsp;</>)}
                </span>
              ))}
              {/* <span className="projects__button-text">{data.button.text}</span> */}
            </p>
          </h3>
          <div className="projects__button-wrapper projects__button-top">
            <p className="projects__button-text-wrapper">
              <span className="projects__button-text">
                {data.button.length}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
}

const Card = ({ data }) => {
  return (
    <div className="card">
      <Image
        className="card__image"
        alt="project"
        src={data.image}
        width={720}
        height={864}
      />
      <div className="info">
        <div className="info__background">
          <Image alt="project" src={data.image} fill />
          <div className="info__background-blur"></div>
        </div>
        <div className="info__wrapper">
          <div className="list">
            {data.list.map((item, index) => (
              <div className="list__item" key={index}>
                <p dangerouslySetInnerHTML={{ __html: item }} />
                <span className="line" />
              </div>
            ))}
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
