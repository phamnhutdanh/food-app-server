import { RESOLVER_TYPE } from "../resolvers";
import { reportAccountResolver } from "./reportAccountResolver";

export default class ReportAccount {
  static query() {
    return `#graphql
      getListReportedAccount(accountId: String!): [ReportAccountDetail]
    `;
  }
  static mutation() {
    return `#graphql
      changeMarkStatus(reportAccountId: ID!, mark: ReportStatus): Boolean
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
        mark: ReportStatus
        reportAccountDetail: ReportAccountDetail
      }
    `;
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return reportAccountResolver.queries;
    else return reportAccountResolver.mutations;
  }
}
