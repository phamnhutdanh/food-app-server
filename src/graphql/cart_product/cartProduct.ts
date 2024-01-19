import { RESOLVER_TYPE } from "../resolvers";
import { cartProductResolver } from "./cartProductResolver";

export type CartIngredientsInputType = {
  id: string;
};

export default class CartProduct {
  static query() {
    return `#graphql
        getAllCartProductOfUser(userId: ID!): [CartProduct]
    `;
  }

  static mutation() {
    return `#graphql
        addProductToCart(productSizeId: ID!, userId: ID!, amount: Int, fullPrice: Float, listIngredients: [cartIngredientsInput]): ID 
        updateCartProduct(cartProductId: ID!, productSizeId: ID!, amount: Int, fullPrice: Float): ID
        deleteCartProduct(cartProductId: ID!): ID
        deleteAllCartProductsOfUser(userId: ID!): ID
    `;
  }

  static typeDef() {
    return `#graphql
        input cartIngredientsInput {
            id: String
        }

        type CartProduct {
            id: String
            title: String
            amount: Int
            fullPrice: Float
            productSizeId: String
            productSize: ProductSize
            cartId: String
            cartIngredientDetail: [CartIngredientDetail]
            # cart: Cart
        }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return cartProductResolver.queries;
    else return cartProductResolver.mutations;
  }
}
