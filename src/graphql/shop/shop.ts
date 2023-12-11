import { RESOLVER_TYPE } from "../resolvers";
import { shopResolver } from "./shopResolver";

export default class Shop {
  static query() {
    return `#graphql
      getAllShop: [Shop]
      getShopById(id: ID!): Shop
    `;
  }
  static mutation() {
    return `#graphql

    `;
  }

  static typeDef() {
    return `#graphql
      type Shop {
        id: String
        shopAddress: String
        shopPhoneNumber: String
        shopName: String
        imageUri: String
        user: User
      }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return shopResolver.queries;
    else return shopResolver.mutations;
  }
}
