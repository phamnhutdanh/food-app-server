import { prismaClient } from "../../lib/db";
import { AddProductIngredientsInputType } from "./productIngredients";

const queries = {};

const mutations = {
  addProductIngredients: async (
    _: any,
    {
      productIngredientsInput,
    }: {
      productIngredientsInput: AddProductIngredientsInputType;
    }
  ) => {
    await prismaClient.productIngredients.create({
      data: {
        name: productIngredientsInput.name,
        price: productIngredientsInput.price,
        imageUri: productIngredientsInput.imageUri,
        productId: productIngredientsInput.productId,
      },
    });
  },
};

export const productIngredientsResolver = { queries, mutations };
