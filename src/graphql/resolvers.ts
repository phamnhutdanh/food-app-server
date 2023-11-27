import { Product } from "./product/product";
import { ProductSubCategory } from "./product_sub_category/productSubCategory";
import { User } from "./user/user";
import { UserAccount } from "./user_account/userAccount";

export const resolvers = {
  Query: {
    ...UserAccount.userAccountResolver.queries,
    ...User.userResolver.queries,
    ...Product.productResolver.queries,
    ...ProductSubCategory.productSubCategoryResolver.queries,
  },
  Mutation: {
    ...UserAccount.userAccountResolver.mutations,
    ...User.userResolver.mutations,
    ...Product.productResolver.mutations,
    ...ProductSubCategory.productSubCategoryResolver.mutations,
  },
};
