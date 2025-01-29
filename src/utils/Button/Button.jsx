import React from "react";
import "./Button.scss";
import Link from "next/link";
import classNames from "classnames";

export const Button = ({ text, href, color="white", classes = "" }) => {
  return (
    <Link href={href} className={classNames("button", classes, {
      "button--white": color === "white",
      "button--black": color === "black"
    })}>
      <p className="button__text-wrapper">
        {text.split("").map((word, index) => (
          <span className="button__text" key={index} style={{ transitionDelay: `${index * 0.01}s` }}>
            {word !== " " ? word : (<>&nbsp;</>)}
          </span>
        ))}
      </p>
    </Link>
  );
};
