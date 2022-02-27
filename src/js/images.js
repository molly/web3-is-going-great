import { SM_BREAKPOINT } from "../constants/breakpoints";
import { STORAGE_URL } from "../constants/urls";

export const IMAGE_SIZES = {
  150: { width: 150, height: 150 },
  300: { width: 300, height: 300 },
  500: { width: 500, height: 625 },
};

export const getImageUrl = (src, size) => {
  const srcWithoutExtension = src.split(".")[0];
  return `${STORAGE_URL}/entryImages/resized/${srcWithoutExtension}_${size.width}x${size.height}.webp`;
};

export const getEntryImageProps = (src) => {
  // This looks backwards, but entry images display larger by default on mobile
  const midScreenImageUrl = getImageUrl(src, IMAGE_SIZES["150"]);
  const mobileImageUrl = getImageUrl(src, IMAGE_SIZES["300"]);

  return {
    src: mobileImageUrl,
    srcSet: `${midScreenImageUrl} 150w, ${mobileImageUrl} 300w`,
    sizes: `(max-width: ${SM_BREAKPOINT}px) 300px, 150px`,
  };
};

export const getLightboxImageProps = (src) => ({
  src: getImageUrl(src, IMAGE_SIZES["500"]),
});
