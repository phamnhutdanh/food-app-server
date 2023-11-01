import { createUserWithEmailAndPassword } from "@firebase/auth";
import { prismaClient } from "../../lib/db.js";
import { FIREBASE_AUTH } from "../../services/FirebaseConfig.js";
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
  {
    title: "The Awakening2",
    author: "Kate Chopin2",
  },
  {
    title: "City of Glass2",
    author: "Paul Auster2",
  },
];

enum Role {
  ADMIN,
  CUSTOMER,
  SHOP,
}

export const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    createUserAccount: async (
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
      createUserWithEmailAndPassword(auth, email, password)
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
                await prismaClient.customer
                  .create({
                    data: {
                      name: name,
                      idUserAccount: user.uid,
                    },
                  })
                  .then(() => {
                    return true;
                  });
              }
              // Create Shop
              else if (role == "SHOP") {
                await prismaClient.shop
                  .create({
                    data: {
                      name: name,
                      idUserAccount: user.uid,
                    },
                  })
                  .then(() => {
                    return true;
                  });
              }
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("createUserAccount errorCode: ", errorCode);
          console.log("createUserAccount errorMessage: ", errorMessage);
          return false;
        });
    },
  },
};
