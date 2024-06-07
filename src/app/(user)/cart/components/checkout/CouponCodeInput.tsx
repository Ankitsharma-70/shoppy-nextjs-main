"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Button from "~/components/Button";
import { api } from "~/utils/api";
import { useDispatch, useSelector } from "react-redux";
import type { ReduxDispatch, ReduxState } from "~/redux/store";
import { applyCoupon } from "~/redux/features/cartSlice";
const CouponCodeInput = () => {
  const { coupon } = useSelector((state: ReduxState) => state.cart);
  const [input, setInput] = useState(coupon ? coupon.code : "");
  const dispatch = useDispatch<ReduxDispatch>();

  const verifyCoupon = api.coupon.verify.useMutation({
    onSuccess: (r) => {
      if ("couponCode" in r) {
        toast.success("Coupon Applied"), dispatch(applyCoupon(r.couponCode));
      } else {
        toast.error(`${r.message}`);
      }
    },
    onError: (e) => {
      toast.error(`${e.message}`);
    },
  });

  const validateCouponCode = async () => {
    if (!input) return;
    verifyCoupon.mutate({
      code: input,
    });
  };

  const handleCouponValidation = () => {
    if (!input) return toast.error("Enter valid Coupon");
    validateCouponCode();
  };

  const handleClearCoupon = () => {
    setInput("");
    dispatch(applyCoupon(undefined));
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Coupon"
        disabled={coupon ? true : false}
        className=" block w-full rounded-lg border border-gray-100 bg-white px-4 py-2 uppercase text-gray-700 placeholder-slate-400 placeholder:italic focus:border-brand-500 focus:outline-none"
      />

      {input && input.length > 3 && (
        <Button
          size={"small"}
          variant={"primary"}
          className={`absolute inset-y-1 right-1 `}
          onClick={coupon ? handleClearCoupon : handleCouponValidation}
        >
          {coupon ? "Remove" : "Apply"}
        </Button>
      )}
    </div>
  );
};

export default CouponCodeInput;
