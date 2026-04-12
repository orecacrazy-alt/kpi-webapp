import { NextResponse } from 'next/server';

// Tạm biệt Google API rườm rà. Lấy URL của Apps Script từ biến môi trường
const GAS_URL = process.env.GOOGLE_APPS_SCRIPT_URL || '';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const reportWeek = searchParams.get('report_week');
  const planWeek = searchParams.get('plan_week'); // Tuần kế hoạch đã nộp (dùng để load lại khi sửa)

  if (!name || !reportWeek) {
    return NextResponse.json({ error: 'Thiếu name hoặc report_week trên URL' }, { status: 400 });
  }

  if (!GAS_URL) {
    return NextResponse.json({ error: 'Chưa cấu hình GOOGLE_APPS_SCRIPT_URL' }, { status: 500 });
  }

  try {
    // Query cả 2: nhiệm vụ cũ (plan_week=report_week) + kế hoạch đã nộp tuần này (plan_week=planWeek)
    let url = `${GAS_URL}?name=${encodeURIComponent(name)}&report_week=${encodeURIComponent(reportWeek)}`;
    if (planWeek) url += `&plan_week=${encodeURIComponent(planWeek)}`;
    console.log("Fetching from GAS:", url);
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) throw new Error(data.error);

    return NextResponse.json({
      tasks: data.tasks || [],
      planTasks: data.planTasks || [], // Kế hoạch đã nộp tuần này (pre-fill Phân vùng 2)
    });
  } catch (error: any) {
    console.error('🚨 Lỗi GET Apps Script:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!GAS_URL) {
    return NextResponse.json({ error: 'Chưa cấu hình GOOGLE_APPS_SCRIPT_URL' }, { status: 500 });
  }

  try {
    const body = await request.json();

    // Để tránh lỗi Redirect 302 của Apps Script, ta cho server Next.js bắn fetch trực tiếp
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
         // Yêu cầu bắt buộc Content-Type text/plain hoặc application/json khi gọi qua GAS
         'Content-Type': 'application/json' 
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('🚨 Lỗi POST Apps Script:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
