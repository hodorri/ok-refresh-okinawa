'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GNB from '@/components/layout/GNB';
import Footer from '@/components/layout/Footer';

export default function PassportPage() {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/passport')
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => {});
  }, []);

  return (
    <>
      <GNB isLoggedIn={true} />
      <main className="flex-1">
        <div className="max-w-[600px] mx-auto px-6 py-10">
          <Link href="/dashboard" className="text-ok-gray-500 text-sm hover:text-ok-orange mb-6 inline-block">
            &larr; 대시보드로 돌아가기
          </Link>

          <h1 className="text-2xl font-extrabold text-ok-navy mb-2">여권 제출 현황</h1>
          <p className="text-ok-gray-500 mb-8">여권 제출 상태를 확인하세요.</p>

          <div className={`rounded-2xl p-6 mb-6 text-center font-semibold text-lg ${
            status === '제출'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-50 text-ok-red'
          }`}>
            {status === null
              ? '확인 중...'
              : status === '제출'
              ? '\u{1F7E2} 제출 완료'
              : '\u{1F534} 미제출'}
          </div>

          {status !== null && status !== '제출' && (
            <div className="bg-pastel-yellow rounded-2xl p-6 text-center">
              <p className="text-ok-navy font-semibold mb-2">여권 사본 제출 안내</p>
              <p className="text-ok-gray-700 text-sm leading-relaxed">
                <strong>~4/17(금)</strong>까지 아래 메일로 여권 사본을 제출해 주세요.
              </p>
              <a
                href="mailto:okhrd@okfngroup.com"
                className="inline-block mt-3 px-6 py-2 bg-ok-orange text-white font-semibold rounded-full hover:bg-ok-orange-light text-sm"
              >
                okhrd@okfngroup.com
              </a>
            </div>
          )}

          {status === '제출' && (
            <p className="text-center text-ok-gray-500 text-sm">
              여권이 정상적으로 제출되었습니다.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
