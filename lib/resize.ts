export interface IconSize {
  label: string;
  width: number;
  height: number;
  category: string;
}

export const ICON_SIZES: IconSize[] = [
  { label: "1024×1024", width: 1024, height: 1024, category: "Standard" },
  { label: "180×180", width: 180, height: 180, category: "iOS/Android" },
  { label: "120×120", width: 120, height: 120, category: "iOS/Android" },
  { label: "87×87", width: 87, height: 87, category: "Small Assets" },
  { label: "80×80", width: 80, height: 80, category: "Small Assets" },
  { label: "60×60", width: 60, height: 60, category: "Small Assets" },
  { label: "58×58", width: 58, height: 58, category: "Small Assets" },
  { label: "40×40", width: 40, height: 40, category: "Small Assets" },
];

export interface ResizedIcon {
  size: IconSize;
  dataUrl: string;
  blob: Blob;
}

export async function resizeImage(file: File): Promise<ResizedIcon[]> {
  const bitmap = await createImageBitmap(file);

  const results: ResizedIcon[] = await Promise.all(
    ICON_SIZES.map(async (size) => {
      const canvas = document.createElement("canvas");
      canvas.width = size.width;
      canvas.height = size.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(bitmap, 0, 0, size.width, size.height);

      const [dataUrl, blob] = await Promise.all([
        canvas.toDataURL("image/png"),
        new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => resolve(b!), "image/png")
        ),
      ]);

      return { size, dataUrl, blob };
    })
  );

  bitmap.close();
  return results;
}
