"use client"
import React, { useRef, useState } from 'react'
import './About.scss';
import Image from 'next/image';
import ParagraphAnim from '@/utils/ParagraphAnim/ParagraphAnim';
import { useMotionValueEvent, useScroll } from 'framer-motion';

export default function AboutHome({ data }) {
  const { top } = data;
  const aboutRef = useRef();
  const [isActive, setIsActive] = useState(false);


  const { scrollYProgress } = useScroll({
    target: data && aboutRef,
    offset: ["0% 100%", "0% 90%"],
    layoutEffect: false,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsActive(latest > 0.2);
  });

  return (
    <section className="about container" ref={aboutRef}>
      <div className="top">
        <p className="about__text">{top.text}</p>
        {/* <h1 className="about__title">
          <ParagraphAnim text={top.title} isActive={true}/>
        </h1> */}
        <h1 className="about__title">
          {top.title}
        </h1>
      </div>
      <div className="bottom">
        {data.bottom.list.map((item, index) => (
          <div className="card" key={index}>
            <div className="card__title">
              <p>{item.text}</p>
              <span className="line" />
            </div>
            <Image className="card__image" alt='about icon' src={item.image} width={100} height={100}/>
          </div>
        ))}
      </div>
    </section>
  )
}
