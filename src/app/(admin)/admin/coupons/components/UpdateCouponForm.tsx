"use client";
import { Coupon, CouponType } from "@prisma/client";
import { Formik, Field, Form } from "formik";
import { toast } from "react-hot-toast";
import Button from "~/components/Button";
import TextInput from "~/components/inputs/TextInput";
import CustomSelect from "~/components/ui/input/CustomSelect";
import { api } from "~/utils/api";
interface Values {
  code: string;
  type: "fixed" | "percentage";
  discount: number;
  minimumOrderAmount: number;
  expiry: Date | string;
  usageLimit: number;
  oneTime: boolean;
}
const UpdateCouponForm = ({ coupon }: { coupon: Coupon }) => {
  const ctx = api.useContext();
  const updateCoupon = api.coupon.update.useMutation({
    onSuccess: () => {
      toast.success("Updated");
      ctx.admin.getAllCoupons.invalidate();
    },
  });
  const deleteCoupon = api.coupon.delete.useMutation({
    onSuccess: () => {
      toast.success("Deleted Successfully");
      ctx.admin.getAllCoupons.invalidate();
    },
  });

  return (
    <>
      <Formik
        initialValues={{
          code: coupon.code,
          discount: coupon.discount,
          expiry: new Date(coupon.expiry).toISOString().slice(0, 16),
          minimumOrderAmount: coupon.minimumOrderAmount,
          oneTime: coupon.oneTime,
          type: coupon.type,
          usageLimit: coupon.usageLimit,
        }}
        onSubmit={(values: Values) => {
          void updateCoupon.mutateAsync({
            id: coupon.id,
            code: values.code,
            type: values.type,
            oneTime: values.oneTime,
            discount: values.discount,
            minimumOrderAmount: values.minimumOrderAmount,
            expiry: new Date(values.expiry) as Date,
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
            <label
              htmlFor="oneTime"
              className="text-sm capitalize text-gray-700"
            >
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
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={"tertiary"}
              size={"medium"}
              loading={deleteCoupon.isLoading}
              onClick={() => {
                deleteCoupon.mutateAsync({
                  id: coupon.id,
                });
              }}
              disabled={deleteCoupon.isLoading}
              type="button"
              className="mt-4 text-red-500 hover:bg-red-100"
            >
              Delete
            </Button>
            <Button
              variant={"secondary"}
              size={"medium"}
              loading={updateCoupon.isLoading}
              disabled={updateCoupon.isLoading}
              type="submit"
              className="mt-4"
            >
              Update
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default UpdateCouponForm;
