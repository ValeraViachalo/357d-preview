"use client";
import React, { useEffect, useState } from "react";
import { Logo } from "../Logo/Logo";
import { URL_HEADER } from "@/lib/helpers/DataUrls";
import "./Header.scss";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";
import { LangSwitch } from "./LangSwitch/LangSwitch";
import { LinkAnim } from "../LinkAnim/LinkAnim";
import { getFetchData } from "@/lib/helpers/DataFetch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "@/lib/helpers/ease";
import { anim, TitlePresence } from "@/lib/helpers/anim";
import { LinkPageTransition } from "../LinkPageTransition/LinkPageTransition";

export default function Header() {
  const [data, setData] = useState(null);
  const [isTopScroll, setIsTopScroll] = useState(true);
  const path = usePathname();

  const isWhiteHeader = path.includes("-paths")

  const isGrePath = path.startsWith("/gre");

  useEffect(() => {
    const handleScroll = () => {
      setIsTopScroll(window.scrollY < 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getFetchData(URL_HEADER);

        setData(useLanguageContent(result, isGrePath ? "gre" : "en"));
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    }

    fetchData();
  }, [path]);

  return (
    data && (
      <header className={clsx("header grid", { "header--bg": !isTopScroll, "header--white": isWhiteHeader })}>
        <LinkPageTransition href={isGrePath ? "/gre" : "/"} className="header__logo">
          <AnimatePresence mode="wait">
            {path === "/" || path === "/gre" ? (
              isTopScroll ? (
                <motion.p className="header__logo-text" {...anim(TitlePresence)}>
                  Estate to be proud of
                </motion.p>
              ) : (
                <motion.div
                  layoutId={`header_logo-${path}`}
                  transition={{
                    layout: {
                      duration: 0.4,
                      ease: ease.inOutExpo,
                    },
                  }}
                >
                  <Logo />
                </motion.div>
              )
            ) : (
              <div className="header__logo header__logo--regular">
                <Logo className="header__logo-image"/>
                <p className="header__logo-text">Estate to be proud of</p>
              </div>
            )}
          </AnimatePresence>
        </LinkPageTransition>
        <nav className="header__list">
          {data.list.map((currLink, index) => (
            <LinkAnim
              classes="link"
              href={isGrePath ? `/gre${currLink.link}` : currLink.link}
              key={`header_link_${index}`}
              text={currLink.name}
            />
          ))}
        </nav>

        <div className="right">
          <LinkAnim
            href={data.contact.href}
            data-use-scroll={data.contact.href}
            classes="link"
            text={data.contact.name}
          />
          <LangSwitch />
        </div>
      </header>
    )
  );
}
