import { prismaClient } from "../../lib/db";
import {
  AddProductIngredientsInputType,
  UpdateProductIngredientsInputType,
} from "./productIngredients";

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
  updateProductIngredients: async (
    _: any,
    {
      productIngredientsInput,
    }: {
      productIngredientsInput: UpdateProductIngredientsInputType;
    }
  ) => {
    await prismaClient.productIngredients.update({
      where: {
        id: productIngredientsInput.id,
      },
      data: {
        name: productIngredientsInput.name,
        price: productIngredientsInput.price,
        imageUri: productIngredientsInput.imageUri,
      },
    });
  },
};

export const productIngredientsResolver = { queries, mutations };
