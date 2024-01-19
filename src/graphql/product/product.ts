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

export type UpdateProductWithImageInputType = {
  subcategoryId: string;
  imageUri: string;
  title: string;
  description: string;
  productId: string;
};

export type CreateProductWithImageInputType = {
  subcategoryId: string;
  imageUri: string;
  title: string;
  price: number;
  sizeTitle: string;
  description: string;
};

export type CreateProductInputType = {
  subcategoryId: string;
  imagePublicId: string;
  title: string;
  price: number;
  sizeTitle: string;
  description: string;
};

export type FilterProductInputType = {
  text: string;
  tagTitle: string;
  minPrice: number;
  maxPrice: number;
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
      filterProduct(filterInput: filterProductInput!): [Product]
      getAverageScore(productId: ID!): AggregateRatingProduct
    `;
  }

  static mutation() {
    return `#graphql
      createProduct(productInput: createProductInput!): ID 
      deleteProduct(productId: ID!): ID
      updateProduct(productInput: updateProductInput!):ID
      createProductWithImage(productInput: createProductWithImageInput!): ID 
      updateProductWithImage(productInput: updateProductWithImageInput!):ID
    `;
  }

  static typeDef() {
    return `#graphql
      input filterProductInput {
        text: String
        tagTitle: String
        minPrice: Float
        maxPrice: Float
      }

      type AggregateRatingProduct {
          avgRating: Float
          countRating: Float
      }

      input updateProductWithImageInput {
          subcategoryId: String
          imageUri: String
          title: String
          description: String
          productId: String
      }

      input updateProductInput {
          subcategoryId: String
          imagePublicId: String
          title: String
          description: String
          productId: String
      }

      
    input createProductWithImageInput {
          subcategoryId: String
          imageUri: String
          title: String
          price: Float
          sizeTitle: String
          description: String
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
        productIngredients: [ProductIngredients]
     }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return productResolver.queries;
    else return productResolver.mutations;
  }
}
