import { useEffect, useMemo, useState } from 'react';
import { Settings, ExternalLink } from 'lucide-react';
import { VehicleCard } from '../ui/VehicleCard';
import { Button } from '../ui/Button';

type VehicleItem = {
  id?: number | string;
  manufacturer: string;
  name: string;
  purpose: string;
  fuel: string;
  type: string;
  status: string;
  image: string;
  href?: string;
};

const SAMPLE_VEHICLES: VehicleItem[] = [
  {
    manufacturer: '현대',
    name: '아반떼',
    purpose: '출퇴근용',
    fuel: '가솔린',
    type: '세단',
    status: '상담 가능',
    image: 'https://images.unsplash.com/photo-1629897048514-3dd74142b322?q=80&w=2071&auto=format&fit=crop',
  },
  {
    manufacturer: '기아',
    name: 'K5',
    purpose: '출퇴근용',
    fuel: '가솔린/LPG',
    type: '세단',
    status: '상담 가능',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
  },
  {
    manufacturer: '현대',
    name: '그랜저',
    purpose: '가족용',
    fuel: '가솔린/하이브리드',
    type: '세단',
    status: '상담 가능',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2025&auto=format&fit=crop',
  },
  {
    manufacturer: '기아',
    name: '레이',
    purpose: '생업용/출퇴근용',
    fuel: '가솔린',
    type: '경차',
    status: '상담 가능',
    image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=2068&auto=format&fit=crop',
  },
  {
    manufacturer: '현대',
    name: '캐스퍼',
    purpose: '출퇴근용',
    fuel: '가솔린',
    type: '경차',
    status: '상담 가능',
    image: 'https://images.unsplash.com/photo-1621285093780-60b6911c1df8?q=80&w=1974&auto=format&fit=crop',
  },
  {
    manufacturer: '기아',
    name: '스포티지',
    purpose: '가족용',
    fuel: '가솔린/디젤',
    type: 'SUV',
    status: '상담 가능',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop',
  },
  {
    manufacturer: '현대',
    name: '싼타페',
    purpose: '가족용',
    fuel: '가솔린/디젤',
    type: 'SUV',
    status: '상담 가능',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
  },
  {
    manufacturer: '기아',
    name: '카니발',
    purpose: '가족용/생업용',
    fuel: '가솔린/디젤',
    type: '승합차',
    status: '상담 가능',
    image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=2070&auto=format&fit=crop',
  },
];

export function VehicleGarageSection() {
  const [activeTab, setActiveTab] = useState('전체');
  const [vehicles, setVehicles] = useState<VehicleItem[]>(SAMPLE_VEHICLES);
  const [fromBoard, setFromBoard] = useState(false);
  const [boardUrl, setBoardUrl] = useState('');

  const tabs = ['전체', '출퇴근용', '생업용', '가족용', '경차', '세단', 'SUV', '승합차', '화물차'];

  useEffect(() => {
    let cancelled = false;
    fetch('/proc/vehicles-list.php?limit=12', {
      method: 'GET',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !data?.success) return;
        if (data.board_url) setBoardUrl(data.board_url);
        if (Array.isArray(data.items) && data.items.length > 0) {
          setVehicles(
            data.items.map((item: VehicleItem) => ({
              ...item,
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

  const filteredVehicles = useMemo(() => {
    if (activeTab === '전체') return vehicles;
    return vehicles.filter((v) => v.purpose.includes(activeTab) || v.type.includes(activeTab));
  }, [activeTab, vehicles]);

  return (
    <section id="garage" className="py-24 bg-brand-bg relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-yellow/10 text-brand-yellow mb-6">
            <Settings className="w-6 h-6 animate-[spin_4s_linear_infinite]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4 tracking-tight">
            내 월 납입금에 맞는 추천 GARAGE
          </h2>
          <p className="text-brand-body text-lg">
            {fromBoard
              ? '등록된 추천 차량을 확인하고 할부 상담으로 이어가세요.'
              : '상담을 통해 고객님의 조건과 예산에 딱 맞는 차량을 수배해 드립니다.'}
          </p>
          {!fromBoard && (
            <p className="mt-3 text-xs text-brand-body/50">
              관리자에서 vehicles 게시판을 만들면 이 영역에 실차가 자동 표시됩니다.
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border
                ${
                  activeTab === tab
                    ? 'bg-brand-yellow text-brand-bg border-brand-yellow'
                    : 'bg-transparent text-brand-body border-white/10 hover:border-brand-yellow/50 hover:text-white'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVehicles.map((vehicle, i) => (
            <VehicleCard
              key={vehicle.id ?? i}
              image={vehicle.image}
              manufacturer={vehicle.manufacturer}
              name={vehicle.name}
              purpose={vehicle.purpose}
              fuel={vehicle.fuel}
              type={vehicle.type}
              status={vehicle.status}
              href={vehicle.href}
            />
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-20 bg-brand-card/50 border border-white/5 rounded-lg clip-chamfer mt-6">
            <p className="text-brand-body">해당 조건의 추천 차량을 준비 중입니다.</p>
          </div>
        )}

        {boardUrl && (
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" onClick={() => (window.location.href = boardUrl)}>
              차량 목록 전체 보기 <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
