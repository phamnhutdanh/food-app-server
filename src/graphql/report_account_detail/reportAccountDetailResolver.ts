import { ReportStatus } from "@prisma/client";
import { prismaClient } from "../../lib/db";

const queries = {
  getListAccountReport: async (
    _: any,
    { accountId }: { accountId: string }
  ) => {
    const reports = await prismaClient.reportAccountDetail.findMany({
      where: {
        reporterId: accountId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return reports;
  },
  getReportDetails: async (_: any, { id }: { id: string }) => {
    const report = await prismaClient.reportAccountDetail.findUnique({
      where: {
        id: id,
      },
      include: {
        reportAccount: {
          include: {
            accountReported: {
              include: {
                user: {
                  include: {
                    shop: true,
                  },
                },
              },
            },
          },
        },
        reporter: {
          include: {
            user: {
              include: {
                shop: true,
              },
            },
          },
        },
      },
    });

    return report;
  },
  getAllReportDetailListWithMarkStatus: async (
    _: any,
    { mark }: { mark: ReportStatus }
  ) => {
    const reports = await prismaClient.reportAccountDetail.findMany({
      where: {
        reportAccount: {
          mark: mark,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return reports;
  },
};

const mutations = {};

export const reportAccountDetailResolver = { queries, mutations };
