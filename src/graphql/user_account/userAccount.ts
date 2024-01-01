import { RESOLVER_TYPE } from "../resolvers";
import { userAccountResolver } from "./userAccountResolver";

export default class UserAccount {
  static query() {
    return `#graphql
      getAllAccounts: [Account]
      getAccountById(id: ID!): Account
    `;
  }
  static mutation() {
    return `#graphql
      createUserAccount(email: String!, firebaseUID: String!): ID 
      changeStatusAccount(accountId: ID!, status: AccountStatus!): ID
    `;
  }

  static typeDef() {
    return `#graphql
      type Account {
        id: String
        email: String
        role: Role
        createdAt: String
        updatedAt: String
        firebaseUID: String
        reportAccount: [ReportAccount]
        reportAccountDetail: [ReportAccountDetail]
        user: User
        status: AccountStatus
      }

      type UserAccount {
        email: String!
      }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return userAccountResolver.queries;
    else return userAccountResolver.mutations;
  }
}
