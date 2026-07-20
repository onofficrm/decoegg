import { ArrowRight, Phone, MessageCircle, ShieldCheck, Gauge, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  const statusTags = [
    '개인회생 진행 중',
    '저신용 직장인',
    '파산면책',
    '기존 할부 거절',
    '사업자·프리랜서',
    '전국 상담 가능'
  ];

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SEO Hidden H1 */}
        <h1 className="sr-only">개인회생중고차할부·저신용중고차할부 전문상담 한도폭발카</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-yellow/10 text-brand-yellow font-bold text-sm border border-brand-yellow/20">
              <Zap className="w-4 h-4" />
              <span>개인회생·저신용 중고차 할부 전문상담</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tight text-white">
                막힌 할부,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-orange">
                  여기서 다시 뚫어보세요
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl font-bold text-white/90 leading-snug">
                차량 구매예산부터 추가 필요자금 상담까지<br className="hidden md:block" />
                내 조건에 맞는 방법을 끝까지 확인합니다
              </p>
              
              <p className="text-base text-brand-body leading-relaxed max-w-xl">
                신용점수 하나만 보고 가능 여부를 판단하지 않습니다.<br />
                개인회생 진행 상태, 현재 소득, 재직 기간, 차량 용도와 월 납입 가능 금액을 종합적으로 확인하여 고객의 현재 조건에서 검토할 수 있는 중고차 구매 방법을 안내합니다.
              </p>
            </div>

            {/* Status Tags */}
            <div className="flex flex-wrap gap-2">
              {statusTags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-brand-card border border-white/5 rounded-md text-xs font-medium text-brand-body">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                내 차량구매 조건 확인하기 <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
              <Button variant="accent" size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = 'tel:18004959'}>
                <Phone className="w-5 h-5 mr-1" /> 바로 전화하기
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto !border-brand-yellow/30 hover:!bg-brand-yellow/10" onClick={() => window.open('https://open.kakao.com/o/seC75DCi', '_blank')}>
                <MessageCircle className="w-5 h-5 mr-1 text-brand-yellow" />
                <span className="text-white">카톡 상담</span>
              </Button>
            </div>

            {/* Bottom Info */}
            <div className="flex items-start gap-2 text-brand-body/60 text-xs mt-6">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              <p>상담 신청만으로 금융조회, 차량 계약 또는 금융상품 가입이 진행되지 않습니다.</p>
            </div>
          </div>

          {/* Right Column: Visual Graphic */}
          <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Dashboard Graphics Frame */}
            <div className="absolute inset-0 bg-brand-card clip-chamfer dashboard-border overflow-hidden group">
              {/* Car Image Image Background */}
              <img 
                src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2025&auto=format&fit=crop" 
                alt="중고차 할부 상담" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-in-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/50 to-transparent mix-blend-multiply"></div>
              
              {/* Dashboard UI Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
                {/* Top Info */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="text-brand-yellow font-mono text-sm font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
                      SYSTEM ACTIVE
                    </div>
                    <div className="text-white/40 font-mono text-xs">LIMIT EXPANSION MODE</div>
                  </div>
                  <div className="w-16 h-16 border-2 border-brand-yellow/20 rounded-full flex items-center justify-center border-t-brand-yellow animate-spin-slow">
                    <Gauge className="w-6 h-6 text-brand-yellow" />
                  </div>
                </div>

                {/* Center / Bottom Info */}
                <div className="flex justify-between items-end relative">
                  <div>
                    <div className="text-brand-body font-mono text-xs mb-1">APPROVAL RATE</div>
                    <div className="font-display font-black text-6xl text-white tracking-tighter flex items-end gap-1">
                      98<span className="text-3xl text-brand-yellow pb-2">.5%</span>
                    </div>
                  </div>
                  
                  {/* Digital Speedometer / RPM */}
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                      {/* Background Track */}
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" strokeDasharray="212" strokeDashoffset="42" strokeLinecap="round" />
                      {/* Foreground Track */}
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#FF5A1F" strokeWidth="8" strokeDasharray="212" strokeDashoffset="100" strokeLinecap="round" className="animate-[dash_2s_ease-out_forwards]" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#E8FF3F" strokeWidth="8" strokeDasharray="212" strokeDashoffset="150" strokeLinecap="round" className="animate-[dash_1.5s_ease-out_forwards]" />
                    </svg>
                    <div className="text-center">
                      <div className="text-brand-yellow font-display font-black text-2xl italic">MAX</div>
                      <div className="text-white/60 font-mono text-xs mt-1">LIMIT</div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>
              </div>
            </div>
            
            {/* Absolute Badges on the image */}
            <div className="absolute -bottom-6 -left-6 bg-brand-yellow text-brand-bg px-6 py-4 rounded-lg clip-chamfer shadow-[0_0_30px_rgba(232,255,63,0.3)] z-20 flex items-center gap-3">
              <Zap className="w-6 h-6" />
              <div>
                <div className="text-xs font-bold opacity-80">추가 여유자금</div>
                <div className="font-display font-black text-lg">상담 가능</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* CSS for animations */}
      <style>{`
        @keyframes dash {
          from { stroke-dashoffset: 212; }
        }
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
      `}</style>
    </section>
  );
}
