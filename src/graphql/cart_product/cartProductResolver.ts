import { prismaClient } from "../../lib/db";

const queries = {
  getAllCartProductsOfUser: async (
    _: any,
    {
      productSizeId,
      userId,
    }: {
      productSizeId: string;
      userId: string;
    }
  ) => {
    const cartProducts = await prismaClient.cartProduct.findMany({
      where: {
        productSizeId: productSizeId,
        cart: {
          userId: userId,
        },
      },
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

const mutations = {
  addProductToCart: async (
    _: any,
    {
      productSizeId,
      userId,
      amount,
      fullPrice,
    }: {
      productSizeId: string;
      userId: string;
      amount: number;
      fullPrice: number;
    }
  ) => {
    let cartProductId = "";
    await prismaClient.cart
      .findUnique({
        where: {
          userId: userId,
        },
      })
      .then(async (cart) => {
        await console.log(cart);
        await prismaClient.cartProduct
          .create({
            data: {
              productSizeId: productSizeId,
              cartId: cart?.id ? cart.id : "",
              amount: amount,
              fullPrice: fullPrice,
            },
          })
          .then((cartProduct) => {
            cartProductId = cartProduct.id;
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("createUserAccount errorCode: ", errorCode);
        console.log("createUserAccount errorMessage: ", errorMessage);
      });
    return cartProductId;
  },
  updateCartProduct: async (
    _: any,
    {
      cartProductId,
      productSizeId,
      amount,
      fullPrice,
    }: {
      cartProductId: string;
      productSizeId: string;
      amount: number;
      fullPrice: number;
    }
  ) => {
    await prismaClient.cartProduct.update({
      where: {
        id: cartProductId,
      },
      data: {
        productSizeId: productSizeId,
        amount: amount,
        fullPrice: fullPrice,
      },
    });
  },
  deleteCartProduct: async (
    _: any,
    {
      cartProductId,
    }: {
      cartProductId: string;
    }
  ) => {
    await prismaClient.cartProduct.delete({
      where: {
        id: cartProductId,
      },
    });
  },
  deleteAllCartProductsOfUser: async (
    _: any,
    {
      userId,
    }: {
      userId: string;
    }
  ) => {
    await prismaClient.cartProduct.deleteMany({
      where: {
        cart: {
          userId: userId,
        },
      },
    });
  },
};

export const cartProductResolver = { queries, mutations };
