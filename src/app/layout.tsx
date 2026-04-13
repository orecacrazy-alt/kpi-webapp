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
      <body className="min-h-screen bg-slate-50 flex overflow-hidden font-sans">
        {/* Sidebar tĩnh bên trái (ẩn trên màn nhỏ, chỉ hiện rên màn hỉnh MD trở lên) */}
        <Sidebar />
        
        {/* Main Content Area (Vùng trắng để hiển thị các trang bên trong) */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc] text-slate-800">
          {children}
        </main>
      </body>
    </html>
  );
}
