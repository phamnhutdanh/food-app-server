import { NotiStatus } from "@prisma/client";
import { prismaClient } from "../../lib/db";

const queries = {
  getAllNotificationOfUser: async (
    _: any,
    { userId, status }: { userId: string; status: NotiStatus }
  ) => {
    const notifications = await prismaClient.notificationAccount.findMany({
      where: {
        AND: [
          {
            toUserId: userId,
          },
          {
            status: status,
          },
        ],
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return notifications;
  },
  getAllNotificationOfShop: async (
    _: any,
    { shopId, status }: { shopId: string; status: NotiStatus }
  ) => {
    const notifications = await prismaClient.notificationAccount.findMany({
      where: {
        AND: [
          {
            toShopId: shopId,
          },
          {
            status: status,
          },
        ],
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return notifications;
  },
  getAllNotificationOfAdmin: async (
    _: any,
    { status }: { status: NotiStatus }
  ) => {
    const admin = await prismaClient.user.findFirst({
      where: {
        account: {
          role: "ADMIN",
        },
      },
    });

    const notifications = await prismaClient.notificationAccount.findMany({
      where: {
        AND: [
          {
            toUserId: admin?.id,
          },
          {
            status: status,
          },
        ],
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return notifications;
  },
};

const mutations = {
  changeNotifyStatus: async (
    _: any,
    {
      id,
      status,
    }: {
      id: string;
      status: NotiStatus;
    }
  ) => {
    await prismaClient.notificationAccount.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
  },
};

export const notificationAccountResolver = { queries, mutations };
