import Link from 'next/link';
import { Terminal, CalendarPlus, FileSpreadsheet, FileBarChart, AlertTriangle, ArrowRight, BookOpenCheck } from 'lucide-react';

export default function Home() {
  const currentDate = new Date().toLocaleDateString('vi-VN', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* ── Khối 1: Hero Welcome ── */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-2">
          Xin chào, Thành viên IruKa 👋
        </h1>
        <p className="text-slate-500 text-base md:text-lg">
          Hôm nay là {currentDate}. Chúc bạn một ngày làm việc năng suất!
        </p>
      </div>

      {/* ── Khối 2: Status Banners (Vibe Dashboard) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
          <BookOpenCheck className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-500" />
          <div className="relative z-10">
            <h3 className="font-bold text-xl mb-1">Cẩm nang Làm việc</h3>
            <p className="text-blue-100 text-sm mb-4 max-w-[80%]">Quy định công ty, văn hóa IruKa và các quy trình xử lý công việc chuẩn.</p>
            <Link href="/rules" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-colors backdrop-blur-sm">
              Đọc quy định <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm flex flex-col justify-center">
          <h3 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" /> Deadline Quan Trọng
          </h3>
          <ul className="space-y-3 mt-2">
            <li className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
              <span className="text-slate-600 font-medium">Báo cáo Standup Daily</span>
              <span className="text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded-md">Trước 09:00 sáng</span>
            </li>
            <li className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
              <span className="text-slate-600 font-medium">Báo cáo KPI Tuần</span>
              <span className="text-rose-600 font-bold bg-rose-50 px-2 py-1 rounded-md">24:00 Chủ Nhật</span>
            </li>
            <li className="flex justify-between items-center text-sm/2">
              <span className="text-slate-600 font-medium">Báo cáo KPI Tháng</span>
              <span className="text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded-md">Ngày cuối tháng</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
         <h2 className="text-2xl font-bold text-slate-800">📋 Danh sách Lệnh Discord Bot</h2>
      </div>

      {/* ── Khối 3: Command Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 pb-20">
        
        {/* Card 1: /standup */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 group hover:border-amber-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
              <Terminal size={26} strokeWidth={2.5} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="bg-slate-100 text-slate-700 font-mono text-sm font-bold px-2.5 py-1 rounded-lg border border-slate-200">/standup</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Báo cáo hàng ngày</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">Gõ lệnh này trên Discord vào mỗi buổi sáng để báo cáo tiến độ công việc hôm qua và dự định hôm nay.</p>
              
              <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800 font-medium">
                ⚠️ Cảnh báo: Quên nộp trước 09:00 sáng sẽ bị phạt đóng quỹ 50K!
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: /weekly */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 group hover:border-blue-200 relative overflow-hidden">
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-sm">
              <FileSpreadsheet size={26} strokeWidth={2.5} />
            </div>
            <div className="w-full">
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="bg-slate-100 text-slate-700 font-mono text-sm font-bold px-2.5 py-1 rounded-lg border border-slate-200">/weekly</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Form Báo cáo KPI Tuần</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">Lệnh này giúp bạn lấy đường link bảo mật cá nhân để truy cập vào hệ thống điền dữ liệu Kế hoạch Tuần.</p>
              
              <Link href="/weekly" className="flex items-center justify-center gap-2 w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-2.5 rounded-xl transition-colors text-sm">
                Đến Form Báo Tuần (Dự phòng) <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Card 3: /monthly */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 group hover:border-purple-200 relative overflow-hidden">
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 shadow-sm">
              <FileBarChart size={26} strokeWidth={2.5} />
            </div>
            <div className="w-full">
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="bg-slate-100 text-slate-700 font-mono text-sm font-bold px-2.5 py-1 rounded-lg border border-slate-200">/monthly</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Form Báo cáo Tháng</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">Dùng vào dịp cuối tháng để tổng kết điểm nhấn, nhận xét tự thân và thiết lập mục tiêu tháng tiếp theo.</p>
              
              <Link href="/monthly" className="flex items-center justify-center gap-2 w-full bg-purple-50 hover:bg-purple-100 text-purple-600 font-bold py-2.5 rounded-xl transition-colors text-sm">
                Đến Form Báo Tháng (Dự phòng) <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Card 4: /leave_create */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 group hover:border-rose-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 shadow-sm">
              <CalendarPlus size={26} strokeWidth={2.5} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="bg-slate-100 text-slate-700 font-mono text-sm font-bold px-2.5 py-1 rounded-lg border border-slate-200">/leave_create</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Xin nghỉ phép</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">Tạo đơn xin nghỉ phép (Có lương/Không lương), báo nghỉ ốm, đi trễ, về sớm. Leader và HR sẽ duyệt ngay trên luồng.</p>
              
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-600 font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span> Lưu ý báo trước theo đúng nội quy.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
