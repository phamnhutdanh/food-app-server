export const shopTypeDef = `#graphql
  type Shop {
    id: String
    shopAddress: String
    shopPhoneNumber: String
    shopName: String
    imageUri: String
    user: User
  }
`;
