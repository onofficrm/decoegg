import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { goConsult } from '../../lib/sitePages';

const steps = [
  '차량 가격',
  '취등록·이전 비용',
  '보험·초기 정비',
  '추가 필요자금 상담',
];

export function FinanceSection() {
  return (
    <section id="finance" className="py-20 md:py-28 bg-[#0A0C10] border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-brand-yellow/80 mb-4">
            Finance
          </p>
          <h2 className="text-2xl md:text-4xl font-display font-black text-white tracking-tight mb-5 leading-snug">
            차량만 보고 결정하지 않습니다
          </h2>
          <p className="text-base text-brand-body leading-relaxed">
            보험·취등록·이전·초기 정비까지 포함해 월납 가능 금액을 먼저 맞춥니다.
            추가 자금이 필요하면 같은 상담에서 범위를 함께 검토합니다.
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] mb-10">
          {steps.map((step, index) => (
            <li key={step} className="bg-[#0A0C10] p-6 sm:p-8">
              <span className="font-mono text-xs text-brand-yellow/70 tabular-nums block mb-3">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={`text-base font-bold leading-snug ${
                  index === steps.length - 1 ? 'text-brand-yellow' : 'text-white'
                }`}
              >
                {step}
              </span>
            </li>
          ))}
        </ol>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
          <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={() => goConsult()}>
            차량·자금 조건 확인 <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>

        <p className="text-xs text-brand-body/45 leading-relaxed max-w-3xl">
          추가 필요자금 가능 여부와 금액은 조건·심사 결과에 따라 달라질 수 있으며,
          모든 고객에게 제공되지 않습니다. 금융 이용 시 신용평점에 영향을 줄 수 있습니다.
        </p>
      </div>
    </section>
  );
}
