import { productTagMutation } from "./productTagMutation";
import { productTagQuery } from "./productTagQuery";
import { productTagTypeDef } from "./productTagTypeDef";
import { productTagResolver } from "./productTagResolver";

export const ProductTag = {
  productTagTypeDef,
  productTagQuery,
  productTagMutation,
  productTagResolver,
};
