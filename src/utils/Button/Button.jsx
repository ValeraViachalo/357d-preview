import React from "react";
import "./Button.scss";
import classNames from "classnames";
import { LinkPageTransition } from "../LinkPageTransition/LinkPageTransition";

export const Button = ({ text, href, color="white", classes = "" }) => {
  return (
    <LinkPageTransition href={href} className={classNames("button", classes, {
      "button--white": color === "white",
      "button--black": color === "black"
    })}>
      <p className="button__text-wrapper">
        {text.split("").map((word, index) => (
          <span className="button__text" key={index} style={{ transitionDelay: `${(index / text.split("").length) * 0.06}s` }}>
            {word !== " " ? word : (<>&nbsp;</>)}
          </span>
        ))}
      </p>
    </LinkPageTransition>
  );
};
