'use client';

import React, { useRef } from 'react'
import './Hero.scss'
import { LinkAnim } from '@/utils/LinkAnim/LinkAnim'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroClients({ data }) {
  const hero = useRef();
  
  const { scrollYProgress } = useScroll({
    target: hero,
    offset: ["0% 60%", "100% 0%"],
    layoutEffect: true
  });

  const y = useTransform(scrollYProgress, [0,1], ['-20%', '30%'])

  return (
    <section className="hero">
      <div className="container">
        <div className="links">
          {data.links.map((currLink, i) => (
            <h1 className="links__item" key={i}>
              {currLink.id}
              <LinkAnim
                text={currLink.title}
                href={currLink.href}
                data-use-scroll={currLink.href}
                classes="link"
              />
            </h1>
          ))}
        </div>
      </div>
      <div className="hero__background-wrapper" ref={hero}>
          <motion.div className="hero__background" style={{ y }}>
            <Image
              src={data.background} 
              alt="background"
              fill
            />
          </motion.div>
      </div>
    </section>
  )
}
