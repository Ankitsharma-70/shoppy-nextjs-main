"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
const HomeCarousel = () => {
  return (
    <Carousel
      className=" mx-auto max-w-7xl"
      showThumbs={false}
      showIndicators={false}
      autoPlay
      infiniteLoop={true}
      showStatus={false}
      showArrows={false}
    >
      <div>
        <Image
          width={1280}
          height={640}
          alt="3"
          src="/assets/images/img1.webp"
        />
      </div>
      <div>
        <Image
          width={1280}
          height={640}
          alt="3"
          src="/assets/images/img2.webp"
        />
      </div>
      <div>
        <Image
          width={1280}
          height={640}
          alt="3"
          src="/assets/images/img3.webp"
        />
      </div>
    </Carousel>
  );
};

export default HomeCarousel;
