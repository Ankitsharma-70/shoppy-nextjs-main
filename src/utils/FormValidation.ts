import * as Yup from "yup";

export const ProductFormValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  slug: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  price: Yup.number()
    .min(0, "Price cannot be less than zero")
    .required("Required"),
  sizes: Yup.array()
    .of(
      Yup.object({
        title: Yup.string().required("Required"),
        quantity: Yup.number().min(0).required("Required"),
      })
    )
    .required("Required")
    .min(1, " Minimum 1 size is required"),
  images: Yup.array()
    .of(
      Yup.object({
        cloudinaryId: Yup.string().required("Required"),
        url: Yup.string().required("Required"),
      })
    )
    .required("Required"),
  categoryId: Yup.string().required("Category Required"),
  subCategoryId: Yup.string().required("Sub Category Required"),
});

export const AddProductToCartValidation = Yup.object().shape({
  size: Yup.string().required("Please select a size"),
  quantity: Yup.number()
    .required("Please enter a quantity")
    .integer("Please enter an integer")
    .positive("Please enter a positive number"),
});
