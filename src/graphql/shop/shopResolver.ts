import { prismaClient } from "../../lib/db";
import { getImageWithPublicIdCloudinary } from "../../lib/getImageWithPublicIdCloudinary";
import {
  CreateShopAccountInputType,
  UpdateShopAccountInputType,
  UpdateShopAccountWithImageInputType,
} from "./shop";

const queries = {
  getAllShop: async () => {
    const shops = await prismaClient.shop.findMany({
      include: {
        user: {
          include: {
            account: true,
          },
        },
      },
      orderBy: {
        user: {
          account: {
            createdAt: "desc",
          },
        },
      },
    });
    return shops;
  },
  getShopById: async (_: any, { id }: { id: string }) => {
    const shop = await prismaClient.shop.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          include: {
            account: true,
          },
        },
      },
    });
    return shop;
  },
  getShopInfoByFirebaseUID: async (_: any, { id }: { id: string }) => {
    const shop = await prismaClient.shop.findFirst({
      where: {
        user: {
          account: {
            firebaseUID: id,
          },
        },
      },
      include: {
        user: {
          include: {
            account: true,
          },
        },
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

              await prismaClient.productCategory.create({
                data: {
                  title: `category_${shopAccount.id}`,
                  description: "description",
                  shopId: shopAccount.id,
                },
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

          await prismaClient.productCategory.create({
            data: {
              title: `category_${shopAccount.id}`,
              description: "description",
              shopId: shopAccount.id,
            },
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
  updateShopAccount: async (
    _: any,
    {
      shop,
    }: {
      shop: UpdateShopAccountInputType;
    }
  ) => {
    if (shop.imagePublicId !== "" && shop.imagePublicId !== null) {
      await getImageWithPublicIdCloudinary(shop.imagePublicId).then(
        async (url: string) => {
          await prismaClient.shop.update({
            where: {
              id: shop.shopId,
            },
            data: {
              shopName: shop.shopName,
              shopPhoneNumber: shop.shopPhoneNumber,
              shopAddress: shop.shopAddress,
              imageUri: url,
            },
          });
        }
      );
    } else {
      await prismaClient.shop.update({
        where: {
          id: shop.shopId,
        },
        data: {
          shopName: shop.shopName,
          shopPhoneNumber: shop.shopPhoneNumber,
          shopAddress: shop.shopAddress,
        },
      });
    }
  },
  updateShopWithImage: async (
    _: any,
    {
      shop,
    }: {
      shop: UpdateShopAccountWithImageInputType;
    }
  ) => {
    if (shop.imageUri !== "" && shop.imageUri !== null) {
      await prismaClient.shop.update({
        where: {
          id: shop.shopId,
        },
        data: {
          shopName: shop.shopName,
          shopPhoneNumber: shop.shopPhoneNumber,
          shopAddress: shop.shopAddress,
          imageUri: shop.imageUri,
        },
      });
    } else {
      await prismaClient.shop.update({
        where: {
          id: shop.shopId,
        },
        data: {
          shopName: shop.shopName,
          shopPhoneNumber: shop.shopPhoneNumber,
          shopAddress: shop.shopAddress,
        },
      });
    }
  },
};

export const shopResolver = { queries, mutations };
