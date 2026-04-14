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
  const [activeTab, setActiveTab] = useState<TabKey>("bao-cao");
  const [selectedDept, setSelectedDept] = useState<Dept>("");

  return (
    <div className="min-h-screen pb-20">

      {/* ══════════════════════════════════════
          KV1: HERO BANNER — đúng màu mockup
      ══════════════════════════════════════ */}
      <div
        className="relative overflow-hidden rounded-[20px] mb-6 shadow-xl"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #2563eb 60%, #0ea5e9 100%)", padding: "28px 32px" }}
      >
        {/* Logo chìm bên phải — opacity 0.15 như mockup */}
        <div className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.15] hidden md:block">
          <Image src="/logo-iruka.svg" alt="" width={100} height={100} priority />
        </div>

        <h1 className="font-black text-white mb-5 tracking-tight" style={{ fontSize: "26px", letterSpacing: "-0.5px" }}>
          Cổng Thông Tin Nội Bộ IruKa
        </h1>

        {/* Bộ lọc phòng ban — style dept-select từ mockup */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>👤 Tôi thuộc bộ phận:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value as Dept)}
            className="outline-none backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff", fontSize: "14px", fontWeight: 700, padding: "8px 14px", borderRadius: "10px", cursor: "pointer", minWidth: "180px" }}
          >
            {DEPTS.map((d) => (
              <option key={d.value} value={d.value} style={{ background: "#0f172a", color: "#fff" }}>
                {d.label}
              </option>
            ))}
          </select>
          {selectedDept && (
            <div
              className="flex items-center gap-1.5"
              style={{ background: "rgba(16,185,129,0.25)", border: "1px solid rgba(16,185,129,0.4)", color: "#6ee7b7", fontSize: "12px", fontWeight: 700, padding: "5px 12px", borderRadius: "20px" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10b981" }} />
              Đã lưu
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          KV2: LỊCH BÁO CÁO & DEADLINE
          Cards trắng + top color bar + hover như mockup
      ══════════════════════════════════════ */}
      <div className="mb-8">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4" style={{ fontSize: "16px", fontWeight: 800 }}>
          <span>📅</span> Lịch Báo Cáo & Deadline
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Card — Báo Cáo Ngày */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 relative overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: "linear-gradient(90deg, #f59e0b, #fbbf24)" }} />
            <div className="flex items-center justify-between mb-2.5 mt-1">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: "#fef3c7" }}>📬</div>
              <span className="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: "#fef3c7", color: "#92400e" }}>Hàng Ngày</span>
            </div>
            <p className="font-extrabold text-slate-900 mb-0.5" style={{ fontSize: "15px" }}>Báo Cáo Ngày</p>
            <code className="text-xs font-bold mb-2.5 block" style={{ fontFamily: "'JetBrains Mono',monospace", color: "#64748b" }}>/daily</code>
            <p className="text-[10px] uppercase font-bold tracking-wide text-slate-400 mb-0.5">Deadline nộp</p>
            <p className="font-black mb-3" style={{ fontSize: "20px", color: "#d97706" }}>Trước 09:00</p>
            <div className="flex flex-col gap-1.5 text-xs text-slate-600 mb-4 mt-1">
              <div className="flex items-start gap-1.5"><span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: "#f59e0b" }} /><span>Bot tổng hợp standup gửi kênh lúc <b>9:00</b></span></div>
              <div className="flex items-start gap-1.5"><span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: "#f59e0b" }} /><span>Bot gửi DM CEO lúc <b>9:30</b> (T2–T7)</span></div>
              <div className="flex items-start gap-1.5"><span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: "#f59e0b" }} /><span>Phiên chiều <b>14:00</b> — tag ai chưa nộp</span></div>
              <div className="flex items-start gap-1.5"><span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: "#f59e0b" }} /><span>Sửa được đến <b>10:00</b> — sau đó khóa</span></div>
            </div>
            <div className="flex items-start gap-1.5 rounded-lg p-2.5 mt-auto" style={{ background: "#fff7ed", border: "1px solid #fed7aa", fontSize: "11.5px", color: "#9a3412", fontWeight: 600, minHeight: "52px" }}>
              ⚠️ Nộp trễ sau 9h30: Bot báo cáo lên CEO.
            </div>
          </div>

          {/* Card — Báo Cáo KPI Tuần — TOÀN CARD là link */}
          <a
            href="/weekly"
            className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 relative overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-300"
            style={{ textDecoration: "none", color: "inherit", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: "linear-gradient(90deg, #ef4444, #f87171)" }} />
            <div className="flex items-center justify-between mb-2.5 mt-1">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: "#fee2e2" }}>📊</div>
              <span className="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: "#fee2e2", color: "#991b1b" }}>Hàng Tuần</span>
            </div>
            <p className="font-extrabold text-slate-900 mb-0.5" style={{ fontSize: "15px" }}>Báo Cáo KPI Tuần</p>
            <code className="text-xs font-bold mb-2.5 block" style={{ fontFamily: "'JetBrains Mono',monospace", color: "#64748b" }}>/weekly</code>
            <p className="text-[10px] uppercase font-bold tracking-wide text-slate-400 mb-0.5">Deadline nộp</p>
            <p className="font-black mb-3" style={{ fontSize: "20px", color: "#dc2626" }}>24:00 Chủ Nhật</p>
            <div className="flex flex-col gap-1.5 text-xs text-slate-600 mb-4 mt-1">
              <div className="flex items-start gap-1.5"><span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: "#ef4444" }} /><span>Bot DM nhắc lúc <b>20:00 Chủ Nhật</b> (còn 4 tiếng)</span></div>
              <div className="flex items-start gap-1.5"><span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: "#ef4444" }} /><span>Bot tổng hợp <b>9:05 Thứ Hai</b> → gửi CEO</span></div>
              <div className="flex items-start gap-1.5"><span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: "#ef4444" }} /><span>Bot DM xác nhận ngay khi bạn submit</span></div>
            </div>
            <div className="flex items-start gap-1.5 rounded-lg p-2.5 mt-auto" style={{ background: "#fff7ed", border: "1px solid #fed7aa", fontSize: "11.5px", color: "#9a3412", fontWeight: 600, minHeight: "52px" }}>
              ⚠️ Nộp trễ: Phạt <b>50k</b>. Áp dụng: <b>HR · Content · Design · QC</b>
            </div>
          </a>

          {/* Card — Báo Cáo & KH Tháng — TOÀN CARD là link */}
          <a
            href="/monthly"
            className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 relative overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-300"
            style={{ textDecoration: "none", color: "inherit", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: "linear-gradient(90deg, #8b5cf6, #a78bfa)" }} />
            <div className="flex items-center justify-between mb-2.5 mt-1">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: "#ede9fe" }}>📋</div>
              <span className="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: "#ede9fe", color: "#5b21b6" }}>Hàng Tháng</span>
            </div>
            <p className="font-extrabold text-slate-900 mb-0.5" style={{ fontSize: "15px" }}>Báo Cáo & KH Tháng</p>
            <code className="text-xs font-bold mb-2.5 block" style={{ fontFamily: "'JetBrains Mono',monospace", color: "#64748b" }}>/monthly</code>
            <p className="text-[10px] uppercase font-bold tracking-wide text-slate-400 mb-0.5">Deadline nộp</p>
            <p className="font-black mb-3" style={{ fontSize: "20px", color: "#7c3aed" }}>24:00 ngày Mùng 4</p>
            <div className="flex flex-col gap-1.5 text-xs text-slate-600 mb-4 mt-1">
              <div className="flex items-start gap-1.5"><span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: "#8b5cf6" }} /><span>Bot DM nhắc ngày <b>mùng 1</b> hàng tháng</span></div>
              <div className="flex items-start gap-1.5"><span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: "#8b5cf6" }} /><span>Bot chốt danh sách lúc <b>9:00 mùng 5</b></span></div>
              <div className="flex items-start gap-1.5"><span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: "#8b5cf6" }} /><span>Danh sách trễ gửi thẳng về CEO</span></div>
            </div>
            <div className="flex items-start gap-1.5 rounded-lg p-2.5 mt-auto" style={{ background: "#fff7ed", border: "1px solid #fed7aa", fontSize: "11.5px", color: "#9a3412", fontWeight: 600, minHeight: "52px" }}>
              ⚠️ Nộp trễ: Phạt <b>100k</b>. Không áp dụng: <b>CEO, HĐQT/Mentor</b>
            </div>
          </a>

        </div>
      </div>

      {/* ══════════════════════════════════════
          KV3: LỆNH DISCORD — HỆ THỐNG TABS
          Tab buttons: pill bar trong khối #f1f5f9 (đúng mockup)
      ══════════════════════════════════════ */}
      <div className="mb-8">
        <h2 className="flex items-center gap-2 font-extrabold text-slate-800 mb-4" style={{ fontSize: "16px" }}>
          <span>🤖</span> Lệnh Discord Bot Của Bạn
        </h2>

        {/* Tab buttons — pill bar như mockup */}
        <div
          className="flex gap-1.5 mb-4 p-1 rounded-xl w-fit flex-wrap"
          style={{ background: "#f1f5f9" }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-150 cursor-pointer border-none ${
                activeTab === tab.key
                  ? tab.isHr
                    ? "text-white"
                    : "bg-white text-slate-800 shadow-sm"
                  : "bg-transparent text-slate-500 hover:text-slate-700"
              }`}
              style={
                activeTab === tab.key && tab.isHr
                  ? { background: "#1e3a5f", boxShadow: "0 1px 4px rgba(30,58,95,0.3)" }
                  : {}
              }
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
          KV4: NỘI QUY CẦN NHỚ — 3 cột như mockup
      ══════════════════════════════════════ */}
      <div className="mb-8">
        <h2 className="flex items-center gap-2 font-extrabold text-slate-800 mb-4" style={{ fontSize: "16px" }}>
          <span>📜</span> Nội Quy Cần Nhớ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {RULES.map((r, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex items-start gap-3">
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
        <h2 className="flex items-center gap-2 font-extrabold text-slate-800 mb-4" style={{ fontSize: "16px" }}>
          <span>❓</span> Câu Hỏi Thường Gặp
        </h2>
        <FaqAccordion />
      </div>

    </div>
  );
}
