"use client";

import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ImageLightBox from "./ImageLightBox";

export type ImageType = {
  cloudinaryId: string;
  url: string;
};

const ImageCarousel = ({ images }: { images: ImageType[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentIndex] = useState(0);

  const handleOpenLightbox = (index: number) => {
    setIsOpen(true);
    setCurrentIndex(index);
  };

  return (
    <div className="grid place-content-center">
      <Carousel
        className="productCarousel"
        infiniteLoop={true}
        autoPlay={isOpen === true ? false : true}
        showIndicators={false}
        swipeable={true}
        showStatus={false}
        thumbWidth={60}
        showArrows={false}
        onClickItem={(index) => handleOpenLightbox(index)}
      >
        {images?.map((image) => {
          return (
            <img
              className="aspect-square object-cover"
              src={image.url}
              alt={image.cloudinaryId}
              key={image.cloudinaryId}
            />
          );
        })}
      </Carousel>
      {isOpen && (
        <ImageLightBox
          isOpen={isOpen}
          currentImageIndex={currentImageIndex}
          setCurrentIndex={setCurrentIndex}
          setIsOpen={setIsOpen}
          images={images}
        />
      )}
    </div>
  );
};

export default ImageCarousel;
