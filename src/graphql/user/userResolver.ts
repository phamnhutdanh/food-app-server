import { UploadApiOptions } from "cloudinary";
import { prismaClient } from "../../lib/db";

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

import { v2 as cloudinary } from "cloudinary";

const uploadImageToCloudinary = async (imagePath: string) => {
  cloudinary.config({
    cloud_name: "dxz5uumy7",
    api_key: "272626169313357",
    api_secret: "qiUMjEzYF3_fq7j7OqcxYoVTXOk",
    secure: true,
  });

  console.log(cloudinary.config());
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options: UploadApiOptions = {
    use_filename: true,
    unique_filename: false,
    overwrite: false,
    //upload_preset: "./Food_data2",
    public_id: "newId",
    //signature: "mySig",
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

const mutations = {
  uploadImage: async (_: any, { uri }: { uri: string }) => {
    const id = uploadImageToCloudinary(uri);
    console.log("Upload image");
    console.log(id);
  },
};

export const userResolver = { queries, mutations };
