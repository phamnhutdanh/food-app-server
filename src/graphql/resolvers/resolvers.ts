import { prismaClient } from "../../lib/db.js";

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
        saltPassword,
        role,
      }: {
        name: string;
        email: string;
        password: string;
        saltPassword: string;
        role: Role | any;
      }
    ) => {
      return await prismaClient.userAccount.create({
        data: {
          id: "44444",
          email: email,
          hashPassword: password,
          saltPassword: saltPassword,
          role: role,
        },
      });
    },
  },
};
