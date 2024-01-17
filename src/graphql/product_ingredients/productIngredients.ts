import { RESOLVER_TYPE } from "../resolvers";
import { productIngredientsResolver } from "./productIngredientsResolver";

export type AddProductIngredientsInputType = {
  name: string;
  imageUri: string;
  price: number;
  productId: string;
};

export type UpdateProductIngredientsInputType = {
  name: string;
  imageUri: string;
  price: number;
  id: string;
};

export default class ProductIngredients {
  static query() {
    return `#graphql

    `;
  }
  static mutation() {
    return `#graphql
        addProductIngredients(productIngredientsInput: addProductIngredientsInput!): ID 
        updateProductIngredients(productIngredientsInput: updateProductIngredientsInput!): ID 
    `;
  }

  static typeDef() {
    return `#graphql

    input updateProductIngredientsInput {
        name: String
        imageUri: String
        price: Float
        id: String
    }

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

    type CartIngredientDetail {
        id: String
        title: String
        productIngredientID: String
        productIngredient: ProductIngredients
        cartProductId: String
        cartProduct: CartProduct
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
