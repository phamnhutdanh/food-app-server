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
