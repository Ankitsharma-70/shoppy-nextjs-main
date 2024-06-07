interface Window {
  Razorpay: any;
}

interface CouponCode {
  code: string;
  discount: number;
  oneTime: number;
  type: CouponType;
  expiry: Date;
}
interface OrderProduct {
  id: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  name: string;
}
interface ProductForm {
  name: string;
  slug: string;
  brand: string;
  originalPrice: number;
  price: number;

  sizes: Array<Size>;
  images: Array<Image>;
  categoryId: string;
  subCategoryId: string;
  collectionIds?: Array<string>;
  gender: "Male" | "Female" | "Unisex";
}
interface CategoryForm {
  name: string;
  slug: string;
  description: string;
  image: {
    url: string;
    cloudinaryId: string;
  };
}
interface SubCategoryForm {
  name: string;
  slug: string;
  description: string;
  image: {
    url: string;
    cloudinaryId: string;
  };
  categoryId: string;
}

interface CollectionForm {
  name: string;
  slug: string;
  description: string;
  image: {
    url: string;
    cloudinaryId: string;
  };
}

// Search filter types
interface SearchFilters {
  name?: string | null;
  category?: string | null;
  subCategory?: string | null;
  sort?: string | null;
  [key: string]: string | undefined | null;
}
