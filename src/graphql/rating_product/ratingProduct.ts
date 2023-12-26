import { RESOLVER_TYPE } from "../resolvers";
import { ratingProductResolver } from "./ratingProductResolver";

export type CreateRatingProductInputType = {
  score: number;
  comment: string;
  userId: string;
  productId: string;
};

export default class RatingProduct {
  static query() {
    return `#graphql
        getAllRatingOfProduct(productId: ID!): RatingProduct
    `;
  }
  static mutation() {
    return `#graphql
        createRatingProduct(ratingInput: createRatingProductInput!): ID
    `;
  }

  static typeDef() {
    return `#graphql
      input createRatingProductInput {
        score: Float
        comment: String
        userId: String
        productId: String
      }

      type RatingProduct {
        id: String
        score: Float
        comment: String
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
    if (type === RESOLVER_TYPE.Query) return ratingProductResolver.queries;
    else return ratingProductResolver.mutations;
  }
}
