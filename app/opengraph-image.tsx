import { ImageResponse } from "next/og";
import { OgCard, ogSize } from "@/lib/og";

export const alt = "Romstocks: independent US stock research, with the bear case included.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        kicker="Independent research"
        title="US stock theses, with the bear case included."
        footer="Educational research. Not a recommendation."
      />
    ),
    { ...size },
  );
}
