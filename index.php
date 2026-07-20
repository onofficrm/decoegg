<?php
/**
 * 루트 홈
 * - home_builder_bridge_id 가 있으면 DB 연결 없이 빌더 페이지를 먼저 출력
 *   (MySQL 장애/지연 시에도 랜딩이 504로 멈추지 않도록)
 * - 그 외에는 기존 그누보드 메인 흐름
 */
define('_INDEX_', true);

$g5_root = str_replace('\\', '/', dirname(__FILE__));

$https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (isset($_SERVER['SERVER_PORT']) && (string) $_SERVER['SERVER_PORT'] === '443')
    || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
    || (isset($_SERVER['HTTP_CF_VISITOR']) && strpos($_SERVER['HTTP_CF_VISITOR'], 'https') !== false);
$host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : (isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'localhost');
$host = preg_replace("/[<>'\"\\\\%=\(\)\/\^\*]/", '', $host);
$script_dir = str_replace('\\', '/', dirname(isset($_SERVER['SCRIPT_NAME']) ? $_SERVER['SCRIPT_NAME'] : '/'));
$base_path = ($script_dir === '/' || $script_dir === '.' || $script_dir === '\\') ? '' : rtrim($script_dir, '/');
$base_url = ($https ? 'https' : 'http') . '://' . $host . $base_path;

if (!defined('_GNUBOARD_')) {
    define('_GNUBOARD_', true);
}
if (!defined('G5_PATH')) {
    define('G5_PATH', $g5_root);
}
if (!defined('G5_URL')) {
    define('G5_URL', $base_url);
}
if (!defined('G5_PLUGIN_PATH')) {
    define('G5_PLUGIN_PATH', G5_PATH . '/plugin');
}
if (!defined('G5_PLUGIN_URL')) {
    define('G5_PLUGIN_URL', G5_URL . '/plugin');
}

$home_builder_id = '';
if (is_file(G5_PATH . '/_site.config.php')) {
    include_once G5_PATH . '/_site.config.php';
    if (function_exists('g5site_cfg')) {
        $home_builder_id = g5site_cfg('home_builder_bridge_id', '');
    }
}
$home_builder_id = preg_replace('/[^a-z0-9_-]/i', '', (string) $home_builder_id);

if ($home_builder_id !== '') {
    $rendered = false;
    $builder_bootstrap = G5_PLUGIN_PATH . '/onoff-builder-bridge/bootstrap.php';
    if (is_file($builder_bootstrap)) {
        include_once $builder_bootstrap;
        if (function_exists('onoff_builder_render_import_page')) {
            // 성공 시 내부에서 exit
            onoff_builder_render_import_page($home_builder_id);
            $rendered = true;
        }
    }

    // 브릿지 로드 실패 시에도 정적 dist는 직접 출력
    if (!$rendered) {
        $import_index = G5_PLUGIN_PATH . '/onoff-builder-bridge/imports/' . $home_builder_id . '/index.html';
        if (is_file($import_index)) {
            $html = @file_get_contents($import_index);
            if ($html !== false && $html !== '') {
                $asset_base = rtrim(G5_PLUGIN_URL, '/') . '/onoff-builder-bridge/imports/' . $home_builder_id;
                $html = preg_replace('#\ssrc=(["\'])\./assets/#i', ' src=$1' . $asset_base . '/assets/', $html);
                $html = preg_replace('#\shref=(["\'])\./assets/#i', ' href=$1' . $asset_base . '/assets/', $html);
                $html = preg_replace('#\ssrc=(["\'])/assets/#i', ' src=$1' . $asset_base . '/assets/', $html);
                $html = preg_replace('#\shref=(["\'])/assets/#i', ' href=$1' . $asset_base . '/assets/', $html);
                $html = preg_replace('#\ssrc=(["\'])assets/#i', ' src=$1' . $asset_base . '/assets/', $html);
                $html = preg_replace('#\shref=(["\'])assets/#i', ' href=$1' . $asset_base . '/assets/', $html);
                header('Content-Type: text/html; charset=utf-8');
                echo $html;
                exit;
            }
        }
    }
}

// 빌더 홈이 아니거나 실패 시 기존 그누보드 흐름
include_once './_common.php';

if (!defined('_GNUBOARD_')) {
    exit;
}

// 테마 사용 시 테마 index로 위임
if (defined('G5_THEME_PATH')) {
    require_once G5_THEME_PATH . '/index.php';
    return;
}

// 모바일은 mobile/index.php 사용
if (defined('G5_IS_MOBILE') && G5_IS_MOBILE) {
    include_once G5_MOBILE_PATH . '/index.php';
    return;
}

include_once G5_PATH . '/head.php';

$g5_main_sections = array(
    'hero',
    'service',
    'advantage',
    'portfolio',
    'latest',
    'review',
    'faq',
    'contact',
);

echo '<h2 class="sound_only">메인</h2>';
echo '<main id="siteMain" class="site-main">';
foreach ($g5_main_sections as $section_name) {
    $section_file = G5_PATH . '/section/' . $section_name . '.php';
    if (is_file($section_file)) {
        include_once $section_file;
    }
}
echo '</main>';

include_once G5_PATH . '/tail.php';
