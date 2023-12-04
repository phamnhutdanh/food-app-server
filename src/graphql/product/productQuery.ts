export const productQuery = `#graphql
    getAllProducts: [Product]
    getProductById(id: ID!): Product
    getPopularProducts: [Product]
    getRecentProducts: [Product]
`;
