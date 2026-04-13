import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IruKa Lifestyle Workspace",
  description: "Cổng thông tin nội bộ của hệ sinh thái IruKa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-[#f8fafc] flex font-sans">
        {/* Sidebar tĩnh bên trái (Fixed 1 chỗ, không ảnh hưởng cuộn trang) */}
        <Sidebar />
        
        {/* Main Content Area (Cho phép cuộn dọc thoải mái theo độ dài nội dung) */}
        <main className="flex-1 text-slate-800 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
