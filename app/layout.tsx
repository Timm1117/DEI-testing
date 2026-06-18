import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "政確巨擎：DEI or Not?",
  description: "互動式 DEI 製作決策模擬測驗，推薦最相似的真實影視或遊戲作品。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>
        {children}
      </body>
    </html>
  );
}

