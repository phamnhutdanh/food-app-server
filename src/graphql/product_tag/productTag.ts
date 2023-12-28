import { RESOLVER_TYPE } from "../resolvers";
import { productTagResolver } from "./productTagResolver";

export type CreateTagInputType = {
  title: string;
  productId: string;
};

export default class ProductTag {
  static query() {
    return `#graphql
       getAllTags: [ProductTag]
    `;
  }
  static mutation() {
    return `#graphql
      createTag(tagInput: createTagInput!): ID
    `;
  }

  static typeDef() {
    return `#graphql
      input createTagInput {
        title: String
        productId: String
      }

      type ProductTag {
        id: String
        title: String
        productId: String
      }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return productTagResolver.queries;
    else return productTagResolver.mutations;
  }
}
