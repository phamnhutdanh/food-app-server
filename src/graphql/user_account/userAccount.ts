import { userAccountMutation } from "./userAccountMutation";
import { userAccountQuery } from "./userAccountQuery";
import { userAccountResolver } from "./userAccountResolver";
import { userAccountTypeDef } from "./userAccountTypeDef";

export const UserAccount = {
  userAccountTypeDef,
  userAccountQuery,
  userAccountMutation,
  userAccountResolver,
};
