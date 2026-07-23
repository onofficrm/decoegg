<?php
/**
 * 온오프 플랫폼 스킨 공통 헤더
 * @onoff-platform-managed
 */
if (!defined('_GNUBOARD_')) {
    exit;
}

if (!function_exists('onoff_platform_member_styles')) {
    function onoff_platform_member_styles($skin_url = '')
    {
        if (!function_exists('add_stylesheet')) {
            return;
        }

        $tokens = G5_URL . '/css/icrm-design-tokens.css';
        $platform = G5_URL . '/css/onoff-platform.css';
        add_stylesheet('<link rel="stylesheet" href="' . htmlspecialchars($tokens, ENT_QUOTES, 'UTF-8') . '">', 0);
        add_stylesheet('<link rel="stylesheet" href="' . htmlspecialchars($platform, ENT_QUOTES, 'UTF-8') . '">', 1);

        if ($skin_url !== '') {
            add_stylesheet('<link rel="stylesheet" href="' . htmlspecialchars($skin_url, ENT_QUOTES, 'UTF-8') . '/style.css">', 2);
        }
    }
}

if (!function_exists('onoff_platform_board_styles')) {
    function onoff_platform_board_styles($board_skin_url = '')
    {
        if (!function_exists('add_stylesheet')) {
            return;
        }

        $tokens = G5_URL . '/css/icrm-design-tokens.css';
        $platform = G5_URL . '/css/onoff-platform.css';
        add_stylesheet('<link rel="stylesheet" href="' . htmlspecialchars($tokens, ENT_QUOTES, 'UTF-8') . '">', 0);
        add_stylesheet('<link rel="stylesheet" href="' . htmlspecialchars($platform, ENT_QUOTES, 'UTF-8') . '">', 1);

        if ($board_skin_url !== '') {
            add_stylesheet('<link rel="stylesheet" href="' . htmlspecialchars($board_skin_url, ENT_QUOTES, 'UTF-8') . '/style.css">', 2);
        }
    }
}

if (!function_exists('onoff_platform_outlogin_styles')) {
    function onoff_platform_outlogin_styles($outlogin_skin_url = '')
    {
        if (!function_exists('add_stylesheet')) {
            return;
        }

        $tokens = G5_URL . '/css/icrm-design-tokens.css';
        $platform = G5_URL . '/css/onoff-platform.css';
        add_stylesheet('<link rel="stylesheet" href="' . htmlspecialchars($tokens, ENT_QUOTES, 'UTF-8') . '">', 0);
        add_stylesheet('<link rel="stylesheet" href="' . htmlspecialchars($platform, ENT_QUOTES, 'UTF-8') . '">', 1);

        if ($outlogin_skin_url !== '') {
            add_stylesheet('<link rel="stylesheet" href="' . htmlspecialchars($outlogin_skin_url, ENT_QUOTES, 'UTF-8') . '/style.css">', 2);
        }
    }
}

if (!function_exists('onoff_platform_homepage_title')) {
    /**
     * 사이트명 — _site.config site_name 우선, 없으면 cf_title
     */
    function onoff_platform_homepage_title()
    {
        global $config;

        if (function_exists('g5site_cfg')) {
            $site_name = trim(g5site_cfg('site_name', ''));
            if ($site_name !== '') {
                return $site_name;
            }
            $company = trim(g5site_cfg('company_name', ''));
            if ($company !== '') {
                return $company;
            }
        }

        $title = isset($config['cf_title']) ? trim(get_text($config['cf_title'])) : '';
        if ($title !== '' && $title !== '그누보드5' && stripos($title, 'gnuboard') === false) {
            return $title;
        }

        return '한도폭발카';
    }
}

if (!function_exists('onoff_platform_member_top_bar')) {
    /** 회원 화면 상단 홈페이지 제목 */
    function onoff_platform_member_top_bar()
    {
        $title = onoff_platform_homepage_title();
        $url = defined('G5_URL') ? G5_URL : '/';

        echo '<div class="onoff-platform__top">';
        echo '<a href="' . htmlspecialchars($url, ENT_QUOTES, 'UTF-8') . '" class="onoff-platform__top-link">';
        echo htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
        echo '</a>';
        echo '</div>';
    }
}

if (!function_exists('onoff_platform_member_brand_html')) {
    /** 브랜드명 HTML (한도폭발카 → 카 강조) */
    function onoff_platform_member_brand_html($brand)
    {
        $brand = (string) $brand;
        if (function_exists('mb_substr') && mb_substr($brand, -1, 1, 'UTF-8') === '카' && mb_strlen($brand, 'UTF-8') > 1) {
            $head = mb_substr($brand, 0, -1, 'UTF-8');

            return htmlspecialchars($head, ENT_QUOTES, 'UTF-8')
                . '<span class="onoff-accent">카</span>';
        }

        return htmlspecialchars($brand, ENT_QUOTES, 'UTF-8');
    }
}

if (!function_exists('onoff_platform_member_brand')) {
    /** 로그인 박스 내 사이트명 + 페이지 부제 */
    function onoff_platform_member_brand($page_label = '')
    {
        global $g5;

        $brand = onoff_platform_homepage_title();
        $label = trim((string) $page_label);
        if ($label === '' && isset($g5['title'])) {
            $label = trim(get_text($g5['title']));
        }
        $label = $label !== '' ? $label : $brand;

        echo '<div class="onoff-platform__brand">';
        echo '<p class="onoff-platform__eyebrow">ACCOUNT</p>';
        echo '<p class="onoff-platform__brand-name">' . onoff_platform_member_brand_html($brand) . '</p>';
        echo '<p class="onoff-platform__page-label">' . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') . '</p>';
        echo '</div>';
    }
}

if (!function_exists('onoff_platform_member_footer')) {
    /** 회원 화면 하단 홈페이지 정보 */
    function onoff_platform_member_footer()
    {
        $title = onoff_platform_homepage_title();
        $phone = function_exists('g5site_cfg') ? trim((string) g5site_cfg('phone', '')) : '';

        echo '<p class="onoff-platform__footer">&copy; ' . date('Y') . ' ' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
        if ($phone !== '') {
            echo ' &middot; 문의 ' . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
        }
        echo '</p>';
    }
}

if (!function_exists('onoff_platform_member_tabs')) {
    /** 로그인 / 회원가입 탭 */
    function onoff_platform_member_tabs($active = 'login')
    {
        $login_url = (defined('G5_BBS_URL') ? G5_BBS_URL : '') . '/login.php';
        $register_url = (defined('G5_BBS_URL') ? G5_BBS_URL : '') . '/register.php';

        echo '<nav class="onoff-platform__tabs mb_log_cate" aria-label="회원 메뉴">';

        if ($active === 'login') {
            echo '<span class="onoff-platform__tab is-active" aria-current="page">로그인</span>';
            echo '<a href="' . htmlspecialchars($register_url, ENT_QUOTES, 'UTF-8') . '" class="onoff-platform__tab">회원가입</a>';
        } else {
            echo '<a href="' . htmlspecialchars($login_url, ENT_QUOTES, 'UTF-8') . '" class="onoff-platform__tab">로그인</a>';
            echo '<span class="onoff-platform__tab is-active" aria-current="page">회원가입</span>';
        }

        echo '</nav>';
    }
}
