'use client';

interface AttendanceSelectorProps {
  selected: '참석' | '불참' | null;
  onSelect: (value: '참석' | '불참') => void;
}

export default function AttendanceSelector({ selected, onSelect }: AttendanceSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => onSelect('참석')}
        className={`rounded-2xl p-8 border-2 text-center transition-all ${
          selected === '참석'
            ? 'border-ok-orange bg-pastel-orange shadow-md'
            : 'border-ok-gray-300 bg-white hover:border-ok-orange/50'
        }`}
      >
        <span className="text-4xl block mb-3">&#9992;&#65039;</span>
        <span className="font-bold text-ok-navy text-lg">참석</span>
        <p className="text-ok-gray-500 text-sm mt-1">연수에 참석합니다</p>
      </button>
      <button
        onClick={() => onSelect('불참')}
        className={`rounded-2xl p-8 border-2 text-center transition-all ${
          selected === '불참'
            ? 'border-ok-red bg-red-50 shadow-md'
            : 'border-ok-gray-300 bg-white hover:border-ok-red/50'
        }`}
      >
        <span className="text-4xl block mb-3">&#10060;</span>
        <span className="font-bold text-ok-navy text-lg">불참</span>
        <p className="text-ok-gray-500 text-sm mt-1">참석이 어렵습니다</p>
      </button>
    </div>
  );
}
