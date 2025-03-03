"use client";
import React, { useEffect, useRef, useState } from "react";

import "./Hero.scss";
import Link from "next/link";
import { Logo } from "@/utils/Logo/Logo";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ease } from "@/lib/helpers/ease";
import { Content } from "@/utils/Content/Content";
import { usePathname } from "next/navigation";
import Img from "next/image";
import { HeroHomeAnim } from "@/lib/helpers/anim";
import useIsDesktop from "@/lib/helpers/useIsDesktop";

export const HeroHome = ({ data }) => {
  const isDesktop = useIsDesktop();
  const heroRef = useRef(null);
  const { adress, link } = data;
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTopScroll, setIsTopScroll] = useState(true);
  const [loadedImages, setLoadedImages] = useState([]);
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

  useEffect(() => {
    const loadImages = data.slideshow.map(image => {
      const img = new Image();
      img.src = image;
      return img;
    });
    setLoadedImages(loadImages);

    console.log("loadedImages", loadedImages);
    console.log("data", data.slideshow);
    
  }, [data.slideshow]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevIndex) => (prevIndex + 1) % loadedImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loadedImages]);

  return (
    <section className="hero" ref={heroRef}>
      <div className="container grid">
        {/* {isTopScroll && isDesktop && (
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
        )} */}
        
          <motion.div
            className="logo"

          >
            <Logo className="logo__image" />
          </motion.div>
      
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
      {/* <motion.div className="background" ref={heroBgRef}>
        <Content
          url="/images/hero.webm"
          className="background__item"
          style={{ y }}
        />
      </motion.div> */}
      <div className="slideshow">
        {loadedImages.length !== 0 && (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              className="slide"
              key={activeSlide}
              custom={1}
              variants={HeroHomeAnim.slideshow}
              initial="enter"
              animate="center"
              exit="exit"
              // onClick={() =>
              //   setActiveSlide(
              //     (prevIndex) => (prevIndex + 1) % loadedImages.length
              //   )
              // }
            >
              <img
                src={loadedImages[activeSlide].src}
                width={1920}
                height={1080}
                alt="357D"
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
