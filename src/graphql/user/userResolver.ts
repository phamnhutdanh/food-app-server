import { prismaClient } from "../../lib/db";
import { getImageWithPublicIdCloudinary } from "../../lib/getImageWithPublicIdCloudinary";

const queries = {
  getAllUsers: async () => {
    const users = await prismaClient.user.findMany({
      include: {
        account: true,
      },
    });
    console.log(users);
    return users;
  },
  getUserById: async (_: any, { id }: { id: string }) => {
    const user = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
      include: {
        account: true,
      },
    });
    return user;
  },
  getUserByFirebaseUID: async (_: any, { id }: { id: string }) => {
    const user = await prismaClient.user.findFirst({
      where: {
        account: {
          firebaseUID: id,
        },
      },
      include: {
        account: true,
      },
    });
    return user;
  },
};

const mutations = {
  updateUser: async (
    _: any,
    {
      userId,
      name,
      phone,
      address,
      publicId,
    }: {
      userId: string;
      name: string;
      phone: string;
      address: string;
      publicId: string;
    }
  ) => {
    const url = await getImageWithPublicIdCloudinary(publicId);
    await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        phoneNumber: phone,
        defaultAddress: address,
        imageUrl: url,
      },
    });
  },
};

export const userResolver = { queries, mutations };
