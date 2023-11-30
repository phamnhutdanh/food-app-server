import { prismaClient } from "../../lib/db";

const queries = {
  getAllProducts: async () => {
    const products = await prismaClient.product.findMany({
      include: {
        productSubcategory: true,
      },
    });
    return products;
  },
  getProductById: async (_: any, { id }: { id: string }) => {
    const product = await prismaClient.product.findUnique({
      where: {
        id: id,
      },
    });
    return product;
  },
  getPopularProduct: async () => {
    const products = await prismaClient.product.findMany({
      orderBy: {
        averageRatingScores: "desc",
      },
    });
    return products;
  },
};

const mutations = {};

export const productResolver = { queries, mutations };
