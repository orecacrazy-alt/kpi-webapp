/**
 * Trang /result — NV xem kết quả KPI sau khi Sếp duyệt
 * -------------------------------------------------------
 * Vai trò: Hiển thị điểm KPI tuần + nhận xét của Sếp cho từng nhân viên.
 *
 * URL pattern: /result?name=...&report_week=...&token=...&discord_id=...
 * (Link được Bot gửi sau khi Sếp bấm Duyệt qua webhook Discord)
 *
 * Luồng:
 *   [Sếp bấm Duyệt trên Dashboard]
 *   → [GAS onEdit trigger gọi Discord Webhook]
 *   → [Bot DM cho NV link /result?...]
 *   → [NV mở → thấy điểm + nhận xét]
 */

"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// ───────────────────────────────────────────────
// TYPES
// ───────────────────────────────────────────────
interface TaskResult {
  noiDung: string;
  donVi: string;
  keHoach: number;
  thucHien: number;
  phanTram: string;
  trongSo: number;
  diemKPI: number;
  ghiChu: string;
  kpiType: string;
}

interface ResultData {
  name: string;
  dept: string;
  role: string;
  report_week: string;
  status: string;
  manager_comment: string;
  total_score: number;
  submitted_at: string;
  tasks: TaskResult[];
}

// ───────────────────────────────────────────────
// COMPONENT CHÍNH
// ───────────────────────────────────────────────
function ResultContent() {
  const searchParams = useSearchParams();
  const name       = searchParams.get("name") || "";
  const reportWeek = searchParams.get("report_week") || "";
  const discordId  = searchParams.get("discord_id") || "";
  const token      = searchParams.get("token") || "";

  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [data, setData]       = useState<ResultData | null>(null);

  useEffect(() => {
    if (!name || !reportWeek) {
      setError("Link không hợp lệ. Thiếu thông tin nhân viên hoặc tuần báo cáo.");
      setLoading(false);
      return;
    }
    fetch(
      `/api/result?name=${encodeURIComponent(name)}&report_week=${encodeURIComponent(reportWeek)}&discord_id=${encodeURIComponent(discordId)}&token=${encodeURIComponent(token)}`
    )
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError("Lỗi kết nối. Vui lòng thử lại!"))
      .finally(() => setLoading(false));
  }, [name, reportWeek, discordId, token]);

  // ── Loading ──────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
        <p className="text-gray-400 animate-pulse text-lg">⏳ Đang tải kết quả...</p>
      </div>
    );
  }

  // ── Error ────────────────────────────────────
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
        <div className="bg-white rounded-2xl shadow p-10 max-w-md text-center">
          <div className="text-5xl mb-4">😢</div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Không thể tải kết quả</h2>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // ── Màu trạng thái ──────────────────────────
  const statusStyle =
    data.status === "Đã duyệt"
      ? "bg-green-100 text-green-800 border border-green-400"
      : data.status === "Trả về"
      ? "bg-red-100 text-red-800 border border-red-400"
      : "bg-yellow-100 text-yellow-800 border border-yellow-400";

  const scoreColor =
    data.total_score >= 8
      ? "text-green-700"
      : data.total_score >= 5
      ? "text-yellow-600"
      : "text-red-600";

  const tasksToShow = data.tasks.filter((t) => t.kpiType === "Báo cáo thực hiện");

  // ── Render ───────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f0f4f8] text-black">
      {/* Header */}
      <div className="bg-[#1e3a5f] text-white px-6 py-6">
        <h1 className="text-2xl font-bold">📊 Kết Quả KPI Tuần</h1>
        <p className="text-blue-200 text-sm mt-1">
          {data.name} · {data.dept} · {data.report_week}
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Card tổng quan */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl font-bold">{data.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${statusStyle}`}>
                {data.status || "Chờ duyệt"}
              </span>
            </div>
            <p className="text-gray-500 text-sm">{data.role} · {data.dept}</p>
            <p className="text-gray-400 text-xs mt-1">Nộp lúc: {data.submitted_at}</p>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Tổng điểm KPI</div>
            <div className={`text-5xl font-bold ${scoreColor}`}>
              {data.total_score?.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 mt-1">điểm</div>
          </div>
        </div>

        {/* Nhận xét Sếp */}
        {data.manager_comment && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <p className="text-sm font-semibold text-blue-700 mb-2">💬 Nhận xét của Sếp</p>
            <p className="text-blue-900 text-sm whitespace-pre-line">{data.manager_comment}</p>
          </div>
        )}

        {/* Bảng chi tiết */}
        {tasksToShow.length > 0 && (
          <div className="bg-white rounded-2xl shadow overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-[#1e3a5f] text-white">
                <tr>
                  <th className="p-3 text-left">Đầu việc</th>
                  <th className="p-3 text-center w-16">KH</th>
                  <th className="p-3 text-center w-16">TH</th>
                  <th className="p-3 text-center w-20">% HT</th>
                  <th className="p-3 text-center w-16">Trọng số</th>
                  <th className="p-3 text-center w-20">Điểm</th>
                </tr>
              </thead>
              <tbody>
                {tasksToShow.map((t, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3 font-medium">{t.noiDung}</td>
                    <td className="p-3 text-center">{t.keHoach} {t.donVi}</td>
                    <td className="p-3 text-center font-bold">{t.thucHien}</td>
                    <td className="p-3 text-center text-green-700 font-bold">{t.phanTram}</td>
                    <td className="p-3 text-center">{t.trongSo}</td>
                    <td className="p-3 text-center font-bold text-[#1e3a5f]">
                      {Number(t.diemKPI).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#f0f4f8] font-bold">
                  <td colSpan={5} className="p-3 text-right">Tổng điểm KPI tuần:</td>
                  <td className={`p-3 text-center text-lg ${scoreColor}`}>
                    {data.total_score?.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        <p className="text-center text-gray-400 text-xs pb-4">
          IruKa Edu · Hệ thống KPI tự động · {data.report_week}
        </p>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
        <p className="text-gray-400 animate-pulse">Đang khởi tạo...</p>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
