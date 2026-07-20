import { CheckSquare, ArrowRight, PenTool } from 'lucide-react';
import { Button } from '../ui/Button';
import { goConsult } from '../../lib/sitePages';

export function CustomerCheckpointsSection() {
  const customerTypes = [
    {
      title: '유형 1. 개인회생 진행 중',
      items: ['개인회생 진행 단계', '변제계획 인가 여부', '현재 변제 상황', '재직과 소득 자료', '원하는 차량과 월 납입금']
    },
    {
      title: '유형 2. 개인회생 인가 후',
      items: ['인가 결정 시점', '변제금 납입 상태', '미납 여부', '현재 소득', '기존 금융 이용 현황']
    },
    {
      title: '유형 3. 저신용 고객',
      items: ['현재 소득', '재직 기간', '기존 부채', '최근 금융조회', '차량 구매예산']
    },
    {
      title: '유형 4. 파산면책 고객',
      items: ['면책 결정 시점', '현재 경제활동', '소득증빙 가능 여부', '필요한 차량 종류']
    },
    {
      title: '유형 5. 사업자·프리랜서',
      items: ['사업 또는 활동 기간', '통장 입금내역', '소득금액증명', '부가세 신고자료', '건강보험 또는 국민연금 자료']
    },
  ];

  return (
    <section className="py-24 bg-[#0A0C10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-yellow/10 text-brand-yellow mb-6">
            <PenTool className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 tracking-tight">
            고객 상황별 체크포인트
          </h2>
          <p className="text-lg text-brand-body leading-relaxed">
            한도폭발카의 자체 진단 시스템으로 고객님의 현재 상황에 맞는 필수 확인 사항을 점검합니다.<br className="hidden md:block" />
            정확한 진단이 곧 더 높은 승인율로 이어집니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customerTypes.map((type, index) => (
            <div 
              key={index} 
              className="bg-brand-card border border-white/10 p-6 sm:p-8 flex flex-col relative overflow-hidden group clip-chamfer"
            >
              {/* Report Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="text-brand-yellow font-mono text-xs font-bold opacity-80">
                  DIAGNOSTIC REPORT {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-brand-yellow/50"></div>
                  <div className="w-2 h-2 rounded-full bg-brand-yellow/50"></div>
                  <div className="w-2 h-2 rounded-full bg-brand-yellow/50"></div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-6">
                {type.title}
              </h3>

              <div className="space-y-4 mb-8 flex-grow">
                {type.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckSquare className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
                    <span className="text-sm text-brand-body">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/5 border-dashed relative z-10">
                <Button variant="outline" fullWidth onClick={() => goConsult()}>
                  내 상황 상담받기 <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              {/* Decorative scan line effect on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow/50 opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite] blur-[2px] pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
