import { useEffect, useMemo, useState } from 'react';
import { Users } from 'lucide-react';

type ConsultItem = {
  id: number | string;
  name: string;
  type: string;
  detail: string;
  status: string;
};

const SAMPLE_LIST: ConsultItem[] = [
  { id: 1, name: '김○○', type: '개인회생 인가', detail: '아반떼', status: '상담 접수' },
  { id: 2, name: '박○○', type: '저신용 직장인', detail: 'K5', status: '조건 확인' },
  { id: 3, name: '이○○', type: '파산면책', detail: '레이', status: '차량 추천' },
  { id: 4, name: '최○○', type: '사업자', detail: '카니발', status: '서류 확인' },
  { id: 5, name: '정○○', type: '기존 할부 거절', detail: 'SUV', status: '상담 접수' },
  { id: 6, name: '한○○', type: '프리랜서', detail: '월 납입 조건', status: '조건 확인' },
  { id: 7, name: '조○○', type: '개인회생 진행 중', detail: '쏘렌토', status: '서류 확인' },
  { id: 8, name: '윤○○', type: '저신용', detail: '경차', status: '상담 접수' },
  { id: 9, name: '오○○', type: '면책 후', detail: '그랜저', status: '차량 추천' },
  { id: 10, name: '장○○', type: '직장인', detail: '스포티지', status: '조건 확인' },
  { id: 11, name: '임○○', type: '일용직', detail: '출퇴근용', status: '상담 접수' },
  { id: 12, name: '서○○', type: '사업자', detail: '생업용 차량', status: '출고 준비' },
];

function getStatusColor(status: string) {
  switch (status) {
    case '상담 접수':
      return 'text-white bg-white/10 border-white/20';
    case '조건 확인':
      return 'text-brand-yellow bg-brand-yellow/10 border-brand-yellow/30';
    case '서류 확인':
      return 'text-brand-orange bg-brand-orange/10 border-brand-orange/30';
    case '차량 추천':
      return 'text-brand-green bg-brand-green/10 border-brand-green/30';
    case '출고 준비':
      return 'text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/30';
    case '출고 완료':
      return 'text-brand-bg bg-white border-white';
    default:
      return 'text-brand-body bg-white/5 border-white/10';
  }
}

function renderConsultRow(item: ConsultItem) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 border border-white/5 bg-black/25">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base min-w-0">
        <span className="font-bold text-white shrink-0">{item.name}님</span>
        <span className="text-white/20 hidden sm:inline">|</span>
        <span className="text-brand-body">{item.type}</span>
        <span className="text-white/20 hidden sm:inline">|</span>
        <span className="text-brand-body/80 truncate">{item.detail}</span>
      </div>
      <div className="shrink-0 flex justify-end">
        <span className={`px-3 py-1 text-xs font-bold border rounded-sm ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      </div>
    </div>
  );
}

export function ConsultStatusSection() {
  const [consultList, setConsultList] = useState<ConsultItem[]>(SAMPLE_LIST);
  const [fromBoard, setFromBoard] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/proc/consult-status-list.php?limit=12', {
      method: 'GET',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !data?.success) return;
        if (Array.isArray(data.items) && data.items.length > 0) {
          const boardItems = data.items as ConsultItem[];
          const merged =
            boardItems.length >= 8
              ? boardItems
              : [...boardItems, ...SAMPLE_LIST].slice(0, 12);
          setConsultList(merged);
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

  const tickerItems = useMemo((): ConsultItem[] => {
    if (consultList.length >= 8) return consultList;
    return [...consultList, ...consultList, ...SAMPLE_LIST].slice(0, 12);
  }, [consultList]);

  return (
    <section id="consult-status" className="py-20 md:py-28 bg-brand-bg border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-yellow/10 text-brand-yellow mb-5">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-black text-white mb-3 tracking-tight">
            현재 진행 중인 상담
          </h2>
          <p className="text-brand-body text-sm sm:text-base">
            {fromBoard
              ? '최근 등록된 상담을 익명으로 실시간처럼 보여드립니다.'
              : '고객님의 상황에 맞춘 1:1 맞춤 상담이 이어지고 있습니다.'}
          </p>
        </div>

        <div className="bg-brand-card border border-white/5 overflow-hidden">
          <div className="relative h-[360px] sm:h-[420px] group">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-brand-card to-transparent z-10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-brand-card to-transparent z-10" />

            <div
              className="flex flex-col gap-3 p-4 sm:p-6 animate-scroll-y group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none"
              style={{ animationDuration: '32s' }}
            >
              <div className="flex flex-col gap-3">
                {tickerItems.map((item, i) => (
                  <div key={`a-${item.id}-${i}`}>{renderConsultRow(item)}</div>
                ))}
              </div>
              <div className="flex flex-col gap-3" aria-hidden="true">
                {tickerItems.map((item, i) => (
                  <div key={`b-${item.id}-${i}`}>{renderConsultRow(item)}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
