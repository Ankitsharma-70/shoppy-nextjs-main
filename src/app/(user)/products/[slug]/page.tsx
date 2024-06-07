import { prisma } from "~/server/db";
import NotFound from "~/app/not-found";
import Breadcrumbs from "~/components/BreadCrumbs";
import ImageCarousel from "./components/ImageCarousel";
import ProductHeader from "./components/ProductHeader";
import ProductAddToCart from "./components/ProductAddToCart";
import RelatedProduct from "./components/RelatedProduct";
import HtmlRenderDisclosure from "~/components/ui/disclosures/HtmlRenderDisclosure";
interface Params {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params: { slug } }: Params) {
  const product = await prisma.product.findUnique({
    where: {
      slug: slug,
    },
  });
  return {
    title: product?.name,
    description: "Website Built with latest Technology in market",
  };
}

const Product = async ({ params: { slug } }: Params) => {
  const product = await prisma.product.findUnique({
    where: {
      slug: slug,
    },
    include: {
      category: true,
      subCategory: true,
      collections: true,
    },
  });
  if (!product) {
    return <NotFound />;
  }
  return (
    <div className=" mx-auto grid max-w-7xl px-4  pb-20 md:px-0 ">
      <Breadcrumbs
        omitRootLabel
        replaceCharacterList={[{ from: "-", to: " " }]}
      />
      <div className=" relative mx-auto grid h-full w-full max-w-7xl items-start gap-6 pb-10 md:grid-cols-[60%_1fr]">
        <ImageCarousel images={product.images} />
        <div className="grid h-full w-full content-start items-start gap-6 pb-10 md:px-4">
          <ProductHeader product={product} />
          <ProductAddToCart product={product} />
          <HtmlRenderDisclosure
            title="Product Details"
            content={product.description}
            defaultOpen
          />
          <HtmlRenderDisclosure
            title="Shipping"
            content={"All over India Free Delivery on order worth above 1500rs"}
          />
          <HtmlRenderDisclosure
            title="Return & Cancel"
            content={"All over India Free Delivery on order worth above 1500rs"}
          />
        </div>
      </div>
      <RelatedProduct categoryId={product.category.id} />
    </div>
  );
};

export default Product;
