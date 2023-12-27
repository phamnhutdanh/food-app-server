import { prismaClient } from "../../lib/db";
import { CreateFavouriteInputType } from "./favourite";
const queries = {
  getFavouriteProductsOfUser: async (
    _: any,
    { userId }: { userId: string }
  ) => {
    const favourites = await prismaClient.favouriteProduct
      .findMany({
        where: {
          userId: userId,
        },
        include: {
          product: {
            include: {
              productSubcategory: {
                include: {
                  productCategory: {
                    include: {
                      shop: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
      .then(async (favouriteProducts) => {
        return favouriteProducts;
      });

    return await favourites.map((item) => item.product);
  },
  getLimitFavouriteProductsOfUser: async (
    _: any,
    { userId, takeNum }: { userId: string; takeNum: number }
  ) => {
    const favourites = await prismaClient.favouriteProduct
      .findMany({
        where: {
          userId: userId,
        },
        include: {
          product: {
            include: {
              productSubcategory: {
                include: {
                  productCategory: {
                    include: {
                      shop: true,
                    },
                  },
                },
              },
            },
          },
        },
        take: takeNum,
      })
      .then(async (favouriteProducts) => {
        return favouriteProducts;
      });

    return await favourites.map((item) => item.product);
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
