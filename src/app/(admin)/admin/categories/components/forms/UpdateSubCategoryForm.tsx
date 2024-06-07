"use client";
import type { Category, SubCategory } from "@prisma/client";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { toast } from "react-hot-toast";
import { BsPlus, BsXSquare } from "react-icons/bs";
import Button from "~/components/Button";
import ImageUpload from "~/components/inputs/ImageUpload";
import SelectV1 from "~/components/inputs/SelectV1";
import TextInput from "~/components/inputs/TextInput";
import CustomSelect from "~/components/ui/input/CustomSelect";
import { api } from "~/utils/api";
interface Values {
  name: string;
  slug: string;
  description: string;
  image: {
    url: string;
    cloudinaryId: string;
  };
  categoryId: string;
  sizeOptions: string[];
}
const UpdateSubCategoryForm = ({
  subCategory,
  categories,
}: {
  categories: Category[];
  subCategory: SubCategory;
}) => {
  const ctx = api.useContext();

  const updateSubCategory = api.subCategory.update.useMutation({
    onError: (e) => {
      toast.error(`${e.message}`);
    },
    onSuccess: () => {
      toast.success("Updated Successfully");
      ctx.subCategory.getAll.invalidate();
    },
  });

  const deleteSubCategory = api.subCategory.delete.useMutation({
    onError: (e) => {
      toast.error(`${e.message}`);
    },
    onSuccess: () => {
      toast.success("Deleted Successfully");
      ctx.subCategory.getAll.invalidate();
    },
  });

  return (
    <Formik
      initialValues={{
        name: subCategory.name,
        slug: subCategory.slug,
        description: subCategory.description || "",
        image: {
          url: subCategory.image.url,
          cloudinaryId: subCategory.image.cloudinaryId,
        },
        categoryId: subCategory.categoryId,
        sizeOptions: subCategory.sizeOptions,
      }}
      onSubmit={(values: Values) => {
        void updateSubCategory.mutateAsync({
          id: subCategory.id,
          name: values.name,
          slug: values.slug,
          description: values.description,
          image: {
            cloudinaryId: values.image.cloudinaryId,
            url: values.image.url,
          },
          categoryId: values.categoryId,
          sizeOptions: values.sizeOptions,
        });
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className=" grid w-full gap-4">
          {categories && (
            <Field
              component={CustomSelect}
              title="Main Category"
              name="categoryId"
              options={categories.map((category) => {
                return {
                  label: category.name,
                  value: category.id,
                };
              })}
            />
          )}
          <div className=" grid gap-4 md:grid-cols-2">
            <Field
              component={TextInput}
              title="name"
              name="name"
              placeholder="T shirt"
            />
            <Field
              component={TextInput}
              title="Slug"
              name="slug"
              placeholder="t-shirt"
            />
          </div>
          <Field
            component={TextInput}
            title="Description"
            name="description"
            placeholder="A short Description"
          />

          <ImageUpload
            onChange={(info) => {
              setFieldValue(`image.url`, info.secure_url),
                setFieldValue(`image.cloudinaryId`, info.public_id);
            }}
            value={values?.image.url || ""}
          />
          <Field
            component={TextInput}
            title="Image Cloudinary Url"
            name="image.url"
            placeholder="Cloudinary Url"
          />
          <Field
            component={TextInput}
            title="Image Cloudinary Id"
            name="image.cloudinaryId"
            placeholder="Cloudinary Id"
          />
          <FieldArray name="sizeOptions">
            {({ remove, push }) => (
              <div className=" my-6 grid gap-4 p-2  pb-6">
                <Button
                  variant={"secondary"}
                  size={"small"}
                  className=" ml-auto w-fit text-xs text-gray-900"
                  type="button"
                  onClick={() => push("")}
                >
                  <p>Add Size Option</p> <BsPlus />
                </Button>
                {values.sizeOptions.length > 0 &&
                  values.sizeOptions.map((size, index) => (
                    <div
                      className="grid h-fit  grid-cols-[1fr_auto] items-center gap-4 rounded-md bg-white shadow-2xl shadow-brand-100/25"
                      key={index}
                    >
                      <div className="grid ">
                        <label
                          className=" pb-1  text-sm capitalize text-gray-700"
                          htmlFor={`sizeOptions.${index}`}
                        >
                          Size {index + 1}
                        </label>
                        <Field
                          name={`sizeOptions.${index}`}
                          placeholder="Size"
                          type="text"
                          className={`w-full rounded-md bg-white py-2 pl-4 text-base font-normal text-gray-900 ring-1 ring-brand-100 placeholder:text-sm placeholder:italic placeholder:text-slate-400  focus:outline-none focus:ring-2 focus:ring-brand-500 `}
                        />
                        <ErrorMessage
                          name={`sizeOptions.${index}`}
                          component="div"
                          className="  py-1 pl-2 text-xs  text-red-500"
                        />
                      </div>

                      <Button
                        type="button"
                        variant={"tertiary"}
                        size={"noStyle"}
                        disabled={
                          index === 0 && values.sizeOptions.length === 1
                        }
                        title="Remove Image"
                        onClick={() => remove(index)}
                        className="self-start text-red-500 hover:text-red-300"
                      >
                        <BsXSquare size={20} />
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </FieldArray>
          <div className=" grid gap-4 md:grid-cols-2 ">
            <Button
              variant={"danger"}
              size={"medium"}
              loading={deleteSubCategory.isLoading}
              onClick={() => {
                deleteSubCategory.mutateAsync({
                  id: subCategory.id,
                });
              }}
              disabled={deleteSubCategory.isLoading}
              type="button"
              className="mt-4"
            >
              Delete
            </Button>
            <Button
              variant={"secondary"}
              size={"medium"}
              loading={updateSubCategory.isLoading}
              disabled={updateSubCategory.isLoading}
              type="submit"
              className="mt-4"
            >
              Create
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateSubCategoryForm;
