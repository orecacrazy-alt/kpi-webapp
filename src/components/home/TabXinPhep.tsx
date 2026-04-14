// ═══════════════════════════════════════════════════════════════════
// TabXinPhep — Tab "📅 Xin Phép & Điều Chỉnh"
// Hiển thị 4 cards lệnh: /leave, /late, /early, /mystatus
// ═══════════════════════════════════════════════════════════════════

// ─── Kiểu dữ liệu ───────────────────────────────────────────────────────────
interface CardData {
  cmd: string;
  color: "green" | "blue" | "navy" | "teal";
  title: string;
  desc: string;
  steps: string[];
  warning?: string;
  tip?: string;
}

// ─── Màu theo theme ──────────────────────────────────────────────────────────
const C = {
  green: { border: "border-emerald-200", cmd: "text-emerald-700 bg-emerald-100", step: "bg-emerald-500", warn: "bg-amber-50 border-amber-200 text-amber-800", tip: "bg-emerald-50 text-emerald-700" },
  blue:  { border: "border-blue-200",    cmd: "text-blue-700 bg-blue-100",       step: "bg-blue-500",    warn: "bg-amber-50 border-amber-200 text-amber-800", tip: "bg-blue-50 text-blue-700" },
  navy:  { border: "border-slate-200",   cmd: "text-slate-700 bg-slate-100",     step: "bg-slate-600",   warn: "bg-amber-50 border-amber-200 text-amber-800", tip: "bg-slate-50 text-slate-600" },
  teal:  { border: "border-teal-200",    cmd: "text-teal-700 bg-teal-100",       step: "bg-teal-500",    warn: "bg-amber-50 border-amber-200 text-amber-800", tip: "bg-teal-50 text-teal-700" },
};

// ─── Dữ liệu thẻ lệnh ────────────────────────────────────────────────────────
const CARDS: CardData[] = [
  {
    cmd: "/leave",
    color: "green",
    title: "Xin nghỉ phép",
    desc: "Tạo đơn xin nghỉ phép có lương, không lương hoặc nghỉ bù. CEO duyệt ngay trên Discord.",
    steps: [
      "Gõ /leave → Điền ngày nghỉ + loại nghỉ + lý do",
      "Bot gửi đơn lên CEO để duyệt",
      "Bot DM kết quả duyệt/từ chối về cho bạn",
    ],
    warning: "⚠️ Phải xin trước ít nhất 1 ngày làm việc — xin cùng ngày không được chấp nhận!",
  },
  {
    cmd: "/late",
    color: "blue",
    title: "Xin đi muộn",
    desc: "Báo đi muộn trước khi đến. Điền giờ đến + lý do cụ thể.",
    steps: [
      "Gõ /late → Điền giờ đến và lý do",
      "Bot chuyển thông tin lên CEO",
      "Bot xác nhận đã ghi nhận cho bạn",
    ],
    tip: "✅ Phải báo trước khi đến muộn, không báo sau",
  },
  {
    cmd: "/early",
    color: "navy",
    title: "Xin về sớm",
    desc: "Báo về sớm và lý do. Điền giờ dự kiến về.",
    steps: [
      "Gõ /early → Điền giờ về và lý do",
      "Bot chuyển thông tin lên CEO",
      "Bot xác nhận đã ghi nhận cho bạn",
    ],
    tip: "✅ Báo trước khi về, không báo sau khi đã về rồi",
  },
  {
    cmd: "/mystatus",
    color: "teal",
    title: "Xem trạng thái đơn của tôi",
    desc: "Kiểm tra tất cả đơn xin phép đang chờ duyệt hoặc đã được xử lý.",
    steps: [
      "Gõ /mystatus trong DM Bot",
      "Bot hiện danh sách đơn + trạng thái (Chờ / Duyệt / Từ chối)",
    ],
    tip: "✅ Dùng khi muốn kiểm tra đơn đã được CEO duyệt chưa",
  },
];

// ─── Component phụ: một card ─────────────────────────────────────────────────
function Card({ d }: { d: CardData }) {
  const c = C[d.color];
  return (
    <div className={`rounded-2xl border ${c.border} bg-white shadow-sm hover:shadow-md transition-shadow p-5`}>
      <div className="flex items-center justify-between mb-3">
        <code className={`text-sm font-bold px-2.5 py-1 rounded-lg ${c.cmd}`}>{d.cmd}</code>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Tất cả NV</span>
      </div>

      <p className="font-bold text-slate-800 mb-1">{d.title}</p>
      <p className="text-sm text-slate-500 mb-3 leading-relaxed">{d.desc}</p>

      <div className="space-y-1.5 mb-3">
        {d.steps.map((s, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
            <span className={`shrink-0 w-5 h-5 rounded-full ${c.step} text-white text-[10px] font-black flex items-center justify-center mt-0.5`}>{i + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: s.replace(/\/([\w]+)/g, '<b>/$1</b>') }} />
          </div>
        ))}
      </div>

      {d.warning && <div className={`text-xs rounded-xl p-2.5 border mb-2 ${c.warn}`}>{d.warning}</div>}
      {d.tip && <div className={`text-xs rounded-xl p-2.5 ${c.tip}`}>{d.tip}</div>}
    </div>
  );
}

// ─── Component chính ─────────────────────────────────────────────────────────
export default function TabXinPhep({ selectedDept }: { selectedDept: string }) {
  void selectedDept;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {CARDS.map((d) => <Card key={d.cmd} d={d} />)}
    </div>
  );
}
