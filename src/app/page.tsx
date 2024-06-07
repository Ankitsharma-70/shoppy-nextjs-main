import type { Metadata } from "next";
import Collections from "~/components/home/Collections";
import Hero from "~/components/home/Hero";
import HomeCarousel from "~/components/home/HomeCarousel";
import ProductsRow from "~/components/home/ProductsRow";

export const metadata: Metadata = {
  title: "Shoppy Website",
  description: "Website Built with latest Technology in market",
};
const Home = async () => {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Hero />
      <ProductsRow category={"clothing"} title="Clothing" />
      {/* <Collections /> */}
      <HomeCarousel />
      <ProductsRow category={"footware"} title="Footware" />
    </>
  );
};

export default Home;
