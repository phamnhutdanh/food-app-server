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

  let url = "none";
  try {
    url = await cloudinary.api.resource(publicId).then((value) => {
      return value.url;
    });
  } catch (error) {
    console.error(error);
  } finally {
    return url;
  }
}
