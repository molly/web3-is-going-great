import { getStorage } from "firebase-admin/storage";
import {
  onObjectFinalized,
  StorageObjectData,
} from "firebase-functions/v2/storage";

import * as functions from "firebase-functions";
import * as fs from "fs";
import { mkdirp } from "mkdirp";
import * as os from "os";
import * as path from "path";
import sharp from "sharp";

import { ResizeResult } from "./types";

const supportedContentTypes = [
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/webp",
];

// Get the correct Bucket type from the storage instance
type Bucket = ReturnType<typeof getStorage>["bucket"] extends (
  bucketName?: string
) => infer B
  ? B
  : never;

interface ResizeImageParams {
  bucket: Bucket;
  originalImage: string;
  size: number;
  object: StorageObjectData;
  fileName: string;
}

const resizeImage = async ({
  bucket,
  originalImage,
  size,
  object,
  fileName,
}: ResizeImageParams): Promise<ResizeResult> => {
  const imageDirectory = path.dirname(fileName);
  const imageName = path.basename(fileName, path.extname(fileName));
  const targetImageName = `${imageName}_${size}.webp`;
  const targetImagePath = path.normalize(
    path.join(imageDirectory, "resized", targetImageName)
  );

  let targetImage;
  try {
    targetImage = path.join(os.tmpdir(), targetImageName);
    const metadata = {
      contentDisposition: object.contentDisposition,
      contentEncoding: object.contentEncoding,
      contentLanguage: object.contentLanguage,
      contentType: "image/webp",
      metadata: object.metadata || { cacheControl: object.cacheControl },
    };

    await sharp(originalImage, { failOn: "none" })
      .rotate()
      .resize(size, size, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp()
      .toFile(targetImage);

    await bucket.upload(targetImage, {
      destination: targetImagePath,
      metadata,
    });

    return { size, success: true };
  } catch (err) {
    functions.logger.error(
      `Error while resizing image ${fileName} to ${size}px`,
      err
    );
    return { size, success: false };
  } finally {
    try {
      // Clean up tmp files if possible
      if (targetImage) {
        fs.unlinkSync(targetImage);
      }
    } catch (err) {
      functions.logger.warn(
        "Error while cleaning up temporary image files",
        err
      );
    }
  }
};

export const onImageUpload = onObjectFinalized(
  {
    bucket: "primary-web3-regional",
    region: "us-central1", // Add your preferred region
  },
  async (event) => {
    const object = event.data;

    if (
      !object.contentType ||
      !object.contentType.startsWith("image/") ||
      !supportedContentTypes.includes(object.contentType)
    ) {
      return;
    }

    const paths = object.name?.split("/").filter((path) => path.length);

    if (
      !paths ||
      paths[0] !== "entryImages" ||
      paths.some((pathGroup) => pathGroup === "resized")
    ) {
      return;
    }

    const storage = getStorage(); // Use Admin SDK
    const bucket = storage.bucket(object.bucket);
    const fileName = object.name as string;

    const originalImage = path.join(os.tmpdir(), fileName);
    const tempDirectory = path.dirname(originalImage);
    mkdirp(tempDirectory);

    const originalFilePtr = bucket.file(fileName);
    await originalFilePtr.download({ destination: originalImage });

    const promises: Promise<ResizeResult>[] = [];
    let targetSizes = [300];
    if (paths[1] !== "logos") {
      targetSizes = targetSizes.concat([500, 1000]);
    }

    targetSizes.forEach((size) => {
      promises.push(
        resizeImage({ bucket, originalImage, size, object, fileName })
      );
    });

    const results = await Promise.all(promises);

    if (results.every((result) => result.success)) {
      try {
        if (originalFilePtr) {
          await originalFilePtr.delete();
        }
      } catch (err) {
        functions.logger.warn("Error while deleting original image file", err);
      }
    }
  }
);
