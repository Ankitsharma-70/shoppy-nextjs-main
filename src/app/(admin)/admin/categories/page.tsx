import CreateCategoryForm from "./components/forms/CreateCategoryForm";
import { PageWrapper } from "~/components/wrapper/PageWrapper";
import CreateCollectionForm from "./components/forms/CreateCollectionForm";
import CategoryTable from "./components/CategoryTable";
import SectionWrapper from "~/components/wrapper/SectionWrapper";
import CollectionTable from "./components/CollectionTable";
import { BsCollection, BsDiagram3 } from "react-icons/bs";
import CustomSidebar from "~/components/ui/CustomSidebar";

const ListCategory = () => {
  return (
    <PageWrapper className="mx-auto grid  content-start gap-10 py-10 ">
      <SectionWrapper>
        {/* Create Category Sidebar  */}
        <CustomSidebar
          button={
            <>
              <BsDiagram3 /> Create Category
            </>
          }
          title="Create Category"
          variant={"secondary"}
          size={"medium"}
          className="ml-auto"
          sidebarSize="xxLarge"
        >
          <CreateCategoryForm />
        </CustomSidebar>

        <CategoryTable />
      </SectionWrapper>
      <SectionWrapper>
        <CustomSidebar
          button={
            <>
              <BsCollection /> Create Collection
            </>
          }
          title="Create Collection"
          variant={"secondary"}
          size={"medium"}
          className="ml-auto"
          sidebarSize="xxLarge"
        >
          <CreateCollectionForm />
        </CustomSidebar>

        <CollectionTable />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default ListCategory;
