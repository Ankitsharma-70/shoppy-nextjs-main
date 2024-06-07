import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Lightbox from "react-spring-lightbox";
import { motionContainer, motionItem } from "~/utils/animation";
import type { ImageType } from "./ImageCarousel";
import { BsArrowLeftShort, BsArrowRightShort, BsX } from "react-icons/bs";
import Button from "~/components/Button";

const ImageLightBox = ({
  images,
  isOpen,
  setIsOpen,
  currentImageIndex,
  setCurrentIndex,
}: {
  images: ImageType[];
  isOpen: boolean;
  currentImageIndex: number;
  setIsOpen: (arg: boolean) => void;
  setCurrentIndex: (arg: number) => void;
}) => {
  const goToPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);
  const goToNext = () =>
    currentImageIndex + 1 < images.length &&
    setCurrentIndex(currentImageIndex + 1);
  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Lightbox
      isOpen={isOpen}
      onPrev={goToPrevious}
      onNext={goToNext}
      images={images.map((image: ImageType) => {
        return {
          src: image.url,
          alt: "product image",
        };
      })}
      currentIndex={currentImageIndex}
      /* Add your own UI */
      renderHeader={() => (
        <LightBoxHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      renderFooter={() => (
        <LightBoxFooter
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentImageIndex}
          images={images}
        />
      )}
      renderPrevButton={() => (
        <LightBoxLeftArrowButton
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentImageIndex}
        />
      )}
      renderNextButton={() => (
        <LightBoxRightArrowButton
          imagesLength={images.length}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentImageIndex}
        />
      )}
      // renderImageOverlay={() => (<ImageOverlayComponent >)}

      /* Add styling */
      className=" bg-black/25 backdrop-blur-sm"
      // style={{ background: "grey" }}
      /* Handle closing */
      onClose={handleClose}
      /* Use single or double click to zoom */
      singleClickToZoom
      /* react-spring config for open/close animation */
      pageTransitionConfig={{
        from: { transform: "scale(0.75)", opacity: 0 },
        enter: { transform: "scale(1)", opacity: 1 },
        leave: { transform: "scale(0.75)", opacity: 0 },
        config: { mass: 1, tension: 320, friction: 32 },
      }}
    />
  );
};

export default ImageLightBox;
const LightBoxHeader = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}) => {
  return (
    <Button
      variant={"tertiary"}
      size={"noStyle"}
      title="Close Slider"
      onClick={() => setIsOpen(!isOpen)}
      className="absolute top-4 right-4 z-30 cursor-pointer rounded-full bg-brand-500 p-2 text-white"
    >
      <BsX size={20} className="stroke-1 text-white" />
    </Button>
  );
};
const LightBoxFooter = ({
  images,
  setCurrentIndex,
  currentIndex,
}: {
  setCurrentIndex: (arg: number) => void;
  currentIndex: number;
  images: ImageType[];
}) => {
  return (
    <motion.ul
      variants={motionContainer}
      initial="hidden"
      animate="visible"
      className=" customScroll z-10 mx-auto flex w-fit max-w-full gap-4 overflow-auto px-4 py-2 pb-4"
    >
      {images.map((image: ImageType, index: number) => {
        return (
          <motion.li
            whileHover={{
              scale: 1.1,
              opacity: 0.9,
            }}
            variants={motionItem}
            key={index}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={image.url}
              width={50}
              height={50}
              alt="image"
              className={` ${
                currentIndex === index ? "opacity-100" : "opacity-50"
              } aspect-square max-w-[3rem] cursor-pointer overflow-hidden rounded-md object-cover ring-brand-500 transition-all duration-500 ease-in-out hover:ring-1`}
            />
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

const LightBoxLeftArrowButton = ({
  setCurrentIndex,
  currentIndex,
}: {
  setCurrentIndex: (arg: number) => void;
  currentIndex: number;
}) => {
  return (
    <Button
      variant={"tertiary"}
      size={"noStyle"}
      onClick={() => {
        if (currentIndex > 0) {
          setCurrentIndex((currentIndex = currentIndex - 1));
        }
      }}
      className=" z-30  ml-4 h-fit rounded-full bg-brand-500 p-2 "
    >
      <BsArrowLeftShort size={20} className=" stroke-1 text-white" />
    </Button>
  );
};

const LightBoxRightArrowButton = ({
  setCurrentIndex,
  currentIndex,
  imagesLength,
}: {
  setCurrentIndex: (arg: number) => void;
  currentIndex: number;
  imagesLength: number;
}) => {
  return (
    <Button
      variant={"tertiary"}
      size={"noStyle"}
      onClick={() => {
        if (currentIndex < imagesLength - 1) {
          setCurrentIndex((currentIndex = currentIndex + 1));
        }
      }}
      className=" z-30  mr-4 h-fit rounded-full bg-brand-500 p-2 "
    >
      <BsArrowRightShort
        size={20}
        className=" translate-x-[1px] stroke-1 text-white"
      />
    </Button>
  );
};
