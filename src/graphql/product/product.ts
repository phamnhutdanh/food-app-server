import { RESOLVER_TYPE } from "../resolvers";
import { productResolver } from "./productResolver";

export default class Product {
  static query() {
    return `#graphql
      getAllProducts: [Product]
      getProductById(id: ID!): Product
      getPopularProducts: [Product]
      getRecentProducts: [Product]
      getAllProductOfShop(id: ID!): [Product]
    `;
  }
  static mutation() {
    return `#graphql

    `;
  }

  static typeDef() {
    return `#graphql
      type Product {
        id: String
        title: String
        description: String
        fullPrice: Float
        imageUri: String
        averageRatingScores: Float
        productSubcategory: ProductSubCategory
        ProductSize: [ProductSize]
        ProductTag: [ProductTag]
     }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return productResolver.queries;
    else return productResolver.mutations;
  }
}
