"use client";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { useState } from "react";
import TextInput from "~/components/ui/input/TextInput";
import { api } from "~/utils/api";
import { BiPlus } from "react-icons/bi";
import { toast } from "react-hot-toast";
import RichTextEditor from "~/components/inputs/RichTextEditor";
import ImageUpload from "~/components/inputs/ImageUpload";
import Button from "~/components/Button";
import { Gender } from "@prisma/client";
import { BsXSquare } from "react-icons/bs";
import CustomSelect from "~/components/ui/input/CustomSelect";
import { ProductFormValidation } from "~/utils/FormValidation";

const ListProductForm = () => {
  const { data: categories } = api.category.getAll.useQuery();
  const { data: collections } = api.collection.getAll.useQuery();
  const { data: subCategories } = api.subCategory.getAll.useQuery();
  const listProduct = api.product.list.useMutation({
    onSuccess: () => {
      toast.success("Listed Successfully");
    },
    onError: (e) => {
      toast.error(`${e.message}`);
    },
  });

  const [description, setDescription] = useState("Product Description");

  const handleListProduct = (values: ProductForm) => {
    void listProduct.mutateAsync({
      name: values.name,
      description: description,
      brand: values.brand,
      slug: values.slug,
      categoryId: values.categoryId,
      subCategoryId: values.subCategoryId,
      price: values.price,
      originalPrice: values.originalPrice,
      gender: values.gender,
      sizes: values.sizes,
      images: values.images,
      collectionIds: values.collectionIds ? values.collectionIds : undefined,
    });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        slug: "",
        brand: "",
        categoryId: "",
        subCategoryId: "",
        collectionIds: [],
        price: 0,
        originalPrice: 0,
        gender: "Unisex",
        sizes: [
          {
            title: "",
            quantity: 0,
          },
        ],
        images: [
          {
            cloudinaryId: "",
            url: "",
          },
        ],
      }}
      validationSchema={ProductFormValidation}
      onSubmit={(values: ProductForm) => {
        handleListProduct(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="grid w-full">
          <div className=" grid items-start  gap-6 sm:grid-cols-[60%_1fr]">
            <div className=" grid gap-2">
              <Field
                id="brand"
                component={TextInput}
                name="brand"
                title="brand"
                placeholder="Nike"
              />
              <Field
                id="name"
                component={TextInput}
                name="name"
                title="name"
                placeholder="Air Jordan"
              />
              <Field
                id="slug"
                component={TextInput}
                name="slug"
                title="slug"
                placeholder="air-jordan-5"
              />
              <RichTextEditor
                title="Description"
                value={description}
                onChange={setDescription}
              />
            </div>

            <div className=" grid gap-2">
              <Field
                id="originalPrice"
                component={TextInput}
                name="originalPrice"
                title="original Price"
                type="number"
                placeholder="9999"
              />
              <Field
                id="price"
                component={TextInput}
                name="price"
                title="Price"
                type="number"
                placeholder="5699"
              />
              <Field
                id="rating"
                component={TextInput}
                name="rating"
                title="rating"
                type="number"
                placeholder="3"
              />

              {categories && (
                <Field
                  name="categoryId"
                  title="Category"
                  component={CustomSelect}
                  options={categories.map((category) => {
                    return {
                      label: category.name,
                      value: category.id,
                    };
                  })}
                />
              )}

              {subCategories && (
                <Field
                  name="subCategoryId"
                  component={CustomSelect}
                  title="Sub Category/Sub Categories"
                  options={
                    values.categoryId
                      ? subCategories
                          .filter(
                            (subCategory) =>
                              subCategory.category.id === values.categoryId
                          )
                          .map((subCategory) => {
                            return {
                              label: subCategory.name,
                              value: subCategory.id,
                            };
                          })
                      : subCategories.map((subCategory) => {
                          return {
                            label: subCategory.name,
                            value: subCategory.id,
                          };
                        })
                  }
                />
              )}

              {collections && (
                <Field
                  component={CustomSelect}
                  title="Select Collection"
                  name="collectionIds"
                  options={collections.map((collection) => {
                    return {
                      label: collection.name,
                      value: collection.id,
                    };
                  })}
                  isMulti
                />
              )}
              <Field
                component={CustomSelect}
                title="Gender"
                name="gender"
                options={Object.entries(Gender).map((k) => {
                  return {
                    value: k[0],
                    label: k[0],
                  };
                })}
              />
            </div>
          </div>
          <div className=" grid items-start  gap-6 sm:grid-cols-[60%_1fr]">
            <FieldArray name="images">
              {({ remove, push }) => (
                <div className=" my-6 grid gap-4  p-2 pb-6">
                  <Button
                    variant={"secondary"}
                    size={"small"}
                    className=" ml-auto w-fit text-xs text-gray-900"
                    type="button"
                    onClick={() => push({ cloudinaryId: "", url: "" })}
                  >
                    <p>Add Image</p> <BiPlus />
                  </Button>
                  {values.images.length > 0 &&
                    values.images.map((image, index) => (
                      <div
                        className="grid h-fit grid-cols-[auto_25%_1fr_auto] items-center gap-4 rounded-md bg-white p-4 shadow-2xl shadow-brand-100/25"
                        key={index}
                      >
                        <ImageUpload
                          onChange={(info) => {
                            setFieldValue(
                              `images.${index}.url`,
                              info.secure_url
                            ),
                              setFieldValue(
                                `images.${index}.cloudinaryId`,
                                info.public_id
                              );
                          }}
                          value={values?.images[index]?.url || ""}
                        />
                        <div className="grid ">
                          <label
                            className=" pb-1  text-xs capitalize text-gray-700"
                            htmlFor={`images.${index}.cloudinaryId`}
                          >
                            cloudinary Id
                          </label>
                          <Field
                            name={`images.${index}.cloudinaryId`}
                            placeholder="cloudinaryId"
                            type="text"
                            className={`w-full rounded-md bg-white py-2 pl-4 text-base font-normal text-gray-900 ring-1 ring-brand-100 placeholder:text-sm placeholder:italic placeholder:text-slate-400  focus:outline-none focus:ring-2 focus:ring-brand-500 `}
                          />
                          <ErrorMessage
                            name={`images.${index}.cloudinaryId`}
                            component="div"
                            className="  py-1 pl-2 text-xs  text-red-500"
                          />
                        </div>
                        <div className="grid ">
                          <label
                            className=" pb-1  text-xs capitalize text-gray-700"
                            htmlFor={`images.${index}.url`}
                          >
                            Url
                          </label>
                          <Field
                            name={`images.${index}.url`}
                            placeholder="http / "
                            type="text"
                            className={`w-full rounded-md bg-white py-2 pl-4 text-base font-normal text-gray-900 ring-1 ring-brand-100 placeholder:text-sm placeholder:italic placeholder:text-slate-400  focus:outline-none focus:ring-2 focus:ring-brand-500 `}
                          />
                          <ErrorMessage
                            name={`images.${index}.url`}
                            component="div"
                            className="  py-1 pl-2 text-xs  text-red-500"
                          />
                        </div>
                        <Button
                          type="button"
                          variant={"tertiary"}
                          size={"noStyle"}
                          disabled={index === 0 && values.images.length === 1}
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

            <FieldArray name="sizes">
              {({ remove, push }) => (
                <div className=" my-6 grid  gap-4 p-2 pb-6">
                  <Button
                    variant={"secondary"}
                    size={"small"}
                    className=" ml-auto w-fit text-xs text-gray-900"
                    type="button"
                    onClick={() => push({ title: "", quantity: 0 })}
                  >
                    Add Size <BiPlus />
                  </Button>

                  {values.sizes.length > 0 &&
                    values.sizes.map((size, index) => (
                      <div
                        className="grid h-fit grid-cols-[1fr_1fr_auto] items-center gap-4 rounded-md bg-white p-4  shadow-2xl shadow-brand-100/25"
                        key={index}
                      >
                        <div className="grid ">
                          <label
                            className=" pb-1  text-xs capitalize text-gray-700"
                            htmlFor={`sizes.${index}.title`}
                          >
                            Select Size
                          </label>
                          <Field
                            name={`sizes.${index}.title`}
                            placeholder="6 / 8"
                            component={CustomSelect}
                            options={
                              subCategories && values?.subCategoryId
                                ? subCategories
                                    ?.find(
                                      (subCategory) =>
                                        subCategory?.id ===
                                        values?.subCategoryId
                                    )
                                    ?.sizeOptions?.map((size) => {
                                      return {
                                        label: size,
                                        value: size,
                                      };
                                    })
                                : []
                            }
                          />
                          <ErrorMessage
                            name={`sizes.${index}.title`}
                            component="div"
                            className="  py-1 pl-2 text-xs  text-red-500"
                          />
                        </div>
                        <div className="grid ">
                          <label
                            className=" pb-1  text-xs capitalize text-gray-700"
                            htmlFor={`sizes.${index}.quantity`}
                          >
                            Quantity
                          </label>
                          <Field
                            name={`sizes.${index}.quantity`}
                            placeholder="20"
                            type="number"
                            className={`w-full rounded-md bg-white py-2 pl-4 text-base font-normal text-gray-900 ring-1 ring-brand-100 placeholder:text-sm placeholder:italic placeholder:text-slate-400  focus:outline-none focus:ring-2 focus:ring-brand-500 `}
                          />
                          <ErrorMessage
                            name={`sizes.${index}.quantity`}
                            component="div"
                            className="  py-1 pl-2 text-xs  text-red-500"
                          />
                        </div>

                        <Button
                          type="button"
                          variant={"tertiary"}
                          size={"noStyle"}
                          disabled={index === 0 && values.sizes.length === 1}
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
          </div>
          <Button
            loading={listProduct.isLoading}
            disabled={listProduct.isLoading}
            variant={"primary"}
            size={"large"}
            className=" mx-auto  w-full md:w-fit"
            type="submit"
          >
            List Product
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ListProductForm;
