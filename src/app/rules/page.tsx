import { BookOpen, Clock, FileCheck, Banknote, CalendarMinus } from 'lucide-react';

export default function RulesPage() {
  return (
    <div className="min-h-screen p-6 md:p-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3 mb-3">
          <BookOpen className="text-blue-600" size={36} />
          Sổ tay Văn hóa & Quy định
        </h1>
        <p className="text-slate-500 text-base md:text-lg">
          Tài liệu chuẩn mực giúp mọi thành viên IruKa nắm bắt luật chơi chung, duy trì sự chủ động và kỷ luật trong công việc.
        </p>
      </div>

      {/* Danh sách các Quy định */}
      <div className="space-y-8 pb-20">
        
        {/* Section 1 */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Clock size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">1. Quy định Báo cáo Hàng ngày (Standup)</h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p><strong>Mục đích:</strong> Ghi nhận nỗ lực làm việc của ngày hôm trước và thiết lập mục tiêu cho ngày hôm nay, giúp cá nhân tập trung và team dễ theo dõi.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Sử dụng lệnh <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200">/standup</code> trên Discord vào mỗi buổi sáng.
              </li>
              <li>
                <strong>Deadline nộp:</strong> Trước <span className="text-amber-600 font-bold">09:00 sáng</span> mỗi ngày làm việc.
              </li>
              <li>Điền ngắn gọn, đúng trọng tâm công việc, không báo cáo chung chung.</li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <FileCheck size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">2. Quy định Báo cáo KPI Tuần & Tháng</h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p><strong>Mục đích:</strong> Đánh giá mức độ hoàn thành tiến độ dự án, tỷ lệ đạt KPI và là căn cứ xét thưởng/duyệt lương.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Báo cáo Tuần:</strong> Dùng lệnh <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200">/weekly</code>. Bắt buộc nộp trước <strong className="text-rose-600">24:00 Chủ Nhật</strong> hàng tuần. Chấp nhận nộp sớm vào chiều Thứ 7.
              </li>
              <li>
                <strong>Báo cáo Tháng:</strong> Dùng lệnh <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200">/monthly</code>. Để tổng kết thành tựu, thất bại và set KPI tháng sau.
              </li>
              <li>Dữ liệu nộp xong sẽ không được tự ý sửa đổi khi đã quá hạn báo cáo (Trừ khi có yêu cầu đặc biệt từ CEO).</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <CalendarMinus size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">3. Chính sách Xin Nghỉ Phép & Vắng Mặt</h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>Mọi hình thức vắng mặt (Nghỉ ốm, nghỉ phép, đi trễ, về sớm) đều phải được tạo lệnh hợp lệ trên hệ thống.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Tạo Đơn từ bằng lệnh <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200">/leave_create</code> trên Discord.
              </li>
              <li>
                <strong>Nghỉ có dự định:</strong> Phải báo trước ít nhất 24 tiếng.
              </li>
              <li>
                <strong>Nghỉ đột xuất (Ốm đau):</strong> Phải báo cho Quản lý trước giờ vào làm ít nhất 30 phút.
              </li>
              <li>Nghỉ phép không báo trước bị coi là tự ý nghỉ việc không phép, phạt quy đổi ngày công.</li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-slate-50 rounded-3xl p-8 border border-slate-300 shadow-inner">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-600 flex items-center justify-center">
              <Banknote size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">4. Chế tài Hậu Kiểm & Đóng Quỹ</h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p className="font-medium text-slate-700">Công ty có chính sách xây dựng quỹ liên hoan team từ các vi phạm nội quy nhỏ nhằm khích lệ tinh thần tự giác thay vì phạt thẳng vào lương cứng:</p>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="py-3 px-4 border-b border-slate-200 font-semibold text-slate-700">Hành vi vi phạm</th>
                    <th className="py-3 px-4 border-b border-slate-200 font-semibold text-slate-700">Mức đóng quỹ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4">Quên báo cáo Standup buổi sáng</td>
                    <td className="py-3 px-4 text-rose-600 font-bold">50.000 VNĐ / lần</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Không nộp / Nộp trễ Báo cáo Tuần</td>
                    <td className="py-3 px-4 text-rose-600 font-bold">100.000 VNĐ / lần</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Đi muộn không báo trước</td>
                    <td className="py-3 px-4 text-amber-600 font-bold">50.000 VNĐ / lần</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 italic mt-3">* Các số liệu trên có thể được CEO tuỳ chỉnh lại tùy thuộc quy mô nhân sự.</p>
          </div>
        </section>

      </div>
    </div>
  );
}
