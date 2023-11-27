import { Product } from "./product/product";
import { ProductSubCategory } from "./product_sub_category/productSubCategory";
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

   type ID {
      id: String
   }
            
   type Query {
      ${UserAccount.userAccountQuery}
      ${User.userQuery}
      ${Product.productQuery}
      ${ProductSubCategory.productSubCategoryQuery}
   }

   type Mutation {
       ${UserAccount.userAccountMutation}
       ${User.userMutation}
       ${Product.productMutation}
       ${ProductSubCategory.productSubCategoryMutation}
   }           
`;
