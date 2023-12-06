export const userQuery = `#graphql
    getAllUsers: [User]
    getUserById(id: ID!): User
    getUserByFirebaseUID(id: ID!): User
`;
