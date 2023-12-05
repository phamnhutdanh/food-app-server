export const productSubCategoryQuery = `#graphql
    getAllProductSubCategories: [ProductSubCategory]
    getProductSubCategoryById(id: ID!): ProductSubCategory
    getAllSubCategoryOfShop(id: ID!): [ProductSubCategory]
`;
