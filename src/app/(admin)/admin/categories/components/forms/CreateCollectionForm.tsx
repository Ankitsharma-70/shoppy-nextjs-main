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

const CreateCollectionForm = () => {
  const createCollection = api.collection.create.useMutation({
    onError: (e) => {
      toast.error(`${e.message}`);
    },
    onSuccess: () => {
      toast.success(`Created Successfully`);
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
        void createCollection.mutateAsync({
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
        <Form className="grid w-full   gap-4 ">
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
            loading={createCollection.isLoading}
            disabled={createCollection.isLoading}
            type="submit"
            className="mt-4"
          >
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCollectionForm;
