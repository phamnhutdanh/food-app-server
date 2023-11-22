// import { createUserWithEmailAndPassword } from "@firebase/auth";
// import { prismaClient } from "../lib/db.js";
// import { FIREBASE_AUTH } from "../services/FirebaseConfig.js";

import { UserAccount } from "./user_account/userAccount";

export const resolvers = {
  Query: {
    ...UserAccount.userAccountResolver.queries,
  },
  Mutation: {
    ...UserAccount.userAccountResolver.mutations,
  },
};
