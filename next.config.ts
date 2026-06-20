import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Necessário para o Next.js 16 identificar corretamente
  // o root do projeto em ambientes com múltiplos lockfiles (Vercel).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
