import { prismaClient } from "../../lib/db";

const queries = {
  getAllTags: async () => {
    const tags = await prismaClient.productTag.findMany({
      distinct: ["title"],
      orderBy: {
        title: "desc",
      },
      select: {
        id: true,
        title: true,
        productId: true,
      },
    });
    return tags;
  },
};

const mutations = {};

export const productTagResolver = { queries, mutations };
