import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '../ui/Button';

interface DiagnosticSectionProps {
  onSelectStatus?: (status: string) => void;
}

export function DiagnosticSection({ onSelectStatus }: DiagnosticSectionProps) {
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);

  const diagnosticCases = [
    {
      id: 1,
      title: '개인회생 중이라 할부가 안 될 것 같아요',
      desc: '개인회생 진행 단계와 변제 상태를 확인한 후 상담 가능한 방향을 검토합니다.',
      mappedStatus: '개인회생 진행 중',
    },
    {
      id: 2,
      title: '신용점수가 낮아 여러 번 거절됐어요',
      desc: '반복적인 조회보다 현재 소득과 월 납입 가능 금액을 먼저 확인합니다.',
      mappedStatus: '저신용',
    },
    {
      id: 3,
      title: '직장은 있지만 기존 대출이 있어요',
      desc: '소득, 기존 부채와 재직 기간을 종합적으로 확인합니다.',
      mappedStatus: '기타',
    },
    {
      id: 4,
      title: '차량뿐 아니라 초기 비용도 걱정돼요',
      desc: '보험료, 취등록비, 이전비와 초기 정비비까지 함께 검토합니다.',
      mappedStatus: '기타',
    },
    {
      id: 5,
      title: '사업자 또는 프리랜서라 소득증빙이 어려워요',
      desc: '급여명세서가 없어도 확인할 수 있는 소득 자료를 안내합니다.',
      mappedStatus: '기타',
    },
    {
      id: 6,
      title: '다른 중고차 업체에서 할부가 거절됐어요',
      desc: '거절 경험만으로 가능 여부를 단정하지 않고 현재 조건을 다시 확인합니다.',
      mappedStatus: '기존 할부 거절',
    },
  ];

  const handleProceed = () => {
    if (!selectedCaseId || !onSelectStatus) return;
    const selectedCase = diagnosticCases.find((c) => c.id === selectedCaseId);
    if (selectedCase) onSelectStatus(selectedCase.mappedStatus);
  };

  return (
    <section className="py-20 md:py-28 bg-brand-bg border-t border-white/[0.06]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-brand-yellow/80 mb-4">
            Diagnosis
          </p>
          <h2 className="text-2xl md:text-4xl font-display font-black text-white tracking-tight mb-4">
            지금 어디에서 막히셨나요?
          </h2>
          <p className="text-base text-brand-body leading-relaxed max-w-xl">
            상황을 고르면 상담 방향이 바로 맞춰집니다.
          </p>
        </div>

        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {diagnosticCases.map((item, index) => {
            const isSelected = selectedCaseId === item.id;
            return (
              <div key={item.id} className={isSelected ? 'bg-white/[0.02]' : ''}>
                <button
                  type="button"
                  onClick={() => setSelectedCaseId((prev) => (prev === item.id ? null : item.id))}
                  className="w-full text-left py-5 sm:py-6 flex items-start gap-4 sm:gap-6 group focus:outline-none"
                >
                  <span
                    className={`font-mono text-xs pt-1.5 shrink-0 tabular-nums ${
                      isSelected ? 'text-brand-yellow' : 'text-white/30'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`flex-1 text-base sm:text-lg font-semibold transition-colors ${
                      isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'
                    }`}
                  >
                    {item.title}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 mt-1.5 shrink-0 transition-all ${
                      isSelected
                        ? 'text-brand-yellow rotate-90'
                        : 'text-white/25 group-hover:text-white/50'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-10 sm:pl-12 pr-8 text-sm text-brand-body leading-relaxed max-w-xl">
                        {item.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedCaseId !== null && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mt-10"
            >
              <Button variant="primary" size="lg" onClick={handleProceed}>
                이 상황으로 조건 확인 <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
