import { prismaClient } from "../../lib/db";

const queries = {
  getAllProducts: async () => {
    const products = await prismaClient.product.findMany({
      include: {
        productSubcategory: {
          include: {
            productCategory: {
              include: {
                shop: true,
              },
            },
          },
        },
      },
    });

    products.forEach((product) => {
      const test =
        product.productSubcategory.productCategory.shop.shopPhoneNumber;
      console.log(test);
    });
    console.log(products);

    return products;
  },
  getProductById: async (_: any, { id }: { id: string }) => {
    const product = await prismaClient.product.findUnique({
      where: {
        id: id,
      },
    });
    return product;
  },
  getPopularProduct: async () => {
    const products = await prismaClient.product.findMany({
      orderBy: {
        averageRatingScores: "desc",
      },
    });
    return products;
  },
};

const mutations = {};

export const productResolver = { queries, mutations };
