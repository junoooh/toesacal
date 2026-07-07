import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 같은 Wi-Fi의 휴대폰 등에서 개발 서버에 접속할 때 핫리로드가 정상 동작하도록 허용
  allowedDevOrigins: ["172.30.1.98"],
};

export default nextConfig;
