"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

import './DragSlider.scss'
import { ease } from "@/lib/helpers/ease";

const SliderWrap = ({
  children,
  sliderRef,
  x,
  sliderConstraints,
  bounceStiffness,
  bounceDamping
}) => (
  <div className="slider-wrap">
    <motion.div
      ref={sliderRef}
      drag="x"
      className="slider"
      initial={{ x: 0 }}
      style={{ 
        x,
      }}
      dragConstraints={{
        left: -Math.max(0, sliderConstraints),
        right: 0
      }}
      dragTransition={{ bounceStiffness, bounceDamping }}
      dragElastic={0.2}
    >
      {children}
    </motion.div>
  </div>
);

export const DragSlider = ({
  children,
  bounceStiffness = 1000,
  bounceDamping = 140
}) => {
  const ref = useRef();
  const x = useMotionValue(0);
  const [sliderConstraints, setSliderConstraints] = useState(0);

  const updateConstraints = () => {
    if (!ref.current) return;
    
    const containerWidth = ref.current.parentElement.offsetWidth;
    const contentWidth = ref.current.scrollWidth;
    const newConstraints = contentWidth - containerWidth;
    
    setSliderConstraints(Math.max(0, newConstraints));
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      updateConstraints();
    });

    if (ref.current) {
      updateConstraints();
      resizeObserver.observe(ref.current);
      resizeObserver.observe(ref.current.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <SliderWrap
      sliderRef={ref}
      x={x}
      sliderConstraints={sliderConstraints}
      bounceStiffness={bounceStiffness}
      bounceDamping={bounceDamping}
    >
      {children}
    </SliderWrap>
  );
};