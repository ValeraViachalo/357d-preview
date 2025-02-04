"use client"
import React, { useRef } from "react";

import "./Hero.scss";
import Image from "next/image";
import { LinkAnim } from "@/utils/LinkAnim/LinkAnim";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroAbout({ data }) {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: data && heroRef,
    offset: ["0% 0%", "100% 0%"],
    layoutEffect: true,
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className="hero" ref={heroRef}>
      {data?.background && (
        <motion.div className="hero__background" style={{ y }}>
          <Image
            src={data?.background}
            fill
            alt="about"
          />
        </motion.div>
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
