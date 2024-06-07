"use client";
import ProductsCarousel from "~/components/ProductsCarousel";
import { api } from "~/utils/api";

const RelatedProduct = ({ categoryId }: { categoryId: string }) => {
  const { data: products } = api.product.relatedProducts.useQuery({
    id: categoryId,
  });

  return (
    <>
      <ProductsCarousel products={products} title="Related Products" />
    </>
  );
};

export default RelatedProduct;
