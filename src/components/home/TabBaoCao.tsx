"use client";
// ═══════════════════════════════════════════════════════════════════
// TabBaoCao — Tab "📊 Lệnh Báo Cáo"
// Hiển thị 4 cards lệnh: /daily, /weekly, /monthly, /summary
// Card /weekly và /monthly: toàn bộ khối là link clickable
// Không còn nút "Đến form..." riêng lẻ ở dưới
// ═══════════════════════════════════════════════════════════════════

import Link from "next/link";

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
  linkHref?: string;   // Nếu có: toàn bộ card là link href này
}

// ─── Màu theo theme card ─────────────────────────────────────────────────────
const COLORS = {
  amber:  { border: "border-amber-200",  cmd: "text-amber-700 bg-amber-100",   badge: "text-amber-700 bg-amber-100",   step: "bg-amber-500",   warn: "bg-amber-50 border-amber-200 text-amber-800",   tip: "bg-amber-50 text-amber-700" },
  red:    { border: "border-red-200",    cmd: "text-red-700 bg-red-100",       badge: "text-red-700 bg-red-100",       step: "bg-red-500",     warn: "bg-red-50 border-red-200 text-red-800",         tip: "bg-red-50 text-red-700" },
  purple: { border: "border-purple-200", cmd: "text-purple-700 bg-purple-100", badge: "text-purple-700 bg-purple-100", step: "bg-purple-500",  warn: "bg-purple-50 border-purple-200 text-purple-800", tip: "bg-purple-50 text-purple-700" },
  green:  { border: "border-emerald-200",cmd: "text-emerald-700 bg-emerald-100",badge:"text-emerald-700 bg-emerald-100",step:"bg-emerald-500", warn:"bg-emerald-50 border-emerald-200 text-emerald-800",tip:"bg-emerald-50 text-emerald-700" },
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
    linkHref: "/weekly",   // Toàn card là link
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
    linkHref: "/monthly",  // Toàn card là link
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

// ─── Nội dung bên trong card ─────────────────────────────────────────────────
function CardInner({ card }: { card: CmdCard }) {
  const c = COLORS[card.color];
  return (
    <>
      {/* Header: lệnh + badge */}
      <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
        <code className={`text-[15px] font-bold px-3 py-1.5 rounded-lg ${c.cmd}`}>{card.cmd}</code>
        <div className="flex flex-wrap gap-1.5">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>{card.depts}</span>
          {card.deadline && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{card.deadline}</span>
          )}
        </div>
      </div>

      {/* Title + Desc */}
      <p className="font-extrabold text-slate-800 mb-1.5" style={{ fontSize: "15px" }}>{card.title}</p>
      <p className="text-slate-500 mb-3 leading-relaxed" style={{ fontSize: "13px" }}>{card.desc}</p>

      {/* Steps */}
      <div className="space-y-2 mb-3">
        {card.steps.map((s, i) => (
          <div key={i} className="flex items-start gap-2" style={{ fontSize: "13px", color: "#374151" }}>
            <span className={`shrink-0 w-5 h-5 rounded-full ${c.step} text-white text-[10px] font-black flex items-center justify-center mt-0.5`}>{i + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: s.text.replace(/(\/[\w]+)/g, '<b>$1</b>') }} />
          </div>
        ))}
      </div>

      {/* Warning / Tip */}
      {card.warning && (
        <div className={`rounded-xl p-2.5 border ${c.warn}`} style={{ fontSize: "12.5px", fontWeight: 600 }}>{card.warning}</div>
      )}
      {card.tip && (
        <div className={`rounded-xl p-2.5 ${c.tip} mt-2`} style={{ fontSize: "12.5px", fontWeight: 600 }}>{card.tip}</div>
      )}
    </>
  );
}

// ─── Component chính ─────────────────────────────────────────────────────────
export default function TabBaoCao({ selectedDept }: { selectedDept: string }) {
  void selectedDept;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {CARDS.map((card) => {
        const c = COLORS[card.color];
        // Nếu card có linkHref → wrap toàn bộ thành thẻ <a> clickable
        if (card.linkHref) {
          return (
            <Link
              key={card.cmd}
              href={card.linkHref}
              className={`rounded-2xl border ${c.border} bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5 block`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CardInner card={card} />
            </Link>
          );
        }
        // Card thường — không có link
        return (
          <div
            key={card.cmd}
            className={`rounded-2xl border ${c.border} bg-white shadow-sm hover:shadow-md transition-shadow p-5`}
          >
            <CardInner card={card} />
          </div>
        );
      })}
    </div>
  );
}
