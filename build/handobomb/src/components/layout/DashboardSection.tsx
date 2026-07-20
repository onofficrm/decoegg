import { Gauge, FileText, Briefcase, Car, Wallet, ArrowRight, ShieldAlert } from 'lucide-react';
import { Button } from '../ui/Button';

export function DashboardSection() {
  const diagnosticItems = [
    {
      id: '01',
      title: '개인회생 진행 단계',
      icon: <FileText className="w-5 h-5 text-brand-yellow" />,
      status: '확인 필요',
      statusColor: 'text-brand-orange',
      bgGlow: 'from-brand-orange/20 to-transparent',
      valueBar: 30, // arbitrary value for visual bar representation
    },
    {
      id: '02',
      title: '현재 소득',
      icon: <Wallet className="w-5 h-5 text-brand-yellow" />,
      status: '상담 가능',
      statusColor: 'text-brand-green',
      bgGlow: 'from-brand-green/20 to-transparent',
      valueBar: 80,
    },
    {
      id: '03',
      title: '재직 또는 사업 기간',
      icon: <Briefcase className="w-5 h-5 text-brand-yellow" />,
      status: '서류 확인 필요',
      statusColor: 'text-brand-yellow',
      bgGlow: 'from-brand-yellow/20 to-transparent',
      valueBar: 50,
    },
    {
      id: '04',
      title: '기존 부채와 월 상환액',
      icon: <ShieldAlert className="w-5 h-5 text-brand-yellow" />,
      status: '추가 검토 필요',
      statusColor: 'text-brand-orange',
      bgGlow: 'from-brand-orange/20 to-transparent',
      valueBar: 40,
    },
    {
      id: '05',
      title: '원하는 차량과 차량 용도',
      icon: <Car className="w-5 h-5 text-brand-yellow" />,
      status: '상담 가능',
      statusColor: 'text-brand-green',
      bgGlow: 'from-brand-green/20 to-transparent',
      valueBar: 90,
    },
    {
      id: '06',
      title: '감당 가능한 월 납입금',
      icon: <Gauge className="w-5 h-5 text-brand-yellow" />,
      status: '확인 필요',
      statusColor: 'text-brand-body',
      bgGlow: 'from-white/10 to-transparent',
      valueBar: 20,
    },
  ];

  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 md:flex md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 tracking-tight leading-tight">
              한도는 숫자 하나로 <br className="hidden sm:block" />
              결정되지 않습니다
            </h2>
            <p className="text-lg text-brand-body leading-relaxed">
              신용점수만 확인해서는 현실적인 차량 구매예산과 월 납입 계획을 세우기 어렵습니다.<br className="hidden md:block" />
              고객의 여러 조건을 함께 확인하여 현재 상황에서 검토할 수 있는 방향을 안내합니다.
            </p>
          </div>
          
          <div className="hidden md:flex shrink-0 ml-8 items-center justify-center w-24 h-24 rounded-full border border-brand-yellow/20 relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-brand-yellow animate-spin-slow"></div>
            <Gauge className="w-10 h-10 text-brand-yellow/50" />
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {diagnosticItems.map((item) => (
            <div 
              key={item.id}
              className="bg-brand-card p-6 border border-white/5 relative overflow-hidden group hover:border-brand-yellow/30 transition-colors"
              style={{
                clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
              }}
            >
              {/* Background Glow */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.bgGlow} opacity-30`}></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-black/50 border border-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="font-mono text-xs text-brand-body/50 font-bold">MODULE {item.id}</div>
                </div>
                <div className={`text-sm font-bold ${item.statusColor}`}>
                  {item.status}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-4">
                {item.title}
              </h3>

              {/* Status Bar */}
              <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-current ${item.statusColor} opacity-70 transition-all duration-1000 ease-out`}
                  style={{ width: `${item.valueBar}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight & CTA */}
        <div className="mt-16 bg-[#171B22] border border-brand-yellow/20 p-8 sm:p-12 relative text-center" style={{ clipPath: 'polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)' }}>
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-brand-yellow/10 -mr-8 -mt-8 rotate-45 blur-xl"></div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
            <span className="text-brand-yellow">신용점수만 확인하는 상담이 아니라</span><br />
            차량을 실제로 유지할 수 있는 조건까지 확인합니다
          </h3>
          
          <div className="mt-8 flex justify-center">
            <Button variant="primary" size="xl" onClick={() => window.location.href = '#consult-form'}>
              내 조건으로 차량예산 확인하기 <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
