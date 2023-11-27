export const userAccountTypeDef = `#graphql
  type Account {
    id: String
    email: String
    role: Role
    createdAt: Int
    updatedAt: String
    firebaseUID: String
  }

  type UserAccount {
    email: String!
  }
`;
