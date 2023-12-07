import { prismaClient } from "../../lib/db";

const queries = {
  getAllCartProducts: async () => {
    const cartProducts = await prismaClient.cartProduct.findMany({
      include: {
        productSize: {
          include: {
            product: {
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
            },
          },
        },
      },
    });
    return cartProducts;
  },
};

const mutations = {};

export const cartProductResolver = { queries, mutations };
