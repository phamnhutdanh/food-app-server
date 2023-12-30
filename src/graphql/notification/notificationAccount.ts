import { RESOLVER_TYPE } from "../resolvers";
import { notificationAccountResolver } from "./notificationAccountResolver";

export default class NotificationAccount {
  static query() {
    return `#graphql
        getAllNotificationOfUser(userId: ID!, status: NotiStatus!): [NotificationAccount]
        getAllNotificationOfShop(shopId: ID!, status: NotiStatus!): [NotificationAccount]
        getAllNotificationOfAdmin(status: NotiStatus!): [NotificationAccount]
    `;
  }
  static mutation() {
    return `#graphql
        changeNotifyStatus(id: ID!, status: NotiStatus): Boolean
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
