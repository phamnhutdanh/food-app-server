import { RESOLVER_TYPE } from "../resolvers";
import { shopResolver } from "./shopResolver";

export type CreateShopAccountInputType = {
  shopAddress: string;
  shopPhoneNumber: string;
  shopName: string;
  imageUri: string;
  userId: string;
};

export type CreateShopAccountWithImageInputType = {
  shopAddress: string;
  shopPhoneNumber: string;
  shopName: string;
  imageUri: string;
  userId: string;
};

export type UpdateShopAccountInputType = {
  shopAddress: string;
  shopPhoneNumber: string;
  shopName: string;
  imagePublicId: string;
  shopId: string;
};

export type UpdateShopAccountWithImageInputType = {
  shopAddress: string;
  shopPhoneNumber: string;
  shopName: string;
  imageUri: string;
  shopId: string;
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
      updateShopAccount(shop: updateShopAccountInput): ID
      createShopAccountWithImage(shop: createShopAccountWithImageInput!): ID 
      updateShopWithImage(shop: updateShopAccountWithImageInput): ID
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

      input createShopAccountWithImageInput {
          shopAddress: String
          shopPhoneNumber: String
          shopName: String
          imageUri: String
          userId: String
      }

      input updateShopAccountInput {
          shopAddress: String
          shopPhoneNumber: String
          shopName: String
          imagePublicId: String
          shopId: String!
      }

      input updateShopAccountWithImageInput {
          shopAddress: String
          shopPhoneNumber: String
          shopName: String
          imageUri: String
          shopId: String!
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
