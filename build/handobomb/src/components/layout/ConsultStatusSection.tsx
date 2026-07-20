import { useEffect, useState } from 'react';
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
];

export function ConsultStatusSection() {
  const [consultList, setConsultList] = useState<ConsultItem[]>(SAMPLE_LIST);
  const [fromBoard, setFromBoard] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/proc/consult-status-list.php?limit=8', {
      method: 'GET',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !data?.success) return;
        if (Array.isArray(data.items) && data.items.length > 0) {
          setConsultList(data.items);
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

  const getStatusColor = (status: string) => {
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
  };

  return (
    <section id="consult-status" className="py-24 bg-brand-bg border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-yellow/10 text-brand-yellow mb-6">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-4 tracking-tight">
            현재 진행 중인 상담
          </h2>
          <p className="text-brand-body">
            {fromBoard
              ? '최근 등록된 상담 사례를 익명으로 보여드립니다.'
              : '고객님의 상황에 맞춘 1:1 맞춤 상담이 진행되고 있습니다.'}
          </p>
        </div>

        <div className="bg-brand-card border border-white/5 clip-chamfer p-6 sm:p-8">
          {consultList.length > 0 ? (
            <div className="space-y-3">
              {consultList.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-white/5 bg-black/20 hover:bg-black/40 hover:border-white/10 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <span className="font-bold text-white">{item.name}님</span>
                    <span className="text-white/20 hidden sm:block">|</span>
                    <span className="text-brand-body">{item.type}</span>
                    <span className="text-white/20 hidden sm:block">|</span>
                    <span className="text-brand-body/80">{item.detail}</span>
                  </div>

                  <div className="shrink-0 flex justify-end">
                    <span className={`px-3 py-1 text-xs font-bold border rounded-sm ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center border border-white/5 bg-black/20 border-dashed">
              <p className="text-brand-body text-lg">최근 상담 사례를 준비하고 있습니다</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
