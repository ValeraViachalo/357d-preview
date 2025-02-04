import { delay } from "framer-motion";
import { ease } from "./ease";

export const anim = (variants) => {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
};

export const textPresence = {
  initial: {
    clipPath: "inset(0% -20% 100% -20%)",
    y: "100%",
  },
  animate: (delay = 0.5) => ({
    clipPath: "inset(-20% -20% -20% -20%)",
    y: "0%",
    transition: {
      duration: 1,
      delay,
      ease: ease.inOutCirc,
    },
    transitionEnd: {
      clipPath: "none",
      y: "auto",
    },
  }),
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    y: "100%",
  },
};

export const ContactTitle = {
  variant2: {
    initial: {
      clipPath: "inset(100% 0% 0% 0)",
      y: "-100%",
      transition: {
        duration: 1,
        ease: ease.inOutCirc,
      },
    },
    animate: {
      clipPath: "inset(0% 0% 0% 0)",
      y: 0,
      transition: {
        duration: 1,
        ease: ease.inOutCirc,
      },
    },
    exit: {
      clipPath: "inset(0% 0% 100% 0)",
      y: "100%",
      transition: {
        duration: 1,
        ease: ease.inOutCirc,
      },
    },
  },
  variant3: {
    initial: {
      clipPath: "inset(100% 0% 0% 0)",
      y: "-100%",
      transition: {
        duration: 1,
        ease: ease.inOutCirc,
      },
    },
    animate: (delay) => ({
      clipPath: "inset(0% 0% 0% 0)",
      y: 0,
      transition: {
        duration: 1,
        delay,
        ease: ease.inOutCirc,
      },
    }),
    exit: (delay) => ({
      clipPath: "inset(0% 0% 100% 0)",
      y: "100%",
      transition: {
        duration: 1,
        delay,
        ease: ease.inOutCirc,
      },
    }),
  },
};
