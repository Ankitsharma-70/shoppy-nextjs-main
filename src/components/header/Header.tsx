import Button from "../Button";
import AnimatedHeader from "./AnimatedHeader";
import CategoriesDropdown from "./components/CategoriesDropdown";
import ClientSideHeader from "./components/ClientSideHeader";

const Header = () => {
  return (
    <AnimatedHeader>
      <nav className=" relative mx-auto flex w-full max-w-7xl items-center justify-between py-3">
        <div className=" flex items-center gap-10">
          <Button
            href={"/"}
            variant={"tertiary"}
            size={"noStyle"}
            className=" inline-flex  gap-1 text-xl font-medium tracking-tight text-brand-500 transition-all duration-300 ease-in-out hover:text-brand-600 md:text-3xl"
          >
            Shoppy
          </Button>
          {/* @ts-expect-error Async Server Component */}
          <CategoriesDropdown />
        </div>

        <div className="flex items-center gap-4">
          <ClientSideHeader />
        </div>
      </nav>
    </AnimatedHeader>
  );
};

export default Header;
