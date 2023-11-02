import { userAccountMutation } from "./userAccountMutation.js";
import { userAccountQuery } from "./userAccountQuery.js";
import { userAccountResolver } from "./userAccountResolver.js";
import { userAccountTypeDef } from "./userAccountTypeDef.js";

export const UserAccount = {
  userAccountTypeDef,
  userAccountQuery,
  userAccountMutation,
  userAccountResolver,
};
