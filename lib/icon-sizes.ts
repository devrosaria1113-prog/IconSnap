export type Platform = "iphone" | "ipad" | "watch" | "mac" | "appstore";

export interface IconEntry {
  platform: Platform;
  idiom: string; // Xcode Contents.json idiom 값
  size: string; // "20x20"
  scale: string; // "2x"
  pixels: number; // 실제 픽셀 크기
  filename: string; // "ios-20x20@2x.png"
  role?: string; // watchOS 전용
  subtype?: string; // watchOS 전용
}

function entry(
  platform: Platform,
  idiom: string,
  pt: number | string,
  scale: number,
  pixels: number,
  prefix: string,
  role?: string,
  subtype?: string
): IconEntry {
  const sizeStr = typeof pt === "number" ? `${pt}x${pt}` : pt;
  const scaleStr = `${scale}x`;
  const filename = `${prefix}-${pixels}x${pixels}@${scaleStr}.png`;
  return { platform, idiom, size: sizeStr, scale: scaleStr, pixels, filename, role, subtype };
}

export const PLATFORM_ICONS: Record<Platform, IconEntry[]> = {
  iphone: [
    entry("iphone", "iphone", 20, 2, 40, "ios"),
    entry("iphone", "iphone", 20, 3, 60, "ios"),
    entry("iphone", "iphone", 29, 2, 58, "ios"),
    entry("iphone", "iphone", 29, 3, 87, "ios"),
    entry("iphone", "iphone", 40, 2, 80, "ios"),
    entry("iphone", "iphone", 40, 3, 120, "ios"),
    entry("iphone", "iphone", 60, 2, 120, "ios"),
    entry("iphone", "iphone", 60, 3, 180, "ios"),
  ],
  ipad: [
    entry("ipad", "ipad", 20, 1, 20, "ipad"),
    entry("ipad", "ipad", 20, 2, 40, "ipad"),
    entry("ipad", "ipad", 29, 1, 29, "ipad"),
    entry("ipad", "ipad", 29, 2, 58, "ipad"),
    entry("ipad", "ipad", 40, 1, 40, "ipad"),
    entry("ipad", "ipad", 40, 2, 80, "ipad"),
    entry("ipad", "ipad", 76, 1, 76, "ipad"),
    entry("ipad", "ipad", 76, 2, 152, "ipad"),
    entry("ipad", "ipad", "83.5x83.5", 2, 167, "ipad"),
  ],
  watch: [
    entry("watch", "watch", 24, 2, 48, "watch", "notificationCenter", "38mm"),
    entry("watch", "watch", "27.5x27.5", 2, 55, "watch", "notificationCenter", "42mm"),
    entry("watch", "watch", 29, 2, 58, "watch", "companionSettings"),
    entry("watch", "watch", 29, 3, 87, "watch", "companionSettings"),
    entry("watch", "watch", 40, 2, 80, "watch", "appLauncher", "38mm"),
    entry("watch", "watch", 44, 2, 88, "watch", "appLauncher", "40mm"),
    entry("watch", "watch", 50, 2, 100, "watch", "appLauncher", "44mm"),
    entry("watch", "watch", 86, 2, 172, "watch", "quickLook", "38mm"),
    entry("watch", "watch", 98, 2, 196, "watch", "quickLook", "40mm"),
    entry("watch", "watch", 108, 2, 216, "watch", "quickLook", "44mm"),
  ],
  mac: [
    entry("mac", "mac", 16, 1, 16, "mac"),
    entry("mac", "mac", 16, 2, 32, "mac"),
    entry("mac", "mac", 32, 1, 32, "mac"),
    entry("mac", "mac", 32, 2, 64, "mac"),
    entry("mac", "mac", 128, 1, 128, "mac"),
    entry("mac", "mac", 128, 2, 256, "mac"),
    entry("mac", "mac", 256, 1, 256, "mac"),
    entry("mac", "mac", 256, 2, 512, "mac"),
    entry("mac", "mac", 512, 1, 512, "mac"),
    entry("mac", "mac", 512, 2, 1024, "mac"),
  ],
  appstore: [
    entry("appstore", "ios-marketing", 1024, 1, 1024, "appstore"),
  ],
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  iphone: "iPhone",
  ipad: "iPad",
  watch: "Apple Watch",
  mac: "Mac",
  appstore: "App Store",
};

/** 선택된 플랫폼 기반으로 필요한 IconEntry 목록 반환 (appstore는 항상 포함) */
export function getSelectedEntries(platforms: Platform[]): IconEntry[] {
  const all = [...platforms, "appstore" as Platform]
    .flatMap((p) => PLATFORM_ICONS[p]);
  // 중복 제거: filename 기준 (동일 플랫폼 prefix + 픽셀은 동일 파일)
  // 단, 서로 다른 플랫폼에서 같은 픽셀 사이즈가 나와도 파일명이 다르므로 자연스럽게 구분됨
  return all;
}

/** 중복 없는 고유 픽셀 사이즈 목록 (filename 기준) */
export function getUniqueFiles(entries: IconEntry[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const e of entries) {
    if (!map.has(e.filename)) map.set(e.filename, e.pixels);
  }
  return map;
}
