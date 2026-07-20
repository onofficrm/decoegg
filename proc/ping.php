<?php
/**
 * PHP 생존 확인 (DB 미사용)
 * URL: /proc/ping.php
 */
header('Content-Type: text/plain; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

echo "ok\n";
echo 'php=' . PHP_VERSION . "\n";
echo 'time=' . gmdate('c') . "\n";
echo 'sapi=' . PHP_SAPI . "\n";

// 웹서버 아웃바운드 IP (원격 MySQL 허용 IP와 비교용)
$ctx = stream_context_create(array(
    'http' => array('timeout' => 2),
    'ssl'  => array('verify_peer' => true, 'verify_peer_name' => true),
));
$ip = @file_get_contents('https://api.ipify.org', false, $ctx);
if ($ip) {
    echo 'outbound_ip=' . trim($ip) . "\n";
} else {
    echo "outbound_ip=unknown\n";
}
