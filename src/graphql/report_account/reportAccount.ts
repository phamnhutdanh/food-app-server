import { RESOLVER_TYPE } from "../resolvers";
import { reportAccountResolver } from "./reportAccountResolver";

export default class ReportAccount {
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
      type ReportAccount {
        id: String
        accountReportedId: String
        accountReported: Account
        createdAt: String
        updatedAt: String
      }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return reportAccountResolver.queries;
    else return reportAccountResolver.mutations;
  }
}
