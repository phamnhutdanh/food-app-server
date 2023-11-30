import { Product } from "./product/product";
import { ProductCategory } from "./product_category/productCategory";
import { ProductSubCategory } from "./product_sub_category/productSubCategory";
import { User } from "./user/user";
import { UserAccount } from "./user_account/userAccount";

export const resolvers = {
  Query: {
    ...UserAccount.userAccountResolver.queries,
    ...User.userResolver.queries,
    ...Product.productResolver.queries,
    ...ProductSubCategory.productSubCategoryResolver.queries,
    ...ProductCategory.productCategoryResolver.queries,
  },
  Mutation: {
    ...UserAccount.userAccountResolver.mutations,
    ...User.userResolver.mutations,
    ...Product.productResolver.mutations,
    ...ProductSubCategory.productSubCategoryResolver.mutations,
    ...ProductCategory.productCategoryResolver.mutations,
  },
};
