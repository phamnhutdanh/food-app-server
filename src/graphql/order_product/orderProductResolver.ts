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
            product: true,
          },
        },
        user: true,
      },
    });

    return orderProduct;
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
    });
  },
};

export const orderProductResolver = { queries, mutations };
