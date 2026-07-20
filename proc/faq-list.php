<?php
/**
 * FAQ 목록 (홈 SPA용 JSON)
 * URL: /proc/faq-list.php?limit=20
 *
 * 게시판: faq (또는 _site.config.php faq_bo_table)
 * - wr_subject = 질문
 * - wr_content = 답변
 * - 목록/읽기: 전체, 쓰기: 관리자
 */
include_once dirname(__FILE__) . '/../_common.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=120');

if (!defined('_GNUBOARD_')) {
    echo json_encode(array('success' => false, 'items' => array()), JSON_UNESCAPED_UNICODE);
    exit;
}

if (is_file(G5_PATH . '/_site.config.php')) {
    include_once G5_PATH . '/_site.config.php';
}

$bo_table = function_exists('g5site_cfg') ? g5site_cfg('faq_bo_table', 'faq') : 'faq';
$bo_table = preg_replace('/[^a-z0-9_]/i', '', $bo_table);
if ($bo_table === '') {
    $bo_table = 'faq';
}

$limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 20;
if ($limit < 1) {
    $limit = 20;
}
if ($limit > 50) {
    $limit = 50;
}

$board = sql_fetch(" select * from {$g5['board_table']} where bo_table = '" . sql_real_escape_string($bo_table) . "' ");
if (empty($board['bo_table'])) {
    echo json_encode(
        array(
            'success'   => true,
            'ready'     => false,
            'bo_table'  => $bo_table,
            'board_url' => '',
            'items'     => array(),
        ),
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

$write_table = $g5['write_prefix'] . $bo_table;
$board_url = G5_BBS_URL . '/board.php?bo_table=' . rawurlencode($bo_table);
if (function_exists('get_pretty_url')) {
    $pretty = get_pretty_url($bo_table);
    if ($pretty) {
        $board_url = $pretty;
    }
}

$sql = " select wr_id, wr_subject, wr_content
           from {$write_table}
          where wr_is_comment = 0
          order by wr_num, wr_reply
          limit {$limit} ";
$result = sql_query($sql, false);
$items = array();

if ($result) {
    while ($row = sql_fetch_array($result)) {
        $answer = trim(preg_replace('/\s+/u', ' ', strip_tags($row['wr_content'])));
        $items[] = array(
            'id' => (int) $row['wr_id'],
            'q'  => get_text($row['wr_subject']),
            'a'  => get_text($answer),
        );
    }
}

echo json_encode(
    array(
        'success'   => true,
        'ready'     => true,
        'bo_table'  => $bo_table,
        'board_url' => $board_url,
        'count'     => count($items),
        'items'     => $items,
    ),
    JSON_UNESCAPED_UNICODE
);
exit;
