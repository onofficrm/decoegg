import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { goConsult } from '../../lib/sitePages';

const checkpoints = [
  '개인회생 진행 단계와 변제 상태',
  '현재 소득과 입금 흐름',
  '재직·사업 기간과 증빙 가능 여부',
  '기존 부채와 월 상환액',
  '원하는 차량과 실제 용도',
  '감당 가능한 월 납입금',
];

export function DashboardSection() {
  return (
    <section className="py-20 md:py-28 bg-brand-bg border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-brand-yellow/80 mb-4">
              Approach
            </p>
            <h2 className="text-2xl md:text-4xl font-display font-black text-white tracking-tight mb-5 leading-snug">
              한도는 숫자 하나로
              <br />
              결정되지 않습니다
            </h2>
            <p className="text-base text-brand-body leading-relaxed mb-8 max-w-lg">
              신용점수만으로는 현실적인 차량 예산과 월납 계획을 세우기 어렵습니다.
              여러 조건을 함께 보고, 지금 검토 가능한 방향을 안내합니다.
            </p>
            <Button variant="primary" size="lg" onClick={() => goConsult()}>
              내 조건으로 확인하기 <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </div>

          <ol className="space-y-0 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {checkpoints.map((item, index) => (
              <li key={item} className="flex gap-5 py-4 sm:py-5">
                <span className="font-mono text-xs text-brand-yellow/70 pt-0.5 tabular-nums shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-white/85 text-sm sm:text-base font-medium leading-snug">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
