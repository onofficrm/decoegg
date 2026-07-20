import { useState, type MouseEvent } from 'react';
import { Phone, MessageCircle, ArrowRight, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { getConsultAvailability } from '../../lib/consultAvailability';
import { focusPage, getNavPages } from '../../lib/sitePages';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const availability = getConsultAvailability();
  const navLinks = getNavPages().map((p) => ({
    name: p.navLabel as string,
    href: p.path,
  }));

  const onNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    focusPage(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-24 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex flex-col justify-center cursor-pointer mt-1"
            onClick={(e) => {
              e.preventDefault();
              focusPage('/');
            }}
          >
            <div className="flex items-center">
              <span className="font-display font-black text-2xl md:text-3xl tracking-tighter text-white italic">
                한도폭발
              </span>
              <span className="relative flex items-center justify-center ml-1">
                <span className="absolute inset-0 bg-brand-yellow -skew-x-12 rounded-sm" />
                <span className="relative z-10 font-display font-black text-xl md:text-2xl text-brand-bg italic px-1.5 py-0.5 flex items-center gap-0.5">
                  카
                  <ArrowRight className="w-5 h-5 -mr-0.5" strokeWidth={4} />
                </span>
              </span>
            </div>
            <span className="text-[11px] text-brand-body/80 font-medium tracking-tight mt-1 hidden sm:block">
              신용점수가 아닌, 가능한 조건을 끝까지 확인합니다
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8" aria-label="주요 메뉴">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => onNavClick(e, link.href)}
                className="text-sm font-medium text-brand-body hover:text-white relative group py-2"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-brand-yellow transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <span
              className={`hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                availability.open
                  ? 'bg-brand-green/15 text-brand-green border-brand-green/30'
                  : 'bg-white/5 text-brand-body border-white/10'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${availability.open ? 'bg-brand-green animate-pulse' : 'bg-brand-body'}`} />
              {availability.label}
            </span>
            <Button variant="accent" size="sm" onClick={() => window.location.href = 'tel:18004959'}>
              <Phone className="w-4 h-4" />
              1800-4959
            </Button>
            <Button variant="primary" size="sm" onClick={() => window.open('https://open.kakao.com/o/seC75DCi', '_blank')}>
              <MessageCircle className="w-4 h-4" />
              카카오톡 상담
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
              className="text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-brand-card border-b border-white/5 absolute top-24 left-0 w-full shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-4 text-base font-medium text-white border-b border-white/5 hover:text-brand-yellow hover:bg-white/5 transition-colors"
                onClick={(e) => onNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex flex-col gap-3 pt-6 px-3">
              <Button variant="accent" fullWidth onClick={() => window.location.href = 'tel:18004959'}>
                <Phone className="w-5 h-5" />
                전화상담 1800-4959
              </Button>
              <Button variant="primary" fullWidth onClick={() => window.open('https://open.kakao.com/o/seC75DCi', '_blank')}>
                <MessageCircle className="w-5 h-5" />
                카카오톡 즉시상담
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
