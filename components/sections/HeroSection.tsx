import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-white to-pastel-orange py-16 px-6">
      <div className="max-w-[800px] mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-ok-navy leading-tight">
            2026 OK금융그룹
            <br />
            <span className="text-ok-orange">해외연수 포털</span>
          </h1>
          <p className="mt-4 text-ok-gray-700 text-lg leading-relaxed">
            연수 일정 &middot; 참석 확인 &middot; 여권 제출을 한 곳에서
          </p>
          <Link
            href="/login"
            className="inline-block mt-6 px-8 py-3 bg-ok-orange text-white font-semibold rounded-full hover:bg-ok-orange-light shadow-lg shadow-ok-orange/20"
          >
            참석 여부 응답하기 &rarr;
          </Link>
        </div>
        <div className="flex-shrink-0">
          <Image
            src="/assets/ootman.jpg"
            alt="읏맨 캐릭터"
            width={320}
            height={200}
            className="rounded-2xl shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
