"use client";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "~/components/product/ProductCard";
import ProductCardSkeleton from "./product/ProductCardSkeleton";
import type { Product } from "@prisma/client";
const responsive = {
  desktop2: {
    breakpoint: { max: 3000, min: 1249 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1248, min: 1024 },
    items: 4,
  },
  tablet2: {
    breakpoint: { max: 1023, min: 701 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 700, min: 500 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const CustomRightArrow = (props: any) => {
  const {
    onMove,
    onClick,
    carouselState: { currentSlide, deviceType },
  } = props;
  // onMove means if dragging or swiping in progress.
  return (
    <button
      aria-label="Slide Right Carousel"
      className=" absolute  right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-brand-500 duration-300 ease-in-out hover:bg-white/75 "
      onClick={() => onClick()}
    >
      <HiOutlineChevronRight size={24} />
    </button>
  );
};
const CustomLeftArrow = (props: any) => {
  const {
    onMove,
    onClick,
    carouselState: { currentSlide, deviceType },
  } = props;
  // onMove means if dragging or swiping in progress.
  return (
    <button
      aria-label="Slide Left Carousel"
      className=" absolute  left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-brand-500 duration-300 ease-in-out hover:bg-white/75 "
      onClick={() => onClick()}
    >
      <HiOutlineChevronLeft size={24} />
    </button>
  );
};
const ProductsCarousel = ({
  title,
  subtitle,
  products,
}: {
  title: string;
  products: Product[] | undefined;
  subtitle?: string;
}) => {
  const skeletons = [...Array(9).keys()].map((i) => {
    return <ProductCardSkeleton key={i} width="225px" />;
  });

  const skeleton = (
    <div className=" mx-auto grid w-full  max-w-7xl gap-4 ">
      <div className=" h-6 w-[30%] animate-pulse rounded-full bg-slate-200" />
      <div className=" h-2 w-[20%] animate-pulse rounded-full bg-slate-200" />
      <ul className=" grid w-full grid-flow-col gap-4 overflow-scroll py-6 sm:gap-6">
        {skeletons}
      </ul>
    </div>
  );

  return (
    <>
      {products ? (
        <div className=" mx-auto grid w-full  max-w-7xl gap-1 ">
          <h2 className=" bg-textGradient bg-clip-text  px-4 text-[clamp(1.5rem,5vw,2rem)] font-semibold text-transparent">
            {title}
            <span className=" text-brand-500">.</span>
          </h2>
          {subtitle && (
            <p className=" px-4 text-sm font-light  text-gray-700">
              {subtitle}
            </p>
          )}
          <Carousel
            responsive={responsive}
            containerClass=" mx-auto w-full  max-w-7xl pt-2 pb-10"
            itemClass=" grid  place-content-center "
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
            autoPlay
            infinite
            autoPlaySpeed={10000}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {products.map((product) => {
              return (
                <ProductCard product={product} key={product.id} width="225px" />
              );
            })}
          </Carousel>
        </div>
      ) : (
        <>{skeleton}</>
      )}
    </>
  );
};

export default ProductsCarousel;
