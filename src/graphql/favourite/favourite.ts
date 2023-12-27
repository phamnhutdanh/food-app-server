import { RESOLVER_TYPE } from "../resolvers";
import { favouriteResolver } from "./favouriteResolver";

export type CreateFavouriteInputType = {
  userId: string;
  productId: string;
};

export type RemoveFromFavouriteInputType = {
  userId: string;
  productId: string;
};

export default class FavouriteProduct {
  static query() {
    return `#graphql
       getFavouriteProductsOfUser(userId: ID!): [Product]
       getLimitFavouriteProductsOfUser(userId: ID!, takeNum: Float): [Product]
    `;
  }
  static mutation() {
    return `#graphql
        addToFavourite(favouriteInput: createFavouriteInput!): ID
        removeFromFavourite(favouriteInput: removeFromFavouriteInput!): ID
    `;
  }

  static typeDef() {
    return `#graphql
      input createFavouriteInput {
        userId: String
        productId: String
      }

      input removeFromFavouriteInput {
        userId: String
        productIdL String
      }

      type FavouriteProduct {
        userId: String
        user: User
        productId: String
        product: Product
        createdAt: String
        updatedAt: String
      }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return favouriteResolver.queries;
    else return favouriteResolver.mutations;
  }
}
