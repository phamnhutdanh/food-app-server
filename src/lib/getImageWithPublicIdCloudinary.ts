import { v2 as cloudinary } from "cloudinary";

export async function getImageWithPublicIdCloudinary(
  publicId: string
): Promise<string> {
  console.log("Upload image");

  cloudinary.config({
    cloud_name: "dxz5uumy7",
    api_key: "272626169313357",
    api_secret: "qiUMjEzYF3_fq7j7OqcxYoVTXOk",
    secure: true,
  });

  let url = "";
  while (url === "") {
    try {
      await cloudinary.api.resource(publicId).then(async (value) => {
        url = value.url;
        return value.url;
      });

      return url;
    } catch (error) {
      console.error("updateImageToCloud: ", error);
    }
  }

  return url;
}
