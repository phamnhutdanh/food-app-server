import { prismaClient } from "../../lib/db";

const queries = {
  getAllSizes: async () => {
    const sizes = await prismaClient.productSize.findMany();
    return sizes;
  },
};

const mutations = {};

export const productSizeResolver = { queries, mutations };
