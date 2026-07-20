import { useState } from 'react';
import { ArrowRight, Activity, CheckCircle2 } from 'lucide-react';
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
      label: 'CASE 01',
      title: '개인회생 중이라 할부가 안 될 것 같아요',
      desc: '개인회생 진행 단계와 변제 상태를 확인한 후 상담 가능한 방향을 검토합니다.',
      mappedStatus: '개인회생 진행 중',
    },
    {
      id: 2,
      label: 'CASE 02',
      title: '신용점수가 낮아 여러 번 거절됐어요',
      desc: '반복적인 조회보다 현재 소득과 월 납입 가능 금액을 먼저 확인합니다.',
      mappedStatus: '저신용',
    },
    {
      id: 3,
      label: 'CASE 03',
      title: '직장은 있지만 기존 대출이 있어요',
      desc: '소득, 기존 부채와 재직 기간을 종합적으로 확인합니다.',
      mappedStatus: '기타',
    },
    {
      id: 4,
      label: 'CASE 04',
      title: '차량뿐 아니라 초기 비용도 걱정돼요',
      desc: '보험료, 취등록비, 이전비와 초기 정비비까지 함께 검토합니다.',
      mappedStatus: '기타',
    },
    {
      id: 5,
      label: 'CASE 05',
      title: '사업자 또는 프리랜서라 소득증빙이 어려워요',
      desc: '급여명세서가 없어도 확인할 수 있는 소득 자료를 안내합니다.',
      mappedStatus: '기타',
    },
    {
      id: 6,
      label: 'CASE 06',
      title: '다른 중고차 업체에서 할부가 거절됐어요',
      desc: '거절 경험만으로 가능 여부를 단정하지 않고 현재 조건을 다시 확인합니다.',
      mappedStatus: '기존 할부 거절',
    },
  ];

  const handleToggle = (id: number) => {
    setSelectedCaseId((prev) => (prev === id ? null : id));
  };

  const handleProceed = () => {
    if (selectedCaseId && onSelectStatus) {
      const selectedCase = diagnosticCases.find(c => c.id === selectedCaseId);
      if (selectedCase) {
        onSelectStatus(selectedCase.mappedStatus);
      }
    }
  };

  return (
    <section className="py-24 bg-[#0A0C10] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-yellow/10 text-brand-yellow mb-6">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 tracking-tight">
            지금 어디에서 막히셨나요?
          </h2>
          <p className="text-lg text-brand-body max-w-2xl mx-auto leading-relaxed">
            고객마다 할부가 어려운 이유는 다릅니다.<br />
            현재 상황을 선택하면 필요한 상담 방향을 빠르게 확인할 수 있습니다.
          </p>
        </div>

        {/* Diagnostic Menu */}
        <div className="space-y-3">
          {diagnosticCases.map((item) => {
            const isSelected = selectedCaseId === item.id;

            return (
              <div 
                key={item.id}
                className={`group relative overflow-hidden transition-all duration-300 border ${isSelected ? 'border-brand-yellow bg-brand-card/80' : 'border-white/5 bg-brand-card hover:border-white/20'}`}
                style={{
                  clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)'
                }}
              >
                {/* Active Indicator Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300 ${isSelected ? 'bg-brand-yellow' : 'bg-transparent group-hover:bg-white/10'}`} />

                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className={`font-mono text-sm font-bold tracking-wider ${isSelected ? 'text-brand-yellow' : 'text-brand-body/50'}`}>
                      {item.label}
                    </span>
                    <h3 className={`text-lg sm:text-xl font-bold transition-colors ${isSelected ? 'text-white' : 'text-brand-body group-hover:text-white'}`}>
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${isSelected ? 'border-brand-yellow bg-brand-yellow/10 text-brand-yellow' : 'border-white/10 text-brand-body group-hover:text-white group-hover:border-white/30'}`}>
                    <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isSelected ? 'rotate-90' : ''}`} />
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 pl-6 sm:pl-[120px]">
                        <p className="text-brand-body/90 text-base leading-relaxed pl-4 border-l-2 border-brand-yellow/30">
                          {item.desc}
                        </p>
                        
                        <div className="mt-6 flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-brand-green" />
                          <span className="text-sm font-bold text-white">이 항목이 선택되었습니다. 다음 단계 상담 폼에 자동 반영됩니다.</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Action Area (Shows when item is selected) */}
        <AnimatePresence>
          {selectedCaseId !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 text-center"
            >
              <Button variant="primary" size="xl" onClick={handleProceed}>
                선택한 상황으로 차량조건 확인하기 <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </section>
  );
}
