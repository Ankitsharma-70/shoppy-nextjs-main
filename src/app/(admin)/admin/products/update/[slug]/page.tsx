import React from "react";
import { PageWrapper } from "~/components/wrapper/PageWrapper";
import UpdateProductForm from "./components/UpdateProductForm";
import { prisma } from "~/server/db";

interface Props {
  params: {
    slug: string;
  };
}

const page = async ({ params: { slug } }: Props) => {
  const product = await prisma.product.findFirst({
    where: {
      slug: {
        contains: slug,
      },
    },
  });
  if (!product) {
    return null;
  }
  return (
    <PageWrapper className="py-10">
      <UpdateProductForm product={product} />
    </PageWrapper>
  );
};

export default page;
