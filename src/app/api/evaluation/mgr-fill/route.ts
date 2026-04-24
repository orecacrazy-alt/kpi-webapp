/**
 * API: GET + POST /api/evaluation/mgr-fill
 * ------------------------------------------
 * Vai trò: Quản lý điền công việc đã giao + tiêu chí đánh giá cho NV.
 *
 * Luồng:
 *  GET  → Lấy phiếu (thông tin chung HR đã điền + tiêu chí mẫu nếu có)
 *  POST → Quản lý submit đầu việc + tiêu chí → GAS lưu + Bot gửi NV (CC HR)
 *
 * Auth: HMAC-SHA256 token cá nhân hóa (discord_id + eval_id + 72h window)
 *       Token được Discord Bot tạo và đính kèm trong link gửi cho Quản lý.
 *       Thay thế DASHBOARD_PASSWORD cũ — cá nhân hóa, hết hạn sau 72h.
 */

import { NextResponse } from 'next/server';
import { verifyEvalToken } from '../_utils/verifyEvalToken';

const GAS_EVAL_URL = process.env.GOOGLE_APPS_SCRIPT_EVALUATION_URL || '';

// ── GET: Lấy thông tin phiếu để Quản lý xem và điền ──────────────
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const evalId    = searchParams.get('id');
  const discordId = searchParams.get('discord_id');
  const token     = searchParams.get('token');

  // Xác thực HMAC token cá nhân hóa
  if (!evalId || !discordId || !token) {
    return NextResponse.json({ error: 'Thiếu thông tin xác thực (id, discord_id, token)' }, { status: 400 });
  }
  if (!verifyEvalToken(token, discordId, evalId)) {
    return NextResponse.json(
      { error: 'Link không hợp lệ hoặc đã hết hạn (72h). Vui lòng liên hệ HR để lấy link mới.' },
      { status: 403 }
    );
  }

  if (!GAS_EVAL_URL) {
    return NextResponse.json({ error: 'Chưa cấu hình GOOGLE_APPS_SCRIPT_EVALUATION_URL' }, { status: 500 });
  }

  try {
    const url      = `${GAS_EVAL_URL}?action=get_evaluation&eval_id=${encodeURIComponent(evalId)}`;
    const response = await fetch(url);
    const data     = await response.json();
    if (data.error) throw new Error(data.error);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('🚨 Lỗi GET phiếu đánh giá (mgr-fill):', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ── POST: Quản lý submit đầu việc + tiêu chí ─────────────────────
export async function POST(request: Request) {
  if (!GAS_EVAL_URL) {
    return NextResponse.json({ error: 'Chưa cấu hình GOOGLE_APPS_SCRIPT_EVALUATION_URL' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { eval_id, discord_id, token } = body;

    // Xác thực HMAC token cá nhân hóa
    if (!eval_id || !discord_id || !token) {
      return NextResponse.json({ error: 'Thiếu thông tin xác thực (eval_id, discord_id, token)' }, { status: 400 });
    }
    if (!verifyEvalToken(token, discord_id, eval_id)) {
      return NextResponse.json({ error: 'Token không hợp lệ hoặc đã hết hạn' }, { status: 403 });
    }

    // Phải có ít nhất 1 tiêu chí
    if (!body.criteria || body.criteria.length === 0) {
      return NextResponse.json({ error: 'Phải điền ít nhất 1 tiêu chí đánh giá' }, { status: 400 });
    }

    // Gửi GAS: lưu đầu việc + tiêu chí + chuyển status MGR_PENDING → NV_PENDING
    // GAS sẽ tự trigger Bot: gửi link NV + CC HR
    const response = await fetch(GAS_EVAL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'mgr_fill', // GAS phân biệt hành động
        ...body,
        status: 'NV_PENDING',
      }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('🚨 Lỗi Quản lý điền đầu việc:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
