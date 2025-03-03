"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import "./ContactForm.scss";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classNames from "classnames";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { LocaleContext } from "@/lib/providers/LocaleContext/context";
import { URL_CONTACT } from "@/lib/helpers/DataUrls";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { anim, ContactTitle } from "@/lib/helpers/anim";
import { Content } from "../Content/Content";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(null);
  const [isAnitaionFinished, setIsAnitaionFinished] = useState(false);
  const { lang } = useContext(LocaleContext);

  const formRef = useRef();

  const { scrollYProgress } = useScroll({
    target: data && formRef,
    offset: ["100% 85%", "100% 30%"],
    layoutEffect: true,
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]); // Move 100px up
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]); // Smoother opacity transition
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const filter = useTransform(
    scrollYProgress,
    [0.4, 1],
    ["blur(0vw)", "blur(0.3vw)"]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsAnitaionFinished(latest > 0.5);
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getFetchData(URL_CONTACT);
        setData(useLanguageContent(result, lang));
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    }

    fetchData();
  }, [lang]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(data?.contact.email.errorMessage)
      .required(data?.contact.email.errorMessage),
    name: Yup.string(),
    phone: Yup.string().required(data?.contact.phone.errorMessage),
    message: Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    setSubmitting(false);
    setSubmitted(true);
    resetForm();
  };

  return (
    data && (
      <section
        className={classNames("contact-form", {
          "contact-form--inactive": isAnitaionFinished,
        })}
        id="contact"
        ref={formRef}
      >
        <motion.div className="background">
          <Content url="/images/hero.webm" className="background__item" />
        </motion.div>
        <motion.div
          style={{ y, opacity, scale, filter }}
          className="contact-form__wrapper"
        >
          <h1 className="contact-form__title upperCase">
            <span>{data.title.top}</span>
            <br />
            <AnimTitle titles={data.title.middle} />
            <span>{data.title.bottom}</span>
          </h1>
          <Formik
            initialValues={{
              email: "",
              name: "",
              phone: "",
              message: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isValid, dirty }) => (
              <div className="form-wrapper">
                {submitted && (
                  <div className="form-success-message">
                    <h2 className="upperCase">
                      {data.contact.successTitle.text}
                    </h2>
                    <p>{data.contact.successTitle.subtext}</p>
                  </div>
                )}
                <Form
                  className={classNames("form", {
                    "form--submitted": submitted,
                  })}
                >
                  <div className="input-wrapper">
                    <Field
                      type="email"
                      name="email"
                      placeholder={data.contact.email.text}
                      className={classNames("input", {
                        "input--error": errors.email && touched.email,
                      })}
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="input-error-msg small-text"
                    />
                  </div>

                  <div className="input-wrapper">
                    <Field
                      type="text"
                      name="name"
                      placeholder={data.contact.name.text}
                      className={classNames("input", {
                        "input--error": errors.name && touched.name,
                      })}
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="input-error-msg small-text"
                    />
                  </div>

                  <div className="input-wrapper">
                    <Field
                      type="tel"
                      name="phone"
                      placeholder={data.contact.phone.text}
                      className={classNames("input", {
                        "input--error": errors.phone && touched.phone,
                      })}
                    />
                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="input-error-msg small-text"
                    />
                  </div>

                  <div className="input-wrapper">
                    <Field
                      as="textarea"
                      name="message"
                      placeholder={data.contact.message.text}
                      className="input textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    className={classNames(
                      "submit-button button button--black",
                      {
                        "submit-button--disabled": !isValid || !dirty,
                      }
                    )}
                    disabled={!isValid || !dirty}
                  >
                    <p className="button__text-wrapper">
                      {data.contact.button.split("").map((word, index) => (
                        <span
                          className="button__text"
                          key={index}
                          style={{ transitionDelay: `${index * 0.01}s` }}
                        >
                          {word !== " " ? word : <>&nbsp;</>}
                        </span>
                      ))}
                    </p>
                  </button>
                </Form>
              </div>
            )}
          </Formik>
          <div className="socials">
            <p className="socials__text small-text">{data.socials.text}</p>
            <div className="number-link">
              <SocialsButton
                icon="/images/socials/phone.svg"
                text={data.socials.phone}
                href={data.socials.phoneHref}
              />
            </div>
            {/* <div className="list">
              {data.socials.list.map((currI, i) => (
                <SocialsButton
                  href={currI.href}
                  text={currI.text}
                  icon={currI.icon}
                  key={i}
                />
              ))}
            </div> */}
          </div>
        </motion.div>
      </section>
    )
  );
};

const AnimTitle = ({ titles }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <div className="title-anim__wrapper">
      <AnimatePresence mode="popLayout">
        {/* <motion.h1
          className="title-anim"
          {...anim(ContactTitle.variant2)}
          key={titles[activeIndex]}
        >
          {titles[activeIndex]}
        </motion.h1> */}
        <motion.h1
          className="title-anim"
          key={titles[activeIndex]}
          aria-label={titles[activeIndex]}
        >
          {titles[activeIndex].split("").map((currL, i) => (
            <motion.span
              key={i}
              style={{ display: "inline-block" }}
              {...anim(ContactTitle.variant3)}
              custom={(i / titles[activeIndex].split("").length) * 0.08}
            >
              {currL}
            </motion.span>
          ))}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

const SocialsButton = ({ icon, href, text }) => {
  return (
    <Link href={href} target="_blank" className="socials-button">
      <Image
        width={17}
        height={17}
        src={icon}
        alt=""
        className="socials-button__icon"
      />
      <p className="socials-button__text-wrapper">
        {text.split("").map((word, index) => (
          <span
            className="socials-button__text"
            key={index}
            style={{ transitionDelay: `${index * 0.01}s` }}
          >
            {word !== " " ? word : <>&nbsp;</>}
          </span>
        ))}
      </p>
    </Link>
  );
};

export default ContactForm;
