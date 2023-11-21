import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../services/FirebaseConfig.js";
import { prismaClient } from "../../lib/db.js";

enum UserRole {
  USER,
  ADMIN,
  SHOP_OWNER,
}

const queries = {
  accounts: () => {},
};

const mutations = {
  signUp: async (
    _: any,
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    }
  ) => {
    const auth = FIREBASE_AUTH;
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        // create UserAccount
        await prismaClient.account
          .create({
            data: {
              email: email,
              firebaseUID: user.uid,
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
              .then(() => account.id);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("createUserAccount errorCode: ", errorCode);
        console.log("createUserAccount errorMessage: ", errorMessage);
        return null;
      });
  },
};

export const userAccountResolver = { queries, mutations };
