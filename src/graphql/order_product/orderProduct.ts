import { RESOLVER_TYPE } from "../resolvers";
import { orderProductResolver } from "./orderProductResolver";

export type OrderProductInputType = {
  fullPrice: number;
  count: number;
  deliveryAddress: string;
  totalCost: number;
  commentary: string;
  deliveredAt: string;
  userId: string;
  productSizeId: string;
};

export default class OrderProduct {
  static query() {
    return `#graphql
      getOnGoingOrdersOfUser(userId: ID!): [OrderProduct]
      getCompleteOrdersOfUser(userId: ID!): [OrderProduct]
      getOrderById(id: ID!): OrderProduct
      getOnGoingOrdersOfShop(shopId: ID!): [OrderProduct]
      getCompleteOrdersOfShop(shopId: ID!): [OrderProduct]
    `;
  }
  static mutation() {
    return `#graphql
      createOrderProduct(orderProducts: [orderProductInput!]!): ID
      cancelOrder(orderId: ID!): ID
      changeOrderStatus(orderId: ID!, status: OrderStatus!): ID
    `;
  }

  static typeDef() {
    return `#graphql
      input orderProductInput {
          fullPrice: Float
          count: Float
          deliveryAddress: String
          totalCost: Float
          commentary: String
          deliveredAt: String
          userId: String
          productSizeId: String
      }

      type OrderProduct {
        id: String
        fullPrice: Float
        count: Int
        deliveryAddress: String
        totalCost: Float
        status: OrderStatus
        deliveredAt: String
        createdAt: String
        updatedAt: String
        commentary: String
        productSizeId: String
        productSize: ProductSize
        userId: String
        user: User
        orderIngredientDetail: [OrderIngredientDetail]
     }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return orderProductResolver.queries;
    else return orderProductResolver.mutations;
  }
}
