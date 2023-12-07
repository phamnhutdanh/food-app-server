import { RESOLVER_TYPE } from "../resolvers";
import { productSizeResolver } from "./productSizeResolver";

export default class ProductSize {
  static query() {
    return `#graphql
       getAllSizes: [ProductSize]
    `;
  }
  static mutation() {
    return `#graphql

    `;
  }

  static typeDef() {
    return `#graphql
      type ProductSize {
        id: String
        title: String
        fullPrice: Float
        productId: String
      }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return productSizeResolver.queries;
    else return productSizeResolver.mutations;
  }
}
