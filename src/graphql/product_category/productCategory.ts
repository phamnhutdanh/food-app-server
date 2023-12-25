import { RESOLVER_TYPE } from "../resolvers";
import { productCategoryResolver } from "./productCategoryResolver";

export default class ProductCategory {
  static query() {
    return `#graphql
      getAllProductCategories: [ProductCategory]
      getProductCategoryById(id: ID!): ProductCategory
    `;
  }
  static mutation() {
    return `#graphql

    `;
  }

  static typeDef() {
    return `#graphql
      type ProductCategory {
        id: String
        title: String
        description: String
        imageUri: String
        shopId: String
        shop: Shop
      }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return productCategoryResolver.queries;
    else return productCategoryResolver.mutations;
  }
}
