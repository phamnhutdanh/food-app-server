import { RESOLVER_TYPE } from "../resolvers";
import { notificationAccountResolver } from "./notificationAccountResolver";

export default class NotificationAccount {
  static query() {
    return `#graphql
     
    `;
  }
  static mutation() {
    return `#graphql
  
    `;
  }

  static typeDef() {
    return `#graphql
      type NotificationAccount {
        id: String
        title: String
        message: String
        createdAt: String
        updatedAt: String
        toUserId: String
        user: User
        toShopId: String
        shop: Shop
      }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query)
      return notificationAccountResolver.queries;
    else return notificationAccountResolver.mutations;
  }
}
