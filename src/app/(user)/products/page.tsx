"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "~/components/product/ProductCard";
import { api } from "~/utils/api";
import { ProductsFilter } from "./components/ProductsFilter";
import Pagination from "./components/Pagination";
import type { Product } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCardSkeleton from "~/components/product/ProductCardSkeleton";
import { motion } from "framer-motion";
import { motionContainer } from "~/utils/animation";
import MobileFilter from "./components/MobileFilter";
import { PageWrapper } from "~/components/wrapper/PageWrapper";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchOptions, setSearchOptions] = useState({
    name: "",
    category: "",
    subCategory: "",
  });
  const paramPage = searchParams?.get("page");
  const paramName = searchParams?.get("name");
  const paramCategory = searchParams?.get("category");
  const paramSubCategory = searchParams?.get("subCategory");
  const [page, setPage] = useState(paramPage ? parseInt(paramPage) : 1);
  const [hasMore, setHasMore] = useState(false);
  const getSearchProducts = api.product.getSearchProducts.useMutation();
  const [products, setProducts] = useState<Product[]>();

  const fetchProducts = async () => {
    const data = await getSearchProducts.mutateAsync({
      name: paramName ? paramName : "",
      category: paramCategory ? paramCategory : "",
      subCategory: paramSubCategory ? paramSubCategory : "",
      page: page - 1,
    });
    setProducts(data.products);
    setHasMore(data.hasMore);
  };

  const generateSearchParams = () => {
    const genSearchParams = new URLSearchParams();
    if (searchOptions.category) {
      genSearchParams.append("category", searchOptions.category);
    }
    if (searchOptions.subCategory) {
      genSearchParams.append("subCategory", searchOptions.subCategory);
    }
    if (searchOptions.name) {
      genSearchParams.append("name", searchOptions.name);
    }
    if (page) {
      genSearchParams.append("page", page.toString());
    }
    router.push(`/products?${genSearchParams}`);
  };
  useEffect(() => {
    generateSearchParams();
  }, [searchOptions, page]);

  useEffect(() => {
    fetchProducts();
  }, [paramCategory, paramSubCategory, paramName, page]);
  const skeletons = [...Array(9).keys()].map((i) => {
    return <ProductCardSkeleton key={i} />;
  });
  return (
    <PageWrapper className="flex">
      <div className="hidden h-fit w-[325px] rounded-md bg-white p-4  shadow-2xl shadow-brand-100/25 md:grid">
        <ProductsFilter />
      </div>

      <MobileFilter />

      <div className=" flex-1 ">
        {!getSearchProducts.isLoading ? (
          <motion.ul
            animate="visible"
            variants={motionContainer}
            initial="hidden"
            className=" grid  w-full grid-cols-[repeat(auto-fit,clamp(120px,43vw,300px))] justify-center gap-2 sm:gap-4"
          >
            {products?.map((product) => {
              return (
                <ProductCard openInNewTab product={product} key={product.id} />
              );
            })}
          </motion.ul>
        ) : (
          <ul className=" grid  w-full grid-cols-[repeat(auto-fit,clamp(120px,40vw,250px))] justify-center gap-4 sm:gap-6">
            {skeletons}
          </ul>
        )}

        <Pagination next={hasMore} page={page} setPage={setPage} />
      </div>
    </PageWrapper>
  );
};

export default ProductsPage;
