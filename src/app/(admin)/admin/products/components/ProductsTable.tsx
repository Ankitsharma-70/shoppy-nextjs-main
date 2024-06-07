import { BiRupee } from "react-icons/bi";
import Badge from "~/components/Badge";
import Button from "~/components/Button";
import TableData from "~/components/table/TableData";
import TableHeading from "~/components/table/TableHeading";
import { motionContainer, motionItem } from "~/utils/animation";
import { priceFormat } from "~/utils/lib";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type {
  Category,
  Collection,
  Product,
  SubCategory,
} from "@prisma/client";
import { BsArrowUpRight } from "react-icons/bs";
import Modal from "~/components/modals/Modal";

const ProductsTable = ({
  products,
}: {
  products: (Product & {
    category: Category;
    subCategory: SubCategory;
    collections: Collection[];
  })[];
}) => {
  return (
    <motion.table
      variants={motionContainer}
      animate="visible"
      initial="hidden"
      className=" w-full"
    >
      <thead>
        <tr>
          <TableHeading>Name</TableHeading>
          <TableHeading>Price</TableHeading>
          <TableHeading>InStock</TableHeading>
          <TableHeading centerText>Action</TableHeading>
        </tr>
      </thead>
      <tbody>
        {products?.map((p) => {
          return (
            <motion.tr
              variants={motionItem}
              key={p.id}
              className=" duration-300 ease-in-out even:bg-brand-100/25 hover:bg-brand-100"
            >
              <TableData label={"name"}>
                <div className=" inline-flex items-center gap-4 md:flex">
                  <Image
                    src={p.images[0]?.url ?? ""}
                    alt={p.name}
                    width={100}
                    height={100}
                    className=" aspect-square w-20 rounded-md object-cover"
                  />
                  <div className="grid gap-2 ">
                    <p className="text-xs capitalize text-gray-700">
                      {p.brand}
                    </p>
                    <Link
                      href={`/products/${p.slug}`}
                      className=" text-sm capitalize text-gray-900 hover:text-brand-500"
                      target="_blank"
                    >
                      {p.name}
                    </Link>
                    <p className="inline-flex gap-2 text-xs capitalize text-gray-700">
                      <Badge
                        variant={"brand"}
                        size={"small"}
                        key={p.category.id}
                      >
                        {p.category.name}{" "}
                      </Badge>
                      <Badge
                        variant={"amber"}
                        size={"small"}
                        key={p.subCategory.id}
                      >
                        {p.subCategory.name}{" "}
                      </Badge>
                      {p.collections.length > 0 && (
                        <>
                          {p.collections.map((collection) => {
                            return (
                              <Badge
                                key={collection.id}
                                variant={"green"}
                                size={"small"}
                              >
                                {collection.name}
                              </Badge>
                            );
                          })}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </TableData>
              <TableData label={"price"}>
                <div className=" inline-grid ">
                  <p className="inline-flex items-center gap-2 text-sm text-gray-700">
                    C : <BiRupee />
                    {priceFormat(p.price)}
                  </p>
                  <p className="inline-flex items-center gap-2 text-sm text-gray-700">
                    O : <BiRupee />
                    {priceFormat(p.originalPrice)}
                  </p>
                </div>
              </TableData>
              <TableData label={"inStock"}>
                <div className=" inline-flex items-center gap-2 md:flex">
                  <Modal
                    trigger={
                      <Badge
                        variant={p.isInStock ? "green" : "red"}
                        size={"small"}
                      >
                        {p.isInStock ? "InStock" : "Out of Stock"}
                      </Badge>
                    }
                    triggerSize={"noStyle"}
                    triggerVariant={"tertiary"}
                    bodyContent={
                      <div className=" grid ">
                        <p className="grid w-full grid-cols-2 py-2  text-center text-gray-700 ">
                          <span> Size </span>
                          <span>Quantity</span>
                        </p>
                        {p.sizes.map((s) => {
                          return (
                            <p
                              key={s.title}
                              className="grid w-full grid-cols-2 py-2  text-center text-gray-700 even:bg-brand-100 "
                            >
                              <span> {s.title} </span>
                              <span>{s.quantity}</span>
                            </p>
                          );
                        })}
                      </div>
                    }
                  />
                  <p className=" text-xs text-gray-700">{p.inStock}</p>
                </div>
              </TableData>
              <TableData label={"Action"}>
                <div className="flex justify-end md:justify-center">
                  <Button
                    variant={"tertiary"}
                    size={"noStyle"}
                    title="Update/edit in new Page"
                    target="_blank"
                    href={`/admin/products/update/${p.slug}`}
                  >
                    <BsArrowUpRight />
                  </Button>
                </div>
              </TableData>
            </motion.tr>
          );
        })}
      </tbody>
    </motion.table>
  );
};
export default ProductsTable;
