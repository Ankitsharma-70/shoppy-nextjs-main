import Image from "next/image";
import Link from "next/link";
import React from "react";
import Loader from "~/components/Loader";
import CustomPopover from "~/components/ui/CustomPopover";
import { prisma } from "~/server/db";

export const revalidate = 60 * 60 * 60 * 24;

const CategoriesDropdown = async () => {
  const categories = await prisma.category.findMany();
  const subCategories = await prisma.subCategory.findMany();
  if (!categories || !subCategories) {
    return <Loader />;
  }
  return (
    <CustomPopover
      key={"categories"}
      button={"Categories"}
      popOverClasses="hidden md:block"
      className="text-sm text-gray-700"
    >
      <ul className=" flex flex-wrap justify-start gap-6 p-4">
        {categories?.map((category) => {
          return (
            <li key={category.name} className="flex w-full max-w-sm gap-4">
              <Image
                src={category.image.url}
                width={200}
                height={200}
                alt={category.name}
                className=" aspect-square h-fit w-20 rounded-md md:w-40"
              />
              <div className="flex flex-col gap-4">
                <Link
                  href={`/products?category=${category.name}`}
                  className="text-xl font-medium capitalize text-gray-900 hover:text-brand-500"
                >
                  {category.name}
                </Link>
                <ul className="flex flex-col gap-2">
                  {subCategories
                    ?.filter(
                      (subcategory) => subcategory.categoryId === category.id
                    )
                    .map((subcategory) => {
                      return (
                        <li key={subcategory.id}>
                          <Link
                            href={`/products?subCategory=${subcategory.name}`}
                            className=" capitalize text-gray-700 hover:text-brand-500"
                          >
                            {subcategory.name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </CustomPopover>
  );
};

export default CategoriesDropdown;
