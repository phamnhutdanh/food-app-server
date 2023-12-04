export const productTypeDef = `#graphql
  type Product {
    id: String
    title: String
    description: String
    fullPrice: Float
    imageUri: String
    averageRatingScores: Float
    productSubcategory: ProductSubCategory
    ProductSize: [ProductSize]
    ProductTag: [ProductTag]
  }
`;
