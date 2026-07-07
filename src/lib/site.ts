// 실제 커스텀 도메인을 연결하면 NEXT_PUBLIC_SITE_URL 환경변수로 덮어써주세요.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://toesacal.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "퇴사계산기";
