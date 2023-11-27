import { userMutation } from "./userMutation";
import { userQuery } from "./userQuery";
import { userResolver } from "./userResolver";
import { userTypeDef } from "./userTypeDef";

export const User = {
  userTypeDef,
  userQuery,
  userMutation,
  userResolver,
};
