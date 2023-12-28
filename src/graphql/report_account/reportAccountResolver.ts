import { prismaClient } from "../../lib/db";

const queries = {
  getListReportedAccount: async (
    _: any,
    { accountId }: { accountId: string }
  ) => {
    const reports = await prismaClient.reportAccount
      .findMany({
        where: {
          accountReportedId: accountId,
        },
        include: {
          reportAccountDetail: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      })
      .then((reportAccounts) => {
        return reportAccounts;
      });
    return reports.map((item) => item.reportAccountDetail);
  },
};

const mutations = {};

export const reportAccountResolver = { queries, mutations };
