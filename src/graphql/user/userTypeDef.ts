export const userTypeDef = `#graphql
  type User {
    id: String
    name: String
    phoneNumber: String
    imageUrl: String
    backgroundImageUrl: String
    defaultAddress: String
    account: Account
  }
`;
