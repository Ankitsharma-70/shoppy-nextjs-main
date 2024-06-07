"use client";
import TableData from "~/components/table/TableData";
import TableHeading from "~/components/table/TableHeading";
import { motion } from "framer-motion";
import { motionContainer, motionItem } from "~/utils/animation";
import Badge from "~/components/Badge";
import { api } from "~/utils/api";
import CreateSubCategoryForm from "./forms/CreateSubCategoryForm";
import { BsPatchPlus, BsPencilSquare } from "react-icons/bs";
import UpdateCategoryForm from "./forms/UpdateCategoryForm";
import UpdateSubCategoryForm from "./forms/UpdateSubCategoryForm";
import CustomSidebar from "~/components/ui/CustomSidebar";

const CategoryTable = () => {
  const { data: categories } = api.category.getAll.useQuery(undefined);
  const { data: SubCategories } = api.subCategory.getAll.useQuery(undefined);
  return (
    <motion.table
      variants={motionContainer}
      animate="visible"
      initial="hidden"
      className=" w-full"
    >
      <thead>
        <tr>
          <TableHeading>Categories</TableHeading>
        </tr>
      </thead>
      <tbody>
        {categories?.map((category) => {
          return (
            <motion.tr
              variants={motionItem}
              key={category.id}
              className="duration-300 ease-in-out even:bg-brand-100/25 hover:bg-brand-100"
            >
              <TableData label={"Name"}>
                <div className=" grid justify-end gap-4  md:justify-start">
                  <div className="inline-flex flex-wrap items-center justify-end gap-2 md:justify-start">
                    <h2
                      title="Category Name"
                      className="text-2xl font-medium capitalize text-gray-900"
                    >
                      {category.name}
                    </h2>

                    <CustomSidebar
                      key={category.id}
                      button={
                        <>
                          <BsPencilSquare />
                        </>
                      }
                      title="Update Category"
                      sidebarSize="xxLarge"
                    >
                      <UpdateCategoryForm category={category} />
                    </CustomSidebar>
                  </div>

                  <p
                    className="text-xs capitalize text-gray-700"
                    title="Category Description"
                  >
                    {category.description}
                  </p>

                  <div className="flex flex-wrap justify-end gap-2 md:justify-start">
                    {SubCategories?.filter(
                      (subCategory) => subCategory.category.id === category.id
                    ).map((subCategory) => {
                      return (
                        <CustomSidebar
                          key={subCategory.id}
                          title="Update Sub Category"
                          button={
                            <>
                              <Badge
                                key={subCategory.id}
                                variant={"amber"}
                                size={"small"}
                              >
                                {subCategory.name}
                              </Badge>
                            </>
                          }
                          sidebarSize="xxLarge"
                        >
                          <UpdateSubCategoryForm
                            subCategory={subCategory}
                            categories={categories}
                          />
                        </CustomSidebar>
                      );
                    })}
                    <CustomSidebar
                      button={
                        <>
                          <BsPatchPlus /> Add New
                        </>
                      }
                      title="Create Sub Category"
                      variant={"tertiary"}
                      size={"noStyle"}
                      className=" rounded-full bg-brand-500 px-4 py-[2px] text-xs text-white"
                      sidebarSize="xxLarge"
                    >
                      <CreateSubCategoryForm categories={categories} />
                    </CustomSidebar>
                  </div>
                </div>
              </TableData>
            </motion.tr>
          );
        })}
      </tbody>
    </motion.table>
  );
};

export default CategoryTable;
