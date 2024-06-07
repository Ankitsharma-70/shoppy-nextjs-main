import Image from "next/image";
import Link from "next/link";
import React from "react";
import ScrollAnimation from "../animation/ScrollAnimation";
import { prisma } from "~/server/db";
import Button from "../Button";
export const revalidate = 60 * 60 * 24;
const Hero = async () => {
  const products = await prisma.product.findMany({
    take: 10,
  });
  return (
    <div className="relative overflow-hidden">
      <div className=" py-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static ">
          <div className="max-w-lg">
            <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Summer styles are finally here
            </h1>
            <p className="mt-4 font-light  text-gray-700">
              This year, our new summer collection will shelter you from the
              harsh elements of a world that doesn't care if you live or die.
            </p>
          </div>
          <div>
            <div className="mt-10 ">
              <div className="absolute transform  sm:top-0 sm:translate-x-8 lg:left-[48%] lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <div className=" hidden items-center space-x-6 lg:flex lg:space-x-8">
                  <ScrollAnimation>
                    <div className=" grid w-fit flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      {products.slice(0, 3).map((product) => {
                        return (
                          <Link
                            href={`/products/${product.slug}`}
                            className="h-64 w-48 overflow-hidden rounded-md duration-300 ease-in-out hover:opacity-70 sm:opacity-0 lg:opacity-100"
                            key={product.id}
                          >
                            <Image
                              width={192}
                              height={256}
                              src={product.images[0]?.url || ""}
                              alt={product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation>
                    <div className=" grid w-fit  flex-shrink-0 grid-cols-1 gap-6 gap-y-6 pt-8 lg:gap-y-8">
                      {products.slice(3, 7).map((product) => {
                        return (
                          <Link
                            href={`/products/${product.slug}`}
                            className="h-64 w-48 overflow-hidden rounded-md duration-300 ease-in-out hover:opacity-70 sm:opacity-0 lg:opacity-100"
                            key={product.id}
                          >
                            <Image
                              width={192}
                              height={256}
                              src={product.images[0]?.url || ""}
                              alt={product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation>
                    <div className=" grid flex-shrink-0 grid-cols-1 gap-y-6 pt-6 lg:gap-y-8">
                      {products.slice(7, 10).map((product) => {
                        return (
                          <Link
                            href={`/products/${product.slug}`}
                            className="h-64 w-48 overflow-hidden rounded-md duration-300 ease-in-out hover:opacity-70 sm:opacity-0 lg:opacity-100"
                            key={product.id}
                          >
                            <Image
                              width={192}
                              height={256}
                              src={product.images[0]?.url || ""}
                              alt={product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </ScrollAnimation>
                </div>
              </div>

              <Button
                className=" max-w-fit"
                href="/products"
                variant={"primary"}
                size={"large"}
              >
                Shop Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
