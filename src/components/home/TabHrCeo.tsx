// ═══════════════════════════════════════════════════════════════════
// TabHrCeo — Tab "👑 Lệnh HR / CEO"
// Hiển thị toàn bộ 12 lệnh quản lý nội bộ
// Chỉ CEO và HR có quyền dùng các lệnh này
// ═══════════════════════════════════════════════════════════════════

// ─── Kiểu dữ liệu ────────────────────────────────────────────────────────────
interface HrCmd {
  cmd:    string;
  access: string;           // "CEO · HR" | "CEO only" | ...
  color:  keyof typeof C;
  title:  string;
  desc:   string;
  steps:  string[];
  warning?: string;
  tip?:     string;
}

// ─── Bảng màu ─────────────────────────────────────────────────────────────────
const C = {
  navy:   { border:"border-slate-300",  cmd:"text-slate-700 bg-slate-100",   step:"bg-slate-600",   warn:"bg-amber-50 border-amber-200 text-amber-800",tip:"bg-slate-50 text-slate-600"   },
  blue:   { border:"border-blue-200",   cmd:"text-blue-700 bg-blue-100",     step:"bg-blue-500",    warn:"bg-amber-50 border-amber-200 text-amber-800",tip:"bg-blue-50 text-blue-700"    },
  green:  { border:"border-emerald-200",cmd:"text-emerald-700 bg-emerald-100",step:"bg-emerald-500",warn:"bg-amber-50 border-amber-200 text-amber-800",tip:"bg-emerald-50 text-emerald-700"},
  red:    { border:"border-red-200",    cmd:"text-red-700 bg-red-100",       step:"bg-red-500",     warn:"bg-red-50 border-red-200 text-red-800",     tip:"bg-red-50 text-red-700"      },
  purple: { border:"border-purple-200", cmd:"text-purple-700 bg-purple-100", step:"bg-purple-500",  warn:"bg-amber-50 border-amber-200 text-amber-800",tip:"bg-purple-50 text-purple-700"},
  amber:  { border:"border-amber-200",  cmd:"text-amber-700 bg-amber-100",   step:"bg-amber-500",   warn:"bg-amber-50 border-amber-200 text-amber-800",tip:"bg-amber-50 text-amber-700" },
  teal:   { border:"border-teal-200",   cmd:"text-teal-700 bg-teal-100",     step:"bg-teal-500",    warn:"bg-amber-50 border-amber-200 text-amber-800",tip:"bg-teal-50 text-teal-700"   },
};

// ─── Dữ liệu 12 lệnh ─────────────────────────────────────────────────────────
const CMDS: HrCmd[] = [
  {
    cmd: "/staff", access: "CEO · HR", color: "navy",
    title: "Quản lý nhân viên",
    desc: "Thêm, sửa, xóa và tra cứu thông tin nhân viên. Mọi thay đổi lưu vào cơ sở dữ liệu nhân sự.",
    steps: ["/staff add @user — Thêm nhân viên mới (họ tên, phòng ban, loại HĐ, GitHub)","/staff update @user — Cập nhật thông tin nhân viên","/staff remove @user — Đánh dấu nhân viên nghỉ việc (inactive)","/staff restore @user — Kích hoạt lại nhân viên cũ","/staff list — Xem toàn bộ danh sách theo phòng ban","/staff info @user — Xem chi tiết 1 nhân viên cụ thể"],
    tip: "✅ Dùng trong kênh server, không dùng trong DM. Bot tự đồng bộ Discord Role sau khi thêm/sửa.",
  },
  {
    cmd: "/dept", access: "CEO · HR", color: "blue",
    title: "Quản lý phòng ban",
    desc: "Thêm mới, đổi tên, xóa và liệt kê phòng ban. Khi đổi tên, Bot tự cập nhật luôn cho tất cả nhân viên thuộc phòng đó.",
    steps: ["/dept add — Thêm phòng ban mới (tên + emoji + mô tả)","/dept rename [tên] — Đổi tên phòng ban, tự cập nhật hết nhân viên","/dept remove [tên] — Xóa phòng ban (chỉ xóa khi không còn nhân viên active)","/dept list — Xem danh sách phòng ban + số nhân viên"],
    warning: "⚠️ Không thể xóa phòng ban còn nhân viên active — phải chuyển sang phòng khác bằng /staff update trước",
  },
  {
    cmd: "/approve", access: "CEO only", color: "green",
    title: "Duyệt đơn xin phép",
    desc: "Xem danh sách đơn đang chờ duyệt (nghỉ phép / đi muộn / về sớm) và duyệt theo ID. Bot tự DM thông báo đến nhân viên.",
    steps: ["Gõ /approve (không nhập ID) → Bot liệt kê tất cả đơn đang chờ kèm ID","Gõ /approve request_id:[ID] → Duyệt đơn theo ID","Bot tự DM \"Đơn đã được duyệt\" về nhân viên"],
    tip: "✅ Có thể duyệt nhanh ngay trên DM Bot bằng nút ✅ Duyệt — không cần gõ lệnh",
  },
  {
    cmd: "/reject", access: "CEO only", color: "red",
    title: "Từ chối đơn xin phép",
    desc: "Từ chối đơn nghỉ phép / đi muộn / về sớm với lý do cụ thể. Bot DM thông báo ngay đến nhân viên.",
    steps: ["Gõ /reject → Bot liệt kê đơn đang chờ","Chọn đơn → Nhập lý do từ chối","Bot gửi thông báo ❌ + lý do về nhân viên"],
    tip: "✅ Luôn điền lý do rõ ràng để nhân viên hiểu và không đặt câu hỏi lại",
  },
  {
    cmd: "/meeting", access: "CEO · HR", color: "purple",
    title: "Book lịch họp",
    desc: "Tạo lịch họp và gửi thông báo tự động đến tất cả người được mời. Bot nhắc lại 15 phút trước giờ họp.",
    steps: ["Gõ /meeting → Điền tiêu đề + thời gian + địa điểm + người tham dự","Bot DM từng người được mời thông báo lịch","15 phút trước giờ họp — Bot tự nhắc lại"],
    tip: "✅ Tự động nhắc 15 phút trước — không cần nhắc thủ công",
  },
  {
    cmd: "/broadcast", access: "CEO · HR", color: "amber",
    title: "Gửi thông báo toàn team",
    desc: "Gửi thông báo hàng loạt đến tất cả nhân viên hoặc theo phòng ban qua DM riêng tư.",
    steps: ["Gõ /broadcast → Chọn đối tượng (Tất cả / Phòng ban cụ thể)","Nhập nội dung thông báo","Bot DM riêng đến từng người — kèm tên CEO ký"],
    tip: "✅ Trong DM Bot: @all [nội dung] gửi kênh công cộng + DM tất cả | @all-dm chỉ DM riêng",
  },
  {
    cmd: "/remind", access: "CEO · HR", color: "teal",
    title: "Đặt lịch nhắc nhở",
    desc: "Gửi nhắc nhở đến nhân viên hoặc bộ phận vào giờ được chọn. Bot tự DM đúng giờ.",
    steps: ["Gõ /remind → Chọn người nhận + thời gian + nội dung","Bot lưu lịch và tự DM đúng giờ","Trong DM Bot: @nhắc @username [thứ/giờ] [nội dung]"],
    tip: "✅ @nhắc danh sách — xem tất cả lịch nhắc đang chạy | @nhắc hủy [ID] — hủy lịch",
  },
  {
    cmd: "/onboard", access: "CEO · HR", color: "green",
    title: "Onboarding nhân viên mới",
    desc: "Gửi checklist onboarding tự động đến nhân viên mới và lưu thông tin vào hệ thống.",
    steps: ["Gõ /onboard → Điền username Discord + bộ phận + loại hợp đồng","Bot DM nhân viên mới với checklist onboarding","Thông tin được tự động lưu vào hệ thống nhân sự"],
    tip: "✅ Sử dụng ngay khi nhân viên mới join Discord server",
  },
  {
    cmd: "/comment", access: "CEO · HR", color: "blue",
    title: "Phản hồi báo cáo nhân viên",
    desc: "Gửi nhận xét/phản hồi về báo cáo của một nhân viên cụ thể qua Bot một cách trang trọng.",
    steps: ["Gõ /comment → Chọn nhân viên từ danh sách","Nhập nội dung nhận xét","Bot DM phản hồi có tên CEO ký đến nhân viên"],
    tip: "✅ Thay thế cho việc reply trực tiếp — có lưu lịch sử",
  },
  {
    cmd: "/standup", access: "CEO · HR", color: "navy",
    title: "Quản lý standup (Admin)",
    desc: "Xem, tổng hợp và quản lý báo cáo standup của toàn team theo quyền Admin.",
    steps: ["/standup list — Xem tất cả standup hôm nay của từng người","/standup check — Kiểm tra ai đã/chưa nộp (tất cả NV dùng được)","/standup git — Khai báo git push trước khi về (tất cả NV dùng được)","/standup dm — Gửi toàn bộ báo cáo /daily hôm nay vào DM CEO"],
    tip: "✅ /standup check và /standup git ai cũng dùng được, 2 lệnh còn lại cần quyền HR/CEO",
  },
  {
    cmd: "/assign", access: "CEO only", color: "amber",
    title: "Giao task có cấu trúc",
    desc: "Giao việc cho nhân viên với đầy đủ thông tin: tên task, deadline, độ ưu tiên. Bot lưu và theo dõi trạng thái.",
    steps: ["Gõ /assign → Chọn nhân viên từ danh sách autocomplete","Điền: Tên task · Deadline · Độ ưu tiên","Bot DM giao việc đến nhân viên + lưu vào hệ thống theo dõi"],
    tip: "✅ Dùng task @username trong DM Bot để xem tất cả task đã giao + trạng thái",
  },
  {
    cmd: "@poll", access: "CEO only", color: "purple",
    title: "Khảo sát nhanh toàn team",
    desc: "Tạo poll gửi đến tất cả nhân viên qua DM. Bot tự tổng hợp kết quả sau 24h và báo về CEO.",
    steps: ["Trong DM Bot, gõ: @poll [Câu hỏi] | [Lựa chọn 1] | [Lựa chọn 2]","Bot gửi poll đến toàn bộ nhân viên","Bot tổng hợp + gửi kết quả về CEO sau 24h"],
    tip: "✅ VD: @poll Giờ họp nào tiện? | Thứ 2 9h | Thứ 4 10h | Thứ 6 14h",
  },
];

// ─── Component phụ: một card ──────────────────────────────────────────────────
function HrCard({ d }: { d: HrCmd }) {
  const c = C[d.color];
  const isCeoOnly = d.access === "CEO only";
  return (
    <div className={`rounded-2xl border ${c.border} bg-white shadow-sm hover:shadow-md transition-shadow p-5`}>
      <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
        <code className={`text-sm font-bold px-2.5 py-1 rounded-lg ${c.cmd}`}>{d.cmd}</code>
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
          isCeoOnly ? "bg-rose-100 text-rose-700" : "bg-indigo-100 text-indigo-700"
        }`}>
          {d.access}
        </span>
      </div>
      <p className="font-bold text-slate-800 mb-1">{d.title}</p>
      <p className="text-sm text-slate-500 mb-3 leading-relaxed">{d.desc}</p>
      <div className="space-y-1.5 mb-3">
        {d.steps.map((s, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
            <span className={`shrink-0 w-5 h-5 rounded-full ${c.step} text-white text-[10px] font-black flex items-center justify-center mt-0.5`}>{i + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: s.replace(/\/([\w]+)/g, '<b>/$1</b>').replace(/@([\w]+)/g, '<b>@$1</b>') }} />
          </div>
        ))}
      </div>
      {d.warning && <div className={`text-xs rounded-xl p-2.5 border mb-2 ${c.warn}`}>{d.warning}</div>}
      {d.tip     && <div className={`text-xs rounded-xl p-2.5 ${c.tip}`}>{d.tip}</div>}
    </div>
  );
}

// ─── Component chính ──────────────────────────────────────────────────────────
export default function TabHrCeo({ selectedDept }: { selectedDept: string }) {
  void selectedDept;
  return (
    <div>
      {/* Banner cảnh báo quyền hạn */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-slate-800 to-blue-700 rounded-2xl px-5 py-4 mb-5">
        <span className="text-2xl">👑</span>
        <div>
          <p className="text-white font-bold text-sm">Khu vực quản lý HR &amp; CEO</p>
          <p className="text-blue-200 text-xs">Các lệnh bên dưới chỉ dành cho CEO và HR — nhân viên thường không có quyền sử dụng.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {CMDS.map((d) => <HrCard key={d.cmd} d={d} />)}
      </div>
    </div>
  );
}
