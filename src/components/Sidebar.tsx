"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileSpreadsheet, FileBarChart, BookOpen, Settings, HelpCircle } from "lucide-react";

// Dữ liệu tĩnh của Sidebar
const navItems = [
  { name: "Dashboard", href: "/", icon: <LayoutDashboard size={20} /> },
  { name: "Báo Cáo Tuần", href: "/weekly", icon: <FileSpreadsheet size={20} /> },
  { name: "Báo Cáo Tháng", href: "/monthly", icon: <FileBarChart size={20} /> },
  { name: "Quy Định & Nội Quy", href: "/rules", icon: <BookOpen size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[260px] h-screen bg-[#0f172a] text-slate-300 flex flex-col border-r border-slate-800 shrink-0 sticky top-0 hidden md:flex font-sans">
      {/* Khối 1: Logo & Tên Cổng thông tin */}
      <div className="h-[72px] flex items-center px-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
            I
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg tracking-tight leading-tight">
              IruKa<span className="text-blue-400">Life</span>
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
              Workspace
            </span>
          </div>
        </div>
      </div>

      {/* Khối 2: Menu Điều Hướng */}
      <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-3">
          Menu Chính
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600/15 text-blue-400 font-semibold"
                  : "hover:bg-slate-800/80 hover:text-white text-sm"
              }`}
            >
              <div
                className={`${
                  isActive ? "text-blue-400" : "text-slate-400 group-hover:text-white group-hover:scale-110"
                } transition-all duration-200`}
              >
                {item.icon}
              </div>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Khối 3: Support footer */}
      <div className="p-4 border-t border-slate-800/80 space-y-1 mb-2">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-slate-800/80 transition-colors text-slate-400 hover:text-white text-sm group">
          <Settings size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>IT Settings</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-slate-800/80 transition-colors text-slate-400 hover:text-white text-sm group">
          <HelpCircle size={18} className="group-hover:scale-110 transition-transform duration-200" />
          <span>Support Desk</span>
        </button>
      </div>
    </div>
  );
}
