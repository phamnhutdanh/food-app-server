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
        updateUser(userId: String!, name: String, phone: String, address: String, publicId: String): Boolean
        updateLoginRole(userId: String!, role: Role): Boolean
    `;
  }

  static typeDef() {
    return `#graphql
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
