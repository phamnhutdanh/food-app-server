import { prismaClient } from "../../lib/db";
import { OrderInputType } from "../order/order";
import { OrderProductInputType } from "./orderProduct";

const queries = {};

const mutations = {
  createOrderProduct: async (
    _: any,
    {
      order,
      orderProducts,
    }: {
      order: OrderInputType;
      orderProducts: [OrderProductInputType];
    }
  ) => {
    await prismaClient.order
      .create({
        data: {
          deliveredAt: order.deliveredAt,
          deliveryAddress: order.deliveryAddress,
          totalCost: order.totalCost,
          status: order.status,
          commentary: order.commentary,
          userId: order.userId,
        },
      })
      .then(async (order) => {
        const orderId = order.id;
        orderProducts.forEach(async (item) => {
          await prismaClient.orderProduct.create({
            data: {
              orderId: orderId,
              fullPrice: item.fullPrice,
              count: item.count,
              productSizeId: item.productSizeId,
            },
          });
        });
      });
  },
};

export const orderProductResolver = { queries, mutations };
