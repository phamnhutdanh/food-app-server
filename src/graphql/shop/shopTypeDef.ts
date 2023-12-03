export const shopTypeDef = `#graphql
  type Shop {
    id: String
    shopAddress: String
    shopPhoneNumber: String
    idUser: String
    user: User
  }
`;
