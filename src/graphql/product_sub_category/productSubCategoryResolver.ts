import { prismaClient } from "../../lib/db";

const queries = {
  getAllProductSubCategories: async () => {
    const productSubCategories = await prismaClient.productSubcategory.findMany(
      {
        include: {
          productCategory: true,
          products: true,
        },
      }
    );
    return productSubCategories;
  },
  getProductSubCategoryById: async (_: any, { id }: { id: string }) => {
    const productSubcategory = await prismaClient.productSubcategory.findUnique(
      {
        where: {
          id: id,
        },
      }
    );
    return productSubcategory;
  },
};

const mutations = {};

export const productSubCategoryResolver = { queries, mutations };
