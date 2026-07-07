// 실제 배포 도메인이 정해지면 NEXT_PUBLIC_SITE_URL 환경변수로 덮어써주세요.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://bboggl.example.com"
).replace(/\/$/, "");

export const SITE_NAME = "퇴사계산기";
