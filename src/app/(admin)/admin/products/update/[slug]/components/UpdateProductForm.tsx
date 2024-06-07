"use client";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { useState } from "react";
import { api } from "~/utils/api";
import { BiPlus } from "react-icons/bi";
import { toast } from "react-hot-toast";
import RichTextEditor from "~/components/inputs/RichTextEditor";
import ImageUpload from "~/components/inputs/ImageUpload";
import Button from "~/components/Button";
import { Gender, Product } from "@prisma/client";
import { BsXSquare } from "react-icons/bs";
import { ProductFormValidation } from "~/utils/FormValidation";
import CustomSelect from "~/components/ui/input/CustomSelect";
import TextInput from "~/components/ui/input/TextInput";

const UpdateProductForm = ({ product }: { product: Product }) => {
  const [description, setDescription] = useState(product.description);

  const { data: categories } = api.category.getAll.useQuery();
  const { data: collections } = api.collection.getAll.useQuery();
  const { data: subCategories } = api.subCategory.getAll.useQuery();

  const updateProduct = api.product.update.useMutation({
    onSuccess: () => {
      toast.success("Update Successfully");
    },
    onError: (e) => {
      toast.error(`${e.message}`);
    },
  });

  const deleteProduct = api.product.delete.useMutation({
    onSuccess: () => {
      toast.success("Deleted Successfully");
    },
    onError: (e) => {
      toast.error(`${e.message}`);
    },
  });


  const handleListProduct = (values: ProductForm) => {
    void updateProduct.mutateAsync({
      id: product.id,
      name: values.name,
      description: description,
      brand: values.brand,
      slug: values.slug,
      categoryId: values.categoryId,
      subCategoryId: values.subCategoryId,
      collectionIds: values.collectionIds,
      price: values.price,
      originalPrice: values.originalPrice,
      gender: values.gender,
      sizes: values.sizes,
      images: values.images,
    });
  };

  return (
    <Formik
      initialValues={{
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        categoryId: product.categoryId,
        subCategoryId: product.subCategoryId,
        price: product.price,
        originalPrice: product.originalPrice,
        sizes: product.sizes,
        images: product.images,
        gender: product.gender,
        collectionIds: product.collectionIds
          ? product.collectionIds
          : undefined,
      }}
      validationSchema={ProductFormValidation}
      onSubmit={(values: ProductForm) => {
        console.log(values);

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
          <div className=" flex justify-between">
            <Button
              loading={deleteProduct.isLoading}
              disabled={deleteProduct.isLoading}
              variant={"danger"}
              size={"large"}
              type="button"
              onClick={()=>{
                deleteProduct.mutateAsync({
                  id:product.id
                })
              }}
            >
              Delete Product
            </Button>
            <Button
              loading={updateProduct.isLoading}
              disabled={updateProduct.isLoading}
              variant={"primary"}
              size={"large"}
              type="submit"
            >
              Update Product
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProductForm;
