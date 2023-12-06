import { prismaClient } from "../../lib/db";

const queries = {
  getAllUsers: async () => {
    const users = await prismaClient.user.findMany({
      include: {
        account: true,
      },
    });
    console.log(users);
    return users;
  },
  getUserById: async (_: any, { id }: { id: string }) => {
    const user = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
      include: {
        account: true,
      },
    });
    return user;
  },
  getUserByFirebaseUID: async (_: any, { id }: { id: string }) => {
    const user = await prismaClient.user.findFirst({
      where: {
        account: {
          firebaseUID: id,
        },
      },
    });
    return user;
  },
};

const mutations = {};

export const userResolver = { queries, mutations };
