'use client';

import Link from 'next/link';

export default function GNB() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-ok-gray-100">
      <div className="max-w-[800px] mx-auto flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-ok-orange rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">OK</span>
          </div>
          <span className="font-bold text-ok-navy text-lg">해외연수 포털</span>
        </Link>
        <Link
          href="/login"
          className="px-5 py-2 rounded-full border-2 border-ok-orange text-ok-orange font-semibold text-sm hover:bg-ok-orange hover:text-white"
        >
          로그인
        </Link>
      </div>
    </header>
  );
}
