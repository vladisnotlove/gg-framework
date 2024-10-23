export type Asset =
  | {
      type: "image";
      url: string;
    }
  | {
      type: "font";
      url: string;
      family: string;
      style: string;
      weight: string;
    };
