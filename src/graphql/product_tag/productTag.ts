import { RESOLVER_TYPE } from "../resolvers";
import { productTagResolver } from "./productTagResolver";

export default class ProductTag {
  static query() {
    return `#graphql
       getAllTags: [ProductTag]
    `;
  }
  static mutation() {
    return `#graphql

    `;
  }

  static typeDef() {
    return `#graphql
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
