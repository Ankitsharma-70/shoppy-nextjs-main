import React, { useMemo } from "react";
import { toast } from "react-hot-toast";
import Button from "~/components/Button";
import { api } from "~/utils/api";

const MoveToWishlist = ({
  productId,
  cartItemId,
}: {
  productId: string;
  cartItemId: string;
}) => {
  const ctx = api.useContext();
  const { data: wishlist } = api.wishlist.get.useQuery(undefined);
  const moveToWishlist = api.wishlist.moveToWishlist.useMutation({
    onSuccess: (r) => {
      toast.success(`${r.message}`);
      ctx.cart.get.invalidate();
      ctx.wishlist.get.invalidate();
    },
    onError: (e) => {
      toast.error(`${e.message}`);
    },
  });
  const handleMoveToWishlist = () => {
    moveToWishlist.mutateAsync({
      productId: productId,
      cartItemId: cartItemId,
    });
  };
  const inWishlist = useMemo(() => {
    return wishlist?.find((item) => item.productId == productId);
  }, [wishlist, productId]);

  return (
    <Button
      variant={"tertiary"}
      size={"noStyle"}
      loading={moveToWishlist.isLoading}
      disabled={moveToWishlist.isLoading || inWishlist ? true : false}
      onClick={handleMoveToWishlist}
      className="text-sm font-light"
    >
      Move To Wishlist
    </Button>
  );
};

export default MoveToWishlist;
