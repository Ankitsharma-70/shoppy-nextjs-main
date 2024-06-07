import React from "react";
import WishlistProductList from "./components/WishlistProductList";
import { PageWrapper } from "~/components/wrapper/PageWrapper";
import PageHeading from "~/components/PageHeading";
import Breadcrumbs from "~/components/BreadCrumbs";

const page = () => {
  return (
    <PageWrapper>
      <Breadcrumbs replaceCharacterList={[{ from: "-", to: " " }]} />
      <PageHeading title="Your Favorite Items" />
      <WishlistProductList />
    </PageWrapper>
  );
};

export default page;
