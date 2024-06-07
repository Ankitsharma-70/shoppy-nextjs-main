"use client";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import TextInput from "~/components/inputs/TextInput";
import Button from "~/components/Button";

interface AddressForm {
  name: string;
  email: string;
  phone: number;
  address1: string;
  address2: string | undefined;
  city: string;
  state: string;
  pincode: number;
}

const AddressForm = () => {
  const { data: session } = useSession();
  const ctx = api.useContext();

  const createAddress = api.address.create.useMutation({
    onSuccess: () => {
      ctx.address.getAll.invalidate();
    },
  });
  return (
    <Formik
      initialValues={{
        name: session?.user.name || "",
        email: session?.user.email || "",
        pincode: NaN,
        state: "",
        address1: "",
        address2: "",
        city: "",
        phone: NaN,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        city: Yup.string()
          .matches(/^[a-zA-Z ]+$/, "Must be a Word")
          .required("Required"),
        state: Yup.string()
          .matches(/^[a-zA-Z ]+$/, "Must be a Word")
          .required("Required"),
        pincode: Yup.string().matches(/^[0-9]{6}$/, "Must be exactly 6 digits"),
        address1: Yup.string().required("Required"),
        address2: Yup.string(),
        phone: Yup.number().required("Required"),
      })}
      onSubmit={async (values: AddressForm) => {
        createAddress.mutateAsync({
          name: values.name,
          email: values.email,
          address1: values.address1,
          address2: values.address2,
          city: values.city,
          pincode: values.pincode,
          phone: values.phone,
          state: values.state,
        });
      }}
    >
      <Form className="mx-auto grid h-full  w-full gap-4  ">
        <Field
          component={TextInput}
          type="text"
          name="name"
          label="Name"
          placeholder="Your Name"
        />
        <Field
          component={TextInput}
          label="Email"
          name="email"
          type="email"
          placeholder="Enter Your Email"
        />
        <div className=" flex gap-4">
          <Field
            component={TextInput}
            type="text"
            name="city"
            label="City"
            placeholder="Your City"
          />
          <Field
            component={TextInput}
            type="text"
            name="state"
            label="State"
            placeholder="Your State"
          />
          <Field
            component={TextInput}
            type="number"
            name="pincode"
            label="Pincode"
            placeholder="Pincode"
          />
        </div>
        <Field
          component={TextInput}
          type="text"
          name="address1"
          label="Address Line 1"
          placeholder="Address"
        />
        <Field
          component={TextInput}
          type="text"
          name="address2"
          label="Address Line 2"
          placeholder="Apartment,suite,etc (optional)"
        />
        <Field
          component={TextInput}
          type="number"
          name="phone"
          label="Phone Number"
          placeholder="Phone number for order updates"
        />
        <Button
          variant={"primary"}
          size={"large"}
          disabled={createAddress.isLoading}
          loading={createAddress.isLoading}
          type={"submit"}
        >
          Save
        </Button>
      </Form>
    </Formik>
  );
};

export default AddressForm;
