import { useEffect, useState } from 'react';
import { FileText, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { goConsult } from '../../lib/sitePages';

type CaseItem = {
  id: number | string;
  title: string;
  customerStatus: string;
  desiredVehicle: string;
  monthlyBudget: string;
  progress: string;
  keyPoint: string;
  recommendation: string;
  review: string;
  image: string;
  href?: string;
};

const SAMPLE_CASES: CaseItem[] = [
  {
    id: 1,
    title: '개인회생 중 출퇴근용 아반떼를 알아본 사례',
    customerStatus: '개인회생 진행 중 (24회차 납입)',
    desiredVehicle: '현대 아반떼 (출퇴근용)',
    monthlyBudget: '30만~50만원',
    keyPoint: '변제금 미납 없이 꾸준히 납입 중인 점을 어필',
    recommendation: '소득 대비 적정 월 납입금에 맞춘 가성비 세단 세팅',
    progress: '출고 완료',
    review: '게시판 연동 전 샘플입니다. 관리자에서 cases 게시판에 사례를 등록하면 자동 반영됩니다.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 2,
    title: '다른 업체에서 거절된 후 월 납입금부터 다시 확인한 사례',
    customerStatus: '기존 할부 2회 거절',
    desiredVehicle: '기아 K5',
    monthlyBudget: '50만~70만원',
    keyPoint: '과도한 조회 이력으로 인한 부결, 무리한 진행 중단',
    recommendation: '현재 소득에 맞는 현실적인 예산 재설정 및 예외 승인 검토',
    progress: '상담 진행 중',
    review: '게시판 연동 전 샘플입니다. 관리자에서 cases 게시판에 사례를 등록하면 자동 반영됩니다.',
    image: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 3,
    title: '프리랜서 고객의 소득자료 준비 상담',
    customerStatus: '프리랜서 (재직증명서 없음)',
    desiredVehicle: '기아 레이',
    monthlyBudget: '30만원 이하',
    keyPoint: '급여명세서 대신 통장 입금 내역 및 위촉증명서 활용',
    recommendation: '소득 증빙이 가능한 금융사 매칭 및 경차로 유지비 절감',
    progress: '서류 심사 중',
    review: '게시판 연동 전 샘플입니다. 관리자에서 cases 게시판에 사례를 등록하면 자동 반영됩니다.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 4,
    title: '가족용 카니발과 초기 비용을 함께 검토한 사례',
    customerStatus: '저신용 직장인',
    desiredVehicle: '기아 카니발 (가족용)',
    monthlyBudget: '70만원 이상',
    keyPoint: '차량 대금 외에 취등록세 및 초기 보험료 자금 부족',
    recommendation: '차량 가격과 초기 비용을 포함한 통합 예산 설계',
    progress: '출고 완료',
    review: '게시판 연동 전 샘플입니다. 관리자에서 cases 게시판에 사례를 등록하면 자동 반영됩니다.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 5,
    title: '저신용 직장인의 경차 구매 상담',
    customerStatus: '파산면책 후 1년 경과',
    desiredVehicle: '현대 캐스퍼',
    monthlyBudget: '30만~50만원',
    keyPoint: '면책 이후 금융 거래 이력 부족으로 인한 한도 발생 어려움',
    recommendation: '꾸준한 급여 소득 증빙을 통한 예외 심사 진행',
    progress: '조건 확인 중',
    review: '게시판 연동 전 샘플입니다. 관리자에서 cases 게시판에 사례를 등록하면 자동 반영됩니다.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 6,
    title: '사업자의 생업용 화물차 상담',
    customerStatus: '개인사업자',
    desiredVehicle: '화물차 (포터/봉고)',
    monthlyBudget: '상담 후 결정',
    keyPoint: '매출 증빙 자료 미비 및 기존 사업자 대출 과다',
    recommendation: '부가세 과세표준증명 및 생업용 차량 필요성 어필',
    progress: '차량 추천 중',
    review: '게시판 연동 전 샘플입니다. 관리자에서 cases 게시판에 사례를 등록하면 자동 반영됩니다.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000&auto=format&fit=crop',
  },
];

export function ConsultReportSection() {
  const [reports, setReports] = useState<CaseItem[]>(SAMPLE_CASES);
  const [fromBoard, setFromBoard] = useState(false);
  const [boardUrl, setBoardUrl] = useState('');
  const [boardReady, setBoardReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/proc/cases-list.php?limit=6', {
      method: 'GET',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !data?.success) return;
        setBoardReady(!!data.ready);
        if (data.board_url) setBoardUrl(data.board_url);
        if (Array.isArray(data.items) && data.items.length > 0) {
          setReports(
            data.items.map((item: CaseItem) => ({
              ...item,
              customerStatus: item.customerStatus || '-',
              desiredVehicle: item.desiredVehicle || '-',
              monthlyBudget: item.monthlyBudget || '-',
              progress: item.progress || '상담 사례',
              keyPoint: item.keyPoint || '',
              recommendation: item.recommendation || '',
              review: item.review || '',
              image:
                item.image ||
                'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop',
            }))
          );
          setFromBoard(true);
        }
      })
      .catch(() => {
        /* keep samples */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="cases" className="py-24 bg-[#0A0C10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-yellow/10 text-brand-yellow mb-6">
            <FileText className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 tracking-tight">
            한도폭발카 상담 리포트
          </h2>
          <p className="text-lg text-brand-body leading-relaxed">
            고객님의 조건에 맞춘 정확한 진단과 상담 사례를 투명하게 공개합니다.
            <br className="hidden md:block" />
            {fromBoard
              ? '실제 등록된 상담 사례를 확인해 보세요.'
              : '실제 상담을 바탕으로 한 진단 리포트를 확인해 보세요.'}
          </p>
          {!fromBoard && (
            <p className="mt-3 text-xs text-brand-body/50">
              {boardReady
                ? '게시판에 공개 사례가 등록되면 이 영역에 자동 표시됩니다.'
                : '관리자에서 cases 게시판을 만들면 홈에 자동 연동됩니다.'}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => {
            const CardInner = (
              <>
                <div className="bg-black/50 p-4 border-b border-white/5 flex justify-between items-center">
                  <div className="text-xs font-mono font-bold text-brand-body/60">
                    REPORT NO. {String(report.id).padStart(3, '0')}
                  </div>
                  <div
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      report.progress === '출고 완료'
                        ? 'bg-brand-green/20 text-brand-green'
                        : 'bg-brand-yellow/20 text-brand-yellow'
                    }`}
                  >
                    {report.progress}
                  </div>
                </div>

                <div className="h-40 w-full overflow-hidden border-b border-white/5">
                  <img
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-100"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-6 flex-grow space-y-4">
                  <h3 className="text-lg font-bold text-white leading-tight mb-4">{report.title}</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-brand-body shrink-0">고객 상황</span>
                      <span className="text-white font-medium text-right ml-2">{report.customerStatus}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-brand-body shrink-0">필요 차량</span>
                      <span className="text-white font-medium text-right ml-2">{report.desiredVehicle}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-brand-body shrink-0">원하는 예산</span>
                      <span className="text-white font-medium text-right ml-2">{report.monthlyBudget}</span>
                    </div>
                  </div>

                  {report.keyPoint && (
                    <div className="pt-2">
                      <div className="text-xs font-bold text-brand-yellow mb-1">상담 핵심 내용</div>
                      <p className="text-sm text-brand-body/90 leading-relaxed bg-black/30 p-3 rounded-sm border-l-2 border-brand-yellow">
                        {report.keyPoint}
                      </p>
                    </div>
                  )}

                  {report.recommendation && (
                    <div className="pt-2">
                      <div className="text-xs font-bold text-brand-green mb-1">추천 방향</div>
                      <p className="text-sm text-brand-body/90 leading-relaxed bg-black/30 p-3 rounded-sm border-l-2 border-brand-green">
                        {report.recommendation}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-auto p-4 border-t border-white/5 bg-black/40 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-body/50 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-brand-body/60 italic leading-relaxed">{report.review}</p>
                  </div>
                </div>
              </>
            );

            const className =
              'bg-brand-card border border-white/10 flex flex-col clip-chamfer overflow-hidden group hover:border-brand-yellow/30 transition-colors h-full';

            if (report.href) {
              return (
                <a key={report.id} href={report.href} className={className}>
                  {CardInner}
                </a>
              );
            }

            return (
              <div key={report.id} className={className}>
                {CardInner}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          {boardUrl && (
            <Button variant="outline" size="lg" onClick={() => (window.location.href = boardUrl)}>
              상담 사례 전체 보기 <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
          )}
          <Button variant="primary" size="lg" onClick={() => goConsult()}>
            내 조건으로 진단 리포트 받아보기 <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
