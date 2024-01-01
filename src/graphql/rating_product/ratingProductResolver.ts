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
    await prismaClient.ratingProduct
      .upsert({
        where: {
          userId_productId: {
            userId: ratingInput.userId,
            productId: ratingInput.productId,
          },
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
      })
      .then(async (rating) => {
        const avg = await prismaClient.ratingProduct
          .aggregate({
            _avg: {
              score: true,
            },
            where: {
              productId: rating.productId,
            },
          })
          .then(async (avg) => {
            return avg._avg.score;
          });
        await prismaClient.product.update({
          where: {
            id: rating.productId,
          },
          data: {
            averageRatingScores: avg,
          },
        });
      });

    await prismaClient.product
      .findUnique({
        where: {
          id: ratingInput.productId,
        },
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
      })
      .then(async (product) => {
        const user = await prismaClient.user.findUnique({
          where: {
            id: ratingInput.userId,
          },
        });
        const shopId = product?.productSubcategory.productCategory.shop.id;
        const title = "Your product has a new rating";
        const message = `User ${user?.name} has created a rating on ${product?.title} with ${ratingInput.score} star!`;
        await prismaClient.notificationAccount.create({
          data: {
            title: title,
            message: message,
            toShopId: shopId,
          },
        });
        return product?.productSubcategory.productCategory.shop.id;
      });
  },
};

export const ratingProductResolver = { queries, mutations };
