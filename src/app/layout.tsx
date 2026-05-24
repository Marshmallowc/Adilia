import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adilia - 个人官网与项目陈列室",
  description: "资深全栈开发工程师与前端专家个人主页，致力于以极致的大厂交付规格与Serverless架构降本技术将数字创意完美落地。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
