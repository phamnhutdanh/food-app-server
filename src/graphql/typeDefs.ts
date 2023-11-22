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
            
   type Query {
      ${UserAccount.userAccountQuery}
   }

   type Mutation {
       ${UserAccount.userAccountMutation}
   }           
`;
