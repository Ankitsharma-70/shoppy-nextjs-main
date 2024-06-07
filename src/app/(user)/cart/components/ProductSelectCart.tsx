import { useEffect, useMemo, useState } from "react";
import { RouterOutputs, api } from "~/utils/api";
import SelectForCartCard from "./SelectForCartCard";
import { toast } from "react-hot-toast";
type option = {
  title: string;
  desc?: string;
  value: string | number | undefined;
  disable?: boolean;
};
type Product = RouterOutputs["product"]["getAll"][0];
const ProductSelectCart = ({ product }: { product: Product }) => {
  const { data: cart } = api.cart.get.useQuery(undefined);
  const ctx = api.useContext();
  const updateCart = api.cart.add.useMutation({
    onSuccess: (r) => {
      toast.success(`${r.message}`);
      void ctx.cart.get.invalidate();
    },
    onError: (e) => {
      toast.error(`${e.message}`);
    },
  });
  const [selectedSize, setSelectedSize] = useState<any>({});
  const [selectedQuantity, setSelectedQuantity] = useState<any>({});

  //Get all the size options
  const sizeOptions = useMemo(
    () =>
      product.sizes.map((size) => ({
        title: size.title,
        value: size.title,
        disable: size.quantity === 0,
      })),
    [product]
  );

  //Find size with quantity for creating quantity options
  const inStockForSelectedSize = useMemo(() => {
    const selectedSizeData = product.sizes.find(
      (size) => size.title === selectedSize?.value
    );
    return selectedSizeData ? selectedSizeData?.quantity || 0 : 0;
  }, [product, selectedSize]);

  const quantityOptions = useMemo(() => {
    const options = [];
    for (let i = 1; i <= inStockForSelectedSize; i++) {
      options.push({ title: i.toString(), value: i });
    }
    return inStockForSelectedSize ? options.slice(0, 10) : [];
  }, [inStockForSelectedSize]);

  //If user is not logged in than this will not work
  const inCart = useMemo(
    () => cart?.find((item) => item?.product?.id === product.id),
    [cart, product.id]
  );

  useEffect(() => {
    if (inCart) {
      setSelectedSize({ title: inCart.size.toString(), value: inCart.size });
      setSelectedQuantity({
        title: inCart.quantity.toString(),
        value: inCart.quantity,
      });
    } else {
      setSelectedSize(
        sizeOptions.find((option: option) => option.disable === false)
      );
      setSelectedQuantity(quantityOptions[0]);
    }
  }, [inCart]);

  //When user click it will add product into cart
  const handleAddToCart = async ({
    size,
    quantity,
  }: {
    size: string;
    quantity: number;
  }) => {
    updateCart.mutateAsync({
      productId: product.id,
      size: size,
      quantity: quantity,
    });
  };

  const handleAutoUpdateQuantity = (selected: option) => {
    setSelectedQuantity(selected);
    handleAddToCart({
      size: selectedSize.value,
      quantity: selected.value as number,
    });
  };

  const handleAutoUpdateSize = (selected: option) => {
    setSelectedSize(selected);
    handleAddToCart({
      size: selected.value as string,
      quantity: selectedQuantity.value,
    });
  };

  return (
    <>
      {quantityOptions && (
        <SelectForCartCard
          title="Qty"
          selected={selectedQuantity}
          options={quantityOptions}
          disabled={inStockForSelectedSize === 0 || updateCart.isLoading}
          onChange={(selected: option) => handleAutoUpdateQuantity(selected)}
        />
      )}
      <SelectForCartCard
        title="Size"
        selected={selectedSize}
        options={sizeOptions}
        disabled={inStockForSelectedSize === 0 || updateCart.isLoading}
        disabledMessage="Out of stock"
        onChange={(selected: option) => handleAutoUpdateSize(selected)}
      />
      {inStockForSelectedSize > 0 && inStockForSelectedSize < 10 && (
        <p className="  hidden text-sm font-medium text-red-500 md:block">
          Hurry! Only {inStockForSelectedSize} !
        </p>
      )}
      {inStockForSelectedSize === 0 && (
        <p className="  hidden text-sm font-medium text-red-500 md:block">
          Out of stock!
        </p>
      )}
    </>
  );
};

export default ProductSelectCart;
