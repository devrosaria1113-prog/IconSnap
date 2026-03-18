import JSZip from "jszip";
import type { ResizedIcon } from "./resize";

export async function downloadZip(icons: ResizedIcon[]): Promise<void> {
  const zip = new JSZip();

  icons.forEach(({ size, blob }) => {
    const filename = `icon_${size.width}x${size.height}.png`;
    zip.file(filename, blob);
  });

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = "icons.zip";
  a.click();
  URL.revokeObjectURL(url);
}
