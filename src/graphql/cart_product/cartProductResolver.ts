import { prismaClient } from "../../lib/db";
import { CartIngredientsInputType } from "./cartProduct";

const queries = {
  getAllCartProductOfUser: async (
    _: any,
    {
      userId,
    }: {
      userId: string;
    }
  ) => {
    const cartProduct = await prismaClient.cartProduct.findMany({
      where: {
        cart: {
          userId: userId,
        },
      },
      include: {
        productSize: {
          include: {
            product: true,
          },
        },
        cartIngredientDetail: {
          include: {
            productIngredient: true,
          },
        },
      },
    });
    console.log(cartProduct);
    return cartProduct;
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
      listIngredients,
    }: {
      productSizeId: string;
      userId: string;
      amount: number;
      fullPrice: number;
      listIngredients: CartIngredientsInputType[];
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
          .then(async (cartProduct) => {
            cartProductId = cartProduct.id;
            if (listIngredients.length > 0) {
              listIngredients.forEach(async (ingredient) => {
                await prismaClient.cartIngredientDetail.create({
                  data: {
                    cartProductId: cartProduct.id,
                    productIngredientID: ingredient.id,
                  },
                });
              });
            }
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
