import { Product } from "./product/product";
import { ProductCategory } from "./product_category/productCategory";
import { ProductSubCategory } from "./product_sub_category/productSubCategory";
import { Shop } from "./shop/shop";
import { User } from "./user/user";
import { UserAccount } from "./user_account/userAccount";

const ROLE = `#graphql
enum Role {
   USER
   ADMIN
   SHOP_OWNER
}
`;

export const typeDefs = `#graphql
   ${ROLE}
   ${UserAccount.userAccountTypeDef}
   ${User.userTypeDef}
   ${Product.productTypeDef}
   ${ProductSubCategory.productSubCategoryTypeDef}
   ${ProductCategory.productCategoryTypeDef}
   ${Shop.shopTypeDef}

   type ID {
      id: String
   }
            
   type Query {
      ${UserAccount.userAccountQuery}
      ${User.userQuery}
      ${Product.productQuery}
      ${ProductSubCategory.productSubCategoryQuery}
      ${ProductCategory.productCategoryQuery}
      ${Shop.shopQuery}
   }

   type Mutation {
       ${UserAccount.userAccountMutation}
       ${User.userMutation}
       ${Product.productMutation}
       ${ProductSubCategory.productSubCategoryMutation}
       ${ProductCategory.productCategoryMutation}
       ${Shop.shopMutation}
   }           
`;
