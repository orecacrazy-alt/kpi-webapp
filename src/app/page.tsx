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

type TabKey = "bao-cao" | "xin-phep" | "trao-doi" | "hr-ceo";
type Dept = "" | "dev" | "design" | "content" | "hr" | "qc" | "edu" | "tester" | "hdqt";

// ─── Nội Quy cards ──────────────────────────────────────────────────────────
const RULES = [
  { icon: "⏰", color: "blue",   text: "Báo cáo ngày đúng giờ",               sub: "Nộp trước 9:00 sáng — trễ sau 9h30 Bot báo lên CEO" },
  { icon: "📊", color: "red",    text: "Báo cáo tuần trước 24h Chủ Nhật",      sub: "Áp dụng HR · Content · Design · QC — trễ phạt 50k" },
  { icon: "📋", color: "purple", text: "Kế hoạch tháng trước 24h mùng 4",      sub: "Bot chốt 9:00 sáng mùng 5, gửi CEO — trễ phạt 100k" },
  { icon: "🏖️", color: "green",  text: "Xin phép trước ít nhất 1 ngày",        sub: "Xin cùng ngày sẽ không được chấp nhận tự động" },
  { icon: "💻", color: "orange", text: "Git push trước khi về",                 sub: "Bot kiểm tra lúc 17:00 và 17:30 — chưa push sẽ bị tag nhắc" },
  { icon: "❌", color: "red",    text: "Không ghi chung chung \"đang làm\"",     sub: "Mỗi đầu việc cần: tên cụ thể + số lượng + trạng thái" },
  { icon: "📲", color: "yellow", text: "Phản hồi Bot trong 30 phút",             sub: "Sau 3 tiếng không phản hồi → Bot báo leo thang CEO" },
  { icon: "🚨", color: "orange", text: "/urgent chỉ dùng khi thực sự khẩn",      sub: "Sự cố kỹ thuật, lỗi nghiêm trọng — không lạm dụng" },
];

const RULE_COLOR: Record<string, string> = {
  blue:   "bg-blue-100 text-blue-600",
  red:    "bg-red-100 text-red-600",
  purple: "bg-purple-100 text-purple-600",
  green:  "bg-emerald-100 text-emerald-600",
  orange: "bg-orange-100 text-orange-600",
  yellow: "bg-amber-100 text-amber-600",
};

const TABS: { key: TabKey; label: string; isHr?: boolean }[] = [
  { key: "bao-cao",   label: "📊 Lệnh Báo Cáo" },
  { key: "xin-phep",  label: "📅 Xin Phép & Điều Chỉnh" },
  { key: "trao-doi",  label: "💬 Giao Tiếp Với Sếp" },
  { key: "hr-ceo",    label: "👑 Lệnh HR / CEO", isHr: true },
];

const DEPTS: { value: Dept; label: string }[] = [
  { value: "",        label: "-- Chọn bộ phận --" },
  { value: "dev",     label: "💻 Dev" },
  { value: "design",  label: "🎨 Design" },
  { value: "content", label: "✍️ Content" },
  { value: "hr",      label: "👥 HR" },
  { value: "qc",      label: "🔍 QC" },
  { value: "edu",     label: "📚 Edu" },
  { value: "tester",  label: "🧪 Tester" },
  { value: "hdqt",    label: "🏛️ HĐQT / Mentor" },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabKey>("bao-cao");
  const [selectedDept, setSelectedDept] = useState<Dept>("");

  return (
    <div className="min-h-screen pb-20">

      {/* ══════════════════════════════════════
          KV1: HERO — dải ngang full-width, không bo góc
          Âm margin 2 bên để tràn ra khỏi padding của main
      ══════════════════════════════════════ */}
      <div
        className="relative overflow-hidden mb-8"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #2563eb 60%, #0ea5e9 100%)",
          padding: "32px 40px",
          margin: "-28px -32px 32px -32px",  /* âm margin = tràn full-width */
        }}
      >
        {/* Logo chìm bên phải */}
        <div className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 opacity-[0.15] hidden md:block">
          <Image src="/logo-iruka.svg" alt="" width={100} height={100} priority />
        </div>

        <h1 className="font-black text-white mb-5" style={{ fontSize: "26px", fontWeight: 900, letterSpacing: "-0.5px" }}>
          Cổng Thông Tin Nội Bộ IruKa
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>
            👤 Tôi thuộc bộ phận:
          </span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value as Dept)}
            className="outline-none backdrop-blur-sm"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 700,
              padding: "8px 14px",
              borderRadius: "10px",
              cursor: "pointer",
              minWidth: "180px",
            }}
          >
            {DEPTS.map((d) => (
              <option key={d.value} value={d.value} style={{ background: "#0f172a", color: "#fff" }}>
                {d.label}
              </option>
            ))}
          </select>
          {selectedDept && (
            <div
              className="flex items-center gap-2"
              style={{
                background: "rgba(16,185,129,0.25)",
                border: "1px solid rgba(16,185,129,0.4)",
                color: "#6ee7b7",
                fontSize: "12px",
                fontWeight: 700,
                padding: "5px 14px",
                borderRadius: "20px",
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10b981" }} />
              Đã lưu
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          KV2: LỊCH BÁO CÁO & DEADLINE
      ══════════════════════════════════════ */}
      <div className="mb-8">
        <h2 className="flex items-center gap-2 mb-5" style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a" }}>
          <span>📅</span> Lịch Báo Cáo &amp; Deadline
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

          {/* Card — Báo Cáo Ngày */}
          <div
            className="rounded-2xl border border-slate-200 bg-white p-5 relative overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: "linear-gradient(90deg, #f59e0b, #fbbf24)" }} />
            <div className="flex items-center justify-between mb-3 mt-1">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "#fef3c7" }}>📬</div>
              <span className="text-[11px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full" style={{ background: "#fef3c7", color: "#92400e" }}>Hàng Ngày</span>
            </div>
            <p className="font-extrabold text-slate-900 mb-1" style={{ fontSize: "16px" }}>Báo Cáo Ngày</p>
            <code className="text-sm font-bold mb-3 block" style={{ fontFamily: "'JetBrains Mono',monospace", color: "#64748b" }}>/daily</code>
            <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">Deadline nộp</p>
            <p className="font-black mb-3" style={{ fontSize: "22px", color: "#d97706" }}>Trước 09:00</p>
            <div className="flex flex-col gap-2 text-sm text-slate-600 mb-4">
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "#f59e0b" }} /><span>Bot tổng hợp standup gửi kênh lúc <b>9:00</b></span></div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "#f59e0b" }} /><span>Bot gửi DM CEO lúc <b>9:30</b> (T2–T7)</span></div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "#f59e0b" }} /><span>Phiên chiều <b>14:00</b> — tag ai chưa nộp</span></div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "#f59e0b" }} /><span>Sửa được đến <b>10:00</b> — sau đó khóa</span></div>
            </div>
            <div className="flex items-start gap-2 rounded-xl p-3 mt-auto" style={{ background: "#fff7ed", border: "1px solid #fed7aa", fontSize: "12.5px", color: "#9a3412", fontWeight: 600 }}>
              ⚠️ Nộp trễ sau <b>9h30</b>: Bot báo cáo lên CEO.
            </div>
          </div>

          {/* Card — Báo Cáo KPI Tuần — toàn card là link */}
          <a
            href="/weekly"
            className="rounded-2xl border border-slate-200 bg-white p-5 relative overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-red-300"
            style={{ textDecoration: "none", color: "inherit", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: "linear-gradient(90deg, #ef4444, #f87171)" }} />
            <div className="flex items-center justify-between mb-3 mt-1">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "#fee2e2" }}>📊</div>
              <span className="text-[11px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full" style={{ background: "#fee2e2", color: "#991b1b" }}>Hàng Tuần</span>
            </div>
            <p className="font-extrabold text-slate-900 mb-1" style={{ fontSize: "16px" }}>Báo Cáo KPI Tuần</p>
            <code className="text-sm font-bold mb-3 block" style={{ fontFamily: "'JetBrains Mono',monospace", color: "#64748b" }}>/weekly</code>
            <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">Deadline nộp</p>
            <p className="font-black mb-3" style={{ fontSize: "22px", color: "#dc2626" }}>24:00 Chủ Nhật</p>
            <div className="flex flex-col gap-2 text-sm text-slate-600 mb-4">
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "#ef4444" }} /><span>Bot DM nhắc lúc <b>20:00 Chủ Nhật</b> (còn 4 tiếng)</span></div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "#ef4444" }} /><span>Bot tổng hợp <b>9:05 Thứ Hai</b> → gửi CEO</span></div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "#ef4444" }} /><span>Bot DM xác nhận ngay khi bạn submit</span></div>
            </div>
            <div className="flex items-start gap-2 rounded-xl p-3 mt-auto" style={{ background: "#fff7ed", border: "1px solid #fed7aa", fontSize: "12.5px", color: "#9a3412", fontWeight: 600 }}>
              ⚠️ Nộp trễ: Phạt <b>50k</b>. Áp dụng: <b>HR · Content · Design · QC</b>
            </div>
          </a>

          {/* Card — Báo Cáo & KH Tháng — toàn card là link */}
          <a
            href="/monthly"
            className="rounded-2xl border border-slate-200 bg-white p-5 relative overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-purple-300"
            style={{ textDecoration: "none", color: "inherit", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: "linear-gradient(90deg, #8b5cf6, #a78bfa)" }} />
            <div className="flex items-center justify-between mb-3 mt-1">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "#ede9fe" }}>📋</div>
              <span className="text-[11px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full" style={{ background: "#ede9fe", color: "#5b21b6" }}>Hàng Tháng</span>
            </div>
            <p className="font-extrabold text-slate-900 mb-1" style={{ fontSize: "16px" }}>Báo Cáo &amp; KH Tháng</p>
            <code className="text-sm font-bold mb-3 block" style={{ fontFamily: "'JetBrains Mono',monospace", color: "#64748b" }}>/monthly</code>
            <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">Deadline nộp</p>
            <p className="font-black mb-3" style={{ fontSize: "22px", color: "#7c3aed" }}>24:00 ngày Mùng 4</p>
            <div className="flex flex-col gap-2 text-sm text-slate-600 mb-4">
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "#8b5cf6" }} /><span>Bot DM nhắc ngày <b>mùng 1</b> hàng tháng</span></div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "#8b5cf6" }} /><span>Bot chốt danh sách lúc <b>9:00 mùng 5</b></span></div>
              <div className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "#8b5cf6" }} /><span>Danh sách trễ gửi thẳng về <b>CEO</b></span></div>
            </div>
            <div className="flex items-start gap-2 rounded-xl p-3 mt-auto" style={{ background: "#fff7ed", border: "1px solid #fed7aa", fontSize: "12.5px", color: "#9a3412", fontWeight: 600 }}>
              ⚠️ Nộp trễ: Phạt <b>100k</b>. Không áp dụng: <b>CEO, HĐQT/Mentor</b>
            </div>
          </a>

        </div>
      </div>

      {/* ══════════════════════════════════════
          KV3: LỆNH DISCORD — HỆ THỐNG TABS
      ══════════════════════════════════════ */}
      <div className="mb-8">
        <h2 className="flex items-center gap-2 mb-4" style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a" }}>
          <span>🤖</span> Lệnh Discord Bot Của Bạn
        </h2>

        {/* Tab bar — pill style như mockup */}
        <div
          className="flex gap-1.5 mb-5 p-1 rounded-xl w-fit flex-wrap"
          style={{ background: "#f1f5f9" }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-150 cursor-pointer border-none ${
                activeTab === tab.key
                  ? tab.isHr
                    ? "text-white"
                    : "bg-white text-slate-900 shadow-sm"
                  : "bg-transparent text-slate-500 hover:text-slate-700"
              }`}
              style={{
                fontSize: "13.5px",
                ...(activeTab === tab.key && tab.isHr
                  ? { background: "#1e3a5f", boxShadow: "0 1px 4px rgba(30,58,95,0.3)" }
                  : {}),
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "bao-cao"  && <TabBaoCao  selectedDept={selectedDept} />}
          {activeTab === "xin-phep" && <TabXinPhep selectedDept={selectedDept} />}
          {activeTab === "trao-doi" && <TabTraoDoi selectedDept={selectedDept} />}
          {activeTab === "hr-ceo"   && <TabHrCeo   selectedDept={selectedDept} />}
        </div>
      </div>

      {/* ══════════════════════════════════════
          KV4: NỘI QUY CẦN NHỚ — 3 cột
      ══════════════════════════════════════ */}
      <div className="mb-8">
        <h2 className="flex items-center gap-2 mb-4" style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a" }}>
          <span>📜</span> Nội Quy Cần Nhớ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {RULES.map((r, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex items-start gap-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${RULE_COLOR[r.color]}`}>
                {r.icon}
              </div>
              <div>
                <p className="font-extrabold text-slate-800 leading-snug mb-1" style={{ fontSize: "14px" }}>{r.text}</p>
                <p className="text-slate-500 leading-relaxed" style={{ fontSize: "12.5px" }}>{r.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          KV5: FAQ
      ══════════════════════════════════════ */}
      <div>
        <h2 className="flex items-center gap-2 mb-4" style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a" }}>
          <span>❓</span> Câu Hỏi Thường Gặp
        </h2>
        <FaqAccordion />
      </div>

    </div>
  );
}
