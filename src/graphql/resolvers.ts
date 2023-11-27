import { UserAccount } from "./user_account/userAccount";

export const resolvers = {
  Query: {
    ...UserAccount.userAccountResolver.queries,
  },
  Mutation: {
    ...UserAccount.userAccountResolver.mutations,
  },
};
