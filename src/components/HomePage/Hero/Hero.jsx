"use client";
import React, { useEffect, useRef, useState } from "react";

import "./Hero.scss";
import Link from "next/link";
import { Logo } from "@/utils/Logo/Logo";
import { motion, useScroll, useTransform } from "framer-motion";
import { ease } from "@/lib/helpers/ease";
import { Content } from "@/utils/Content/Content";
import { usePathname } from "next/navigation";

export const HeroHome = ({ data }) => {
  const heroRef = useRef(null);
  const { adress, link } = data;
  const [isTopScroll, setIsTopScroll] = useState(true);
  const path = usePathname();

  const heroBgRef = useRef();

  const { scrollYProgress } = useScroll({
    target: heroBgRef,
    offset: ["100% 100%", "100% 0%"],
    layoutEffect: false,
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

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
            layoutId={`header_logo-${path}`}
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
              className="adress small-text"
              dangerouslySetInnerHTML={{ __html: adress.text }}
            />
          </Link>

          <Link href={link.href}>
            <p
              className="top-link small-text"
              dangerouslySetInnerHTML={{ __html: link.text }}
            />
          </Link>
        </div>
      </div>
      <motion.div className="background" ref={heroBgRef}>
        <Content
          url="/images/hero.webm"
          className="background__item"
          style={{ y }}
        />
      </motion.div>
    </section>
  );
};
