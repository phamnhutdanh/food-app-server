import { RESOLVER_TYPE } from "../resolvers";
import { cartResolver } from "./cartResolver";

export default class Cart {
  static query() {
    return `#graphql
        getAllCarts: [Cart]
    `;
  }
  static mutation() {
    return `#graphql

    `;
  }

  static typeDef() {
    return `#graphql
        type Cart {
            id: String
            userId: String
            user: User
            CartProduct: [CartProduct]
            # cart: Cart
        }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return cartResolver.queries;
    else return cartResolver.mutations;
  }
}
