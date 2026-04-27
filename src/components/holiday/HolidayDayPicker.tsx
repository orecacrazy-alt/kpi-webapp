/**
 * HolidayDayPicker.tsx — Date range picker cho form đề xuất ngày nghỉ
 *
 * UX: Click chọn ngày bắt đầu → click ngày thứ 2 chọn kết thúc.
 *     Click lại lần 3 → reset về chọn start mới.
 *     Hiển thị tháng calendar visual, có nút prev/next.
 */

'use client';

import React, { useState } from 'react';

type Props = {
  startDate: string | null;  // YYYY-MM-DD
  endDate: string | null;
  onChange: (start: string, end: string) => void;
};

const VN_DOW = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const VN_MONTHS = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];

function pad(n: number) { return String(n).padStart(2, '0'); }
function toDateStr(y: number, m: number, d: number) { return `${y}-${pad(m + 1)}-${pad(d)}`; }
function isWeekend(y: number, m: number, d: number) {
  const dow = new Date(y, m, d).getDay();
  return dow === 0 || dow === 6;
}

export default function HolidayDayPicker({ startDate, endDate, onChange }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  function handlePickDate(dateStr: string) {
    // Lần 1 hoặc lần 3+ → reset, chọn start mới
    if (!startDate || (startDate && endDate)) {
      onChange(dateStr, '');
      return;
    }
    // Lần 2 → chọn end (đảm bảo end >= start)
    if (dateStr < startDate) {
      onChange(dateStr, startDate);
    } else {
      onChange(startDate, dateStr);
    }
  }

  function nav(delta: number) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setViewYear(y);
    setViewMonth(m);
  }

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=CN
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();
  const cells: { y: number; m: number; d: number; dim: boolean }[] = [];

  // Padding đầu (ngày tháng trước)
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const m = viewMonth - 1;
    const y = m < 0 ? viewYear - 1 : viewYear;
    cells.push({ y, m: m < 0 ? 11 : m, d, dim: true });
  }
  // Ngày trong tháng
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ y: viewYear, m: viewMonth, d, dim: false });
  }
  // Padding cuối — đủ 6 hàng (42 cells)
  while (cells.length < 42) {
    const last = cells[cells.length - 1];
    let nd = last.d + 1;
    let nm = last.m;
    let ny = last.y;
    if (nd > new Date(ny, nm + 1, 0).getDate()) {
      nd = 1; nm++;
      if (nm > 11) { nm = 0; ny++; }
    }
    cells.push({ y: ny, m: nm, d: nd, dim: true });
  }

  return (
    <div style={{
      background: '#fff',
      border: '1.5px solid #e5e7eb',
      borderRadius: 10,
      padding: 14,
      userSelect: 'none',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      }}>
        <button
          type="button"
          onClick={() => nav(-1)}
          style={{
            background: 'transparent', border: 'none', color: '#6b7280',
            cursor: 'pointer', padding: '4px 10px', borderRadius: 4,
            fontSize: 18, fontWeight: 700,
          }}
          aria-label="Tháng trước"
        >‹</button>
        <span style={{ color: '#1f2937', fontWeight: 700, fontSize: 14 }}>
          {VN_MONTHS[viewMonth]}, {viewYear}
        </span>
        <button
          type="button"
          onClick={() => nav(1)}
          style={{
            background: 'transparent', border: 'none', color: '#6b7280',
            cursor: 'pointer', padding: '4px 10px', borderRadius: 4,
            fontSize: 18, fontWeight: 700,
          }}
          aria-label="Tháng sau"
        >›</button>
      </div>

      {/* Day-of-week headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginBottom: 4 }}>
        {VN_DOW.map((d, i) => (
          <div key={i} style={{
            color: '#9ca3af', textAlign: 'center', padding: '4px 0',
            fontSize: 11, fontWeight: 600,
          }}>{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
        {cells.map((cell, i) => {
          const ds = toDateStr(cell.y, cell.m, cell.d);
          const isStart = ds === startDate;
          const isEnd = ds === endDate;
          const inRange = startDate && endDate && ds > startDate && ds < endDate;
          const weekend = isWeekend(cell.y, cell.m, cell.d);

          let bg = 'transparent';
          let color = cell.dim ? '#d1d5db' : (weekend ? '#dc2626' : '#374151');
          let fontWeight: number = 500;

          if (isStart || isEnd) {
            bg = '#3b82f6';
            color = '#fff';
            fontWeight = 700;
          } else if (inRange) {
            bg = '#dbeafe';
            color = '#1e40af';
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => !cell.dim && handlePickDate(ds)}
              disabled={cell.dim}
              style={{
                textAlign: 'center', padding: '8px 0', borderRadius: 6,
                cursor: cell.dim ? 'default' : 'pointer',
                background: bg, color, fontWeight, fontSize: 13,
                border: 'none', fontFamily: 'inherit',
              }}
            >
              {cell.d}
            </button>
          );
        })}
      </div>

      {/* Summary */}
      {startDate && endDate && (
        <div style={{
          background: '#1e3a5f', color: '#fff', padding: '10px 14px', borderRadius: 8,
          fontSize: 13, marginTop: 10,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>📅 Đã chọn: <b>{startDate.split('-').reverse().join('/')}</b> → <b>{endDate.split('-').reverse().join('/')}</b></span>
          <span><b>{daysBetween(startDate, endDate)}</b> ngày trong khoảng</span>
        </div>
      )}
      {startDate && !endDate && (
        <div style={{
          background: '#fef3c7', color: '#92400e', padding: '8px 12px', borderRadius: 8,
          fontSize: 12, marginTop: 10,
        }}>
          ⏳ Chọn ngày kết thúc...
        </div>
      )}
    </div>
  );
}

function daysBetween(start: string, end: string): number {
  const [sy, sm, sd] = start.split('-').map(Number);
  const [ey, em, ed] = end.split('-').map(Number);
  const startMs = new Date(sy, sm - 1, sd).getTime();
  const endMs = new Date(ey, em - 1, ed).getTime();
  return Math.floor((endMs - startMs) / (24 * 60 * 60 * 1000)) + 1;
}
