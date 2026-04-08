'use client';

import { useCallback, useState, useRef } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
}

export default function FileUpload({ onFileSelect, accept = '.jpg,.jpeg,.png,.pdf', maxSizeMB = 10 }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`파일 크기는 ${maxSizeMB}MB 이하여야 합니다.`);
      return;
    }
    setFileName(file.name);
    onFileSelect(file);
  }, [maxSizeMB, onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
        dragOver
          ? 'border-ok-orange bg-pastel-orange'
          : fileName
          ? 'border-green-400 bg-green-50'
          : 'border-ok-gray-300 bg-white hover:border-ok-orange/50'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      {fileName ? (
        <>
          <span className="text-3xl block mb-2">&#128206;</span>
          <p className="font-semibold text-ok-navy">{fileName}</p>
          <p className="text-ok-gray-500 text-sm mt-1">클릭하여 다른 파일 선택</p>
        </>
      ) : (
        <>
          <span className="text-3xl block mb-2">&#128206;</span>
          <p className="font-semibold text-ok-navy">파일을 드래그하거나 클릭해주세요</p>
          <p className="text-ok-gray-500 text-sm mt-1">JPG / PNG / PDF &middot; 최대 {maxSizeMB}MB</p>
        </>
      )}
    </div>
  );
}
