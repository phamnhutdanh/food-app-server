import { prismaClient } from "../../lib/db";
import { getImageWithPublicIdCloudinary } from "../../lib/getImageWithPublicIdCloudinary";
import { CreateProductInputType, TagSearchInputType } from "./product";

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
  searchProduct: async (
    _: any,
    {
      text,
    }: {
      text: string;
    }
  ) => {
    const products = await prismaClient.product.findMany({
      where: {
        title: {
          contains: text,
          mode: "insensitive",
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
      orderBy: {
        _relevance: {
          fields: ["title"],
          search: text,
          sort: "desc",
        },
      },
    });

    return products;
  },
};

const mutations = {
  createProduct: async (
    _: any,
    {
      productInput,
    }: {
      productInput: CreateProductInputType;
    }
  ) => {
    await getImageWithPublicIdCloudinary(productInput.imagePublicId).then(
      async (url: string) => {
        await prismaClient.product
          .create({
            data: {
              title: productInput.title,
              imageUri: url,
              fullPrice: productInput.price,
              description: productInput.description,
              subcategoryId: productInput.subcategoryId,
            },
          })
          .then(async (product) => {
            await prismaClient.productSize.create({
              data: {
                title: productInput.sizeTitle,
                fullPrice: productInput.price,
                productId: product.id,
              },
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("createProduct errorCode: ", errorCode);
            console.log("createProduct errorMessage: ", errorMessage);
          });
      }
    );
  },
};

export const productResolver = { queries, mutations };
