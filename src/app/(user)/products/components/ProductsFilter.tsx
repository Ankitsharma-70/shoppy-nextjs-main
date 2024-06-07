"use client";
import { Field, Form, Formik } from "formik";
import { api } from "~/utils/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TextInput from "~/components/ui/input/TextInput";
import Button from "~/components/Button";
import { useMemo } from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { sortFilter } from "~/utils/constants/searchFilter";
import CustomDisclosure from "~/components/ui/disclosures/CustomDisclosure";

export const ProductsFilter = () => {
  const router = useRouter();
  const path = usePathname();

  const searchParams = useSearchParams();
  const { data: categories } = api.category.getAll.useQuery();
  const { data: subCategories } = api.subCategory.getAll.useQuery();

  const generateSearchParams = (values: any) => {
    const genSearchParams = new URLSearchParams();
    if (values.name) {
      genSearchParams.append("name", values.name);
    }

    if (values.category && values.category?.length > 0) {
      genSearchParams.append("category", values.category.join("_"));
    }
    if (values.subCategory && values.subCategory?.length > 0) {
      genSearchParams.append("subCategory", values.subCategory.join("_"));
    }
    if (values.sort) {
      genSearchParams.append("sort", values.sort as string);
    }
    router.push(`${path}?${genSearchParams}`);
  };

  const categoryOptions = useMemo(() => {
    return categories?.map((category) => {
      return {
        label: category.name,
        value: category.name,
      };
    });
  }, [categories]);

  const subCategoryOptions = useMemo(() => {
    return subCategories?.map((category) => {
      return {
        label: category.name,
        value: category.name,
        parent: category.category.name,
      };
    });
  }, [subCategories]);

  return (
    <Formik
      initialValues={{
        name: searchParams?.get("name") ? searchParams?.get("name") : undefined,
        sort: searchParams?.get("sort") ? searchParams?.get("sort") : undefined,
        category: searchParams?.get("category")
          ? searchParams?.get("category")?.split("_")
          : undefined,

        subCategory: searchParams?.get("subCategory")
          ? searchParams?.get("subCategory")?.split("_")
          : undefined,
      }}
      onSubmit={(values: any) => {
        generateSearchParams(values);
      }}
      onReset={(values) => {
        values.name = "";
        values.category = [];
        values.subCategory = [];
        values.sort = "";
        generateSearchParams({});
      }}
    >
      {({ values, resetForm }) => (
        <Form className="grid w-full gap-2 ">
          <Button
            variant={"tertiary"}
            type="reset"
            size={"medium"}
            onClick={() => resetForm()}
            className=" ml-auto w-fit text-xs text-gray-700 hover:text-red-600"
          >
            <BsX size={20} />
            Clear Filter
          </Button>
          <Field
            component={TextInput}
            name="name"
            title="Search"
            placeholder="Search by name/brand"
          />

          <CustomDisclosure
            trigger={"Sort"}
            indicator={values.sort ? true : false}
          >
            <div className="space-y-4">
              {Object.entries(sortFilter)
                .map(([key, value]) => {
                  return {
                    label: key,
                    value: value,
                  };
                })
                ?.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center">
                    <Field
                      type="radio"
                      name="sort"
                      value={option.value}
                      id={`sort-${optionIdx}`}
                      className="peer absolute h-4 w-4 rounded border-gray-300 text-brand-600  opacity-0 focus:ring-brand-500  "
                    />
                    <label
                      htmlFor={`sort-${optionIdx}`}
                      className="ml-3 cursor-pointer text-sm capitalize text-gray-700 peer-checked:font-medium peer-checked:text-brand-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
            </div>
          </CustomDisclosure>
          <CustomDisclosure
            trigger={"Category"}
            defaultOpen
            indicator={values.category?.length ? true : false}
          >
            <div className="space-y-4">
              {categoryOptions?.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <Field
                    type="checkbox"
                    name="category"
                    value={option.value}
                    id={`category-${optionIdx}`}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                  <label
                    htmlFor={`category-${optionIdx}`}
                    className="ml-3 cursor-pointer text-sm capitalize text-gray-700"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </CustomDisclosure>
          <CustomDisclosure
            trigger={"Sub Category"}
            defaultOpen
            indicator={values.subCategory?.length ? true : false}
          >
            <div className="space-y-4">
              {subCategoryOptions?.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <Field
                    type="checkbox"
                    name="subCategory"
                    value={option.value}
                    id={`subCategory-${optionIdx}`}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                  <label
                    htmlFor={`subCategory-${optionIdx}`}
                    className="ml-3 cursor-pointer text-sm capitalize text-gray-700"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </CustomDisclosure>
          <Button
            variant={"secondary"}
            size={"medium"}
            type="submit"
            className="mt-4 inline-flex items-center gap-1 text-gray-700 hover:text-brand-500 "
          >
            <BsSearch size={18} />
            Search
          </Button>
        </Form>
      )}
    </Formik>
  );
};
