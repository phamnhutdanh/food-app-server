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

    return products;
  },
  getProductById: async (_: any, { id }: { id: string }) => {
    const product = await prismaClient.product.findUnique({
      where: {
        id: id,
      },
      include: {
        ProductSize: true,
        ProductTag: true,
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
    return product;
  },
  getPopularProducts: async () => {
    const products = await prismaClient.product.findMany({
      orderBy: {
        averageRatingScores: "desc",
      },
      take: 10,
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
    return products;
  },
  getRecentProducts: async () => {
    const products = await prismaClient.product.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
      take: 10,
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
    return products;
  },
  getAllProductOfShop: async (_: any, { id }: { id: string }) => {
    const products = await prismaClient.product.findMany({
      where: {
        productSubcategory: {
          productCategory: {
            shopId: {
              equals: id,
            },
          },
        },
      },
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

    return products;
  },
};

const mutations = {};

export const productResolver = { queries, mutations };
