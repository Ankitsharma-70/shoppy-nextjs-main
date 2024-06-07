"use client";
import type { Collection } from "@prisma/client";
import { Formik, Field, Form } from "formik";
import { toast } from "react-hot-toast";
import { BsXLg } from "react-icons/bs";
import Button from "~/components/Button";
import ImageUpload from "~/components/inputs/ImageUpload";
import TextInput from "~/components/inputs/TextInput";
import { api } from "~/utils/api";

interface Values {
  name: string;
  slug: string;
  description?: string;
  image: {
    url: string;
    cloudinaryId: string;
  };
}

const UpdateCollectionForm = ({ collection }: { collection: Collection }) => {
  const ctx = api.useContext();
  const updateCollection = api.collection.update.useMutation({
    onError: (e) => {
      toast.error(`${e.message}`);
    },
    onSuccess: () => {
      toast.success(`Updated Successfully`);
      ctx.collection.getAll.invalidate();
    },
  });
  const deleteCollection = api.collection.delete.useMutation({
    onSuccess: () => {
      toast.success("Deleted Successfully");
      ctx.collection.getAll.invalidate();
    },
    onError: (e) => {
      toast.error(`${e.message}`);
    },
  });
  const handleDeleteCollection = ({ id }: { id: string }) => {
    deleteCollection.mutateAsync({
      id: id,
    });
  };
  return (
    <Formik
      initialValues={{
        name: collection.name,
        slug: collection.slug,
        description: collection.description || "",
        image: {
          url: collection.image.url,
          cloudinaryId: collection.image.cloudinaryId,
        },
      }}
      onSubmit={(values: Values) => {
        void updateCollection.mutateAsync({
          id: collection.id,
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
        <Form className=" mx-auto grid w-full gap-2 ">
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
            name="image.cloudinaryId"
            placeholder=""
          />

          <div className=" grid gap-4 md:grid-cols-2 ">
            <Button
              onClick={() => handleDeleteCollection({ id: collection.id })}
              loading={deleteCollection.isLoading}
              disabled={deleteCollection.isLoading}
              variant={"danger"}
              size={"medium"}
              type="button"
            >
              Delete
            </Button>
            <Button
              variant={"secondary"}
              size={"medium"}
              loading={updateCollection.isLoading}
              disabled={updateCollection.isLoading}
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

export default UpdateCollectionForm;
