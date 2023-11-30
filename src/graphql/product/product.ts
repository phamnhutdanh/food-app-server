import { productMutation } from "./productMutation";
import { productQuery } from "./productQuery";
import { productResolver } from "./productResolver";
import { productTypeDef } from "./productTypeDef";

export const Product = {
  productTypeDef,
  productQuery,
  productMutation,
  productResolver,
};
