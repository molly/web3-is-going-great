import { storage } from "./config/firebase";
import { ObjectMetadata } from "firebase-functions/v1/storage";

import * as fs from "fs";
import * as functions from "firebase-functions";
import { mkdirp } from "mkdirp";
import * as os from "os";
import * as path from "path";
import * as sharp from "sharp";

import { ResizeResult } from "./types";
import { Bucket } from "@google-cloud/storage";

const supportedContentTypes = [
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/webp",
];

const resizeImage = async ({
  bucket,
  originalImage,
  size,
  object,
  fileName,
}: {
  bucket: Bucket;
  originalImage: string;
  size: number;
  object: ObjectMetadata;
  fileName: string;
}): Promise<ResizeResult> => {
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

    await sharp(originalImage, { failOnError: false })
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

export const onImageUpload = functions.storage
  .bucket("primary-web3")
  .object()
  .onFinalize(async (object) => {
    if (
      !object.contentType ||
      !object.contentType.startsWith("image/") ||
      !supportedContentTypes.includes(object.contentType)
    ) {
      // Can't or don't need to process this image
      return;
    }

    const paths = object.name?.split("/").filter((path) => path.length);

    if (
      !paths ||
      paths[0] !== "entryImages" ||
      paths.some((pathGroup) => pathGroup === "resized")
    ) {
      // Not in a folder where images should be auto-resized
      return;
    }

    const bucket = storage.bucket(object.bucket);
    const fileName = object.name as string; // We know this exists from the above check

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
  });
