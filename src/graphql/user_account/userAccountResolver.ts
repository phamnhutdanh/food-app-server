import { prismaClient } from "../../lib/db";

enum UserRole {
  USER,
  ADMIN,
  SHOP_OWNER,
}

const queries = {
  accounts: () => {},
};

const mutations = {
  createUserAccount: async (
    _: any,
    {
      email,
      password,
      firebaseUID,
    }: {
      email: string;
      password: string;
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
