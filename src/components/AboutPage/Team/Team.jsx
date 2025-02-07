"use client";

import React, { useRef } from "react";
import { DragSlider } from "../../../utils/DragSlider/DragSlider";

import "./Team.scss";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function TeamAbout({ data }) {
  const teamImage = useRef()

  const { scrollYProgress } = useScroll({
    target: data?.secondaryImage?.active && teamImage,
    offset: ["0% 100%", "100% 0%"],
    layoutEffect: true,
  });

  const scrollSpring = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 100,
  });

  const filter = useTransform(scrollSpring, [0, 0.3], ["blur(1vw)","blur(0vw)"]);
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%","20%"]);

  return (
    <section className="team" id="team" >
      <div className="team__title container">
        {data?.title}
        {data?.list.length && (
          <span className="number small-text">{data?.list.length}</span>
        )}
      </div>
      <DragSlider>
        {data?.list &&
          data?.list.map((item, key) => (
            <div key={key} className="team-member">
              <div className="team-member__image">
                <Image
                  src={item?.image}
                  fill
                  alt={item?.name}
                  className="team-member__image-item"
                />
              </div>

              <div className="text">
                <p>{item?.name}</p>
                <p>{item?.role}</p>
              </div>
            </div>
          ))}
      </DragSlider>
      {data?.secondaryImage?.active && (
        <div className="team__secondary container">
          <div className="team__secondary-image-wrapper" ref={teamImage} >
            <motion.img
              src={data?.secondaryImage.image}
              style={{ filter, y }}
              alt="team big image"
              className="team__secondary-image"
            />
          </div>
        </div>
      )}
    </section>
  );
}
