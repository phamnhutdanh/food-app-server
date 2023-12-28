import { prismaClient } from "../../lib/db";
import { CreateProductSubCategoryInputType } from "./productSubCategory";

const queries = {
  getAllProductSubCategories: async () => {
    const productSubCategories = await prismaClient.productSubcategory.findMany(
      {
        include: {
          productCategory: true,
          products: true,
        },
      }
    );
    return productSubCategories;
  },
  getProductSubCategoryById: async (_: any, { id }: { id: string }) => {
    const productSubcategory = await prismaClient.productSubcategory.findUnique(
      {
        where: {
          id: id,
        },
      }
    );
    return productSubcategory;
  },
  getAllSubCategoryOfShop: async (_: any, { id }: { id: string }) => {
    const productSubCategories = await prismaClient.productSubcategory.findMany(
      {
        where: {
          productCategory: {
            shopId: {
              equals: id,
            },
          },
        },
        include: {
          products: {
            take: 10,
          },
        },
      }
    );

    return productSubCategories;
  },
};

const mutations = {
  createProductSubCategory: async (
    _: any,
    {
      subcategory,
    }: {
      subcategory: CreateProductSubCategoryInputType;
    }
  ) => {
    await prismaClient.productCategory
      .findFirst({
        where: {
          shopId: subcategory.shopId,
        },
      })
      .then(async (productCategory) => {
        await prismaClient.productSubcategory.create({
          data: {
            title: subcategory.title,
            description: subcategory.description,
            categoryId: productCategory?.id!,
          },
        });
      });
  },
};

export const productSubCategoryResolver = { queries, mutations };
