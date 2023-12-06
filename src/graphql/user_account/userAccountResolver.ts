import { prismaClient } from "../../lib/db";

enum UserRole {
  USER,
  ADMIN,
  SHOP_OWNER,
}

const queries = {
  getAllAccounts: async () => {
    const accounts = await prismaClient.account.findMany();
    return accounts;
  },
  getAccountById: async (_: any, { id }: { id: string }) => {
    const account = await prismaClient.account.findUnique({
      where: {
        id: id,
      },
    });
    return account;
  },
};

const mutations = {
  createUserAccount: async (
    _: any,
    {
      email,
      firebaseUID,
    }: {
      email: string;
      firebaseUID: string;
    }
  ) => {
    let userAccountID = "";
    // create UserAccount
    await prismaClient.account
      .create({
        data: {
          email: email,
          firebaseUID: firebaseUID,
          role: "USER",
        },
      })
      .then(async (account) => {
        // Create User
        await prismaClient.user
          .create({
            data: {
              accountId: account.id,
            },
          })
          .then(() => {
            userAccountID = account.id;
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("createUserAccount errorCode: ", errorCode);
        console.log("createUserAccount errorMessage: ", errorMessage);
        userAccountID = "";
      })
      .finally(() => {
        return userAccountID;
      });
  },
};

export const userAccountResolver = { queries, mutations };
