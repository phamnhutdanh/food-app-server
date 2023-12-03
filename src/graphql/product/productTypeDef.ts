export const productTypeDef = `#graphql
  type Product {
    id: String
    title: String
    description: String
    fullPrice: Float
    size: String
    imageUri: String
    averageRatingScores: Float
    subcategoryId: String
    productSubcategory: ProductSubCategory
  }
`;
