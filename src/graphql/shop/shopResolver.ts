import { prismaClient } from "../../lib/db";
import { getImageWithPublicIdCloudinary } from "../../lib/getImageWithPublicIdCloudinary";
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
    if (shop.imageUri !== "" && shop.imageUri !== null) {
      await getImageWithPublicIdCloudinary(shop.imageUri).then(
        async (url: string) => {
          console.log("URL: ", url);
          await prismaClient.shop
            .create({
              data: {
                shopName: shop.shopName,
                shopAddress: shop.shopAddress,
                shopPhoneNumber: shop.shopPhoneNumber,
                imageUri: url,
                userId: shop.userId,
              },
            })
            .then(async (shopAccount) => {
              await prismaClient.user
                .update({
                  where: {
                    id: shop.userId,
                  },
                  data: {
                    loginAs: "USER",
                  },
                })
                .then(async (user: any) => {
                  await prismaClient.account.update({
                    where: {
                      id: user.accountId,
                    },
                    data: {
                      role: "SHOP_OWNER",
                    },
                  });
                });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log("createShopAccount errorCode: ", errorCode);
              console.log("createShopAccount errorMessage: ", errorMessage);
            });
        }
      );
    } else {
      await prismaClient.shop
        .create({
          data: {
            shopName: shop.shopName,
            shopAddress: shop.shopAddress,
            shopPhoneNumber: shop.shopPhoneNumber,
            userId: shop.userId,
          },
        })
        .then(async (shopAccount) => {
          await prismaClient.user
            .update({
              where: {
                id: shop.userId,
              },
              data: {
                loginAs: "USER",
              },
            })
            .then(async (user: any) => {
              await prismaClient.account.update({
                where: {
                  id: user.accountId,
                },
                data: {
                  role: "SHOP_OWNER",
                },
              });
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("createShopAccount errorCode: ", errorCode);
          console.log("createShopAccount errorMessage: ", errorMessage);
        });
    }
  },
};

export const shopResolver = { queries, mutations };
