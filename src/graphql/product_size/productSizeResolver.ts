import { prismaClient } from "../../lib/db";
import { CreateSizeInputType } from "./productSize";

const queries = {
  getAllSizes: async () => {
    const sizes = await prismaClient.productSize.findMany();
    return sizes;
  },
};

const mutations = {
  createProductSize: async (
    _: any,
    {
      sizeInput,
    }: {
      sizeInput: CreateSizeInputType;
    }
  ) => {
    await prismaClient.productSize.create({
      data: {
        title: sizeInput.title,
        productId: sizeInput.productId,
        fullPrice: sizeInput.fullPrice,
      },
    });
  },
};

export const productSizeResolver = { queries, mutations };
