"use client";
import type { Category } from "@prisma/client";
import { Formik, Field, Form } from "formik";
import { toast } from "react-hot-toast";
import Button from "~/components/Button";
import ImageUpload from "~/components/inputs/ImageUpload";
import TextInput from "~/components/inputs/TextInput";
import { api } from "~/utils/api";
interface Values {
  name: string;
  slug: string;
  description: string;
  image: {
    url: string;
    cloudinaryId: string;
  };
}
const UpdateCategoryForm = ({ category }: { category: Category }) => {
  const ctx = api.useContext();
  const updateCategory = api.category.update.useMutation({
    onError: (e) => {
      toast.error(`${e.message}`);
    },
    onSuccess: () => {
      toast.success("Updated Successfully");
      ctx.category.getAll.invalidate();
    },
  });
  const deleteCategory = api.category.delete.useMutation({
    onError: (e) => {
      toast.error(`${e.message}`);
    },
    onSuccess: () => {
      toast.success("Deleted Successfully");
      ctx.category.getAll.invalidate();
    },
  });
  return (
    <Formik
      initialValues={{
        name: category.name,
        slug: category.slug,
        description: category.description || "",
        image: {
          url: category.image.url,
          cloudinaryId: category.image.cloudinaryId,
        },
      }}
      onSubmit={(values: Values) => {
        void updateCategory.mutateAsync({
          id: category.id,
          name: values.name,
          slug: values.slug,
          description: values.description,
          image: {
            cloudinaryId: values.image.cloudinaryId,
            url: values.image.url,
          },
        });
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className=" mx-auto flex h-full w-full flex-col gap-4">
          <Field
            component={TextInput}
            title="name"
            name="name"
            placeholder="Cloths"
          />
          <Field
            component={TextInput}
            title="Slug"
            name="slug"
            placeholder="cloths "
          />
          <Field
            component={TextInput}
            title="Description"
            name="description"
            placeholder=""
          />
          <ImageUpload
            onChange={(info) => {
              setFieldValue(`image.url`, info.secure_url),
                setFieldValue(`image.id`, info.public_id);
            }}
            value={values?.image.url || ""}
          />
          <Field
            component={TextInput}
            title="Image Cloudinary Url"
            name="image.url"
            placeholder=""
          />
          <Field
            component={TextInput}
            title="Image Cloudinary Id"
            name="image.id"
            placeholder=""
          />
          <div className="mt-auto grid grid-cols-2  items-center gap-4">
            <Button
              variant={"danger"}
              size={"medium"}
              loading={deleteCategory.isLoading}
              onClick={() => {
                deleteCategory.mutateAsync({
                  id: category.id,
                });
              }}
              disabled={deleteCategory.isLoading}
              type="button"
            >
              Delete
            </Button>
            <Button
              variant={"secondary"}
              size={"medium"}
              loading={updateCategory.isLoading}
              disabled={updateCategory.isLoading}
              type="submit"
            >
              Update
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateCategoryForm;
