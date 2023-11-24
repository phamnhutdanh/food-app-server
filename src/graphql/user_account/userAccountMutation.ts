export const userAccountMutation = `#graphql
      signUp(email: String!, password: String!): UserAccountID
      login(email: String!, password: String!): UserAccountID
      logout: Boolean
`;
