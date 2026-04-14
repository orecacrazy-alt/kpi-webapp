"use client";
// ═══════════════════════════════════════════════════════════════════
// TabBaoCao — Tab "📊 Lệnh Báo Cáo"
// Hiển thị 4 cards lệnh: /daily, /weekly, /monthly, /summary
// Nhận selectedDept để tương lai có thể lọc card theo bộ phận
// ═══════════════════════════════════════════════════════════════════

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── Kiểu dữ liệu ───────────────────────────────────────────────────────────
interface Step { text: string }
interface CmdCard {
  cmd: string;
  color: "amber" | "red" | "purple" | "green";
  depts: string;
  deadline?: string;
  title: string;
  desc: string;
  steps: Step[];
  warning?: string;
  tip?: string;
  fallbackHref?: string;    // Link dự phòng (form web)
  fallbackLabel?: string;
}

// ─── Màu theo theme card ─────────────────────────────────────────────────────
const COLORS = {
  amber:  { border: "border-amber-200",  bg: "bg-amber-50/60",   hdr: "bg-amber-500",   cmd: "text-amber-700 bg-amber-100",  badge: "text-amber-700 bg-amber-100",  step: "bg-amber-500", warn: "bg-amber-50 border-amber-200 text-amber-800", tip: "bg-amber-50 text-amber-700" },
  red:    { border: "border-red-200",    bg: "bg-red-50/60",     hdr: "bg-red-500",     cmd: "text-red-700 bg-red-100",      badge: "text-red-700 bg-red-100",      step: "bg-red-500",   warn: "bg-red-50 border-red-200 text-red-800",       tip: "bg-red-50 text-red-700" },
  purple: { border: "border-purple-200", bg: "bg-purple-50/60",  hdr: "bg-purple-500",  cmd: "text-purple-700 bg-purple-100",badge: "text-purple-700 bg-purple-100",step: "bg-purple-500",warn: "bg-purple-50 border-purple-200 text-purple-800",tip: "bg-purple-50 text-purple-700" },
  green:  { border: "border-emerald-200",bg: "bg-emerald-50/60", hdr: "bg-emerald-500", cmd: "text-emerald-700 bg-emerald-100",badge: "text-emerald-700 bg-emerald-100",step:"bg-emerald-500",warn:"bg-emerald-50 border-emerald-200 text-emerald-800",tip:"bg-emerald-50 text-emerald-700" },
};

// ─── Dữ liệu 4 thẻ lệnh Báo Cáo ────────────────────────────────────────────
const CARDS: CmdCard[] = [
  {
    cmd: "/daily",
    color: "amber",
    depts: "Dev · Design · Content · QC · Edu",
    deadline: "⏰ Trước 9:00",
    title: "Báo cáo hàng ngày",
    desc: "Gửi mỗi sáng đi làm, báo cáo kế hoạch hôm nay & kết quả hôm qua.",
    steps: [
      { text: "Mở Discord → Tìm Bot IruKa → Vào DM" },
      { text: "Gõ /daily → Bot mở form 3 mục" },
      { text: "Điền: Kế hoạch hôm nay · Kết quả hôm qua · Blocker" },
    ],
    warning: "⚠️ Không ghi chung chung như \"đang làm\" — phải có tên việc + số lượng!",
  },
  {
    cmd: "/weekly",
    color: "red",
    depts: "HR · Content · Design · QC",
    deadline: "⏰ CN 24:00",
    title: "Form báo cáo KPI tuần",
    desc: "Điền vào cuối tuần để báo cáo kết quả tuần cũ và kế hoạch tuần tới.",
    steps: [
      { text: "Trong DM Bot → Gõ /weekly" },
      { text: "Bot gửi link form cá nhân bảo mật" },
      { text: "Điền đầy đủ 2 bảng: BC tuần cũ + KH tuần mới" },
    ],
    tip: "✅ Dev, Edu, Tester không dùng lệnh này — Dev báo cáo theo /monthly",
    fallbackHref: "/weekly",
    fallbackLabel: "Đến Form Báo Tuần (Dự phòng)",
  },
  {
    cmd: "/monthly",
    color: "purple",
    depts: "HR · Dev · Design · Content · QC · Edu · Tester",
    deadline: "⏰ Mùng 4",
    title: "Báo cáo & kế hoạch tháng",
    desc: "Điền vào đầu tháng để tổng kết tháng cũ và lên kế hoạch tháng mới.",
    steps: [
      { text: "Ngày mùng 1 Bot sẽ tự DM nhắc bạn" },
      { text: "Gõ /monthly → Bot gửi link Google Sheets" },
      { text: "Điền: Đầu việc · Số lượng · Deadline · Độ ưu tiên" },
    ],
    warning: "⚠️ Nộp trước 24:00 ngày mùng 4 — 9:00 ngày mùng 5 Bot chốt danh sách báo cáo cho CEO",
    fallbackHref: "/monthly",
    fallbackLabel: "Đến Form Báo Tháng (Dự phòng)",
  },
  {
    cmd: "/summary",
    color: "green",
    depts: "Tất cả NV (CEO xem đầy đủ)",
    title: "Xem tóm tắt hoạt động",
    desc: "Xem tóm tắt hoạt động cá nhân trong tuần — task được giao, báo cáo đã nộp...",
    steps: [
      { text: "Gõ /summary trong DM Bot" },
      { text: "Bot hiện bản tóm tắt hoạt động gần nhất" },
    ],
    tip: "✅ CEO có thể xem chi tiết từng nhân viên bằng: đánh giá @username trong DM Bot",
  },
];

// ─── Component phụ: một thẻ lệnh ─────────────────────────────────────────────
function CmdCardUI({ card }: { card: CmdCard }) {
  const c = COLORS[card.color];
  return (
    <div className={`rounded-2xl border ${c.border} bg-white shadow-sm hover:shadow-md transition-shadow p-5`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
        <code className={`text-sm font-bold px-2.5 py-1 rounded-lg ${c.cmd}`}>{card.cmd}</code>
        <div className="flex flex-wrap gap-1.5">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>{card.depts}</span>
          {card.deadline && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{card.deadline}</span>
          )}
        </div>
      </div>

      {/* Title + Desc */}
      <p className="font-bold text-slate-800 mb-1">{card.title}</p>
      <p className="text-sm text-slate-500 mb-3 leading-relaxed">{card.desc}</p>

      {/* Steps */}
      <div className="space-y-1.5 mb-3">
        {card.steps.map((s, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
            <span className={`shrink-0 w-5 h-5 rounded-full ${c.step} text-white text-[10px] font-black flex items-center justify-center mt-0.5`}>{i + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: s.text.replace(/\/([\w]+)/g, '<b>/$1</b>') }} />
          </div>
        ))}
      </div>

      {/* Warning */}
      {card.warning && (
        <div className={`text-xs rounded-xl p-2.5 border mb-2 ${c.warn}`}>{card.warning}</div>
      )}
      {/* Tip */}
      {card.tip && (
        <div className={`text-xs rounded-xl p-2.5 mb-2 ${c.tip}`}>{card.tip}</div>
      )}
      {/* Fallback link dự phòng (giữ lại từ trang cũ) */}
      {card.fallbackHref && card.fallbackLabel && (
        <Link
          href={card.fallbackHref}
          className={`flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-bold transition-colors mt-1 ${c.tip} border ${c.border} hover:opacity-80`}
        >
          {card.fallbackLabel} <ArrowRight size={13} />
        </Link>
      )}
    </div>
  );
}

// ─── Component chính ─────────────────────────────────────────────────────────
export default function TabBaoCao({ selectedDept }: { selectedDept: string }) {
  // Tương lai: lọc theo selectedDept nếu cần ẩn/hiện một số lệnh
  void selectedDept;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {CARDS.map((card) => (
        <CmdCardUI key={card.cmd} card={card} />
      ))}
    </div>
  );
}
