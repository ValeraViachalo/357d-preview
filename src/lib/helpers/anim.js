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
  animate: {
    clipPath: "inset(0% -20% -20% -20%)",
    y: "0%",
    transition: {
      duration: 1,
      delay: 0.5,
      ease: ease.outExpo,
    },
    transitionEnd: {
      clipPath: "none",
      y: "auto",
    }
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    y: "100%",
  },
}

const ease1 = [0.88, 0.05, 0.1, 0.97];
const ease2 = [0.76, 0, 0.24, 1];


export const ContactTitle = {
  initial: {
    filter: "blur(.7vw)",
    opacity: 0,
    scale: 1.1,
  },
  animate: {
    filter: "blur(0vw)",
    opacity: 1,
    scale: 1,
    transition: {
      scale: {
        duration: .6,
        ease: ease2,
      },
      filter: {
        duration: .6,
        ease: ease2,
        // delay: .2,
      },
      opacity: {
        duration: .2,
      }
    }
  },
  exit: {
    filter: "blur(.7vw)",
    opacity: 0,
    scale: .9,
    transition: {
      scale: {
        duration: .5,
        ease: ease1,

      },
      filter: {
        duration: .5,
        ease: ease1,

      },
      opacity: {
        duration: .3,
        delay: .1,
      }
    }
  },
}
