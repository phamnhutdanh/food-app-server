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
                        shop: true,
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
    await orderProducts.forEach(async (orderProduct) => {
      await prismaClient.cartProduct.deleteMany({
        where: {
          AND: [
            {
              productSizeId: orderProduct.productSizeId,
            },
            {
              cart: {
                userId: orderProduct.userId,
              },
            },
          ],
        },
      });

      await prismaClient.orderProduct.create({
        data: {
          fullPrice: orderProduct.fullPrice,
          count: orderProduct.count,
          deliveryAddress: orderProduct.deliveryAddress,
          totalCost: orderProduct.totalCost,
          status: "PENDING",
          commentary: orderProduct.commentary,
          deliveredAt: orderProduct.deliveredAt,
          userId: orderProduct.userId,
          productSizeId: orderProduct.productSizeId,
        },
      });

      await prismaClient.user
        .findUnique({
          where: {
            id: orderProduct.userId,
          },
        })
        .then(async (user) => {
          await prismaClient.productSize
            .findUnique({
              where: {
                id: orderProduct.productSizeId,
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
                  toUserId: orderProduct.userId,
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
