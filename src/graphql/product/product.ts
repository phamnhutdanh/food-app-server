import { RESOLVER_TYPE } from "../resolvers";
import { productResolver } from "./productResolver";

export type TagSearchInputType = {
  title: string;
};

export type UpdateProductInputType = {
  subcategoryId: string;
  imagePublicId: string;
  title: string;
  description: string;
  productId: string;
};

export type CreateProductInputType = {
  subcategoryId: string;
  imagePublicId: string;
  title: string;
  price: number;
  sizeTitle: string;
  description: string;
};

export default class Product {
  static query() {
    return `#graphql
      getAllProducts: [Product]
      getProductById(id: ID!): Product
      getPopularProducts: [Product]
      getRecentProducts: [Product]
      getAllProductOfShop(id: ID!): [Product]
      searchProduct(text: String): [Product]
      getAverageScore(productId: ID!): Float
    `;
  }

  static mutation() {
    return `#graphql
      createProduct(productInput: createProductInput!): ID 
      deleteProduct(productId: ID!): ID
      updateProduct(productInput: updateProductInput!):ID
    `;
  }

  static typeDef() {
    return `#graphql
      input updateProductInput {
          subcategoryId: String
          imagePublicId: String
          title: String
          description: String
          productId: String
      }

      input createProductInput {
          subcategoryId: String
          imagePublicId: String
          title: String
          price: Float
          sizeTitle: String
          description: String
      }
    
      input tagSearchInput {
        title: String
      }

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
        RatingProduct: [RatingProduct]
     }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return productResolver.queries;
    else return productResolver.mutations;
  }
}
