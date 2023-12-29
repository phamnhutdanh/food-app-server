import { ReportStatus } from "@prisma/client";
import { prismaClient } from "../../lib/db";
import { CreateReportInputType } from "./reportAccount";

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
          reportAccountDetail: {
            include: {
              reportAccount: true,
            },
          },
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

const mutations = {
  changeMarkStatus: async (
    _: any,
    { reportAccountId, mark }: { reportAccountId: string; mark: ReportStatus }
  ) => {
    await prismaClient.reportAccount.update({
      where: {
        id: reportAccountId,
      },
      data: {
        mark: mark,
      },
    });
  },
  createReport: async (
    _: any,
    { reportInput }: { reportInput: CreateReportInputType }
  ) => {
    await prismaClient.reportAccount
      .create({
        data: {
          accountReportedId: reportInput.accountReportedId,
        },
      })
      .then(async (reportAccount) => {
        await prismaClient.reportAccountDetail.create({
          data: {
            title: reportInput.title,
            message: reportInput.message,
            reportAccountId: reportAccount.id,
            reporterId: reportInput.reporterId,
          },
        });
      });
  },
};

export const reportAccountResolver = { queries, mutations };
