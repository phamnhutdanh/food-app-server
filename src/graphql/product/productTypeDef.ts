export const productTypeDef = `#graphql
  type Product {
    id: String
    title: String
    description: String
    fullPrice: Float
    imageUri: String
    averageRatingScores: Float
    subcategoryId: String
    productSubcategory: ProductSubCategory
    sizeId: String
    
  }
`;
