import React from "react";
import { BsBagX } from "react-icons/bs";
import Button from "~/components/Button";
import { api } from "~/utils/api";

const RemoveFromWishlist = ({ productId }: { productId: string }) => {
  const ctx = api.useContext();
  const toggleWishlist = api.wishlist.toggle.useMutation({
    onSuccess: () => {
      ctx.wishlist.get.invalidate();
    },
  });

  const handleWishlistRemove = () => {
    toggleWishlist.mutateAsync({
      productId: productId,
    });
  };

  return (
    <Button
      variant={"danger"}
      size={"small"}
      disabled={toggleWishlist.isLoading}
      loading={toggleWishlist.isLoading}
      type="button"
      title="Remove From Wishlist"
      onClick={handleWishlistRemove}
    >
      <BsBagX size={20} />
    </Button>
  );
};

export default RemoveFromWishlist;
