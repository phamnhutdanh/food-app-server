import { OrderStatus } from "@prisma/client";
import { RESOLVER_TYPE } from "../resolvers";
import { orderResolver } from "./orderResolver";

export type OrderInputType = {
  deliveryAddress: string;
  totalCost: number;
  status: OrderStatus;
  deliveredAt: string;
  userId: string;
  commentary: string;
};

export default class Order {
  static query() {
    return `#graphql

    `;
  }
  static mutation() {
    return `#graphql
       
    `;
  }

  static typeDef() {
    return `#graphql
      input orderInput {
        deliveryAddress: String
        totalCost: Float
        status: OrderStatus
        deliveredAt: String
        commentary: String
        userId: String
      }

      type Order {
        id: String
        deliveryAddress: String
        totalCost: Float
        status: OrderStatus
        createdAt: String
        updatedAt: String
        deliveredAt: String
        userId: String
     }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return orderResolver.queries;
    else return orderResolver.mutations;
  }
}
