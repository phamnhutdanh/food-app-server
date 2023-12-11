import { prismaClient } from "../../lib/db";

const queries = {
  getAllTags: async () => {
    const tags = await prismaClient.productTag.findMany();
    return tags;
  },
};

const mutations = {};

export const productTagResolver = { queries, mutations };
