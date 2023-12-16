import { RESOLVER_TYPE } from "../resolvers";
import { userResolver } from "./userResolver";

export default class User {
  static query() {
    return `#graphql
        getAllUsers: [User]
        getUserById(id: ID!): User
        getUserByFirebaseUID(id: ID!): User
    `;
  }
  static mutation() {
    return `#graphql
        uploadImage(image: Upload!): Boolean
    `;
  }

  static typeDef() {
    return `#graphql
      scalar Upload

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
  }

  static resolver(type: RESOLVER_TYPE) {
    if (type === RESOLVER_TYPE.Query) return userResolver.queries;
    else return userResolver.mutations;
  }
}
