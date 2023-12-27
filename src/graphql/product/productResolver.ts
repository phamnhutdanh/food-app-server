import { prismaClient } from "../../lib/db";
import { getImageWithPublicIdCloudinary } from "../../lib/getImageWithPublicIdCloudinary";
import {
  CreateProductInputType,
  TagSearchInputType,
  UpdateProductInputType,
} from "./product";

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
        RatingProduct: true,
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
  getAverageScore: async (
    _: any,
    {
      productId,
    }: {
      productId: string;
    }
  ) => {
    const aggregations = await prismaClient.ratingProduct.aggregate({
      where: {
        AND: [
          {
            productId: productId,
          },
          {
            score: {
              gte: 1,
            },
          },
        ],
      },
      _avg: {
        score: true,
      },
      _count: {
        score: true,
      },
    });
    const res = {
      avgRating: Math.round(aggregations._avg.score! * 100) / 100,
      countRating: aggregations._count.score,
    };
    return res;
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
  deleteProduct: async (
    _: any,
    {
      productId,
    }: {
      productId: string;
    }
  ) => {
    await prismaClient.product.delete({
      where: {
        id: productId,
      },
    });
  },
  updateProduct: async (
    _: any,
    {
      productInput,
    }: {
      productInput: UpdateProductInputType;
    }
  ) => {
    if (
      productInput.imagePublicId !== "" &&
      productInput.imagePublicId !== null
    ) {
      await getImageWithPublicIdCloudinary(productInput.imagePublicId).then(
        async (url: string) => {
          await prismaClient.product.update({
            where: {
              id: productInput.productId,
            },
            data: {
              subcategoryId: productInput.subcategoryId,
              imageUri: url,
              title: productInput.title,
              description: productInput.description,
            },
          });
        }
      );
    } else {
      await prismaClient.product.update({
        where: {
          id: productInput.productId,
        },
        data: {
          subcategoryId: productInput.subcategoryId,
          title: productInput.title,
          description: productInput.description,
        },
      });
    }
  },
};

export const productResolver = { queries, mutations };
