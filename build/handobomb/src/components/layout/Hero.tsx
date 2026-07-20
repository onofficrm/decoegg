import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { getConsultAvailability } from '../../lib/consultAvailability';
import { goConsult } from '../../lib/sitePages';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2400&auto=format&fit=crop';

const LIVE_FEED = [
  '김○○님 · 개인회생 · 아반떼 상담 접수',
  '박○○님 · 저신용 · K5 조건 확인',
  '이○○님 · 면책 후 · 레이 차량 추천',
  '최○○님 · 사업자 · 카니발 서류 확인',
  '정○○님 · 할부 거절 · SUV 재상담',
  '한○○님 · 프리랜서 · 월납 조건 확인',
  '조○○님 · 개인회생 · 쏘렌토 상담 접수',
  '윤○○님 · 저신용 · 경차 조건 확인',
];

const FOCUS_LINES = ['개인회생 진행·면책', '저신용·할부 거절', '월납 가능 범위 설계'];

export function Hero() {
  const availability = getConsultAvailability();
  const feed = [...LIVE_FEED, ...LIVE_FEED];

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      {/* Full-bleed visual — keep right side clearer so the car fills the frame */}
      <div className="absolute inset-0">
        <motion.img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[72%_42%] md:object-[78%_40%]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: [0.16, 1, 0.3, 1] }}
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
        {/* Strong left for type, softer right so the car remains the mass */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/88 to-transparent md:to-[#05070a]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-[#05070a]/55" />
        <div className="absolute inset-y-0 left-0 w-[min(56%,42rem)] bg-gradient-to-r from-[#05070a]/95 to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
      </div>

      {/* Atmospheric right typography — fills void without competing with brand */}
      <div
        className="pointer-events-none absolute right-[-2%] top-1/2 hidden lg:block -translate-y-1/2 select-none"
        aria-hidden="true"
      >
        <p className="font-display font-black italic text-[7.5rem] xl:text-[9rem] leading-none tracking-tighter text-white/[0.045] rotate-90 origin-center whitespace-nowrap">
          LIMIT OPEN
        </p>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 flex-1 flex flex-col justify-end pb-6 md:pb-8">
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] gap-10 lg:gap-14 items-end">
          <motion.div
            className="relative pl-4 sm:pl-5 border-l border-brand-yellow/70 space-y-7 sm:space-y-8 max-w-xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
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

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-[1.12]">
                막힌 할부,
                <br />
                <span className="text-brand-yellow">여기서 다시 뚫어보세요</span>
              </h1>
              <p className="text-base sm:text-lg text-white/68 leading-relaxed">
                신용점수가 아니라, 지금 가능한 조건을 끝까지 확인합니다.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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

            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/40">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  availability.open ? 'bg-brand-green animate-pulse' : 'bg-white/35'
                }`}
              />
              <span>{availability.label}</span>
              <span className="text-white/20">·</span>
              <span>상담만으로 금융조회·계약은 진행되지 않습니다</span>
            </p>
          </motion.div>

          {/* Quiet focus plate — structure on the right without badge clutter */}
          <motion.div
            className="hidden lg:block mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ml-auto max-w-sm border border-white/10 bg-black/35 backdrop-blur-md px-7 py-7">
              <p className="text-[11px] tracking-[0.22em] uppercase text-brand-yellow/80 mb-5">
                What we check
              </p>
              <ul className="space-y-4">
                {FOCUS_LINES.map((line, index) => (
                  <li key={line} className="flex gap-4 items-baseline border-b border-white/10 last:border-0 pb-4 last:pb-0">
                    <span className="font-mono text-[11px] text-white/35 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/88 text-[15px] font-medium leading-snug">{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-white/40 leading-relaxed">
                차량 예산부터 추가 필요자금까지, 한 번의 상담으로 범위를 맞춰 드립니다.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom live feed — fills the lower void with quiet motion */}
      <div className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4 overflow-hidden">
          <span className="shrink-0 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-brand-yellow">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
            Live
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/80 to-transparent z-10" />
            <div className="flex w-max gap-10 animate-hero-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
              {feed.map((item, i) => (
                <span key={`${item}-${i}`} className="text-sm text-white/55 whitespace-nowrap">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
