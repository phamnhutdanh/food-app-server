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

   type ID {
      id: String
   }
            
   type Query {
      ${UserAccount.userAccountQuery}
      ${User.userQuery}
   }

   type Mutation {
       ${UserAccount.userAccountMutation}
       ${User.userMutation}
   }           
`;
