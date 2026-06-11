import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "@/lib/sanity/client";

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: any): string {
  if (!source) return "";
  
  try {
    // If you passed the whole image object containing { asset: {...} }
    const imageAsset = source.asset ? source.asset : source;
    
    if (!imageAsset) return "";

    return builder.image(imageAsset).auto("format").fit("crop").url() || "";
  } catch (error) {
    console.error("Sanity image builder failed:", error);
    return "";
  }
}