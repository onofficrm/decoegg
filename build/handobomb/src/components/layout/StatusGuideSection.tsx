import { ArrowRight } from 'lucide-react';
import { focusPage } from '../../lib/sitePages';

type GuideItem = {
  id: string;
  path: string;
  label: string;
  title: string;
  line: string;
  mappedStatus: string;
};

const guides: GuideItem[] = [
  {
    id: 'guide-rehab',
    path: '/guides/rehab',
    label: '개인회생',
    title: '진행 중 할부',
    line: '변제·소득 상태를 보고 월납 중심으로 상담합니다.',
    mappedStatus: '개인회생 진행 중',
  },
  {
    id: 'guide-discharge',
    path: '/guides/discharge',
    label: '면책 후',
    title: '면책 이후 할부',
    line: '소득 증빙과 현실적인 예산부터 맞춥니다.',
    mappedStatus: '개인회생 면책',
  },
  {
    id: 'guide-lowcredit',
    path: '/guides/lowcredit',
    label: '저신용',
    title: '신용점수 낮은 경우',
    line: '반복 조회보다 월납 가능액을 먼저 확인합니다.',
    mappedStatus: '저신용',
  },
  {
    id: 'guide-rejected',
    path: '/guides/rejected',
    label: '할부 거절',
    title: '거절 후 재상담',
    line: '거절 사유를 정리한 뒤 조건을 다시 맞춥니다.',
    mappedStatus: '기존 할부 거절',
  },
];

interface StatusGuideSectionProps {
  onSelectStatus?: (status: string) => void;
}

export function StatusGuideSection({ onSelectStatus }: StatusGuideSectionProps) {
  return (
    <section id="guides" className="py-16 md:py-24 bg-[#0A0C10] border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight mb-2">
            상태별 중고차 할부 가이드
          </h2>
          <p className="text-sm text-brand-body">내 상황에 맞는 상담 포인트만 고르세요.</p>
        </div>

        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {guides.map((guide) => (
            <article
              key={guide.id}
              id={guide.id}
              className="py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-[6.5rem_1fr_auto] gap-2 sm:gap-6 items-center"
            >
              <a
                href={guide.path}
                className="text-sm font-bold text-brand-yellow hover:underline w-fit"
                onClick={(e) => {
                  e.preventDefault();
                  focusPage(guide.path);
                }}
              >
                {guide.label}
              </a>

              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-white mb-0.5">
                  <a
                    href={guide.path}
                    className="hover:text-brand-yellow transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      focusPage(guide.path);
                    }}
                  >
                    {guide.title}
                  </a>
                </h3>
                <p className="text-sm text-brand-body leading-snug">{guide.line}</p>
              </div>

              <button
                type="button"
                onClick={() => onSelectStatus?.(guide.mappedStatus)}
                className="justify-self-start sm:justify-self-end inline-flex items-center gap-1 text-sm font-bold text-white/80 hover:text-brand-yellow transition-colors pt-1 sm:pt-0"
              >
                조건 확인 <ArrowRight className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
