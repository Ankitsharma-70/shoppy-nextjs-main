"use client";
import React, { useState, useEffect } from "react";

const AnimatedHeader = ({ children }: { children: React.ReactNode }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.pageYOffset > 100);
      setInView(window.pageYOffset > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={` z-50 w-full bg-white  px-4 ${
        isSticky ? "sticky -top-[200px] " : " "
      } ${
        inView
          ? "top-[0px]  transition-all duration-[1000ms] ease-in-out"
          : " -top-[200px] bg-white  transition-all  duration-[1000ms] ease-in-out "
      }`}
    >
      {children}
    </header>
  );
};

export default AnimatedHeader;
