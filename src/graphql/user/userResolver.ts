import { UserRole } from "@prisma/client";
import { prismaClient } from "../../lib/db";
import { getImageWithPublicIdCloudinary } from "../../lib/getImageWithPublicIdCloudinary";

const queries = {
  getAllUsers: async () => {
    const users = await prismaClient.user.findMany({
      where: {
        NOT: [
          {
            account: {
              role: "ADMIN",
            },
          },
        ],
      },
      include: {
        account: true,
        shop: true,
      },
      orderBy: {
        account: {
          createdAt: "desc",
        },
      },
    });
    return users;
  },
  getUserById: async (_: any, { id }: { id: string }) => {
    const user = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
      include: {
        account: true,
        shop: true,
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
    if (publicId !== "" && publicId !== null) {
      await getImageWithPublicIdCloudinary(publicId).then(
        async (url: string) => {
          console.log("URL: ", url);
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
        }
      );
    } else {
      await prismaClient.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
          phoneNumber: phone,
          defaultAddress: address,
        },
      });
    }
  },
  updateUserWithImage: async (
    _: any,
    {
      userId,
      name,
      phone,
      address,
      imageUri,
    }: {
      userId: string;
      name: string;
      phone: string;
      address: string;
      imageUri: string;
    }
  ) => {
    if (imageUri !== "" && imageUri !== null) {
      await prismaClient.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
          phoneNumber: phone,
          defaultAddress: address,
          imageUrl: imageUri,
        },
      });
    } else {
      await prismaClient.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
          phoneNumber: phone,
          defaultAddress: address,
        },
      });
    }
  },
  updateLoginRole: async (
    _: any,
    {
      userId,
      role,
    }: {
      userId: string;
      role: UserRole;
    }
  ) => {
    await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        loginAs: role,
      },
    });
  },
};

export const userResolver = { queries, mutations };
