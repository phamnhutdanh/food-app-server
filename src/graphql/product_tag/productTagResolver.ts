import { prismaClient } from "../../lib/db";
import { CreateTagInputType } from "./productTag";

const queries = {
  getAllTags: async () => {
    const tags = await prismaClient.productTag.findMany({
      distinct: ["title"],
      orderBy: {
        title: "desc",
      },
      select: {
        id: true,
        title: true,
        productId: true,
      },
    });
    return tags;
  },
};

const mutations = {
  createTag: async (
    _: any,
    {
      tagInput,
    }: {
      tagInput: CreateTagInputType;
    }
  ) => {
    await prismaClient.productTag.create({
      data: {
        title: tagInput.title,
        productId: tagInput.productId,
      },
    });
  },
};

export const productTagResolver = { queries, mutations };
