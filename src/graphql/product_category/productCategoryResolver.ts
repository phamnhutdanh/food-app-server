import { prismaClient } from "../../lib/db";

const queries = {
  getAllProductCategories: async () => {
    const productCategories = await prismaClient.productCategory.findMany({
      include: {
        shop: true,
      },
    });
    return productCategories;
  },
  getProductCategoryById: async (_: any, { id }: { id: string }) => {
    const productCategory = await prismaClient.productCategory.findUnique({
      where: {
        id: id,
      },
    });
    return productCategory;
  },
};

const mutations = {};

export const productCategoryResolver = { queries, mutations };
