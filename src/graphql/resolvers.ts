import { User } from "./user/user";
import { UserAccount } from "./user_account/userAccount";

export const resolvers = {
  Query: {
    ...UserAccount.userAccountResolver.queries,
    ...User.userResolver.queries,
  },
  Mutation: {
    ...UserAccount.userAccountResolver.mutations,
    ...User.userResolver.mutations,
  },
};
