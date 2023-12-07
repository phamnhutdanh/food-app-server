import { RESOLVER_TYPE } from "../resolvers";
import { cartProductResolver } from "./cartProductResolver";

export default class CartProduct {
  static query() {
    return `#graphql
        getAllCartProducts: [CartProduct]
    `;
  }
  static mutation() {
    return `#graphql

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
