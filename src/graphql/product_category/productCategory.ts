import { productCategoryMutation } from "./productCategoryMutation";
import { productCategoryQuery } from "./productCategoryQuery";
import { productCategoryResolver } from "./productCategoryResolver";
import { productCategoryTypeDef } from "./productCategoryTypeDef";

export const ProductCategory = {
  productCategoryTypeDef,
  productCategoryQuery,
  productCategoryMutation,
  productCategoryResolver,
};
