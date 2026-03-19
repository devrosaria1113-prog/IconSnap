import { getSelectedEntries, type Platform, type IconEntry } from "./icon-sizes";

interface ContentsImage {
  filename: string;
  idiom: string;
  scale: string;
  size: string;
  role?: string;
  subtype?: string;
}

interface ContentsJson {
  images: ContentsImage[];
  info: { author: string; version: number };
}

export function generateContentsJson(platforms: Platform[]): string {
  const entries: IconEntry[] = getSelectedEntries(platforms);

  const images: ContentsImage[] = entries.map((e) => {
    const img: ContentsImage = {
      filename: e.filename,
      idiom: e.idiom,
      scale: e.scale,
      size: e.size,
    };
    if (e.role) img.role = e.role;
    if (e.subtype) img.subtype = e.subtype;
    return img;
  });

  const contents: ContentsJson = {
    images,
    info: { author: "iconsnap", version: 1 },
  };

  return JSON.stringify(contents, null, 2);
}
