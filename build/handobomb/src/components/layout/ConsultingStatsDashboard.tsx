import React, { useEffect, useState, useRef } from 'react';
import { Calendar, Users, CheckCircle2, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';

// --- Custom CountUp Hook ---
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          
          if (prefersReducedMotion) {
            setCount(end);
            return;
          }

          let startTime: number | null = null;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeProgress * end));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration, hasTriggered]);

  return { count, ref };
}

// --- Admin Configuration ---
const adminConfig = {
  isDemoMode: true,
  showDemoBadge: true,
  showDemoNotice: true,
  lastUpdatedAt: '2023.10.27 14:00',
  stats: {
    recent7Days: 4230 as number | null,
    totalConsultations: 917890 as number | null,
    completedConsultations: 362288 as number | null
  }
};

export function ConsultingStatsDashboard() {
  const { isDemoMode, showDemoBadge, showDemoNotice, lastUpdatedAt, stats } = adminConfig;

  const { count: recent7Days, ref: ref1 } = useCountUp(stats.recent7Days || 0);
  const { count: totalConsultations, ref: ref2 } = useCountUp(stats.totalConsultations || 0);
  const { count: completedConsultations, ref: ref3 } = useCountUp(stats.completedConsultations || 0);

  const renderStatValue = (val: number | null, animatedVal: number, fallback: string) => {
    if (val === null || val === undefined || val === 0) {
      return <span className="text-xl md:text-2xl font-bold tracking-tight text-white/50">{fallback}</span>;
    }
    return animatedVal.toLocaleString();
  };

  return (
    <section className="py-24 bg-black relative border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          {showDemoBadge && isDemoMode && (
            <div className="absolute top-0 right-0 hidden md:block">
              <span className="bg-brand-orange/20 text-brand-orange text-xs font-bold px-3 py-1 rounded-sm border border-brand-orange/30">
                DEMO DATA
              </span>
            </div>
          )}
          
          <div className="inline-block border border-white/20 bg-white/5 px-4 py-1.5 rounded-full mb-6 relative overflow-hidden">
            <span className="relative z-10 text-white/70 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow"></span>
              HANDOPOKPART CAR DATA
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 tracking-tight">
            숫자로 확인하는 <span className="text-brand-yellow">한도폭발카</span> 상담 현황
          </h2>
          <p className="text-brand-body text-lg max-w-2xl mx-auto leading-relaxed">
            개인회생·저신용 중고차 상담부터 차량 조건 확인과 출고 상담까지 한도폭발카의 상담 흐름을 한눈에 확인해 보세요.
          </p>

          {showDemoBadge && isDemoMode && (
            <div className="mt-6 md:hidden">
              <span className="bg-brand-orange/20 text-brand-orange text-xs font-bold px-3 py-1 rounded-sm border border-brand-orange/30">
                DEMO DATA
              </span>
            </div>
          )}
        </div>

        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          
          {/* 7DAYS Card */}
          <div ref={ref1} className="bg-[#171B22] border border-brand-yellow/20 rounded-xl p-6 relative overflow-hidden group clip-chamfer">
            {/* Dashboard Visuals */}
            <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none flex gap-1">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-1.5 h-6 bg-white/40 rounded-sm" style={{ height: `${(i+1)*4}px` }}></div>
              ))}
            </div>
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="bg-brand-bg border border-white/10 w-10 h-10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="bg-black/60 border border-white/10 px-3 py-1 rounded-sm">
                <span className="text-[10px] font-bold text-white/70 tracking-widest">MODE: 7DAYS</span>
              </div>
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl lg:text-6xl font-display font-black text-white font-mono tracking-tighter" style={{ width: stats.recent7Days ? '4ch' : 'auto', display: 'inline-block' }}>
                  {renderStatValue(stats.recent7Days, recent7Days, "최근 데이터 없음")}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1">최근 7일간 한도폭발카에 접수된 상담 문의 건수입니다.</p>
                <p className="text-xs text-brand-body/60">차량 구매·개인회생·저신용 상담 문의 포함</p>
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 text-[10px] text-white/30 font-mono">
              UPDATED: {lastUpdatedAt}
            </div>
          </div>

          {/* TOTAL Card (Highlighted) */}
          <div ref={ref2} className="bg-[#1C2128] border border-brand-yellow/50 rounded-xl p-6 relative overflow-hidden group shadow-[0_0_30px_rgba(232,255,63,0.1)] clip-chamfer lg:scale-105 z-10">
            {/* Dashboard Visuals - Speedometer curve */}
            <div className="absolute -top-12 -right-12 w-48 h-48 border-[20px] border-dashed border-brand-yellow/10 rounded-full pointer-events-none"></div>
            <div className="absolute -top-8 -right-8 w-40 h-40 border-[2px] border-brand-yellow/20 rounded-full pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="bg-brand-yellow/20 border border-brand-yellow/30 w-10 h-10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-brand-yellow" />
              </div>
              <div className="bg-black/60 border border-brand-yellow/30 px-3 py-1 rounded-sm shadow-[0_0_10px_rgba(232,255,63,0.2)]">
                <span className="text-[10px] font-bold text-brand-yellow tracking-widest">MODE: TOTAL</span>
              </div>
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl lg:text-7xl font-display font-black text-brand-yellow font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(232,255,63,0.4)]" style={{ width: stats.totalConsultations ? '6.5ch' : 'auto', display: 'inline-block' }}>
                  {renderStatValue(stats.totalConsultations, totalConsultations, "집계 준비 중")}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1">한도폭발카에 누적 접수된 전체 상담 문의 건수입니다.</p>
                <p className="text-xs text-brand-yellow/60">전화·카카오톡·홈페이지 상담 접수 포함</p>
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 text-[10px] text-brand-yellow/30 font-mono">
              UPDATED: {lastUpdatedAt}
            </div>
          </div>

          {/* SUCCESS Card */}
          <div ref={ref3} className="bg-[#171B22] border border-brand-orange/30 rounded-xl p-6 relative overflow-hidden group clip-chamfer">
            {/* Dashboard Visuals - Progress Bar */}
            <div className="absolute top-6 right-6 flex gap-1 pointer-events-none opacity-30">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-sm ${i < 3 ? 'bg-brand-orange' : 'bg-white/20'}`}></div>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="bg-brand-orange/20 border border-brand-orange/30 w-10 h-10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-brand-orange" />
              </div>
              <div className="bg-black/60 border border-white/10 px-3 py-1 rounded-sm">
                <span className="text-[10px] font-bold text-white/70 tracking-widest">MODE: SUCCESS</span>
              </div>
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl lg:text-6xl font-display font-black text-brand-orange font-mono tracking-tighter" style={{ width: stats.completedConsultations ? '6.5ch' : 'auto', display: 'inline-block' }}>
                  {renderStatValue(stats.completedConsultations, completedConsultations, "데이터 연결 예정")}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1">상담 절차가 완료되었거나 차량 상담이 다음 단계로 진행된 누적 건수입니다.</p>
                <p className="text-xs text-brand-body/60">조건확인·차량추천·출고상담 단계 포함</p>
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 text-[10px] text-white/30 font-mono">
              UPDATED: {lastUpdatedAt}
            </div>
          </div>

        </div>

        {/* Demo Notice */}
        {showDemoNotice && isDemoMode && (
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center mb-16 max-w-3xl mx-auto">
            <p className="text-xs md:text-sm text-brand-body/70">
              현재 통계는 화면 구성 확인을 위한 예시값입니다. 실제 운영 시 관리자 입력값 또는 집계 데이터로 교체됩니다.
            </p>
          </div>
        )}

        {/* CTA Area */}
        <div className="bg-[#171B22] border border-white/10 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden clip-chamfer">
          {/* Decor */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-yellow/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-10">
            <span className="text-brand-yellow text-xs font-bold tracking-widest uppercase mb-4 block">CHECK YOUR CONDITION</span>
            <h3 className="text-2xl md:text-4xl font-display font-black text-white mb-4">
              포기하기 전에 내 조건부터 확인해 보세요
            </h3>
            <p className="text-brand-body mb-8 max-w-xl mx-auto">
              개인회생 진행 상태, 현재 소득, 필요한 차량과 원하는 월 납입금부터 확인하면 현재 상황에서 검토할 수 있는 방향을 상담받을 수 있습니다.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-black" onClick={() => window.location.href = '#consult-form'}>
                내 조건 확인 시작 <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="accent" size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = 'tel:18004959'}>
                <Phone className="w-5 h-5 mr-2" /> 1800-4959 전화상담
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto !border-brand-yellow/30 hover:!bg-brand-yellow/10" onClick={() => window.open('https://open.kakao.com/o/seC75DCi', '_blank')}>
                <MessageCircle className="w-5 h-5 mr-2 text-brand-yellow" />
                <span className="text-white">카카오톡 빠른 상담</span>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
