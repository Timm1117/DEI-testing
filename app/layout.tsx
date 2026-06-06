import type { Metadata } from "next";
import { ChiptuneToggle } from "@/components/ChiptuneToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "政治正確影響測驗",
  description: "互動式作品製作測驗，推薦最相似的真實影視或遊戲作品。",
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
        <ChiptuneToggle />
      </body>
    </html>
  );
}
