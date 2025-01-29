"use client";
import React, { useContext, useEffect, useState } from "react";
import { Logo } from "../Logo/Logo";

import "./Footer.scss";
import { LocaleContext } from "@/lib/providers/LocaleContext/context";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";
import { URL_FOOTER } from "@/lib/helpers/DataUrls";
import { Button } from "../Button/Button";
import { LinkAnim } from "../LinkAnim/LinkAnim";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [data, setData] = useState(null);
  const { lang } = useContext(LocaleContext);

  const navigation = data?.navigation;

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

  return (
    data && (
      <footer className="footer">
        <div className="container grid">
          <h1 className="footer__title">{data?.title}</h1>

          <div className="footer__sing-up">
            {data?.signUp.text}
            <Button
              text={data?.signUp.button.text}
              href={data?.signUp.button.href}
              color="black"
            />
          </div>

          <div className="nav">
            <div className="nav__links">
              {navigation.pages.length &&
                navigation.pages.map((currL, i) => (
                  <LinkAnim
                    text={currL.text}
                    href={currL.href}
                    key={`nav-pages-${i}`}
                  />
                ))}
            </div>
            <div className="nav__links">
              {navigation.policies.length &&
                navigation.policies.map((currL, i) => (
                  <LinkAnim
                    text={currL.text}
                    href={currL.href}
                    key={`nav-policies-${i}`}
                  />
                ))}
            </div>
            <div className="nav__links">
              {navigation.socials.length &&
                navigation.socials.map((currL, i) => (
                  <LinkAnim
                    text={currL.text}
                    href={currL.href}
                    key={`nav-socials-${i}`}
                  />
                ))}
            </div>
          </div>

          <div className="contact-us">
            <div className="contact-us__top">
              {data?.contacts?.top.map((currL, i) => (
                <LinkAnim
                  text={currL.text}
                  href={currL.href}
                  key={`contact-us-${i}`}
                />
              ))}
            </div>
            <div className="contact-us__location">
              <p dangerouslySetInnerHTML={{ __html: data?.contacts?.adress.text }} />
              <LinkAnim
                target="_blank"
                text={data?.contacts?.adress.button.text}
                href={data?.contacts?.adress.button.href || "/"}
                icon="/images/icons/location.svg"
                classes="contact-us__location-button"
              />
            </div>
          </div>

          <LinkAnim classes="made-by"
            href={data.madeBy.href}
            text={data.madeBy.text}
            target="_blank"
          />
        </div>
      </footer>
    )
  );
}
