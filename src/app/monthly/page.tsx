/**
 * Placeholder cho trang Báo cáo tháng
 */
"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function MonthlyContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Bạn chưa có Tên';
  const month = searchParams.get('month') || 'Tháng này';

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hướng dẫn sử dụng báo cáo (Scope 4) */}
      <div className="bg-indigo-50/50 border border-indigo-100 rounded-3xl p-8 mb-8 flex flex-col md:flex-row gap-6 items-start shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
        </div>
        <div className="space-y-3 flex-1">
          <h3 className="font-black text-slate-800 text-2xl tracking-tight">Hướng dẫn Báo Cáo Tháng</h3>
          <p className="text-slate-600 leading-relaxed max-w-4xl text-base">
            Báo cáo này là cơ sở quan trọng nhất để <strong className="text-indigo-700">tổng kết KPI tháng, tái ký hợp đồng và đánh giá năng lực toàn diện</strong>.<br/>
            Deadline nộp báo cáo tháng sẽ được thông báo cụ thể từ Bộ phận HR theo tính chất từng tháng.
          </p>
          <div className="pt-4 flex items-center gap-3">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest hidden sm:inline-block">Lệnh lấy Form:</span>
            <code className="bg-slate-800 text-fuchsia-400 px-3 py-1.5 rounded-lg text-sm font-mono shadow-md inline-flex items-center gap-1.5">
              <span className="text-slate-400 select-none">/</span>monthly
            </code>
          </div>
        </div>
      </div>

      {/* Khối nội dung Sắp ra mắt */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-12 text-center min-h-[40vh] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="text-7xl mb-6">🚧</div>
        <h1 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">Báo Cáo Tháng (Đang thi công)</h1>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto text-lg">
          Xin chào <strong className="text-indigo-600">{name}</strong>. Cổng báo cáo dữ liệu cho kỳ <strong className="text-indigo-600">{month}</strong> hiện đang được đội ngũ xây dựng.
        </p>
        <div className="text-sm text-indigo-700 bg-indigo-50 inline-block px-5 py-2.5 rounded-full font-medium border border-indigo-200/60">
          Tính năng này dự kiến sẽ có mặt trong phiên bản cập nhật IruKa v3.
        </div>
      </div>
    </div>
  );
}

export default function MonthlyReportPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Suspense fallback={<div className="p-12 text-center text-slate-400 font-bold tracking-widest uppercase mt-20">Đang tải nội dung...</div>}>
        <MonthlyContent />
      </Suspense>
    </div>
  );
}
