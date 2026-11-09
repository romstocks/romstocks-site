import { ImageResponse } from "next/og";
import { OgCard, ogSafeLine, ogSize } from "@/lib/og";
import { getThesis } from "@/lib/theses";

export const alt = "Romstocks investment thesis. Educational research, not a prediction.";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const thesis = getThesis(slug);
  const kicker = thesis ? `${thesis.ticker}${thesis.sample ? " · sample" : ""}` : "Romstocks";
  const title = thesis ? ogSafeLine(thesis.oneLiner) : "Investment thesis";

  return new ImageResponse(
    <OgCard kicker={kicker} title={title} footer="Bull case, bear case, and risks. Not a price target." />,
    { ...size },
  );
}
