/**
 * HolidayHalfDayList.tsx — List các ngày trong khoảng nghỉ với toggle loại buổi
 *
 * Mỗi ngày có 4 button: ☀️ Cả ngày / ☕ Sáng / 🌆 Chiều / ❌ Bỏ
 * Tự tính tổng số ngày dưới list (full=1, sáng/chiều=0.5, skip=0).
 */

'use client';

import React from 'react';

export type HalfDayType = 'full' | 'morning' | 'afternoon' | 'skip';

export type DayDetail = {
  date: string;       // YYYY-MM-DD
  type: HalfDayType;
};

type Props = {
  dates: string[];                          // Range ngày (đã expand từ start→end)
  values: Record<string, HalfDayType>;     // dateStr → type
  onChange: (date: string, type: HalfDayType) => void;
};

const VN_DOW = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

function getDow(dateStr: string): { label: string; weekend: boolean } {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dow = new Date(y, m - 1, d).getDay();
  return { label: VN_DOW[dow], weekend: dow === 0 || dow === 6 };
}

function toDDMM(dateStr: string): string {
  const [, m, d] = dateStr.split('-');
  return `${d}/${m}`;
}

const BTN_STYLES: Record<HalfDayType, { bg: string; border: string; color: string; label: string }> = {
  full:      { bg: '#dbeafe', border: '#3b82f6', color: '#1e40af', label: '☀️ Cả ngày' },
  morning:   { bg: '#fef3c7', border: '#f59e0b', color: '#92400e', label: '☕ Sáng' },
  afternoon: { bg: '#ede9fe', border: '#8b5cf6', color: '#5b21b6', label: '🌆 Chiều' },
  skip:      { bg: '#fee2e2', border: '#ef4444', color: '#991b1b', label: '❌ Bỏ' },
};

const BTN_LABELS: HalfDayType[] = ['full', 'morning', 'afternoon', 'skip'];

export default function HolidayHalfDayList({ dates, values, onChange }: Props) {
  if (dates.length === 0) {
    return (
      <div style={{
        background: '#f9fafb', border: '1.5px dashed #d1d5db', borderRadius: 10,
        padding: 24, textAlign: 'center', color: '#6b7280', fontSize: 13,
      }}>
        Chọn khoảng ngày nghỉ ở trên để hiện danh sách từng ngày
      </div>
    );
  }

  // Tính tổng (full=1, morning=0.5, afternoon=0.5, skip=0)
  const total = dates.reduce((acc, d) => {
    const t = values[d] || 'full';
    if (t === 'full') return acc + 1;
    if (t === 'morning' || t === 'afternoon') return acc + 0.5;
    return acc;
  }, 0);

  return (
    <div>
      <div style={{
        background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: 10,
      }}>
        {dates.map((dateStr, idx) => {
          const dow = getDow(dateStr);
          const currentType = values[dateStr] || 'full';

          return (
            <div
              key={dateStr}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '8px 10px',
                borderRadius: 6,
                borderTop: idx > 0 ? '1px solid #f3f4f6' : 'none',
              }}
            >
              <div style={{ minWidth: 110, fontSize: 13, color: '#374151' }}>
                <b style={{ color: '#1f2937' }}>{toDDMM(dateStr)}</b>
                <span style={{
                  display: 'inline-block', padding: '1px 6px', borderRadius: 8,
                  fontSize: 10, fontWeight: 600, marginLeft: 6,
                  background: dow.weekend ? '#fee2e2' : '#f3f4f6',
                  color: dow.weekend ? '#dc2626' : '#6b7280',
                }}>
                  {dow.label}
                </span>
              </div>

              <div style={{ display: 'flex', gap: 6, flex: 1, flexWrap: 'wrap' }}>
                {BTN_LABELS.map((t) => {
                  const isActive = currentType === t;
                  const sty = BTN_STYLES[t];
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => onChange(dateStr, t)}
                      style={{
                        flex: '1 1 70px', padding: '7px 10px',
                        border: `1.5px solid ${isActive ? sty.border : '#e5e7eb'}`,
                        background: isActive ? sty.bg : '#fff',
                        color: isActive ? sty.color : '#6b7280',
                        borderRadius: 6, fontSize: 12, cursor: 'pointer',
                        fontWeight: 600, fontFamily: 'inherit',
                      }}
                    >
                      {sty.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        background: total > 0 ? '#3ba55d' : '#9ca3af', color: '#fff',
        padding: '10px 14px', borderRadius: 8, fontSize: 13, marginTop: 10,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span>📊 Tổng hợp: <b>{total} ngày nghỉ</b></span>
        <span style={{ fontSize: 11, opacity: 0.9 }}>
          (Cả ngày=1 · Sáng/Chiều=0.5 · Bỏ=0)
        </span>
      </div>
    </div>
  );
}
