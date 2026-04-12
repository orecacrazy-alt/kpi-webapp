/**
 * /api/result — GET
 * -----------------
 * Vai trò: Lấy kết quả KPI + nhận xét Sếp cho trang /result của NV.
 * Verify token HMAC trước khi trả data (giống /api/kpi).
 *
 * Query params: name, report_week, discord_id, token
 * Trả về: { name, dept, role, report_week, status, manager_comment, total_score, tasks[] }
 */

import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

const GAS_URL = process.env.GOOGLE_APPS_SCRIPT_URL || '';

// Verify token — cùng thuật toán với Bot và /api/kpi
function verifyToken(token: string, discordId: string, weekNum: number): boolean {
  const secret = process.env.KPI_TOKEN_SECRET || 'iruka-kpi-secret-default-change-me';
  const curWindow = Math.floor(Date.now() / (72 * 3600 * 1000));
  for (const w of [curWindow, curWindow - 1]) {
    const expected = createHmac('sha256', secret)
      .update(`${discordId}:${weekNum}:${w}`)
      .digest('hex');
    if (token === expected) return true;
  }
  return false;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name       = searchParams.get('name');
  const reportWeek = searchParams.get('report_week');
  const discordId  = searchParams.get('discord_id') || '';
  const token      = searchParams.get('token') || '';

  if (!name || !reportWeek) {
    return NextResponse.json({ error: 'Thiếu name hoặc report_week' }, { status: 400 });
  }

  // Verify token nếu có
  if (discordId && token) {
    const weekNum = parseInt(reportWeek.replace('Tuần ', '').trim());
    if (!verifyToken(token, discordId, weekNum)) {
      return NextResponse.json(
        { error: 'Link không hợp lệ hoặc đã hết hạn (72h). Vui lòng liên hệ Sếp để nhận link mới.' },
        { status: 403 }
      );
    }
  }

  if (!GAS_URL) {
    return NextResponse.json({ error: 'Chưa cấu hình GOOGLE_APPS_SCRIPT_URL' }, { status: 500 });
  }

  try {
    // Gọi GAS action=result để lấy chi tiết báo cáo
    const url = `${GAS_URL}?action=result&name=${encodeURIComponent(name)}&report_week=${encodeURIComponent(reportWeek)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) throw new Error(data.error);

    return NextResponse.json(data);
  } catch (err: any) {
    console.error('🚨 Lỗi GET /api/result:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
