import { v2 as cloudinary } from "cloudinary";
import { UploadApiOptions } from "cloudinary";
import { createWriteStream } from "fs";

const storeUpload = async ({
  stream,
  filename,
}: {
  stream: any;
  filename: any;
}): Promise<any> => {
  // const path = `images/${shortid.generate()}`
  const path = `images/test`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ path }))
      .on("error", reject)
  );
};

export const processUpload = async (upload: any) => {
  const { stream, filename, mimetype, encoding } = await upload;
  const { path } = await storeUpload({ stream, filename });
  return path;
};

export const uploadImageToCloudinary = async (imagePath: string) => {
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
