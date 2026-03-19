import { getSelectedEntries, getUniqueFiles, type Platform } from "./icon-sizes";

export interface ResizedIcon {
  filename: string;
  pixels: number;
  blob: Blob;
  dataUrl: string;
}

export async function resizeImage(
  file: File,
  platforms: Platform[]
): Promise<ResizedIcon[]> {
  const bitmap = await createImageBitmap(file);
  const entries = getSelectedEntries(platforms);
  const uniqueFiles = getUniqueFiles(entries);

  const results: ResizedIcon[] = await Promise.all(
    Array.from(uniqueFiles.entries()).map(async ([filename, pixels]) => {
      const canvas = document.createElement("canvas");
      canvas.width = pixels;
      canvas.height = pixels;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(bitmap, 0, 0, pixels, pixels);

      const [dataUrl, blob] = await Promise.all([
        canvas.toDataURL("image/png"),
        new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => resolve(b!), "image/png")
        ),
      ]);

      return { filename, pixels, blob, dataUrl };
    })
  );

  bitmap.close();
  return results;
}
