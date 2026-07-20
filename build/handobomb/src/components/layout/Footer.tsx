import { ShieldCheck, Info } from 'lucide-react';
import { focusPage } from '../../lib/sitePages';

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-32 md:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-8">
          
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-display font-black text-white italic tracking-tighter">
              한도폭발카
            </h2>
            <div className="text-sm text-brand-body space-y-2">
              <p className="flex items-center gap-2"><span className="text-white/50 w-24">상호</span> <span className="text-white">관리자 입력용 데이터</span></p>
              <p className="flex items-center gap-2"><span className="text-white/50 w-24">대표자</span> <span className="text-white">관리자 입력용 데이터</span></p>
              <p className="flex items-center gap-2"><span className="text-white/50 w-24">사업자등록번호</span> <span className="text-white">관리자 입력용 데이터</span></p>
              <p className="flex items-center gap-2"><span className="text-white/50 w-24">통신판매업 신고번호</span> <span className="text-white">관리자 입력용 데이터</span></p>
              <p className="flex items-center gap-2"><span className="text-white/50 w-24">자동차매매업 등록번호</span> <span className="text-white">관리자 입력용 데이터</span></p>
              <p className="flex items-center gap-2"><span className="text-white/50 w-24">사업장 주소</span> <span className="text-white">관리자 입력용 데이터</span></p>
              <p className="flex items-center gap-2"><span className="text-white/50 w-24">개인정보관리책임자</span> <span className="text-white">관리자 입력용 데이터</span></p>
              <p className="flex items-center gap-2"><span className="text-white/50 w-24">이메일</span> <span className="text-white">관리자 입력용 데이터</span></p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">고객센터</h3>
            <p className="text-3xl font-display font-black text-brand-yellow mb-2">1800-4959</p>
            <p className="text-sm text-brand-body mb-4">평일 09:00 - 18:00 (주말/공휴일 휴무)</p>
            <a href="https://open.kakao.com/o/seC75DCi" target="_blank" rel="noreferrer" className="text-sm text-white hover:text-brand-yellow transition-colors underline underline-offset-4">
              카카오톡 상담
            </a>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">약관 및 정책</h3>
            <ul className="space-y-3 text-sm text-brand-body">
              <li><a href="/page/about.php" className="hover:text-white transition-colors">회사소개</a></li>
              <li><a href="/page/service.php" className="hover:text-white transition-colors">이용약관</a></li>
              <li><a href="/page/privacy.php" className="hover:text-white transition-colors font-bold">개인정보처리방침</a></li>
              <li>
                <a
                  href="/process"
                  className="hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    focusPage('/process');
                  }}
                >
                  중고차 구매 유의사항
                </a>
              </li>
              <li>
                <a
                  href="/finance"
                  className="hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    focusPage('/finance');
                  }}
                >
                  금융상품 이용 안내
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#0D1015] p-6 rounded-lg border border-white/5 space-y-4 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-5 h-5 text-brand-orange" />
            <span className="font-bold text-white text-sm">필수 안내 문구</span>
          </div>
          <ul className="list-disc pl-5 text-xs text-brand-body/60 space-y-2">
            <li>할부 및 금융 조건은 개인의 신용 상태, 소득, 재직 상태와 금융사 심사 결과에 따라 달라질 수 있습니다.</li>
            <li>상담 신청만으로 금융계약이나 차량 구매계약이 체결되지 않습니다.</li>
            <li>모든 고객의 승인이나 추가자금 제공을 보장하지 않습니다.</li>
            <li>금융상품 이용 시 개인의 신용평점에 영향을 줄 수 있습니다.</li>
            <li>실제 금리, 기간, 월 납입금과 총상환금액은 계약 전에 안내합니다.</li>
            <li>차량의 사고 이력, 성능 상태와 주행거리는 계약 전에 확인할 수 있도록 합니다.</li>
            <li>개인정보는 상담 목적으로만 사용합니다.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-brand-body/40 gap-4">
          <p>© {new Date().getFullYear()} 한도폭발카. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>안전한 개인정보 보호 시스템 작동 중</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
