import { ShieldCheck } from 'lucide-react';
import { focusPage } from '../../lib/sitePages';

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06] pt-16 pb-32 md:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/[0.06] pb-12 mb-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-black text-white italic tracking-tighter">
              한도폭발카
            </h2>
            <p className="text-sm text-brand-body leading-relaxed max-w-sm">
              신용점수가 아닌, 가능한 조건을 끝까지 확인합니다.
              사업자 정보는 상담 시 또는 요청 시 안내드립니다.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-4 tracking-wide">고객센터</h3>
            <a
              href="tel:18004959"
              className="block text-2xl font-display font-black text-brand-yellow mb-2 hover:opacity-90"
            >
              1800-4959
            </a>
            <p className="text-sm text-brand-body mb-3">평일 09:00 – 18:00</p>
            <a
              href="https://open.kakao.com/o/seC75DCi"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/80 hover:text-brand-yellow transition-colors underline underline-offset-4"
            >
              카카오톡 상담
            </a>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-4 tracking-wide">안내</h3>
            <ul className="space-y-3 text-sm text-brand-body">
              <li>
                <a href="/page/about.php" className="hover:text-white transition-colors">
                  회사소개
                </a>
              </li>
              <li>
                <a href="/page/privacy.php" className="hover:text-white transition-colors font-medium">
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a
                  href="/process"
                  className="hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    focusPage('/process');
                  }}
                >
                  상담·구매 유의사항
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
                  금융·할부 안내
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-10 space-y-2 text-xs text-brand-body/50 leading-relaxed max-w-4xl">
          <p>
            할부·금융 조건은 신용·소득·재직 상태와 금융사 심사 결과에 따라 달라질 수 있으며,
            상담 신청만으로 금융조회·계약이 진행되지 않습니다.
          </p>
          <p>
            승인이나 추가자금을 보장하지 않으며, 실제 금리·기간·월납·총상환액과 차량 상태는 계약 전에 안내합니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-brand-body/35 gap-3">
          <p>© {new Date().getFullYear()} 한도폭발카</p>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>개인정보는 상담 목적으로만 사용합니다</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
