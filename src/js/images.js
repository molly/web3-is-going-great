import { STORAGE_URL } from "../constants/urls";

export const IMAGE_SIZES = [300, 500, 1000];

export const getImageUrl = (image, size = null) => {
  const { isLogo, src } = image;
  if (!size) {
    size = isLogo ? 300 : 500;
  }
  const prefix = `${STORAGE_URL}/entryImages/${isLogo ? "logos/" : ""}`;
  return `${prefix}resized/${src}_${size}.webp`;
};

export const getEntryImageProps = (image) => {
  const smImageUrl = getImageUrl(image, 300);
  const mdImageUrl = getImageUrl(image, 500);
  const lgImageUrl = getImageUrl(image, 500);
  if (image.isLogo) {
    return { src: smImageUrl };
  }
  return {
    src: smImageUrl,
    srcSet: `${smImageUrl} 1x, ${mdImageUrl} 1.5x, ${lgImageUrl} 2x`,
  };
};

export const getLightboxImageProps = (image) => {
  const md = getImageUrl(image, 500);
  return {
    src: md,
    srcSet: `${md} 1x, ${getImageUrl(image, 1000)} 2x`,
  };
};
