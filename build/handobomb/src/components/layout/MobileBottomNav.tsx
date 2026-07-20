import { Home, FileSearch, Phone, MessageCircle } from 'lucide-react';

export function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 pb-safe">
      <div className="flex items-center justify-between h-[72px]">
        <a href="#" className="flex-1 flex flex-col items-center justify-center text-brand-body hover:text-white transition-colors h-full">
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">홈</span>
        </a>
        <a href="#consult-form" className="flex-1 flex flex-col items-center justify-center text-brand-body hover:text-white transition-colors h-full">
          <FileSearch className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">조건 확인</span>
        </a>
        <a href="tel:18004959" className="flex-1 flex flex-col items-center justify-center text-brand-orange h-full">
          <Phone className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">전화상담</span>
        </a>
        <a href="https://open.kakao.com/o/seC75DCi" target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center text-brand-yellow h-full">
          <MessageCircle className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">카카오톡</span>
        </a>
      </div>
    </div>
  );
}
