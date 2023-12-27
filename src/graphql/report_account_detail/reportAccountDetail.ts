import { RESOLVER_TYPE } from "../resolvers";
import { reportAccountDetailResolver } from "./reportAccountDetailResolver";

export default class ReportAccountDetail {
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
      type ReportAccountDetail {
        id: String
        title: String
        message: String
        createdAt: String
        updatedAt: String
        reporterId: String
        reporter: Account
        reportAccountId: String
        reportAccount: ReportAccount
      }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query)
      return reportAccountDetailResolver.queries;
    else return reportAccountDetailResolver.mutations;
  }
}