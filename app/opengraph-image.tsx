import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens (kept inline — ImageResponse can't read the app stylesheet)
const CREAM = "#f6f5f2";
const INK = "#0b0b10";
const INDIGO = "#2e3192";
const PURPLE = "#7a2e8f";
const ORANGE = "#e2542c";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CREAM,
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Brand gradient accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "12px",
            background: `linear-gradient(90deg, ${INDIGO} 0%, ${PURPLE} 50%, ${ORANGE} 100%)`,
          }}
        />

        {/* Soft gradient glow accent */}
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-160px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${PURPLE}33 0%, ${CREAM}00 70%)`,
          }}
        />

        {/* Top row: eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#5b5b66",
            fontWeight: 600,
          }}
        >
          AI Automation · Agents · Software
        </div>

        {/* Center: wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 120,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: INK,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "28px",
              fontSize: 40,
              lineHeight: 1.25,
              fontWeight: 500,
              color: "#3a3a44",
              maxWidth: "900px",
            }}
          >
            {site.tagline}
          </div>
        </div>

        {/* Bottom row: domain + gradient dot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 30,
            color: "#5b5b66",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${INDIGO} 0%, ${PURPLE} 50%, ${ORANGE} 100%)`,
              }}
            />
            agentixsolution.com
          </div>
          <div style={{ display: "flex", color: "#8a8a92" }}>Karachi · Pakistan</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
