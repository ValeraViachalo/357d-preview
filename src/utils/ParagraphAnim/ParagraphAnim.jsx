"use client";

import { useState } from "react";
import { SplitText } from "@cyriacbr/react-split-text";
import { motion } from "framer-motion";
import { presenceAnim, TitlePresence } from "@/lib/helpers/anim";

const ParagraphAnim = ({ text, isActive, index = 0, duration = 0.6 }) => {

  return (
    <>
      {/* {!isAnimationEnded ? ( */}
        <SplitText
          LineWrapper={({ lineIndex, children }) => (
            <motion.p
              {...presenceAnim(TitlePresence, isActive)}
              custom={{ id: lineIndex + index, duration }}
              className="wrapper"
              // onAnimationComplete={() => setIsAnimationEnded(true)}
            >
              {children}
            </motion.p>
          )}
        >
          {text}
        </SplitText>
      {/* ) : (
      )} */}
      <p className="sr-only">{text}</p>
    </>
  );
};

export default ParagraphAnim;
