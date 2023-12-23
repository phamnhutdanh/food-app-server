import { RESOLVER_TYPE } from "../resolvers";
import { shopResolver } from "./shopResolver";

export type CreateShopAccountInputType = {
  shopAddress: string;
  shopPhoneNumber: string;
  shopName: string;
  imageUri: string;
  userId: string;
};

export default class Shop {
  static query() {
    return `#graphql
      getAllShop: [Shop]
      getShopById(id: ID!): Shop
      getShopInfoByFirebaseUID(id: ID!): Shop
    `;
  }
  static mutation() {
    return `#graphql
      createShopAccount(shop: createShopAccountInput!): ID 
    `;
  }

  static typeDef() {
    return `#graphql
      input createShopAccountInput {
          shopAddress: String
          shopPhoneNumber: String
          shopName: String
          imageUri: String
          userId: String
      }

      type Shop {
        id: String
        shopAddress: String
        shopPhoneNumber: String
        shopName: String
        imageUri: String
        userId: String
        user: User
      }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return shopResolver.queries;
    else return shopResolver.mutations;
  }
}
