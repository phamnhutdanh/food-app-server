import { prismaClient } from "../../lib/db";
import {
  processUpload,
  uploadImageToCloudinary,
} from "../../lib/uploadImageToCloudinary";

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
  uploadImage: async (_: any, { image }: { image: any }) => {
    const pictureUrl = await uploadImageToCloudinary(image);
    console.log("Upload image");
    console.log(pictureUrl);
  },
};

export const userResolver = { queries, mutations };
