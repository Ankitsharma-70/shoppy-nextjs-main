export const motionContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

export const motionItem = {
  hidden: { opacity: 0, scale: 1 },
  visible: {
    opacity: 1,
  },
};
