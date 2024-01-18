import { OrderStatus } from "@prisma/client";
import { prismaClient } from "../../lib/db";

import { OrderProductInputType } from "./orderProduct";

const queries = {
  getOnGoingOrdersOfUser: async (
    _: any,
    {
      userId,
    }: {
      userId: string;
    }
  ) => {
    const orders = await prismaClient.orderProduct.findMany({
      where: {
        AND: [
          {
            userId: userId,
          },
          {
            OR: [
              {
                status: "PENDING",
              },
              {
                status: "ON_THE_WAY",
              },
            ],
          },
        ],
      },
      include: {
        productSize: {
          include: {
            product: true,
          },
        },
        orderIngredientDetail: {
          include: {
            productIngredient: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return orders;
  },
  getCompleteOrdersOfUser: async (
    _: any,
    {
      userId,
    }: {
      userId: string;
    }
  ) => {
    const orders = await prismaClient.orderProduct.findMany({
      where: {
        AND: [
          {
            userId: userId,
          },
          {
            OR: [
              {
                status: "DELIVERED",
              },
              {
                status: "CANCELED",
              },
            ],
          },
        ],
      },
      include: {
        productSize: {
          include: {
            product: true,
          },
        },
        orderIngredientDetail: {
          include: {
            productIngredient: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return orders;
  },
  getOrderById: async (
    _: any,
    {
      id,
    }: {
      id: string;
    }
  ) => {
    const orderProduct = await prismaClient.orderProduct.findUnique({
      where: {
        id: id,
      },
      include: {
        productSize: {
          include: {
            product: {
              include: {
                productSubcategory: {
                  include: {
                    productCategory: {
                      include: {
                        shop: {
                          include: {
                            user: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        user: {
          include: {
            account: true,
          },
        },
        orderIngredientDetail: {
          include: {
            productIngredient: true,
          },
        },
      },
    });

    return orderProduct;
  },
  getOnGoingOrdersOfShop: async (
    _: any,
    {
      shopId,
    }: {
      shopId: string;
    }
  ) => {
    const orders = await prismaClient.orderProduct.findMany({
      where: {
        AND: [
          {
            productSize: {
              product: {
                productSubcategory: {
                  productCategory: {
                    shopId: shopId,
                  },
                },
              },
            },
          },
          {
            OR: [
              {
                status: "PENDING",
              },
              {
                status: "ON_THE_WAY",
              },
            ],
          },
        ],
      },
      include: {
        productSize: {
          include: {
            product: true,
          },
        },
        orderIngredientDetail: {
          include: {
            productIngredient: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return orders;
  },
  getCompleteOrdersOfShop: async (
    _: any,
    {
      shopId,
    }: {
      shopId: string;
    }
  ) => {
    const orders = await prismaClient.orderProduct.findMany({
      where: {
        AND: [
          {
            productSize: {
              product: {
                productSubcategory: {
                  productCategory: {
                    shopId: shopId,
                  },
                },
              },
            },
          },
          {
            OR: [
              {
                status: "DELIVERED",
              },
              {
                status: "CANCELED",
              },
            ],
          },
        ],
      },
      include: {
        productSize: {
          include: {
            product: true,
          },
        },
        orderIngredientDetail: {
          include: {
            productIngredient: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return orders;
  },
};

const mutations = {
  createOrderProduct: async (
    _: any,
    {
      orderProducts,
    }: {
      orderProducts: OrderProductInputType[];
    }
  ) => {
    await orderProducts.forEach(async (item) => {
      await prismaClient.cartProduct.deleteMany({
        where: {
          AND: [
            {
              productSizeId: item.productSizeId,
            },
            {
              cart: {
                userId: item.userId,
              },
            },
          ],
        },
      });

      await prismaClient.orderProduct
        .create({
          data: {
            fullPrice: item.fullPrice,
            count: item.count,
            deliveryAddress: item.deliveryAddress,
            totalCost: item.totalCost,
            status: "PENDING",
            commentary: item.commentary,
            deliveredAt: item.deliveredAt,
            userId: item.userId,
            productSizeId: item.productSizeId,
          },
        })
        .then(async (orderProduct) => {
          item.listIngredients.forEach(async (item) => {
            await prismaClient.orderIngredientDetail.create({
              data: {
                orderProductId: orderProduct.id,
                productIngredientID: item.id,
              },
            });
          });
        });

      await prismaClient.user
        .findUnique({
          where: {
            id: item.userId,
          },
        })
        .then(async (user) => {
          await prismaClient.productSize
            .findUnique({
              where: {
                id: item.productSizeId,
              },
              include: {
                product: {
                  include: {
                    productSubcategory: {
                      include: {
                        productCategory: {
                          include: {
                            shop: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            })
            .then(async (productSize) => {
              // create shop notify
              const titleShop = `New order coming to you`;
              const messageShop = `User ${user?.name} has ordered a ${productSize?.product.title} from your shop. Check it soon!`;
              await prismaClient.notificationAccount.create({
                data: {
                  title: titleShop,
                  message: messageShop,
                  toShopId:
                    productSize?.product.productSubcategory.productCategory.shop
                      .id,
                },
              });

              // create user notify
              const titleUser = `Your order had been placed`;
              const messageUser = `Your order ${productSize?.product.title} had been placed successful. Waiting for shop checking it!`;
              await prismaClient.notificationAccount.create({
                data: {
                  title: titleUser,
                  message: messageUser,
                  toUserId: item.userId,
                },
              });
            });
        });
    });
  },
  cancelOrder: async (
    _: any,
    {
      orderId,
    }: {
      orderId: string;
    }
  ) => {
    await prismaClient.orderProduct
      .update({
        where: {
          id: orderId,
        },
        data: {
          status: "CANCELED",
        },
        include: {
          productSize: {
            include: {
              product: {
                include: {
                  productSubcategory: {
                    include: {
                      productCategory: {
                        include: {
                          shop: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          user: true,
        },
      })
      .then(async (orderProduct) => {
        const user = orderProduct.user;
        const shop =
          orderProduct.productSize.product.productSubcategory.productCategory
            .shop;

        const product = orderProduct.productSize.product;

        // create shop notify
        const titleShop = `Order canceled`;
        const messageShop = `Order ${product.title} of ${user?.name} had been canceled!`;
        await prismaClient.notificationAccount.create({
          data: {
            title: titleShop,
            message: messageShop,
            toShopId: shop.id,
          },
        });

        // create user notify
        const titleUser = `Order canceled`;
        const messageUser = `Your order ${product.title} had been canceled!`;
        await prismaClient.notificationAccount.create({
          data: {
            title: titleUser,
            message: messageUser,
            toUserId: user.id,
          },
        });
      });
  },
  changeOrderStatus: async (
    _: any,
    {
      orderId,
      status,
    }: {
      orderId: string;
      status: OrderStatus;
    }
  ) => {
    await prismaClient.orderProduct
      .update({
        where: {
          id: orderId,
        },
        data: {
          status: status,
        },
        include: {
          productSize: {
            include: {
              product: {
                include: {
                  productSubcategory: {
                    include: {
                      productCategory: {
                        include: {
                          shop: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          user: true,
        },
      })
      .then(async (orderProduct) => {
        const user = orderProduct.user;
        const shop =
          orderProduct.productSize.product.productSubcategory.productCategory
            .shop;

        const product = orderProduct.productSize.product;

        let messageShop = "",
          messageUser = "";

        if (status === OrderStatus.ON_THE_WAY) {
          messageUser = `Your order ${product.title} will coming to you soon!`;
          messageShop = `Order ${product.title} of ${user?.name} had been accepted. Delivery to your customer as soon as possible!`;
        }
        if (status === OrderStatus.DELIVERED) {
          messageUser = `Your order ${product.title} delivery successful. Rating this product to evaluate it!`;
          messageShop = `Order ${product.title} of ${user?.name} delivered successful.`;
        }

        // create shop notify
        const titleShop = `Order updated`;
        await prismaClient.notificationAccount.create({
          data: {
            title: titleShop,
            message: messageShop,
            toShopId: shop.id,
          },
        });

        // create user notify
        const titleUser = `Order updated`;
        await prismaClient.notificationAccount.create({
          data: {
            title: titleUser,
            message: messageUser,
            toUserId: user.id,
          },
        });
      });
  },
};

export const orderProductResolver = { queries, mutations };
