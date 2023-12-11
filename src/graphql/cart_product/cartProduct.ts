import { RESOLVER_TYPE } from "../resolvers";
import { cartProductResolver } from "./cartProductResolver";

export default class CartProduct {
  static query() {
    return `#graphql
        getAllCartProductOfUser(userId: ID!): [CartProduct]
    `;
  }

  static mutation() {
    return `#graphql
        addProductToCart(productSizeId: ID!, userId: ID!, amount: Int, fullPrice: Float): ID 
        updateCartProduct(cartProductId: ID!, productSizeId: ID!, amount: Int, fullPrice: Float): ID
        deleteCartProduct(cartProductId: ID!): ID
        deleteAllCartProductsOfUser(userId: ID!): ID
    `;
  }

  static typeDef() {
    return `#graphql
        type CartProduct {
            id: String
            title: String
            amount: Int
            fullPrice: Float
            productSizeId: String
            productSize: ProductSize
            cartId: String
            # cart: Cart
        }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return cartProductResolver.queries;
    else return cartProductResolver.mutations;
  }
}
