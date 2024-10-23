import { Asset } from "./Asset";

export const loadAsset = (asset: Asset): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (asset.type === "image") {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = () => reject("Image is not loaded");
      image.src = asset.url;
    }

    if (asset.type === "font") {
      const font = new FontFace(asset.family, `url(${asset.url})`, {
        style: asset.style,
        weight: asset.weight,
      });
      font
        .load()
        .then(() => resolve())
        .catch((reason) => reject(reason));
    }
  });
};
