import { ease } from "./ease";

export const anim = (variants) => {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
};

export const presenceAnim = (variants, state) => {
  return {
    initial: "initial",
    animate: state ? "animate" : "initial",
    variants,
  };
};

export const TitlePresence = {
  initial: {
    clipPath: "inset(0% -20% 100% -20%)",
    y: "100%",
  },
  animate: (param = { id: 0, duration: 1 }) => ({
    clipPath: "inset(0% -20% -20% -20%)",
    y: "0%",
    transition: {
      duration: param.duration,
      ease: ease.inOutCirc,
      delay: ((param.id + 1) * 0.1),
    },
    transitionEnd: {
      clipPath: "none",
      y: "auto",
    }
  }),
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    y: "100%",
  },
};

export const BluredPresence = {
  initial: {
    opacity: 0,
    filter: 'blur(0.4vw)'
  },
  animate: (param = { id: 0, duration: 1 }) => ({
    opacity: 1,
    filter: 'blur(0vw)',
    transition: {
      duration: param.duration,
      ease: ease.inOutCirc,
      delay: ((param.id + 1) * 0.1),
    },
    transitionEnd: {
      filter: 'none',
    }
  }),
  exit: {
    opacity: 0,
    filter: 'blur(0.4vw)'
  },
  scaled: {
    initial: {
      opacity: 0,
      filter: 'blur(0.4vw)',
      scale: 1.2,
    },
    animate: (param = { id: 0, duration: 0.6 }) => ({
      opacity: 1,
      filter: 'blur(0vw)',
      scale: 1,
      transition: {
        duration: param.duration,
        ease: ease.inOutCirc,
        delay: ((param.id * 0.8) * 0.001),
      },
      transitionEnd: {
        filter: 'none',
      }
    }),
    exit: {
      opacity: 0,
      scale: 1,
      filter: 'blur(0.4vw)'
    },
  }
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

export const ProjectsAnim = {
  wrapper: {
    initial: {
      clipPath: "inset(0 0 100% 0)",
    },
    animate: {
      clipPath: "inset(0 0 0% 0)",
      transition: {
        duration: 1,
        ease: ease.inOutCirc,
      },
    },
    exit: {
      clipPath: "inset(0 0 100% 0)",
      transition: {
        duration: 1,
        ease: ease.inOutCirc,
      },
    },  
  },
  card: {
    initial: {
      opacity: 0,
    },
    animate: (i) => ({
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.12 * i,
      },
    }),
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  },
}

