import { Product } from "./product/product";
import { ProductCategory } from "./product_category/productCategory";
import { ProductSize } from "./product_size/productSize";
import { ProductSubCategory } from "./product_sub_category/productSubCategory";
import { ProductTag } from "./product_tag/productTag";
import { Shop } from "./shop/shop";
import { User } from "./user/user";
import { UserAccount } from "./user_account/userAccount";

export const resolvers = {
  Query: {
    ...UserAccount.userAccountResolver.queries,
    ...User.userResolver.queries,
    ...Product.productResolver.queries,
    ...ProductSubCategory.productSubCategoryResolver.queries,
    ...ProductCategory.productCategoryResolver.queries,
    ...Shop.shopResolver.queries,
    ...ProductSize.productSizeResolver.queries,
    ...ProductTag.productTagResolver.queries,
  },
  Mutation: {
    ...UserAccount.userAccountResolver.mutations,
    ...User.userResolver.mutations,
    ...Product.productResolver.mutations,
    ...ProductSubCategory.productSubCategoryResolver.mutations,
    ...ProductCategory.productCategoryResolver.mutations,
    ...Shop.shopResolver.mutations,
    ...ProductSize.productSizeResolver.mutations,
    ...ProductTag.productTagResolver.mutations,
  },
};
