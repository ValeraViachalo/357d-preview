"use client";
import React, { useRef } from 'react'

import "./Approach.scss";
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ApproachAbout({ data }) {
  return (
    <section className="approach container" id="approach">
      <p className="approach__title">{data?.title}</p>
      {data?.sections.length && data?.sections.map((currSection, sectionIndex) => (
        <Card currSection={currSection} key={sectionIndex} />
      ))}
    </section>
  )
}

const Card = ({ currSection }) => {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: currSection && cardRef,
    offset: ["0% 70%", "0% 0%"],
    layoutEffect: true,
  });

  const scrollSpring = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 100,
  });

  const scale = useTransform(scrollSpring, [0, 1], [1.1, 1]);
  const filter = useTransform(scrollSpring, [0, 1], ["blur(.2vw)","blur(0vw)"]);

  return (
    <div className='section' ref={cardRef}>
    <h1 className="title">
      {currSection?.title}
      <span className="line"></span>
    </h1>

    <div className="content">
      <div className="content__image">
        <motion.img
          src={currSection.image}
          alt={`about-our-approach-${currSection?.title}`}
          width={680}
          height={680}
          className="content__image-item"
          style={{ scale, filter }}
        />
      </div>
      <div className="content__text">
        <p dangerouslySetInnerHTML={{ __html: currSection.text }} />
      </div>
    </div>
  </div>

  )
}
