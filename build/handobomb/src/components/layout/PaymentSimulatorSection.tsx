import { useMemo, useState } from 'react';
import { Calculator, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

type SimMode = 'byPrice' | 'byBudget';

function calcMonthlyPayment(principal: number, annualRatePct: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

function calcMaxPrincipal(monthly: number, annualRatePct: number, months: number) {
  if (monthly <= 0 || months <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return monthly * months;
  const factor = Math.pow(1 + r, months);
  return (monthly * (factor - 1)) / (r * factor);
}

function formatWon(value: number) {
  return Math.round(value).toLocaleString('ko-KR') + '원';
}

function formatMan(value: number) {
  const man = Math.round(value / 10000);
  return man.toLocaleString('ko-KR') + '만원';
}

export function PaymentSimulatorSection() {
  const [mode, setMode] = useState<SimMode>('byBudget');
  const [vehiclePrice, setVehiclePrice] = useState(15000000);
  const [downPayment, setDownPayment] = useState(2000000);
  const [monthlyBudget, setMonthlyBudget] = useState(400000);
  const [months, setMonths] = useState(36);
  const [annualRate, setAnnualRate] = useState(12);

  const result = useMemo(() => {
    const safeDown = Math.min(Math.max(downPayment, 0), vehiclePrice);
    const principal = Math.max(vehiclePrice - safeDown, 0);

    if (mode === 'byPrice') {
      const monthly = calcMonthlyPayment(principal, annualRate, months);
      const total = monthly * months + safeDown;
      return {
        monthly,
        principal,
        total,
        maxVehicle: vehiclePrice,
        interestTotal: Math.max(monthly * months - principal, 0),
      };
    }

    const maxPrincipal = calcMaxPrincipal(monthlyBudget, annualRate, months);
    const maxVehicle = maxPrincipal + safeDown;
    const monthly = monthlyBudget;
    const total = monthly * months + safeDown;
    return {
      monthly,
      principal: maxPrincipal,
      total,
      maxVehicle,
      interestTotal: Math.max(monthly * months - maxPrincipal, 0),
    };
  }, [mode, vehiclePrice, downPayment, monthlyBudget, months, annualRate]);

  const goConsult = () => {
    const el = document.getElementById('consult-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const termOptions = [24, 36, 48, 60];

  return (
    <section id="payment-simulator" className="py-24 bg-[#0A0C10] border-t border-white/5 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[420px] h-[420px] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-yellow/10 text-brand-yellow mb-6">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 tracking-tight">
            월납 납입 시뮬레이터
          </h2>
          <p className="text-lg text-brand-body leading-relaxed">
            월 납입 가능 금액 또는 차량가로 대략적인 할부 범위를 먼저 확인해 보세요.<br className="hidden md:block" />
            실제 심사·금리·상품에 따라 결과는 달라질 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-3 bg-brand-card border border-white/5 clip-chamfer p-6 sm:p-8 space-y-8">
            <div className="flex p-1 bg-black/40 border border-white/5">
              <button
                type="button"
                onClick={() => setMode('byBudget')}
                className={`flex-1 py-3 text-sm sm:text-base font-bold transition-colors ${
                  mode === 'byBudget' ? 'bg-brand-yellow text-brand-bg' : 'text-brand-body hover:text-white'
                }`}
              >
                월납으로 차량가 추정
              </button>
              <button
                type="button"
                onClick={() => setMode('byPrice')}
                className={`flex-1 py-3 text-sm sm:text-base font-bold transition-colors ${
                  mode === 'byPrice' ? 'bg-brand-yellow text-brand-bg' : 'text-brand-body hover:text-white'
                }`}
              >
                차량가로 월납 계산
              </button>
            </div>

            {mode === 'byBudget' ? (
              <div className="space-y-3">
                <div className="flex items-end justify-between gap-4">
                  <label className="text-sm font-bold text-white">월 납입 가능 금액</label>
                  <span className="font-display font-black text-brand-yellow text-xl">{formatMan(monthlyBudget)}</span>
                </div>
                <input
                  type="range"
                  min={200000}
                  max={1000000}
                  step={50000}
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="w-full accent-brand-yellow"
                />
                <div className="flex justify-between text-xs text-brand-body/60">
                  <span>20만원</span>
                  <span>100만원</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-end justify-between gap-4">
                  <label className="text-sm font-bold text-white">희망 차량가</label>
                  <span className="font-display font-black text-brand-yellow text-xl">{formatMan(vehiclePrice)}</span>
                </div>
                <input
                  type="range"
                  min={5000000}
                  max={40000000}
                  step={500000}
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  className="w-full accent-brand-yellow"
                />
                <div className="flex justify-between text-xs text-brand-body/60">
                  <span>500만원</span>
                  <span>4,000만원</span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-end justify-between gap-4">
                <label className="text-sm font-bold text-white">선수금(계약금)</label>
                <span className="font-display font-black text-white text-xl">{formatMan(downPayment)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={mode === 'byPrice' ? vehiclePrice : 10000000}
                step={100000}
                value={Math.min(downPayment, mode === 'byPrice' ? vehiclePrice : 10000000)}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-brand-yellow"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-white block">할부 기간</label>
              <div className="grid grid-cols-4 gap-2">
                {termOptions.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    className={`py-3 text-sm font-bold border transition-colors clip-chamfer ${
                      months === m
                        ? 'bg-brand-yellow/10 border-brand-yellow text-brand-yellow'
                        : 'bg-brand-bg border-white/10 text-brand-body hover:border-brand-yellow/40'
                    }`}
                  >
                    {m}개월
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-end justify-between gap-4">
                <label className="text-sm font-bold text-white">예상 연이율(참고)</label>
                <span className="font-display font-black text-white text-xl">{annualRate.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={6}
                max={24}
                step={0.5}
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full accent-brand-yellow"
              />
              <p className="text-xs text-brand-body/60">실제 적용 금리는 심사·금융사 상품에 따라 달라집니다.</p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-brand-yellow text-brand-bg clip-chamfer p-6 sm:p-8 flex flex-col dashboard-glow">
            <div className="flex items-center gap-2 mb-6">
              <RefreshCw className="w-5 h-5" />
              <span className="text-sm font-bold opacity-80">실시간 추정 결과</span>
            </div>

            {mode === 'byBudget' ? (
              <>
                <p className="text-sm font-bold opacity-70 mb-2">검토 가능한 차량가 범위(대략)</p>
                <p className="font-display font-black text-4xl sm:text-5xl tracking-tight mb-6">
                  {formatMan(result.maxVehicle)}
                </p>
                <p className="text-sm font-bold opacity-70 mb-1">월 납입 기준</p>
                <p className="font-display font-black text-2xl mb-8">{formatWon(result.monthly)}</p>
              </>
            ) : (
              <>
                <p className="text-sm font-bold opacity-70 mb-2">예상 월 납입금</p>
                <p className="font-display font-black text-4xl sm:text-5xl tracking-tight mb-6">
                  {formatWon(result.monthly)}
                </p>
                <p className="text-sm font-bold opacity-70 mb-1">할부 원금</p>
                <p className="font-display font-black text-2xl mb-8">{formatWon(result.principal)}</p>
              </>
            )}

            <div className="space-y-3 text-sm font-bold border-t border-brand-bg/15 pt-5 mb-8">
              <div className="flex justify-between gap-4">
                <span className="opacity-70">선수금</span>
                <span>{formatWon(Math.min(downPayment, mode === 'byPrice' ? vehiclePrice : downPayment))}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="opacity-70">기간</span>
                <span>{months}개월</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="opacity-70">예상 이자 합계</span>
                <span>{formatWon(result.interestTotal)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="opacity-70">총 부담(대략)</span>
                <span>{formatWon(result.total)}</span>
              </div>
            </div>

            <div className="mt-auto space-y-3">
              <Button
                variant="secondary"
                size="lg"
                fullWidth
                className="!bg-brand-bg !text-white hover:!bg-black"
                onClick={goConsult}
              >
                이 조건으로 상담 신청 <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="md"
                fullWidth
                className="!border-brand-bg/30 !text-brand-bg hover:!bg-brand-bg/10"
                onClick={() => window.open('https://open.kakao.com/o/seC75DCi', '_blank')}
              >
                카카오톡으로 결과 물어보기
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-black/40 border border-white/5 p-5 sm:p-6 clip-chamfer max-w-4xl mx-auto">
          <div className="flex items-start gap-3 text-sm text-brand-body/80">
            <AlertCircle className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-white">안내</p>
              <p>
                본 계산은 참고용 시뮬레이션이며, 실제 승인 여부·금리·월납·한도는 고객 조건과 금융사 심사에 따라
                달라집니다. 상담 신청만으로 신용조회·계약이 진행되지 않습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
