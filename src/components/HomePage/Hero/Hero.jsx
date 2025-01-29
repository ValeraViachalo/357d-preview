"use client";
import React, { useEffect, useRef, useState } from "react";

import "./Hero.scss";
import Link from "next/link";
import { Logo } from "@/utils/Logo/Logo";
import { motion } from "framer-motion";
import { ease } from "@/lib/helpers/ease";
import { Content } from "@/utils/Content/Content";

export const HeroHome = ({ data }) => {
  const heroRef = useRef(null);
  const { adress, link } = data;
  const [isTopScroll, setIsTopScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTopScroll(window.scrollY < 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="container grid">
        {isTopScroll && (
          <motion.div
            className="logo"
            layoutId="header_logo"
            transition={{
              layout: {
                duration: 0.6,
                delay: 0.2,
                ease: ease.inOutExpo,
              },
            }}
          >
            <Logo className="logo__image" />
          </motion.div>
        )}
        <div className="top">
          <Link href={adress.href}>
            <p
              className="adress"
              dangerouslySetInnerHTML={{ __html: adress.text }}
            />
          </Link>
          
          <Link href={link.href}>
            <p
              className="top-link"
              dangerouslySetInnerHTML={{ __html: link.text }}
            />
          </Link>
        </div>
      </div>
      <motion.div className="background">
        <Content url="/images/hero.webm" className="background__item"/>
      </motion.div>
    </section>
  );
};
