import { prismaClient } from "../../lib/db";

const queries = {
  getAllShop: async () => {},
  getShopById: async (_: any, { id }: { id: string }) => {
    const shop = await prismaClient.shop.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });
    return shop;
  },
};

const mutations = {};

export const shopResolver = { queries, mutations };
