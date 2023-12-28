import { RESOLVER_TYPE } from "../resolvers";
import { productSizeResolver } from "./productSizeResolver";

export type CreateSizeInputType = {
  title: string;
  productId: string;
  fullPrice: number;
};

export default class ProductSize {
  static query() {
    return `#graphql
       getAllSizes: [ProductSize]
    `;
  }
  static mutation() {
    return `#graphql
      createProductSize(sizeInput: createSizeInput!): ID
    `;
  }

  static typeDef() {
    return `#graphql
     input createSizeInput {
        title: String
        fullPrice: Float
        productId: String
      }

      type ProductSize {
        id: String
        title: String
        fullPrice: Float
        productId: String
        product: Product
      }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return productSizeResolver.queries;
    else return productSizeResolver.mutations;
  }
}
