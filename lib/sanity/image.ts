import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "@/lib/sanity/client";

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: any, size = 900): string {
  if (!source) return "";

  // Plain string (fallback items) - return as-is
  if (typeof source === "string") return source;

  if (!source.asset) return "";

  try {
    return builder
      .image(source) // pass whole object so hotspot/crop apply
      .width(size)
      .height(size)
      .fit("crop")
      .auto("format")
      .url();
  } catch (error) {
    console.error("Sanity image builder failed:", error);
    return "";
  }
}