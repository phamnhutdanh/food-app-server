import { prismaClient } from "../../lib/db";
import { CreateShopAccountInputType } from "./shop";

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

const mutations = {
  createShopAccount: async (
    _: any,
    {
      shop,
    }: {
      shop: CreateShopAccountInputType;
    }
  ) => {
    await prismaClient.shop
      .create({
        data: {
          shopName: shop.shopName,
          shopAddress: shop.shopAddress,
          shopPhoneNumber: shop.shopPhoneNumber,
          imageUri: shop.imageUri,
          userId: shop.userId,
        },
      })
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("createShopAccount errorCode: ", errorCode);
        console.log("createShopAccount errorMessage: ", errorMessage);
      });
  },
};

export const shopResolver = { queries, mutations };
