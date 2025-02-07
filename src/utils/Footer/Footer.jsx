"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Logo } from "../Logo/Logo";

import "./Footer.scss";
import { LocaleContext } from "@/lib/providers/LocaleContext/context";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";
import { URL_FOOTER } from "@/lib/helpers/DataUrls";
import { Button } from "../Button/Button";
import { LinkAnim } from "../LinkAnim/LinkAnim";
import ParagraphAnim from "../ParagraphAnim/ParagraphAnim";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  BluredPresence,
  presenceAnim,
  TitlePresence,
} from "@/lib/helpers/anim";
import { usePathname } from "next/navigation";

export default function Footer() {
  const footerRef = useRef();
  const path = usePathname()
  const [data, setData] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const { lang } = useContext(LocaleContext);

  const navigation = data?.navigation;
  const signUp = data?.signUp;
  const contacts = data?.contacts;

  const { scrollYProgress } = useScroll({
    target: data && footerRef,
    offset: ["0% 100%", "0% 90%"],
    layoutEffect: false,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (footerRef.current && !isActive) {
      setIsActive(latest > 0.2);
    }
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getFetchData(URL_FOOTER);
        setData(useLanguageContent(result, lang));
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    }

    fetchData();
  }, [lang]);
  
  useEffect(() => {
    setIsActive(false)
  }, [path]);

  return (
    data && (
      <footer className="footer" ref={footerRef}>
        <div className="container grid">
          <h1 className="footer__title small-text">
            <ParagraphAnim text={data?.title} isActive={isActive} delay={1} key={data?.title} />
          </h1>

          <div className="footer__sing-up small-text">
            <ParagraphAnim text={signUp.text} isActive={isActive} delay={1} key={data?.title} />
            <motion.div
              {...presenceAnim(BluredPresence.scaled, isActive)}
              custom={{ id: 2, duration: 1 }}
              style={{ width: 'fit-content' }}
            >
              <Button
                text={signUp.button.text}
                href={signUp.button.href}
                color="black"
              />
            </motion.div>
          </div>

          <div className="nav">
            <div className="nav__links">
              {navigation.pages.length &&
                navigation.pages.map((currL, i) => (
                  <LinkWrapper
                    text={currL.text}
                    href={currL.href}
                    isActive={isActive}
                    index={i + 1}
                    key={`nav-pages-${i}`}
                  />
                ))}
            </div>
            <div className="nav__links">
              {navigation.policies.length &&
                navigation.policies.map((currL, i) => (
                  <LinkWrapper
                    text={currL.text}
                    href={currL.href}
                    isActive={isActive}
                    index={i + 1}
                    key={`nav-policies-${i}`}
                  />
                ))}
            </div>
            <div className="nav__links">
              {navigation.socials.length &&
                navigation.socials.map((currL, i) => (
                  <LinkWrapper
                    text={currL.text}
                    href={currL.href}
                    isActive={isActive}
                    index={i + 1}
                    key={`nav-socials-${i}`}
                  />
                ))}
            </div>
          </div>

          <div className="contact-us">
            <div className="contact-us__top">
              {contacts?.top.map((currL, i) => (
                <LinkWrapper
                  text={currL.text}
                  href={currL.href}
                  isActive={isActive}
                  index={i + 1}
                  key={`contact-us-${i}`}
                />
              ))}
            </div>
            <div className="contact-us__location">
              <motion.p
                className="small-text"
                dangerouslySetInnerHTML={{ __html: contacts?.adress.text }}
                {...presenceAnim(BluredPresence, isActive)}
                custom={{ id: 3, duration: 1 }}
              />

              <LinkWrapper
                text={contacts?.adress.button.text}
                href={contacts?.adress.button.href || "/"}
                isActive={isActive}
                index={3}
                classes="contact-us__location-button"
                icon="/images/icons/location.svg"
                target="_blank"
              />
            </div>
          </div>

          <motion.div
            {...presenceAnim(BluredPresence, isActive)}
            custom={{ id: 3, duration: 1 }}
            className="made-by"
          >
            <LinkAnim
              classes="made-by"
              text={data.madeBy.text}
              href={data.madeBy.href}
              target="_blank"
            />
          </motion.div>
        </div>
      </footer>
    )
  );
}

const LinkWrapper = ({ text, href, isActive, index, ...rest }) => {
  return (
    <motion.div
      {...presenceAnim(BluredPresence, isActive)}
      custom={{ id: index, duration: 1 }}
    >
      <LinkAnim text={text} href={href} {...rest} />
    </motion.div>
  );
};
