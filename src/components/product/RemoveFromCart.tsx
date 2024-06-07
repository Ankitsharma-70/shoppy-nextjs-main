"use client";
import type { ReactNode } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import Button from "../Button";

const RemoveFromCart = ({
  cartItemId,
  children,
  className,
}: {
  cartItemId: string;
  children: ReactNode;
  className?: string;
}) => {
  const ctx = api.useContext();
  const removeFromCart = api.cart.remove.useMutation({
    onSuccess: () => {
      toast.success("Removed from cart ");
      void ctx.cart.get.invalidate();
    },
  });
  const handleRemoveFromCart = async () => {
    void removeFromCart.mutate({
      cartItemId: cartItemId,
    });
  };

  return (
    <Button
      disabled={removeFromCart.isLoading}
      loading={removeFromCart.isLoading}
      variant={"tertiary"}
      size={"noStyle"}
      className={className}
      onClick={() => handleRemoveFromCart()}
    >
      {children}
    </Button>
  );
};

export default RemoveFromCart;
