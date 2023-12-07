import { RESOLVER_TYPE } from "../resolvers";
import { productSubCategoryResolver } from "./productSubCategoryResolver";

export default class ProductSubCategory {
  static query() {
    return `#graphql
      getAllProductSubCategories: [ProductSubCategory]
      getProductSubCategoryById(id: ID!): ProductSubCategory
      getAllSubCategoryOfShop(id: ID!): [ProductSubCategory]
    `;
  }
  static mutation() {
    return `#graphql

    `;
  }

  static typeDef() {
    return `#graphql
      type ProductSubCategory {
        id: String
        title: String
        description: String
        categoryId: String
        productCategory: ProductCategory
        products: [Product]
      }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return productSubCategoryResolver.queries;
    else return productSubCategoryResolver.mutations;
  }
}
