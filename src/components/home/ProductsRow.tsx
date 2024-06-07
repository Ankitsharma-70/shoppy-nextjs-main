"use client";
import React from "react";
import ProductsCarousel from "../ProductsCarousel";
import { api } from "~/utils/api";

const ProductsRow = ({
  title,
  subtitle,
  category,
}: {
  title: string;
  subtitle?: string;
  category: string;
}) => {
  const { data: products } = api.product.getProductByCategory.useQuery({
    category: category,
  });
  return (
    <ProductsCarousel products={products} title={title} subtitle={subtitle} />
  );
};

export default ProductsRow;
