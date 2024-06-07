"use client";
import { CouponType } from "@prisma/client";
import { Formik, Field, Form } from "formik";
import { toast } from "react-hot-toast";
import Button from "~/components/Button";
import Checkbox from "~/components/inputs/Checkbox,";
import TextInput from "~/components/inputs/TextInput";
import CustomSelect from "~/components/ui/input/CustomSelect";
import { api } from "~/utils/api";
interface Values {
  code: string;
  type: "fixed" | "percentage";
  discount: number;
  minimumOrderAmount: number;
  expiry: Date;
  usageLimit: number;
  oneTime: boolean;
}
const CreateCouponForm = () => {
  const ctx = api.useContext();
  const createCoupon = api.coupon.create.useMutation({
    onSuccess: () => {
      toast.success("Created");
      ctx.admin.getAllCoupons.invalidate();
    },
  });

  return (
    <Formik
      initialValues={{
        code: "",
        discount: 0,
        expiry: new Date(),
        minimumOrderAmount: 0,
        oneTime: false,
        type: "fixed",
        usageLimit: 0,
      }}
      onSubmit={(values: Values) => {
        void createCoupon.mutateAsync({
          code: values.code,
          type: values.type,
          oneTime: values.oneTime,
          discount: values.discount,
          minimumOrderAmount: values.minimumOrderAmount,
          expiry: new Date(values.expiry),
          usageLimit: values.usageLimit,
        });
      }}
    >
      <Form className="  grid w-full gap-4">
        <Field
          component={TextInput}
          title="code"
          name="code"
          placeholder="code"
        />
        <Field
          component={TextInput}
          title="discount"
          name="discount"
          type="number"
          placeholder="discount"
        />
        <Field
          component={TextInput}
          title="minimumOrderAmount"
          type="number"
          name="minimumOrderAmount"
          placeholder="minimumOrderAmount"
        />
        <Field
          component={TextInput}
          title="usageLimit"
          type="number"
          name="usageLimit"
          placeholder="usageLimit"
        />
        <Field
          component={CustomSelect}
          title="type"
          name="type"
          placeholder="type"
          options={Object.entries(CouponType).map((k) => {
            return {
              value: k[0],
              label: k[0],
            };
          })}
        />
        <div className=" flex items-center gap-4  ">
          <label htmlFor="oneTime" className="text-sm capitalize text-gray-700">
            One time
          </label>
          <Field
            type="checkbox"
            label="One time"
            name="oneTime"
            id="oneTime"
            className="h-4 w-4"
          />
        </div>
        <div>
          <p className=" pb-1  text-xs capitalize text-gray-700">Expiry</p>
          <Field
            type="datetime-local"
            name="expiry"
            placeholder="expiry"
            className="w-full px-4 py-2"
          />
        </div>
        <Button
          variant={"secondary"}
          size={"medium"}
          loading={createCoupon.isLoading}
          disabled={createCoupon.isLoading}
          type="submit"
          className="mt-4"
        >
          Create
        </Button>
      </Form>
    </Formik>
  );
};

export default CreateCouponForm;
