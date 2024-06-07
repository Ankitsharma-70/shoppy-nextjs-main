"use client";
import { motion } from "framer-motion";
import React from "react";

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.5 * i,
    },
  }),
};
const child = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 190,
  },
};

const AnimatedText = ({ text = "Text" }: { text: string }) => {
  return (
    <motion.h2
      variants={container}
      whileHover="visible"
      className=" flex overflow-hidden py-4  text-6xl font-semibold"
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((t, i) => {
        return (
          <motion.span variants={child} style={{ marginRight: "5px" }} key={i}>
            {t}
          </motion.span>
        );
      })}
    </motion.h2>
  );
};

export default AnimatedText;
