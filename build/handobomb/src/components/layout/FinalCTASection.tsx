import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { goConsult } from '../../lib/sitePages';

export function FinalCTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/[0.06]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2400&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-brand-yellow/80 mb-5">
          Next step
        </p>
        <h2 className="text-3xl md:text-5xl font-display font-black leading-tight tracking-tight text-white mb-5">
          포기하기 전에
          <br />
          <span className="text-brand-yellow">한 번 더 확인해 보세요</span>
        </h2>
        <p className="text-base md:text-lg text-white/65 leading-relaxed max-w-xl mb-10">
          개인회생이나 낮은 신용점수만으로 가능성을 미리 단정하지 마세요.
          지금 소득과 월납 기준으로 함께 확인합니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={() => goConsult()}>
            조건 확인 신청 <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto !border-white/25 !text-white hover:!bg-white/10"
            onClick={() => {
              window.location.href = 'tel:18004959';
            }}
          >
            <Phone className="w-5 h-5 mr-1" /> 1800-4959
          </Button>
        </div>
      </div>
    </section>
  );
}
