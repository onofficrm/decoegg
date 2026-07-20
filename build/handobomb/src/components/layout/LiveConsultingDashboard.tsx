import { CheckCircle2, FileText, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';

// --- Data Models ---
interface ConsultItem {
  id: number;
  name: string;
  detail: string;
  status: string;
}

const purchaseRequests: ConsultItem[] = [
  { id: 1, name: '김○○님', detail: 'K5 구매 상담을 접수하셨습니다.', status: '상담접수' },
  { id: 2, name: '박○○님', detail: '출퇴근용 아반떼 상담을 접수하셨습니다.', status: '상담중' },
  { id: 3, name: '이○○님', detail: '가족용 카니발 상담을 신청하셨습니다.', status: '차량확인' },
  { id: 4, name: '최○○님', detail: '중형 SUV 구매 문의를 남기셨습니다.', status: '차량추천' },
  { id: 5, name: '정○○님', detail: '그랜저 구매 상담을 신청하셨습니다.', status: '상담완료' },
  { id: 6, name: '한○○님', detail: '레이 구매 상담을 접수하셨습니다.', status: '상담접수' },
  { id: 7, name: '조○○님', detail: '쏘렌토 차량 상담을 신청하셨습니다.', status: '상담중' },
  { id: 8, name: '윤○○님', detail: '경차 구매 문의를 남기셨습니다.', status: '차량확인' },
  { id: 9, name: '오○○님', detail: '생업용 차량 상담을 신청하셨습니다.', status: '차량추천' },
  { id: 10, name: '장○○님', detail: '화물차 구매 상담을 접수하셨습니다.', status: '상담접수' },
  { id: 11, name: '임○○님', detail: '스포티지 상담을 신청하셨습니다.', status: '상담중' },
  { id: 12, name: '서○○님', detail: '기존 차량 대차 상담을 신청하셨습니다.', status: '상담완료' },
];

const conditionChecks: ConsultItem[] = [
  { id: 1, name: '김○○님', detail: '개인회생 인가 · K5 조건 확인 중', status: '접수완료' },
  { id: 2, name: '박○○님', detail: '저신용 직장인 · 월 납입금 상담 중', status: '조건확인' },
  { id: 3, name: '이○○님', detail: '개인회생 진행 중 · SUV 차량 확인', status: '서류확인' },
  { id: 4, name: '최○○님', detail: '기존 할부 거절 · 재상담 진행', status: '차량검토' },
  { id: 5, name: '정○○님', detail: '파산면책 · 그랜저 차량 추천', status: '차량추천' },
  { id: 6, name: '한○○님', detail: '개인사업자 · 카니발 서류 확인', status: '상담완료' },
  { id: 7, name: '조○○님', detail: '프리랜서 · 소득자료 확인 중', status: '접수완료' },
  { id: 8, name: '윤○○님', detail: '저신용 고객 · 경차 상담 접수', status: '조건확인' },
  { id: 9, name: '오○○님', detail: '개인회생 면책 · 차량예산 상담', status: '서류확인' },
  { id: 10, name: '장○○님', detail: '직장인 · 구매조건 확인 중', status: '차량검토' },
  { id: 11, name: '임○○님', detail: '일용직 · 소득조건 상담 중', status: '차량추천' },
  { id: 12, name: '서○○님', detail: '사업자 · 생업용 차량 검토', status: '상담완료' },
];

// Helper for status colors
function getStatusColor(status: string) {
  switch (status) {
    case '상담접수':
    case '접수완료':
      return 'text-white bg-white/10 border-white/20';
    case '상담중':
    case '조건확인':
    case '서류확인':
      return 'text-brand-yellow bg-brand-yellow/10 border-brand-yellow/20';
    case '차량확인':
    case '차량검토':
    case '차량추천':
      return 'text-brand-green bg-brand-green/10 border-brand-green/20';
    case '상담완료':
      return 'text-brand-orange bg-brand-orange/10 border-brand-orange/20';
    default:
      return 'text-brand-body bg-white/5 border-white/10';
  }
}

export function LiveConsultingDashboard() {
  const showNotice = true; // Admin toggle placeholder

  return (
    <section className="py-24 bg-brand-bg relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block border border-brand-yellow/30 bg-brand-yellow/10 px-4 py-1.5 rounded-full mb-6 relative overflow-hidden">
            <span className="relative z-10 text-brand-yellow text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse"></span>
              Live Consulting Dashboard
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 tracking-tight">
            지금도 한도폭발카 상담은 <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-orange">진행 중입니다</span>
          </h2>
          <p className="text-brand-body text-lg max-w-2xl mx-auto leading-relaxed">
            개인회생·저신용 중고차 상담부터 차량 선택과 월 납입 조건 확인까지 현재 진행되는 상담 유형을 확인해 보세요.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Purchase Requests */}
          <div className="bg-[#171B22] border border-brand-yellow/30 rounded-xl overflow-hidden relative shadow-[0_0_24px_rgba(232,255,63,0.1)] clip-chamfer flex flex-col h-[520px]">
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-black/40 z-20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                <span className="text-xs font-bold text-white/70 tracking-widest uppercase">Live Purchase Request</span>
              </div>
              <h3 className="text-xl font-bold text-white">실시간 구매 상담</h3>
            </div>
            
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            {/* List Container */}
            <div className="flex-1 overflow-hidden relative z-10 p-5 group">
              {/* Fade masks */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#171B22] to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#171B22] to-transparent z-10"></div>
              
              <div className="flex flex-col gap-3 animate-scroll-y group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none active:[animation-play-state:paused]">
                {/* Block 1 */}
                <div className="flex flex-col gap-3">
                  {purchaseRequests.map((req, i) => (
                    <div key={`pr1-${i}`} className="bg-black/30 border border-white/5 rounded-lg p-4 flex items-center gap-4 hover:border-white/20 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-brand-yellow/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-brand-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm break-keep">{req.name}</h4>
                        <p className="text-brand-body text-xs line-clamp-2 break-keep mt-1">{req.detail}</p>
                      </div>
                      <div className={`px-2.5 py-1 rounded-sm text-[10px] font-bold border shrink-0 ${getStatusColor(req.status)}`}>
                        {req.status}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Block 2 for Infinite Scroll */}
                <div className="flex flex-col gap-3" aria-hidden="true">
                  {purchaseRequests.map((req, i) => (
                    <div key={`pr2-${i}`} className="bg-black/30 border border-white/5 rounded-lg p-4 flex items-center gap-4 hover:border-white/20 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-brand-yellow/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-brand-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm break-keep">{req.name}</h4>
                        <p className="text-brand-body text-xs line-clamp-2 break-keep mt-1">{req.detail}</p>
                      </div>
                      <div className={`px-2.5 py-1 rounded-sm text-[10px] font-bold border shrink-0 ${getStatusColor(req.status)}`}>
                        {req.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notice */}
            {showNotice && (
              <div className="p-3 bg-black/60 text-[10px] text-brand-body/50 text-center border-t border-white/5 relative z-20">
                현재 목록은 UI 확인을 위한 상담 예시입니다. 실제 운영 시 관리자 등록 데이터로 교체됩니다.
              </div>
            )}
          </div>

          {/* Card 2: Condition Checks */}
          <div className="bg-[#171B22] border border-white/10 hover:border-brand-yellow/30 transition-colors rounded-xl overflow-hidden relative clip-chamfer flex flex-col h-[520px]">
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-black/40 z-20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse shadow-[0_0_8px_rgba(255,90,31,0.8)]"></div>
                <span className="text-xs font-bold text-white/70 tracking-widest uppercase">Condition Check Status</span>
              </div>
              <h3 className="text-xl font-bold text-white">실시간 조건 확인 현황</h3>
            </div>
            
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            {/* List Container */}
            <div className="flex-1 overflow-hidden relative z-10 p-5 group">
              {/* Fade masks */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#171B22] to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#171B22] to-transparent z-10"></div>
              
              <div className="flex flex-col gap-3 animate-scroll-y group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none active:[animation-play-state:paused]" style={{ animationDelay: '-10s' }}>
                {/* Block 1 */}
                <div className="flex flex-col gap-3">
                  {conditionChecks.map((req, i) => (
                    <div key={`cc1-${i}`} className="bg-black/30 border border-white/5 rounded-lg p-4 flex items-center gap-4 hover:border-white/20 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-brand-orange" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm break-keep">{req.name}</h4>
                        <p className="text-brand-body text-xs line-clamp-2 break-keep mt-1">{req.detail}</p>
                      </div>
                      <div className={`px-2.5 py-1 rounded-sm text-[10px] font-bold border shrink-0 ${getStatusColor(req.status)}`}>
                        {req.status}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Block 2 for Infinite Scroll */}
                <div className="flex flex-col gap-3" aria-hidden="true">
                  {conditionChecks.map((req, i) => (
                    <div key={`cc2-${i}`} className="bg-black/30 border border-white/5 rounded-lg p-4 flex items-center gap-4 hover:border-white/20 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-brand-orange" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm break-keep">{req.name}</h4>
                        <p className="text-brand-body text-xs line-clamp-2 break-keep mt-1">{req.detail}</p>
                      </div>
                      <div className={`px-2.5 py-1 rounded-sm text-[10px] font-bold border shrink-0 ${getStatusColor(req.status)}`}>
                        {req.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notice */}
            {showNotice && (
              <div className="p-3 bg-black/60 text-[10px] text-brand-body/50 text-center border-t border-white/5 relative z-20">
                현재 목록은 UI 확인을 위한 상담 예시입니다. 실제 운영 시 관리자 등록 데이터로 교체됩니다.
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
