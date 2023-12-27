import { prismaClient } from "../../lib/db";
import { CreateRatingProductInputType } from "./ratingProduct";

const queries = {
  getAllRatingOfProduct: async (
    _: any,
    { productId }: { productId: string }
  ) => {
    const ratings = await prismaClient.ratingProduct.findMany({
      where: {
        productId: productId,
      },
      include: {
        user: true,
        shop: true,
      },
    });
    return ratings;
  },
};

const mutations = {
  createRatingProduct: async (
    _: any,
    {
      ratingInput,
    }: {
      ratingInput: CreateRatingProductInputType;
    }
  ) => {
    if (ratingInput.userId !== null && ratingInput.userId !== "") {
      await prismaClient.ratingProduct.create({
        data: {
          score: ratingInput.score,
          comment: ratingInput.comment,
          productId: ratingInput.productId,
          userId: ratingInput.userId,
        },
      });
      return;
    } else if (ratingInput.shopId !== null && ratingInput.shopId !== "") {
      await prismaClient.ratingProduct.create({
        data: {
          score: ratingInput.score,
          comment: ratingInput.comment,
          productId: ratingInput.productId,
          shopId: ratingInput.shopId,
        },
      });
      return;
    } else {
      await prismaClient.ratingProduct.create({
        data: {
          score: ratingInput.score,
          comment: ratingInput.comment,
          productId: ratingInput.productId,
        },
      });
      return;
    }
  },
};

export const ratingProductResolver = { queries, mutations };
