'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), employeeId: employeeId.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || '로그인에 실패했습니다.');
        return;
      }

      router.push('/dashboard');
    } catch {
      setError('서버 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ok-bg flex flex-col">
      <header className="py-4 px-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 bg-ok-orange rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">OK</span>
          </div>
          <span className="font-bold text-ok-navy">해외연수 포털</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Image
              src="/assets/ootman.png"
              alt="읏맨 캐릭터"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-extrabold text-ok-navy">연수 참석 확인 페이지</h1>
            <p className="text-ok-gray-500 mt-2">사번과 이름을 입력해 주세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="사번 (예: 1234567)"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-ok-gray-300 focus:outline-none focus:border-ok-orange focus:ring-2 focus:ring-ok-orange/20 text-ok-navy placeholder:text-ok-gray-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="이름 (예: 홍길동)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-ok-gray-300 focus:outline-none focus:border-ok-orange focus:ring-2 focus:ring-ok-orange/20 text-ok-navy placeholder:text-ok-gray-500"
              />
            </div>

            {error && (
              <p className="text-ok-red text-sm text-center bg-red-50 rounded-xl py-3">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-ok-orange text-white font-semibold rounded-xl hover:bg-ok-orange-light disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '확인 중...' : '확인하기'}
            </button>
          </form>

          <p className="text-center text-ok-gray-500 text-xs mt-6">
            &#128274; 별도 비밀번호 없이 사번과 이름으로 로그인합니다
          </p>
        </div>
      </main>
    </div>
  );
}
