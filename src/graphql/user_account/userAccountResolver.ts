import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../services/FirebaseConfig.js";
import { prismaClient } from "../../lib/db.js";

enum Role {
  ADMIN,
  CUSTOMER,
  SHOP,
}

const queries = {
  books: () => {},
};

const mutations = {
  signUp: async (
    _: any,
    {
      name,
      email,
      password,
      role,
    }: {
      name: string;
      email: string;
      password: string;
      role: Role | any;
    }
  ) => {
    const auth = FIREBASE_AUTH;
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        // create UserAccount
        await prismaClient.userAccount
          .create({
            data: {
              id: user.uid,
              email: email,
              role: role,
            },
          })
          .then(async () => {
            // Create Customer
            if (role == "CUSTOMER") {
              await prismaClient.customer.create({
                data: {
                  name: name,
                  idUserAccount: user.uid,
                },
              });
            }
            // Create Shop
            else if (role == "SHOP") {
              await prismaClient.shop.create({
                data: {
                  name: name,
                  idUserAccount: user.uid,
                },
              });
            }
            return user.uid;
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
