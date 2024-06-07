"use client";
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

const CreateCategoryForm = () => {
  const ctx = api.useContext();
  const createCategory = api.category.create.useMutation({
    onError: (e) => {
      toast.error(`${e.message}`);
    },
    onSuccess: () => {
      toast.success(`Created`);
      ctx.category.getAll.invalidate();
    },
  });

  return (
    <Formik
      initialValues={{
        name: "",
        slug: "",
        description: "",
        image: {
          url: "",
          cloudinaryId: "",
        },
      }}
      onSubmit={(values: Values) => {
        void createCategory.mutateAsync({
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
        <Form className="grid gap-4 w-full">
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
          <Button
            variant={"secondary"}
            size={"medium"}
            loading={createCategory.isLoading}
            disabled={createCategory.isLoading}
            type="submit"
            className=""
          >
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCategoryForm;
