import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#3182F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 82,
            height: 115,
            background: "#FFFFFF",
            borderRadius: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 14,
          }}
        >
          <div
            style={{
              width: 58,
              height: 25,
              background: "#3182F6",
              borderRadius: 5,
              marginBottom: 14,
            }}
          />
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#3182F6" }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#3182F6" }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#3182F6" }} />
          </div>
          <div style={{ height: 10 }} />
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#3182F6" }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#3182F6" }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#3182F6" }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
