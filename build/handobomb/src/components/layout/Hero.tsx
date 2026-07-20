import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { getConsultAvailability } from '../../lib/consultAvailability';
import { goConsult } from '../../lib/sitePages';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2400&auto=format&fit=crop';

export function Hero() {
  const availability = getConsultAvailability();

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      {/* Full-bleed visual plane */}
      <div className="absolute inset-0">
        <motion.img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-center"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: [0.16, 1, 0.3, 1] }}
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090c] via-[#07090c]/78 to-[#07090c]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090c] via-[#07090c]/35 to-[#07090c]/45" />
        <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pb-24">
        <motion.div
          className="max-w-2xl space-y-8"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Brand — hero-level signal */}
          <div className="flex items-center gap-3">
            <span className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tighter text-white italic leading-none">
              한도폭발
            </span>
            <span className="relative inline-flex items-center justify-center">
              <span className="absolute inset-0 bg-brand-yellow -skew-x-12 rounded-sm" />
              <span className="relative z-10 font-display font-black text-2xl sm:text-3xl md:text-4xl text-brand-bg italic px-2 py-0.5 leading-none">
                카
              </span>
            </span>
          </div>

          <div className="space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-display font-black text-white tracking-tight leading-[1.12]">
              막힌 할부,
              <br />
              <span className="text-brand-yellow">여기서 다시 뚫어보세요</span>
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-lg">
              신용점수가 아니라, 지금 가능한 조건을 끝까지 확인합니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1">
            <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={() => goConsult()}>
              조건 확인하기 <ArrowRight className="w-5 h-5 ml-1" />
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

          <p className="flex items-center gap-2 text-sm text-white/45">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                availability.open ? 'bg-brand-green animate-pulse' : 'bg-white/40'
              }`}
            />
            {availability.label}
            <span className="text-white/25">·</span>
            상담만으로 금융조회·계약은 진행되지 않습니다
          </p>
        </motion.div>
      </div>

      {/* Soft bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none" />
    </section>
  );
}
