import { NextResponse } from 'next/server';

const GAS_URL = process.env.GOOGLE_APPS_SCRIPT_URL || '';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reportWeek = searchParams.get('report_week');

  if (!reportWeek) {
    return NextResponse.json({ error: 'Thiếu report_week trên URL' }, { status: 400 });
  }

  if (!GAS_URL) {
    return NextResponse.json({ error: 'Chưa cấu hình GOOGLE_APPS_SCRIPT_URL' }, { status: 500 });
  }

  try {
    const url = `${GAS_URL}?action=status&report_week=${encodeURIComponent(reportWeek)}`;
    console.log("Fetching status from GAS:", url);
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) throw new Error(data.error);

    return NextResponse.json({ submitted_names: data.submitted_names || [] });
  } catch (error: any) {
    console.error('🚨 Lỗi GET Apps Script [status]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
