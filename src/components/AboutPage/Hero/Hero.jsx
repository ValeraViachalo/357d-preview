import React from "react";

import "./Hero.scss";
import Image from "next/image";
import { LinkAnim } from "@/utils/LinkAnim/LinkAnim";

export default function HeroAbout({ data }) {
  return (
    <section className="hero">
      {data?.background && (
        <Image
          src={data?.background}
          fill
          alt="about"
          className="hero__background"
        />
      )}
      <div className="hero-wrapper">
        <div className="top">
          <span className="super-text">{data?.title}</span>
          <p className="small-text">
            {data?.text}
          </p>
        </div>
        <div className="links">
          {data.links.length && data.links.map((currLink, i) => (
            <h1 className="links__item" key={i}>
              <LinkAnim
                text={currLink.title}
                href={currLink.href}
                data-use-scroll={currLink.href}
                secondaryItem={currLink.id}
                classes="link"
              />
            </h1>
          ))}
        </div>
      </div>
    </section>
  );
}
