/**
 * HolidayFileUpload.tsx — Drag-drop area upload file quyết định
 *
 * Accept: PDF, JPG, PNG · Max 10MB
 * Hiển thị preview tên file + nút xóa nếu đã upload.
 */

'use client';

import React, { useRef, useState } from 'react';

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPT = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

type Props = {
  file: File | null;
  onChange: (file: File | null) => void;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function HolidayFileUpload({ file, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>('');
  const [dragOver, setDragOver] = useState(false);

  function validateAndSet(f: File | null) {
    setError('');
    if (!f) {
      onChange(null);
      return;
    }
    if (!ACCEPT.includes(f.type)) {
      setError('Chỉ hỗ trợ PDF, JPG, PNG');
      return;
    }
    if (f.size > MAX_SIZE) {
      setError(`File quá lớn (${formatBytes(f.size)}). Tối đa 10MB.`);
      return;
    }
    onChange(f);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) validateAndSet(f);
  }

  if (file) {
    // Đã có file → hiển thị preview
    return (
      <div>
        <div style={{
          background: '#f0fdf4', border: '1.5px solid #22c55e', borderRadius: 8,
          padding: '9px 12px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 12,
        }}>
          <span style={{ color: '#15803d', fontWeight: 600 }}>
            ✅ {file.name} · {formatBytes(file.size)}
          </span>
          <button
            type="button"
            onClick={() => validateAndSet(null)}
            style={{
              background: 'transparent', border: 'none', color: '#dc2626',
              cursor: 'pointer', padding: '0 4px', fontSize: 14, fontWeight: 700,
            }}
            aria-label="Xóa file"
          >✕</button>
        </div>
        {error && (
          <div style={{ color: '#dc2626', fontSize: 12, marginTop: 6 }}>
            ⚠️ {error}
          </div>
        )}
      </div>
    );
  }

  // Chưa có file → drop zone
  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragOver ? '#3b82f6' : '#93c5fd'}`,
          background: dragOver ? '#dbeafe' : '#eff6ff',
          borderRadius: 10, padding: '24px 16px', textAlign: 'center',
          cursor: 'pointer', transition: 'all 0.15s',
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 6 }}>📎</div>
        <div style={{ fontSize: 13, color: '#1e40af', lineHeight: 1.5 }}>
          <b style={{ color: '#1e3a5f' }}>Kéo thả file vào đây</b> hoặc{' '}
          <span style={{ textDecoration: 'underline' }}>bấm để chọn từ máy</span>
        </div>
        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>
          Hỗ trợ: PDF · JPG · PNG · Tối đa 10MB
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => validateAndSet(e.target.files?.[0] || null)}
        style={{ display: 'none' }}
      />

      {error && (
        <div style={{ color: '#dc2626', fontSize: 12, marginTop: 6 }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
