#!/usr/bin/env node
/**
 * Generates hang-safe SEO HTML shells (*.txt) + sitemap + htaccess snippet data.
 * Run after vite build (needs asset hashes from imports or dist).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP = path.resolve(__dirname, '..'); // build/handobomb
const ROOT = path.resolve(APP, '../..'); // decoegg repo root
const pagesFile = JSON.parse(fs.readFileSync(path.join(APP, 'seo-pages.json'), 'utf8'));

function findAssets() {
  const importAssets = path.join(ROOT, 'plugin/onoff-builder-bridge/imports/handobomb/assets');
  const distAssets = path.join(APP, 'dist/assets');
  // Prefer fresh vite dist after build
  const dir = fs.existsSync(distAssets) ? distAssets : importAssets;
  if (!fs.existsSync(dir)) {
    throw new Error(`Assets not found: ${dir}`);
  }
  const files = fs.readdirSync(dir).filter((f) => !f.startsWith('._'));
  const js = files.find((f) => f.endsWith('.js'));
  const css = files.find((f) => f.endsWith('.css'));
  if (!js || !css) throw new Error(`Missing js/css in ${dir}`);
  return { js, css };
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildShell(page, { js, css }) {
  const siteUrl = pagesFile.siteUrl.replace(/\/$/, '');
  const canonical = page.path === '/' ? `${siteUrl}/` : `${siteUrl}${page.path}`;
  const ogImage = pagesFile.defaultOgImage;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: pagesFile.siteName,
        url: siteUrl,
      },
      {
        '@type': 'WebPage',
        name: page.title,
        description: page.description,
        url: canonical,
        isPartOf: { '@type': 'WebSite', name: pagesFile.siteName, url: siteUrl },
      },
      {
        '@type': 'AutoDealer',
        name: pagesFile.siteName,
        telephone: '1800-4959',
        url: siteUrl,
        description: '개인회생중고차할부 및 저신용중고차할부 전문상담',
      },
      {
        '@type': 'Organization',
        name: pagesFile.siteName,
        url: siteUrl,
        telephone: '1800-4959',
      },
    ],
  };

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="keywords" content="${escapeHtml(page.keywords)}" />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="ko_KR" />
    <meta property="og:site_name" content="${escapeHtml(pagesFile.siteName)}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(ogImage)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <link rel="icon" type="image/svg+xml" href="/img/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32.png" />
    <link rel="shortcut icon" href="/img/favicon.ico" />
    <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
    <meta name="theme-color" content="#0D1015" />
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>
    <script type="module" crossorigin src="/plugin/onoff-builder-bridge/imports/handobomb/assets/${js}"></script>
    <link rel="stylesheet" crossorigin href="/plugin/onoff-builder-bridge/imports/handobomb/assets/${css}">
  </head>
  <body>
    <div id="root"></div>
    <noscript>
      <h1>${escapeHtml(page.title)}</h1>
      <p>${escapeHtml(page.description)}</p>
      <p><a href="/consult">조건 확인 상담</a> · <a href="tel:18004959">1800-4959</a></p>
    </noscript>
  </body>
</html>
`;
}

function main() {
  const assets = findAssets();
  const outDir = path.join(ROOT, 'css/landing');
  fs.mkdirSync(outDir, { recursive: true });

  // remove old generated shells (keep .htaccess)
  for (const f of fs.readdirSync(outDir)) {
    if (f.endsWith('.txt')) fs.unlinkSync(path.join(outDir, f));
  }

  for (const page of pagesFile.pages) {
    const shell = buildShell(page, assets);
    const file = path.join(outDir, `${page.slug}.txt`);
    fs.writeFileSync(file, shell, 'utf8');
    console.log('wrote', path.relative(ROOT, file));
  }

  // Compatibility copies for existing deploy paths
  const home = fs.readFileSync(path.join(outDir, 'home.txt'), 'utf8');
  for (const rel of ['css/landing.txt', 'css/landing.html', 'deco-home.html', 'index.html']) {
    fs.writeFileSync(path.join(ROOT, rel), home, 'utf8');
    console.log('wrote', rel);
  }

  // sitemap.xml
  const urls = pagesFile.pages
    .map((p) => {
      const loc = p.path === '/' ? `${pagesFile.siteUrl}/` : `${pagesFile.siteUrl}${p.path}`;
      const priority = p.path === '/' ? '1.0' : p.navLabel ? '0.8' : '0.6';
      return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
  <url>
    <loc>${pagesFile.siteUrl}/page/privacy.php</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${pagesFile.siteUrl}/page/about.php</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
`;
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
  console.log('wrote sitemap.xml');

  // robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: ${pagesFile.siteUrl}/sitemap.xml
`;
  fs.writeFileSync(path.join(ROOT, 'robots.txt'), robots, 'utf8');
  console.log('wrote robots.txt');

  // Root .htaccess with all rewrites
  const rewriteLines = pagesFile.pages
    .filter((p) => p.path !== '/')
    .map((p) => {
      const pattern = p.path.replace(/^\//, '');
      return `  RewriteRule ^${pattern}/?$ css/landing/${p.slug}.txt [L,T=text/html]`;
    })
    .join('\n');

  const htaccess = `# 이 호스팅은 .html 요청이 PHP로 넘어가 MySQL 대기(504)에 걸립니다.
# 정적 랜딩은 css/landing/*.txt + text/html 로 제공합니다. (페이지별 SEO 셸)
DirectoryIndex css/landing/home.txt css/landing.txt index.php

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^$ css/landing/home.txt [L,T=text/html]
${rewriteLines}
</IfModule>

# 홈 호환 경로 (css/landing.txt)
<IfModule mod_headers.c>
  <Files "landing.txt">
    Header set Content-Type "text/html; charset=utf-8"
  </Files>
</IfModule>
<IfModule mod_mime.c>
  <Files "landing.txt">
    ForceType text/html
  </Files>
</IfModule>
`;
  fs.writeFileSync(path.join(ROOT, '.htaccess'), htaccess, 'utf8');
  console.log('wrote .htaccess');

  // css/landing/.htaccess — ForceType for all page shells
  fs.writeFileSync(
    path.join(outDir, '.htaccess'),
    `<IfModule mod_mime.c>
  ForceType text/html
</IfModule>
<IfModule mod_headers.c>
  Header set Content-Type "text/html; charset=utf-8"
</IfModule>
`,
    'utf8'
  );

  console.log('assets', assets);
}

main();
