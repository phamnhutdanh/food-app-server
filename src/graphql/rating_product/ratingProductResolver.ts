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
    await prismaClient.ratingProduct.upsert({
      where: {
        userId: ratingInput.userId,
        productId: ratingInput.productId,
      },
      update: {
        score: ratingInput.score,
        comment: ratingInput.comment,
      },
      create: {
        score: ratingInput.score,
        comment: ratingInput.comment,
        productId: ratingInput.productId,
        userId: ratingInput.userId,
      },
    });
  },
};

export const ratingProductResolver = { queries, mutations };
