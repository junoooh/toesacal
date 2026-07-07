import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 서버 없이도 동작하는 완전 정적 사이트라 정적 내보내기(export)로 빌드합니다.
  // 어떤 정적 호스팅(Netlify, Vercel, GitHub Pages 등)에도 그대로 배포할 수 있어요.
  output: "export",
  // 같은 Wi-Fi의 휴대폰 등에서 개발 서버에 접속할 때 핫리로드가 정상 동작하도록 허용
  allowedDevOrigins: ["172.30.1.98"],
};

export default nextConfig;
