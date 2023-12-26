import { prismaClient } from "../../lib/db";
import { CreateFavouriteInputType } from "./favourite";
const queries = {
  getFavouriteProductsOfUser: async (
    _: any,
    { userId }: { userId: string }
  ) => {
    const products = await prismaClient.favouriteProduct
      .findMany({
        where: {
          userId: userId,
        },
      })
      .then(async (favouriteProducts) => {
        return favouriteProducts;
      });
    return products;
  },
};

const mutations = {
  addToFavourite: async (
    _: any,
    { favouriteInput }: { favouriteInput: CreateFavouriteInputType }
  ) => {
    await prismaClient.favouriteProduct.create({
      data: {
        productId: favouriteInput.productId,
        userId: favouriteInput.userId,
      },
    });
  },
};

export const favouriteResolver = { queries, mutations };
