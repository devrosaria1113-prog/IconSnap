import JSZip from "jszip";
import type { ResizedIcon } from "./resize";
import { generateContentsJson } from "./contents-json";
import type { Platform } from "./icon-sizes";

export async function downloadZip(
  icons: ResizedIcon[],
  platforms: Platform[]
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder("AppIcon.appiconset")!;

  icons.forEach(({ filename, blob }) => {
    folder.file(filename, blob);
  });

  folder.file("Contents.json", generateContentsJson(platforms));

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = "AppIcon.appiconset.zip";
  a.click();
  URL.revokeObjectURL(url);
}
