"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
const marqueeVariants = {
  animate: {
    y: ["-25%", "0%"],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
      type: "spring",
    },
  },
};

interface props {
  children: ReactNode;
}

const ScrollAnimation = ({ children }: props) => {
  return (
    <motion.div
      variants={marqueeVariants}
      animate="animate"
      className="grid gap-6"
    >
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>{" "}
      <span aria-hidden="true">{children}</span>{" "}
      <span aria-hidden="true">{children}</span>
    </motion.div>
  );
};

export default ScrollAnimation;
