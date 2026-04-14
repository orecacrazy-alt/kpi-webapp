// ═══════════════════════════════════════════════════════════════════
// TabHrCeo — Tab "👑 Lệnh HR / CEO"
// Đồng bộ font size, left-bar, flex layout với TabBaoCao / TabXinPhep
// cmd-name: JetBrains Mono 16px/700 | cmd-title: 16px/700
// cmd-desc: 14px | cmd-steps: 14px | badge: 12px | warn/tip: 13px
// height: 100% + flex column để các card trong cùng row bằng nhau
// ═══════════════════════════════════════════════════════════════════

// ─── Kiểu dữ liệu ────────────────────────────────────────────────────────────
interface HrCmd {
  cmd:    string;
  access: string;           // "CEO · HR" | "CEO only" | ...
  color:  keyof typeof BAR;
  title:  string;
  desc:   string;
  steps:  string[];
  warning?: string;
  tip?:     string;
}

// ─── Left bar color (đồng bộ với các tab khác) ───────────────────────────────
const BAR: Record<string, string> = {
  navy:   "#1e3a5f",
  blue:   "#3b82f6",
  green:  "#10b981",
  red:    "#ef4444",
  purple: "#8b5cf6",
  amber:  "#f59e0b",
  teal:   "#14b8a6",
};

// ─── Step circle color ────────────────────────────────────────────────────────
const STEP_BG: Record<string, string> = {
  navy:   "#1e3a5f",
  blue:   "#3b82f6",
  green:  "#10b981",
  red:    "#ef4444",
  purple: "#8b5cf6",
  amber:  "#f59e0b",
  teal:   "#14b8a6",
};

// ─── CMD badge color ──────────────────────────────────────────────────────────
const CMD_BG: Record<string, { bg: string; color: string }> = {
  navy:   { bg: "#f1f5f9", color: "#1e3a5f" },
  blue:   { bg: "#dbeafe", color: "#1e40af" },
  green:  { bg: "#dcfce7", color: "#166534" },
  red:    { bg: "#fee2e2", color: "#991b1b" },
  purple: { bg: "#ede9fe", color: "#5b21b6" },
  amber:  { bg: "#fef3c7", color: "#92400e" },
  teal:   { bg: "#ccfbf1", color: "#0f766e" },
};

// ─── Warn / Tip box styles (đồng bộ với TabBaoCao) ───────────────────────────
const WARN_STYLE: React.CSSProperties = {
  background: "#fff7ed", border: "1px solid #fed7aa", color: "#9a3412",
  borderRadius: "8px", padding: "7px 10px", fontSize: "13px", fontWeight: 600,
  minHeight: "48px", display: "flex", alignItems: "center", gap: "6px", marginTop: "auto",
};
const TIP_STYLE: React.CSSProperties = {
  background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534",
  borderRadius: "8px", padding: "7px 10px", fontSize: "13px", fontWeight: 600,
  minHeight: "48px", display: "flex", alignItems: "center", gap: "6px", marginTop: "auto",
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

import React from "react";

// ─── Component phụ: một card ──────────────────────────────────────────────────
function HrCard({ d }: { d: HrCmd }) {
  const isCeoOnly = d.access === "CEO only";
  const cmdBg = CMD_BG[d.color];

  return (
    <div
      className="hover:-translate-y-0.5 hover:shadow-xl"
      style={{
        background: "#fff",
        borderRadius: "14px",
        border: "1.5px solid #e2e8f0",
        padding: "18px 20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",      // ← fill grid cell → bằng nhau trong cùng hàng
        transition: "all 0.2s",
      }}
    >
      {/* Left color bar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", borderRadius: "14px 0 0 14px", background: BAR[d.color] }} />

      {/* Nội dung — flex column để mt-auto hoạt động đúng */}
      <div style={{ paddingLeft: "8px", display: "flex", flexDirection: "column", flex: 1 }}>

        {/* cmd-header */}
        <div className="flex items-center justify-between mb-3" style={{ flexWrap: "wrap", gap: "6px" }}>
          {/* cmd-name: JetBrains Mono 16px/700 */}
          <code style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "16px",
            fontWeight: 700,
            background: cmdBg.bg,
            color: cmdBg.color,
            padding: "4px 10px",
            borderRadius: "7px",
            border: "1px solid #e2e8f0",
          }}>
            {d.cmd}
          </code>
          {/* access badge: 12px/700 */}
          <span style={{
            fontSize: "12px",
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: "20px",
            background: isCeoOnly ? "#fee2e2" : "#e0e7ff",
            color: isCeoOnly ? "#991b1b" : "#3730a3",
            textTransform: "uppercase",
            letterSpacing: "0.3px",
          }}>
            {d.access}
          </span>
        </div>

        {/* cmd-title: 16px/700 */}
        <p style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>{d.title}</p>

        {/* cmd-desc: 14px */}
        <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.5, marginBottom: "12px" }}>{d.desc}</p>

        {/* cmd-steps: 14px */}
        <div className="flex flex-col mb-4" style={{ gap: "5px" }}>
          {d.steps.map((s, i) => (
            <div key={i} className="flex items-start" style={{ gap: "8px", fontSize: "14px", color: "#374151" }}>
              <span
                className="shrink-0 flex items-center justify-center rounded-full"
                style={{ width: "20px", height: "20px", background: STEP_BG[d.color], color: "#fff", fontSize: "11px", fontWeight: 800, marginTop: "1px" }}
              >
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: s.replace(/(\/[\w]+)/g, "<b>$1</b>").replace(/@([\w]+)/g, "<b>@$1</b>") }} />
            </div>
          ))}
        </div>

        {/* cmd-warning: 13px/600, mt-auto đẩy xuống đáy */}
        {d.warning && <div style={WARN_STYLE}>{d.warning}</div>}
        {/* cmd-tip: 13px/600, mt-auto đẩy xuống đáy */}
        {d.tip     && <div style={TIP_STYLE}>{d.tip}</div>}
      </div>
    </div>
  );
}

// ─── Component chính ──────────────────────────────────────────────────────────
export default function TabHrCeo({ selectedDept }: { selectedDept: string }) {
  void selectedDept;
  return (
    <div>
      {/* Banner cảnh báo quyền hạn */}
      <div className="flex items-center gap-3 rounded-2xl px-5 py-4 mb-5" style={{
        background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
      }}>
        <span style={{ fontSize: "24px" }}>👑</span>
        <div>
          {/* Banner title: 16px/700 */}
          <p style={{ color: "#fff", fontWeight: 700, fontSize: "16px" }}>Khu vực quản lý HR &amp; CEO</p>
          {/* Banner sub: 14px */}
          <p style={{ color: "#93c5fd", fontSize: "14px", marginTop: "2px" }}>Các lệnh bên dưới chỉ dành cho CEO và HR — nhân viên thường không có quyền sử dụng.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" style={{ gap: "14px" }}>
        {CMDS.map((d) => <HrCard key={d.cmd} d={d} />)}
      </div>
    </div>
  );
}
