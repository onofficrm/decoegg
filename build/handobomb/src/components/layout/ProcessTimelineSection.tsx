import { Flag, Search, FileSearch, CarFront, CheckSquare, Key, ShieldAlert } from 'lucide-react';

export function ProcessTimelineSection() {
  const steps = [
    {
      id: 'START',
      title: '조건 확인 신청',
      desc: '홈페이지, 전화 또는 카카오톡으로 상담을 신청합니다.',
      icon: <Flag className="w-6 h-6" />,
      color: 'text-white',
      bg: 'bg-white/10 border-white/20',
    },
    {
      id: 'CHECK 01',
      title: '현재 상황 확인',
      desc: '개인회생 단계, 소득, 재직 상태와 월 납입 가능 금액을 확인합니다.',
      icon: <Search className="w-6 h-6" />,
      color: 'text-brand-yellow',
      bg: 'bg-brand-yellow/10 border-brand-yellow/30',
    },
    {
      id: 'CHECK 02',
      title: '구매조건 검토',
      desc: '현재 조건에서 검토 가능한 차량 구매예산과 상담 방향을 확인합니다.',
      icon: <FileSearch className="w-6 h-6" />,
      color: 'text-brand-yellow',
      bg: 'bg-brand-yellow/10 border-brand-yellow/30',
    },
    {
      id: 'CHECK 03',
      title: '차량 추천',
      desc: '차량 용도와 유지비를 고려하여 적합한 차량을 추천합니다.',
      icon: <CarFront className="w-6 h-6" />,
      color: 'text-brand-yellow',
      bg: 'bg-brand-yellow/10 border-brand-yellow/30',
    },
    {
      id: 'CHECK 04',
      title: '차량 상태 확인',
      desc: '성능기록부, 사고 이력, 주행거리와 차량 상태를 확인합니다.',
      icon: <CheckSquare className="w-6 h-6" />,
      color: 'text-brand-yellow',
      bg: 'bg-brand-yellow/10 border-brand-yellow/30',
    },
    {
      id: 'FINISH',
      title: '계약 및 출고',
      desc: '계약 내용을 충분히 설명한 후 고객이 동의하면 출고를 진행합니다.',
      icon: <Key className="w-6 h-6" />,
      color: 'text-brand-bg',
      bg: 'bg-brand-yellow border-brand-yellow',
    },
  ];

  return (
    <section id="process" className="py-24 bg-[#0A0C10] border-t border-white/5 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4 tracking-tight">
            상담 신청부터 출고까지 <span className="text-brand-yellow italic">FULL COURSE</span>
          </h2>
          <p className="text-brand-body text-lg">투명하고 체계적인 절차로 안전한 차량 출고를 약속합니다.</p>
        </div>

        <div className="relative">
          {/* Tracking Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2"></div>
          {/* Animated Highlight Line */}
          <div className="absolute left-6 md:left-1/2 top-0 h-1/2 w-px bg-gradient-to-b from-brand-yellow/0 via-brand-yellow to-brand-yellow/0 md:-translate-x-1/2 animate-[drop_3s_ease-in-out_infinite]"></div>

          <div className="space-y-12">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex items-start md:items-center w-full">
                  
                  {/* Left Side (Desktop) */}
                  <div className="hidden md:block w-1/2 pr-12 text-right">
                    {isEven && (
                      <div className="bg-brand-card border border-white/5 p-6 clip-chamfer group hover:border-brand-yellow/30 transition-colors">
                        <div className="text-brand-yellow font-mono text-xs font-bold mb-2 opacity-80">{step.id}</div>
                        <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                        <p className="text-sm text-brand-body leading-relaxed">{step.desc}</p>
                      </div>
                    )}
                  </div>

                  {/* Icon Center Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 shrink-0">
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center relative z-10 ${step.bg} ${step.color}`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Right Side (Desktop) & Mobile Layout */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-12 ${isEven ? 'md:invisible' : ''}`}>
                    <div className="bg-brand-card border border-white/5 p-6 clip-chamfer group hover:border-brand-yellow/30 transition-colors">
                      <div className="text-brand-yellow font-mono text-xs font-bold mb-2 opacity-80">{step.id}</div>
                      <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-sm text-brand-body leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-16 bg-black/50 border border-white/5 p-6 clip-chamfer text-center max-w-2xl mx-auto flex items-center justify-center gap-3">
          <ShieldAlert className="w-5 h-5 text-brand-orange" />
          <p className="text-sm font-bold text-brand-body">
            고객 동의 없이 금융조회나 차량 계약을 임의로 진행하지 않습니다.
          </p>
        </div>

      </div>

      <style>{`
        @keyframes drop {
          0% { top: -50%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
