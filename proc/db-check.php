<?php
/**
 * DB 연결 점검 (관리자/운영용)
 * URL: /proc/db-check.php
 * _common.php 없이 dbconfig만 읽어 짧은 타임아웃으로 연결을 시도합니다.
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$root = dirname(__FILE__) . '/..';
$dbconfig = $root . '/data/dbconfig.php';
$started = microtime(true);

$result = array(
    'ok' => false,
    'elapsed_ms' => 0,
    'host' => '',
    'db' => '',
    'user' => '',
    'message' => '',
    'hint' => 'iwinv MySQL 원격접속에 웹서버 IP 115.68.168.240 을 허용하세요.',
);

if (!is_file($dbconfig)) {
    $result['message'] = 'data/dbconfig.php 파일이 없습니다.';
    $result['elapsed_ms'] = (int) round((microtime(true) - $started) * 1000);
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// dbconfig는 상수 정의 — 안전하게 파싱
$raw = file_get_contents($dbconfig);
if ($raw === false) {
    $result['message'] = 'dbconfig.php 를 읽을 수 없습니다.';
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

$host = '';
$user = '';
$pass = '';
$db = '';
if (preg_match("/define\\s*\\(\\s*'G5_MYSQL_HOST'\\s*,\\s*'([^']*)'\\s*\\)/", $raw, $m)) {
    $host = $m[1];
}
if (preg_match("/define\\s*\\(\\s*'G5_MYSQL_USER'\\s*,\\s*'([^']*)'\\s*\\)/", $raw, $m)) {
    $user = $m[1];
}
if (preg_match("/define\\s*\\(\\s*'G5_MYSQL_PASSWORD'\\s*,\\s*'([^']*)'\\s*\\)/", $raw, $m)) {
    $pass = $m[1];
}
if (preg_match("/define\\s*\\(\\s*'G5_MYSQL_DB'\\s*,\\s*'([^']*)'\\s*\\)/", $raw, $m)) {
    $db = $m[1];
}

$result['host'] = $host;
$result['db'] = $db;
$result['user'] = $user;

if ($host === '' || $user === '' || $db === '') {
    $result['message'] = 'dbconfig.php 에서 호스트/계정/DB 명을 파싱하지 못했습니다.';
    $result['elapsed_ms'] = (int) round((microtime(true) - $started) * 1000);
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

@ini_set('default_socket_timeout', '3');

if (!function_exists('mysqli_init')) {
    $result['message'] = 'mysqli 확장이 없습니다.';
    $result['elapsed_ms'] = (int) round((microtime(true) - $started) * 1000);
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

$mysqli = mysqli_init();
@mysqli_options($mysqli, MYSQLI_OPT_CONNECT_TIMEOUT, 3);
$ok = @mysqli_real_connect($mysqli, $host, $user, $pass, $db);
$result['elapsed_ms'] = (int) round((microtime(true) - $started) * 1000);

if ($ok) {
    $result['ok'] = true;
    $result['message'] = 'DB 연결 성공. /adm 접속이 가능해야 합니다.';
    @mysqli_close($mysqli);
} else {
    $result['ok'] = false;
    $result['errno'] = (int) mysqli_connect_errno();
    $result['message'] = (string) mysqli_connect_error();
}

echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
