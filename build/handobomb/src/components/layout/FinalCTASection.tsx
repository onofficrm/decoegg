import { ArrowRight, Phone, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { goConsult } from '../../lib/sitePages';

export function FinalCTASection() {
  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden border-t border-white/10">
      {/* Background Graphic - Car with headlights */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop" 
          alt="Dark SUV" 
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Typography & Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-black leading-tight tracking-tighter text-white">
              포기하기 전에<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-[#B2C620]">
                한 번 더 확인해 보세요
              </span>
            </h2>
            
            <p className="text-xl text-white/90 leading-relaxed font-medium">
              개인회생이나 낮은 신용점수만으로 차량 구매 가능성을 미리 단정하지 마세요.
            </p>
            
            <p className="text-brand-body leading-relaxed max-w-xl">
              현재 소득, 재직 상태, 월 납입 가능 금액과 필요한 차량을 확인하여 검토할 수 있는 방법을 함께 찾아드립니다.<br /><br />
              차량 구매와 추가 필요자금 상담이 모두 필요하다면 한 번의 신청으로 함께 확인해 보세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-black" onClick={() => goConsult()}>
                내 조건 확인 신청 <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="accent" size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = 'tel:18004959'}>
                <Phone className="w-5 h-5 mr-2" /> 1800-4959 전화상담
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto !border-brand-yellow/30 hover:!bg-brand-yellow/10" onClick={() => window.open('https://open.kakao.com/o/seC75DCi', '_blank')}>
                <MessageCircle className="w-5 h-5 mr-2 text-brand-yellow" />
                <span className="text-white">카카오톡 빠른 상담</span>
              </Button>
            </div>
          </div>

          {/* Right: Summary Card */}
          <div className="lg:pl-12">
            <div className="bg-brand-card/80 backdrop-blur-sm border border-brand-yellow/30 p-8 clip-chamfer relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <FileText className="w-6 h-6 text-brand-yellow" />
                <h3 className="text-xl font-bold text-white">상담 요약 체크리스트</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white mb-1">통합 조건 확인</h4>
                    <p className="text-sm text-brand-body">신용점수, 소득, 재직상태를 모두 고려한 맞춤 분석</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white mb-1">투명한 예산 설계</h4>
                    <p className="text-sm text-brand-body">차량 대금, 이전비, 보험료까지 포함한 월 납입금 안내</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white mb-1">추가 자금 동시 상담</h4>
                    <p className="text-sm text-brand-body">필요 시 한 번의 상담으로 차량과 추가 자금 한도 확인</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
