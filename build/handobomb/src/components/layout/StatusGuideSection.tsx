import { BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { focusPage } from '../../lib/sitePages';

type GuideItem = {
  id: string;
  path: string;
  label: string;
  title: string;
  summary: string;
  points: string[];
  mappedStatus: string;
};

const guides: GuideItem[] = [
  {
    id: 'guide-rehab',
    path: '/guides/rehab',
    label: '개인회생',
    title: '개인회생 진행 중 중고차 할부',
    summary: '변제 회차·미납 여부·소득 유지 상태를 먼저 확인한 뒤, 무리하지 않는 월납 범위로 상담합니다.',
    points: ['변제금 성실 납입 여부 확인', '출퇴근·생업 목적 우선 검토', '과도한 차량가보다 월납 중심 설계'],
    mappedStatus: '개인회생 진행 중',
  },
  {
    id: 'guide-discharge',
    path: '/guides/discharge',
    label: '면책 후',
    title: '개인회생·파산면책 이후 할부',
    summary: '면책 이후에는 금융 이력이 부족한 경우가 많아, 소득 증빙과 현실적인 예산이 핵심입니다.',
    points: ['면책 경과 기간 확인', '급여·통장 입금 증빙 준비', '경차·준중형부터 단계적 접근'],
    mappedStatus: '개인회생 면책',
  },
  {
    id: 'guide-lowcredit',
    path: '/guides/lowcredit',
    label: '저신용',
    title: '저신용·신용점수 낮은 경우',
    summary: '반복 조회보다 현재 소득과 월 납입 가능 금액을 먼저 맞추는 것이 중요합니다.',
    points: ['최근 거절·조회 이력 점검', '월납 가능액 기준 차량 선정', '추가자금이 필요하면 범위만 선상담'],
    mappedStatus: '저신용',
  },
  {
    id: 'guide-rejected',
    path: '/guides/rejected',
    label: '할부 거절',
    title: '기존 할부 거절 후 재상담',
    summary: '거절 경험만으로 단정하지 않고, 거절 사유와 현재 조건을 다시 정리합니다.',
    points: ['거절 금융사·시점 확인', '차량가·선수금 재조정', '같은 조건 반복 신청 지양'],
    mappedStatus: '기존 할부 거절',
  },
];

interface StatusGuideSectionProps {
  onSelectStatus?: (status: string) => void;
}

export function StatusGuideSection({ onSelectStatus }: StatusGuideSectionProps) {
  return (
    <section id="guides" className="py-24 bg-[#0A0C10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-yellow/10 text-brand-yellow mb-6">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 tracking-tight">
            상태별 중고차 할부 가이드
          </h2>
          <p className="text-lg text-brand-body leading-relaxed">
            개인회생·면책·저신용·할부 거절마다 상담 포인트가 다릅니다.
            <br className="hidden md:block" />
            내 상황에 맞는 가이드를 확인한 뒤 조건 확인으로 이어가세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <article
              key={guide.id}
              id={guide.id}
              className="bg-brand-card border border-white/5 clip-chamfer p-6 sm:p-8 flex flex-col"
            >
              <a
                href={guide.path}
                className="text-xs font-bold text-brand-yellow mb-3 hover:underline w-fit"
                onClick={(e) => {
                  e.preventDefault();
                  focusPage(guide.path);
                }}
              >
                {guide.label}
              </a>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white mb-3 tracking-tight">
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
              <p className="text-brand-body leading-relaxed mb-5">{guide.summary}</p>
              <ul className="space-y-2 mb-8 text-sm text-brand-body/90">
                {guide.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-brand-yellow font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => onSelectStatus?.(guide.mappedStatus)}
                >
                  이 상태로 조건 확인 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
