"use client";
// ═══════════════════════════════════════════════════════════════════
// Trang Chủ — IruKa Staff Portal
// Vai trò: Cổng thông tin nội bộ trung tâm — lệnh Discord, lịch báo cáo,
//          nội quy và FAQ.
// Luồng:  Hero (chọn phòng ban) → Timeline Deadline → 4 Tabs Lệnh Discord
//         → Nội Quy nhanh → FAQ
// ═══════════════════════════════════════════════════════════════════

import { useState } from "react";
import Image from "next/image";
import TabBaoCao from "@/components/home/TabBaoCao";
import TabXinPhep from "@/components/home/TabXinPhep";
import TabTraoDoi from "@/components/home/TabTraoDoi";
import TabHrCeo from "@/components/home/TabHrCeo";
import FaqAccordion from "@/components/home/FaqAccordion";

// ─── Kiểu dữ liệu ───────────────────────────────────────────────────────────
type TabKey = "bao-cao" | "xin-phep" | "trao-doi" | "hr-ceo";
type Dept = "" | "dev" | "design" | "content" | "hr" | "qc" | "edu" | "tester" | "hdqt";

// ─── Nội Quy cards ──────────────────────────────────────────────────────────
const RULES = [
  { icon: "⏰", color: "blue",   text: "Báo cáo ngày đúng giờ",              sub: "Nộp trước 9:00 sáng — trễ sau 9h30 Bot báo lên CEO" },
  { icon: "📊", color: "red",    text: "Báo cáo tuần nộp trước 24h Chủ Nhật", sub: "Áp dụng HR · Content · Design · QC — trễ phạt 50k" },
  { icon: "📋", color: "purple", text: "Kế hoạch tháng nộp trước 24h mùng 4", sub: "Bot chốt 9:00 sáng mùng 5, gửi CEO — trễ phạt 100k" },
  { icon: "🏖️", color: "green",  text: "Xin phép trước ít nhất 1 ngày",       sub: "Xin cùng ngày sẽ không được chấp nhận tự động" },
  { icon: "💻", color: "orange", text: "Staff phải git push trước khi về",      sub: "Bot kiểm tra lúc 17:00 và 17:30 — chưa push sẽ bị tag nhắc" },
  { icon: "❌", color: "red",    text: "Không ghi chung chung \"đang làm\"",    sub: "Mỗi đầu việc cần: tên cụ thể + số lượng + trạng thái" },
  { icon: "📲", color: "yellow", text: "Phản hồi Bot trong 30 phút",            sub: "Sau 3 tiếng không phản hồi → Bot báo leo thang CEO" },
  { icon: "🚨", color: "orange", text: "/urgent chỉ dùng khi thực sự khẩn",     sub: "Sự cố kỹ thuật, lỗi nghiêm trọng — không lạm dụng" },
];

// ─── Màu sắc rule icon ───────────────────────────────────────────────────────
const RULE_COLOR: Record<string, string> = {
  blue:   "bg-blue-100 text-blue-600",
  red:    "bg-red-100 text-red-600",
  purple: "bg-purple-100 text-purple-600",
  green:  "bg-emerald-100 text-emerald-600",
  orange: "bg-orange-100 text-orange-600",
  yellow: "bg-amber-100 text-amber-600",
};

// ─── Tab cấu hình ────────────────────────────────────────────────────────────
const TABS: { key: TabKey; label: string; isHr?: boolean }[] = [
  { key: "bao-cao",   label: "📊 Lệnh Báo Cáo" },
  { key: "xin-phep",  label: "📅 Xin Phép & Điều Chỉnh" },
  { key: "trao-doi",  label: "💬 Giao Tiếp Với Sếp" },
  { key: "hr-ceo",    label: "👑 Lệnh HR / CEO", isHr: true },
];

// ─── Bộ phận ─────────────────────────────────────────────────────────────────
const DEPTS: { value: Dept; label: string }[] = [
  { value: "",       label: "-- Chọn bộ phận --" },
  { value: "dev",    label: "💻 Dev" },
  { value: "design", label: "🎨 Design" },
  { value: "content",label: "✍️ Content" },
  { value: "hr",     label: "👥 HR" },
  { value: "qc",     label: "🔍 QC" },
  { value: "edu",    label: "📚 Edu" },
  { value: "tester", label: "🧪 Tester" },
  { value: "hdqt",   label: "🏛️ HĐQT / Mentor" },
];

// ═══════════════════════════════════════════════════════════════════
// Component chính
// ═══════════════════════════════════════════════════════════════════
export default function HomePage() {
  // State: tab đang mở
  const [activeTab, setActiveTab] = useState<TabKey>("bao-cao");
  // State: bộ phận đã chọn (để các tab con lọc nội dung)
  const [selectedDept, setSelectedDept] = useState<Dept>("");

  return (
    <div className="min-h-screen pb-20">

      {/* ══════════════════════════════════════
          KV1: HERO BANNER
      ══════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl mb-8 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0ea5e9] p-7 md:p-9 shadow-xl">
        {/* Logo chìm bên phải */}
        <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.12] hidden md:block">
          <Image src="/logo-iruka.svg" alt="" width={100} height={100} priority />
        </div>

        <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-1">
          IruKa Staff Portal
        </p>
        <h1 className="text-2xl md:text-3xl font-black text-white mb-5 tracking-tight">
          Cổng Thông Tin Nội Bộ IruKa
        </h1>

        {/* Bộ lọc phòng ban */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-blue-200 text-sm font-semibold">👤 Tôi thuộc bộ phận:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value as Dept)}
            className="bg-white/10 border border-white/20 text-white text-sm rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer backdrop-blur-sm"
          >
            {DEPTS.map((d) => (
              <option key={d.value} value={d.value} className="text-slate-900">
                {d.label}
              </option>
            ))}
          </select>
          {selectedDept && (
            <span className="flex items-center gap-2 bg-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Đã lưu
            </span>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          KV2: LỊCH BÁO CÁO & DEADLINE
      ══════════════════════════════════════ */}
      <div className="mb-8">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
          <span>📅</span> Lịch Báo Cáo &amp; Deadline
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card — Báo Cáo Ngày */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-xl flex items-center justify-center">📬</div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Hàng Ngày</span>
            </div>
            <p className="font-bold text-slate-800 mb-0.5">Báo Cáo Ngày</p>
            <code className="text-xs text-amber-700 font-mono bg-amber-100 px-2 py-0.5 rounded">/daily</code>
            <p className="text-xs text-slate-500 mt-2 mb-0.5 font-semibold uppercase tracking-wide">Deadline nộp</p>
            <p className="text-xl font-black text-amber-600 mb-3">Trước 09:00</p>
            <ul className="space-y-1.5 text-xs text-slate-600 mb-3">
              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"/><span>Bot tổng hợp standup gửi kênh lúc <b>9:00</b></span></li>
              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"/><span>Bot gửi DM CEO lúc <b>9:30</b> (T2–T7)</span></li>
              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"/><span>Phiên chiều <b>14:00</b> — tag ai chưa nộp</span></li>
              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"/><span>Sửa được đến <b>10:00</b> — sau đó khóa</span></li>
            </ul>
            <div className="text-xs text-amber-800 bg-amber-100 rounded-xl p-2.5 border border-amber-200">
              ⚠️ Nộp trễ sau 9h30: Bot báo cáo lên CEO.
            </div>
          </div>

          {/* Card — Báo Cáo KPI Tuần */}
          <div className="rounded-2xl border border-red-200 bg-red-50/60 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-red-400/20 text-xl flex items-center justify-center">📊</div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Hàng Tuần</span>
            </div>
            <p className="font-bold text-slate-800 mb-0.5">Báo Cáo KPI Tuần</p>
            <code className="text-xs text-red-700 font-mono bg-red-100 px-2 py-0.5 rounded">/weekly</code>
            <p className="text-xs text-slate-500 mt-2 mb-0.5 font-semibold uppercase tracking-wide">Deadline nộp</p>
            <p className="text-xl font-black text-red-600 mb-3">24:00 Chủ Nhật</p>
            <ul className="space-y-1.5 text-xs text-slate-600 mb-3">
              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"/><span>Bot DM nhắc lúc <b>20:00 Chủ Nhật</b> (còn 4 tiếng)</span></li>
              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"/><span>Bot tổng hợp <b>9:05 Thứ Hai</b> → gửi CEO</span></li>
              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"/><span>Bot DM xác nhận ngay khi bạn submit</span></li>
            </ul>
            <div className="text-xs text-red-800 bg-red-100 rounded-xl p-2.5 border border-red-200">
              ⚠️ Nộp trễ: Phạt <b>50k</b>. Áp dụng: <b>HR · Content · Design · QC</b>
            </div>
          </div>

          {/* Card — Báo Cáo & KH Tháng */}
          <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-purple-400/20 text-xl flex items-center justify-center">📋</div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">Hàng Tháng</span>
            </div>
            <p className="font-bold text-slate-800 mb-0.5">Báo Cáo &amp; KH Tháng</p>
            <code className="text-xs text-purple-700 font-mono bg-purple-100 px-2 py-0.5 rounded">/monthly</code>
            <p className="text-xs text-slate-500 mt-2 mb-0.5 font-semibold uppercase tracking-wide">Deadline nộp</p>
            <p className="text-xl font-black text-purple-600 mb-3">24:00 ngày Mùng 4</p>
            <ul className="space-y-1.5 text-xs text-slate-600 mb-3">
              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0"/><span>Bot DM nhắc ngày <b>mùng 1</b> hàng tháng</span></li>
              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0"/><span>Bot chốt danh sách lúc <b>9:00 mùng 5</b></span></li>
              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0"/><span>Danh sách trễ gửi thẳng về CEO</span></li>
            </ul>
            <div className="text-xs text-purple-800 bg-purple-100 rounded-xl p-2.5 border border-purple-200">
              ⚠️ Nộp trễ: Phạt <b>100k</b>. Không áp dụng: <b>CEO, HĐQT/Mentor</b>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          KV3: LỆNH DISCORD — HỆ THỐNG TABS
      ══════════════════════════════════════ */}
      <div className="mb-8">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
          <span>🤖</span> Lệnh Discord Bot Của Bạn
        </h2>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2 mb-5">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 border ${
                activeTab === tab.key
                  ? tab.isHr
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                    : "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                  : tab.isHr
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div>
          {activeTab === "bao-cao"  && <TabBaoCao  selectedDept={selectedDept} />}
          {activeTab === "xin-phep" && <TabXinPhep selectedDept={selectedDept} />}
          {activeTab === "trao-doi" && <TabTraoDoi selectedDept={selectedDept} />}
          {activeTab === "hr-ceo"   && <TabHrCeo   selectedDept={selectedDept} />}
        </div>
      </div>

      {/* ══════════════════════════════════════
          KV4: NỘI QUY CẦN NHỚ
      ══════════════════════════════════════ */}
      <div className="mb-8">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
          <span>📜</span> Nội Quy Cần Nhớ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {RULES.map((r, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${RULE_COLOR[r.color]}`}>
                {r.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 leading-snug mb-0.5">{r.text}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{r.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          KV5: FAQ
      ══════════════════════════════════════ */}
      <div>
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
          <span>❓</span> Câu Hỏi Thường Gặp
        </h2>
        <FaqAccordion />
      </div>

    </div>
  );
}
