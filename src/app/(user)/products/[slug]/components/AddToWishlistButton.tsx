import React, { useMemo } from "react";
import { toast } from "react-hot-toast";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import Button from "~/components/Button";
import { api } from "~/utils/api";

const AddToWishlistButton = ({ productId }: { productId: string }) => {
  const ctx = api.useContext();
  const { data: wishlist } = api.wishlist.get.useQuery(undefined);
  const wishlistToggle = api.wishlist.toggle.useMutation({
    onSuccess: (r) => {
      toast.success(`${r.message}`);
      void ctx.wishlist.get.invalidate();
    },
    onError: (e) => {
      toast.error(`${e.message}`);
    },
  });

  const inWishlist = useMemo(() => {
    return wishlist?.find((item) => item.productId == productId);
  }, [wishlist, productId]);

  const handleWishlistToggle = () => {
    wishlistToggle.mutateAsync({
      productId: productId,
    });
  };
  return (
    <Button
      type={"button"}
      variant={"tertiary"}
      className=" group h-full gap-2 rounded-md bg-white py-2 px-4 ring-1 ring-brand-100 transition-all duration-300 ease-in-out hover:ring-brand-500"
      onClick={handleWishlistToggle}
      disabled={wishlistToggle.isLoading}
      loading={wishlistToggle.isLoading}
    >
      {!inWishlist ? (
        <>
          <BsHeart
            className="text-gray-700 group-hover:text-red-500"
            size={20}
          />
          <p className="text-sm text-gray-700">Add to Wishlist</p>
        </>
      ) : (
        <>
          <BsFillHeartFill
            className="text-red-500 duration-300 ease-in-out group-hover:text-red-300"
            size={20}
          />
          <p className="text-sm font-light text-gray-900">
            Remove from wishlist
          </p>
        </>
      )}
    </Button>
  );
};

export default AddToWishlistButton;
