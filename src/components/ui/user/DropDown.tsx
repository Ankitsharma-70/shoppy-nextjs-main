import { Popover } from "@headlessui/react";
import { Category, SubCategory } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const DropDown = ({
  categories,
  subCategories,
}: {
  categories: Category[];
  subCategories:
    | (SubCategory & {
        category: Category;
      })[];
}) => {
  return (
    <Popover className={"relative"}>
      <Popover.Button
        className={
          " font-medium tracking-wider text-gray-700 hover:text-brand-500"
        }
      >
        Categories
      </Popover.Button>
      <Popover.Overlay
        id="as"
        className="fixed inset-0 z-[1] bg-black opacity-30"
      />
      <Popover.Panel className="absolute left-full z-50  mt-5 w-screen max-w-xs -translate-x-1/2 transform px-4 sm:px-0 md:left-1/2 ">
        <div className=" rounded-md bg-white p-4">
          <ul className=" grid gap-2">
            {categories?.map((category) => {
              return (
                <li
                  key={category.id}
                  className="border-b border-gray-300 last:border-none"
                >
                  <Link
                    href={`/products?category=${category.name}`}
                    className=" inline-flex items-center gap-2 duration-300 ease-in-out "
                  >
                    <Image
                      src={category.image.url || ""}
                      width={50}
                      height={50}
                      alt={category.name}
                      className="aspect-square rounded-full"
                    />
                    <h2 className=" font-medium capitalize text-gray-700 hover:text-brand-500 ">
                      {category.name}
                    </h2>
                  </Link>
                  <ul>
                    {subCategories
                      .filter(
                        (subCategory) => subCategory.category.id === category.id
                      )
                      .map((subCategory) => {
                        return (
                          <li key={subCategory.id}>
                            <Link
                              href={`/products?subCategory=${subCategory.name}`}
                              className=" inline-flex items-center gap-2 duration-300 ease-in-out "
                            >
                              <Image
                                src={subCategory.image.url || ""}
                                width={25}
                                height={25}
                                alt={subCategory.name}
                                className="aspect-square rounded-full"
                              />
                              <h2 className=" font-medium capitalize text-gray-700 hover:text-brand-500 ">
                                {subCategory.name}
                              </h2>
                            </Link>{" "}
                          </li>
                        );
                      })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default DropDown;
