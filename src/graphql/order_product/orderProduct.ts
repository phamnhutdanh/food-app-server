import { RESOLVER_TYPE } from "../resolvers";
import { orderProductResolver } from "./orderProductResolver";

export type OrderProductInputType = {
  fullPrice: number;
  count: number;
  productSizeId: string;
};

export default class OrderProduct {
  static query() {
    return `#graphql

    `;
  }
  static mutation() {
    return `#graphql
        createOrderProduct(order: orderInput!, orderProducts: [orderProductInput!]!): ID
    `;
  }

  static typeDef() {
    return `#graphql
      input orderProductInput {
        fullPrice: Float
        count: Int
        productSizeId: String
      }

      type OrderProduct {
        id: String
        fullPrice: Float
        count: Int
        createdAt: String
        updatedAt: String
        orderId: String
        productSizeId: String
     }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return orderProductResolver.queries;
    else return orderProductResolver.mutations;
  }
}
