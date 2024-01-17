import { RESOLVER_TYPE } from "../resolvers";
import { productIngredientsResolver } from "./productIngredientsResolver";

export type AddProductIngredientsInputType = {
  name: string;
  imageUri: string;
  price: number;
  productId: string;
};

export default class ProductIngredients {
  static query() {
    return `#graphql

    `;
  }
  static mutation() {
    return `#graphql
        addProductIngredients(productIngredientsInput: addProductIngredientsInput!): ID 
    `;
  }

  static typeDef() {
    return `#graphql
    input addProductIngredientsInput {
        name: String
        imageUri: String
        price: Float
        productId: String
    }

    type OrderIngredientDetail {
        id: String
        title: String
        productIngredientID: String
        productIngredient: ProductIngredients
        orderProductId: String
        orderProduct: OrderProduct
      }


      type ProductIngredients {
        id: String
        name: String
        imageUri: String
        price: Float
        productId: String
        product: Product
      }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return productIngredientsResolver.queries;
    else return productIngredientsResolver.mutations;
  }
}
