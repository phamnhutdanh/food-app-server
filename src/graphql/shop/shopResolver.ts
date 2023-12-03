import { prismaClient } from "../../lib/db";

const queries = {
  getAllShop: async () => {
    const shops = await prismaClient.shop.findMany({
      include: {
        user: true,
      },
    });
    return shops;
  },
};

const mutations = {};

export const shopResolver = { queries, mutations };
