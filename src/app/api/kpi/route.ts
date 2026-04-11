import { NextResponse } from 'next/server';
import { getSheetsClient } from '@/lib/googleSheets';

const SHEET_ID = process.env.GOOGLE_KPI_SHEET_ID;
const DATA_RANGE = 'Data!A:L'; // A đến L

// Cấu trúc Data Google Sheets (Cột được đánh index từ 0):
// 0: ID | 1: Timestamp | 2: Tên Nhân Viên | 3: Tuần lập
// 4: Nội dung CV | 5: Ghi chú | 6: Đơn vị
// 7: Kế hoạch | 8: Trọng số | 9: Yêu cầu
// 10: Thực hiện | 11: Trạng thái ("Chờ Báo Cáo" / "Đã Báo Cáo")

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const reportWeek = searchParams.get('report_week');

  if (!name || !reportWeek) {
    return NextResponse.json({ error: 'Thiếu name hoặc report_week trên URL' }, { status: 400 });
  }

  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: DATA_RANGE,
    });

    const rows = response.data.values || [];
    const pendingTasks = [];
    
    // Lặp qua dữ liệu, bỏ qua hàng 0 (Tiêu đề cột)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const rowId = row[0];
      const rowName = row[2];
      const rowWeek = row[3];
      const rowStatus = row[11];

      // Tìm đúng người, đúng tuần trước, và chưa báo cáo
      if (rowName === name && rowWeek === reportWeek && rowStatus === 'Chờ Báo Cáo') {
        pendingTasks.push({
          id: rowId,
          noiDung: row[4] || '',
          ghiChu: row[5] || '',
          donVi: row[6] || '',
          keHoach: parseFloat(row[7]) || 1,
          trongSo: parseFloat(row[8]) || 1,
          yeuCau: parseFloat(row[9]) || 1,
          thucHien: null, 
          isNhiemVuCu: true,
          _rowIndex: i + 1 // Lưu vị trí hàng để cập nhật đè (Sheet chạy index từ 1)
        });
      }
    }

    return NextResponse.json({ tasks: pendingTasks });
  } catch (error: any) {
    console.error('🚨 Lỗi GET Google Sheets:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, plan_week, tasksToUpdate, tasksToInsert } = body;

    const sheets = await getSheetsClient();

    // 1. Cập nhật Số liệu Thực hiện vào nợ cũ (Batch Update nhiều dòng)
    if (tasksToUpdate && tasksToUpdate.length > 0) {
      const dataToUpdate = tasksToUpdate.map((t: any) => ({
        range: `Data!K${t._rowIndex}:L${t._rowIndex}`, // K=Thực hiện, L=Trạng thái
        values: [[t.thucHien, 'Đã Báo Cáo']]
      }));

      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: SHEET_ID,
        requestBody: {
          valueInputOption: 'USER_ENTERED',
          data: dataToUpdate
        }
      });
    }

    // 2. Chèn Hàng Mới (Insert/Append) xuống Đáy Sheet
    if (tasksToInsert && tasksToInsert.length > 0) {
      const timestamp = new Date().toISOString();
      const insertRows = tasksToInsert.map((t: any) => [
        t.id, // A
        timestamp, // B
        name, // C
        plan_week, // D
        t.noiDung, // E
        t.ghiChu, // F
        t.donVi, // G
        t.keHoach, // H
        t.trongSo, // I
        t.yeuCau, // J
        '', // K: Thực hiện (trống)
        'Chờ Báo Cáo' // L: Trạng thái (Gieo mầm tuần mới)
      ]);

      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: 'Data!A:L',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: insertRows
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('🚨 Lỗi POST Google Sheets:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
