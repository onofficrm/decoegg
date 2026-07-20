import pagesConfig from '../../seo-pages.json';

export type SitePage = {
  path: string;
  slug: string;
  sectionId: string | null;
  navLabel: string | null;
  title: string;
  description: string;
  keywords: string;
};

type PagesFile = {
  siteUrl: string;
  siteName: string;
  defaultOgImage: string;
  pages: SitePage[];
};

const config = pagesConfig as PagesFile;

export const SITE_URL = config.siteUrl.replace(/\/$/, '');
export const SITE_NAME = config.siteName;
export const DEFAULT_OG_IMAGE = config.defaultOgImage;
export const SITE_PAGES: SitePage[] = config.pages;

export function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function getPageByPath(pathname: string): SitePage {
  const path = normalizePath(pathname);
  return SITE_PAGES.find((p) => p.path === path) || SITE_PAGES[0];
}

export function getNavPages(): SitePage[] {
  return SITE_PAGES.filter((p) => p.navLabel);
}

export function applyDocumentMeta(page: SitePage): void {
  document.title = page.title;

  const setMeta = (selector: string, attr: string, value: string) => {
    let el = document.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      if (selector.includes('property=')) {
        el.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
      } else if (selector.includes('name=')) {
        el.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
      }
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };

  setMeta('meta[name="description"]', 'content', page.description);
  setMeta('meta[name="keywords"]', 'content', page.keywords);
  setMeta('meta[property="og:title"]', 'content', page.title);
  setMeta('meta[property="og:description"]', 'content', page.description);
  setMeta('meta[property="og:url"]', 'content', `${SITE_URL}${page.path === '/' ? '/' : page.path}`);
  setMeta('meta[property="og:type"]', 'content', 'website');
  setMeta('meta[property="og:image"]', 'content', DEFAULT_OG_IMAGE);
  setMeta('meta[name="twitter:card"]', 'content', 'summary');
  setMeta('meta[name="twitter:title"]', 'content', page.title);
  setMeta('meta[name="twitter:description"]', 'content', page.description);

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = `${SITE_URL}${page.path === '/' ? '/' : page.path}`;
}

export function scrollToPageSection(page: SitePage, behavior: ScrollBehavior = 'smooth'): void {
  if (!page.sectionId) {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  const el = document.getElementById(page.sectionId);
  if (el) {
    el.scrollIntoView({ behavior, block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior });
  }
}

/** Soft-navigate: update URL + meta + scroll without full reload (keeps React state). */
export function focusPage(path: string, opts?: { behavior?: ScrollBehavior; replace?: boolean }): void {
  const page = getPageByPath(path);
  const nextPath = page.path;
  const current = normalizePath(window.location.pathname);
  if (current !== nextPath) {
    const url = nextPath === '/' ? '/' : nextPath;
    if (opts?.replace) {
      window.history.replaceState({ path: nextPath }, page.title, url);
    } else {
      window.history.pushState({ path: nextPath }, page.title, url);
    }
  }
  applyDocumentMeta(page);
  // Allow layout/paint after route change
  requestAnimationFrame(() => {
    setTimeout(() => scrollToPageSection(page, opts?.behavior ?? 'smooth'), 50);
  });
}

export function goConsult(opts?: { behavior?: ScrollBehavior }): void {
  focusPage('/consult', opts);
}
