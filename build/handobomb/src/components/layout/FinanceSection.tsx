import { Car, FileCheck, ShieldPlus, Zap, ArrowRight, MessageCircle, AlertCircle, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import React from 'react';

export function FinanceSection() {
  const modules = [
    {
      id: '01',
      title: '차량 가격',
      icon: <Car className="w-8 h-8 text-white" />,
      highlight: false,
    },
    {
      id: '02',
      title: '취등록 및 이전 비용',
      icon: <FileCheck className="w-8 h-8 text-white" />,
      highlight: false,
    },
    {
      id: '03',
      title: '보험 및 초기 정비',
      icon: <ShieldPlus className="w-8 h-8 text-white" />,
      highlight: false,
    },
    {
      id: '04',
      title: '추가 필요자금 상담',
      icon: <Zap className="w-8 h-8 text-brand-bg" />,
      highlight: true,
    },
  ];

  return (
    <section id="finance" className="py-24 bg-[#0A0C10] border-t border-white/5 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 tracking-tight leading-tight">
            차량만 보고 결정하지 않습니다<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-orange">출고 이후 필요한 비용까지 함께 계산합니다</span>
          </h2>
          <p className="text-lg text-brand-body leading-relaxed">
            중고차 구매에는 차량 가격 외에도 보험료, 취등록비, 이전비와 초기 정비비 등 여러 비용이 발생할 수 있습니다.<br className="hidden md:block" />
            한도폭발카는 고객의 월 납입 가능 금액과 차량 구매비용을 먼저 확인한 후, 추가로 필요한 자금이 있는 경우 상담 가능한 범위를 함께 검토합니다.
          </p>
        </div>

        {/* Infographic Modules */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-12">
          {modules.map((m, i) => (
            <React.Fragment key={m.id}>
              <div 
                className={`w-full lg:w-1/4 p-6 sm:p-8 flex flex-col items-center text-center relative group transition-all duration-300 clip-chamfer
                  ${m.highlight 
                    ? 'bg-brand-yellow hover:bg-[#d4ed2e] dashboard-glow' 
                    : 'bg-brand-card border border-white/5 hover:border-brand-yellow/30'
                  }`}
              >
                <div className={`mb-6 p-4 rounded-full border ${m.highlight ? 'bg-black/10 border-black/10' : 'bg-black/50 border-white/5'}`}>
                  {m.icon}
                </div>
                <h4 className={`text-lg sm:text-xl font-bold mb-2 ${m.highlight ? 'text-brand-bg' : 'text-white'}`}>
                  {m.title}
                </h4>
                <div className={`font-mono text-xs font-bold ${m.highlight ? 'text-brand-bg/60' : 'text-brand-body/50'}`}>
                  STEP {m.id}
                </div>
              </div>
              
              {/* Plus Connector (Desktop) */}
              {i < modules.length - 1 && (
                <div className="hidden lg:flex items-center justify-center w-8 shrink-0">
                  <Plus className="w-6 h-6 text-brand-yellow/50" />
                </div>
              )}
              
              {/* Plus Connector (Mobile) */}
              {i < modules.length - 1 && (
                <div className="flex lg:hidden items-center justify-center h-8 shrink-0">
                  <Plus className="w-6 h-6 text-brand-yellow/50" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Highlight Box */}
        <div className="text-center mb-12">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-8 sm:px-12 py-5 sm:py-6 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 shadow-[0_0_40px_rgba(232,255,63,0.1)]">
            <span className="text-brand-yellow font-black font-display text-xl sm:text-2xl tracking-tight">차량 ＋ 추가 필요자금 상담</span>
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-brand-yellow"></span>
            <span className="text-white font-bold text-lg sm:text-xl">한 번의 신청으로 함께 확인</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Button variant="primary" size="xl" className="w-full sm:w-auto" onClick={() => window.location.href = '#consult-form'}>
            차량과 자금 조건 확인하기 <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
          <Button variant="outline" size="xl" className="w-full sm:w-auto !border-brand-yellow/30 hover:!bg-brand-yellow/10" onClick={() => window.open('https://open.kakao.com/o/seC75DCi', '_blank')}>
            <MessageCircle className="w-6 h-6 mr-2 text-brand-yellow" />
            <span className="text-white">카카오톡으로 먼저 물어보기</span>
          </Button>
        </div>

        {/* Disclaimers */}
        <div className="bg-black/50 border border-white/5 p-6 sm:p-8 clip-chamfer text-left max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
            <AlertCircle className="w-5 h-5 text-brand-body" />
            <span className="text-sm font-bold text-white">필수 안내사항 (고객 확인용)</span>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-brand-body/60">
            <li>추가 필요자금 가능 여부와 금액은 고객 조건과 금융사 심사 결과에 따라 달라질 수 있습니다.</li>
            <li>모든 고객에게 추가자금이 제공되는 것은 아닙니다.</li>
            <li>금융상품 이용 시 신용평점에 영향을 줄 수 있습니다.</li>
            <li>실제 금리, 기간과 월 납입금은 상담 및 심사 후 안내됩니다.</li>
            <li>상환능력을 초과하는 금융상품 이용을 권하지 않습니다.</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
