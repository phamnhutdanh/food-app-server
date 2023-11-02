import { UserAccount } from "./user_account/userAccount.js";

const ROLE = `
enum Role {
  ADMIN
  CUSTOMER
  SHOP
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
