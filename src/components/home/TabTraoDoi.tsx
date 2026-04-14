// ═══════════════════════════════════════════════════════════════════
// TabTraoDoi — Tab "💬 Giao Tiếp Với Sếp"
// Hiển thị 3 cards lệnh: /question, /urgent, /help
// ═══════════════════════════════════════════════════════════════════

interface CardData {
  cmd: string;
  color: "blue" | "red" | "green";
  title: string;
  desc: string;
  steps: string[];
  warning?: string;
  tip?: string;
}

const C = {
  blue:  { border: "border-blue-200",    cmd: "text-blue-700 bg-blue-100",     step: "bg-blue-500",    tip: "bg-blue-50 text-blue-700",     warn: "bg-amber-50 border-amber-200 text-amber-800" },
  red:   { border: "border-red-200",     cmd: "text-red-700 bg-red-100",       step: "bg-red-500",     tip: "bg-red-50 text-red-700",       warn: "bg-red-50 border-red-200 text-red-800" },
  green: { border: "border-emerald-200", cmd: "text-emerald-700 bg-emerald-100",step:"bg-emerald-500", tip: "bg-emerald-50 text-emerald-700",warn: "bg-amber-50 border-amber-200 text-amber-800" },
};

const CARDS: CardData[] = [
  {
    cmd: "/question",
    color: "blue",
    title: "Hỏi hoặc đề xuất lên sếp",
    desc: "Gửi câu hỏi hoặc đề xuất đến CEO. Bot sẽ chuyển tiếp và nhắc sếp phản hồi.",
    steps: [
      "Gõ /question → Nhập nội dung câu hỏi",
      "Bot forward ngay cho CEO",
      "CEO phản hồi → Bot DM câu trả lời về bạn",
    ],
    tip: "✅ Nếu sau 30 phút CEO chưa reply, Bot sẽ tự nhắc CEO giúp bạn",
  },
  {
    cmd: "/urgent",
    color: "red",
    title: "Báo việc khẩn cấp",
    desc: "Dùng khi có sự cố nghiêm trọng cần CEO xử lý ngay lập tức.",
    steps: [
      "Gõ /urgent → Mô tả tình huống",
      "Bot ping CEO ngay lập tức với độ ưu tiên cao",
    ],
    warning: "⚠️ Chỉ dùng khi thực sự khẩn cấp — lỗi nghiêm trọng, sự cố kỹ thuật...",
  },
  {
    cmd: "/help",
    color: "green",
    title: "Xem danh sách lệnh",
    desc: "Hiển thị tất cả lệnh bạn được phép dùng kèm mô tả ngắn trực tiếp trong Discord.",
    steps: [
      "Gõ /help trong DM Bot",
      "Bot liệt kê tất cả lệnh của bạn",
    ],
    tip: "✅ Dùng khi quên lệnh — Bot sẽ nhắc đúng lệnh bạn có quyền dùng",
  },
];

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
      {d.tip    && <div className={`text-xs rounded-xl p-2.5 ${c.tip}`}>{d.tip}</div>}
    </div>
  );
}

export default function TabTraoDoi({ selectedDept }: { selectedDept: string }) {
  void selectedDept;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {CARDS.map((d) => <Card key={d.cmd} d={d} />)}
    </div>
  );
}
