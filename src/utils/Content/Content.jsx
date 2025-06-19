"use client";
import { motion } from "framer-motion";
import React from "react";

export const Content = ({ url, urlMobile= false, lazy = true, ...rest }) => {
  const isVideo = url.match(/\.(mp4|webm)$/) != null;


  const ContentElement = isVideo ? (
    <motion.video
      loop
      muted
      autoPlay
      webkit-playsinline="true"
      playsInline
      {...rest}
      width="100%"
      height="100%"
    >
      <source src={url} />
    </motion.video>
  ) : (
    <motion.img src={url} width="100%"
    height="100%" {...rest} />
  );

  return (
    ContentElement
  );
};
