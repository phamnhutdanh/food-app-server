import { prismaClient } from "../../lib/db";
import {
  CreateFavouriteInputType,
  RemoveFromFavouriteInputType,
} from "./favourite";
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
  checkFavouriteInput: async (
    _: any,
    { favouriteInput }: { favouriteInput: CreateFavouriteInputType }
  ) => {
    const favourite = await prismaClient.favouriteProduct.findUnique({
      where: {
        userId_productId: {
          userId: favouriteInput.userId,
          productId: favouriteInput.productId,
        },
      },
    });
    return favourite !== null;
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
  removeFromFavourite: async (
    _: any,
    { favouriteInput }: { favouriteInput: RemoveFromFavouriteInputType }
  ) => {
    await prismaClient.favouriteProduct.delete({
      where: {
        userId_productId: {
          userId: favouriteInput.userId,
          productId: favouriteInput.productId,
        },
      },
    });
  },
};

export const favouriteResolver = { queries, mutations };
