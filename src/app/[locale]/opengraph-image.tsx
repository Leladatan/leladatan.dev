import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "leladatan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const font = await readFile(
    join(process.cwd(), "src/shared/fonts/syne-latin.woff2"),
  );
  const line =
    locale === "en"
      ? "Frontend · React / TypeScript"
      : "Frontend · React / TypeScript";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        background:
          "linear-gradient(135deg, #07060b 0%, #2a1860 52%, #1a3d8f 100%)",
        color: "white",
        padding: 72,
        fontFamily: "Syne",
      }}
    >
      <div style={{ fontSize: 92, lineHeight: 1 }}>leladatan</div>
      <div style={{ marginTop: 24, fontSize: 32, opacity: 0.8 }}>{line}</div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Syne", data: font, weight: 700, style: "normal" }],
    },
  );
}
