<?php
/**
 * 추천 차량 갤러리 목록 (홈 SPA용 JSON)
 * URL: /proc/vehicles-list.php?limit=12
 *
 * 게시판 생성(관리자):
 * - bo_table: vehicles (_site.config.php vehicles_bo_table)
 * - 목록/읽기: 전체(1), 쓰기: 관리자(10)
 *
 * 추가필드:
 * - wr_1 제조사
 * - wr_2 용도(출퇴근용/가족용/생업용)
 * - wr_3 연료
 * - wr_4 차종(경차/세단/SUV/승합차/화물차)
 * - wr_5 상태(상담 가능 등)
 * - wr_subject 차량명
 * - 썸네일 이미지 첨부
 */
include_once dirname(__FILE__) . '/../_common.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=60');

if (!defined('_GNUBOARD_')) {
    echo json_encode(array('success' => false, 'items' => array()), JSON_UNESCAPED_UNICODE);
    exit;
}

if (is_file(G5_PATH . '/_site.config.php')) {
    include_once G5_PATH . '/_site.config.php';
}

$bo_table = function_exists('g5site_cfg') ? g5site_cfg('vehicles_bo_table', 'vehicles') : 'vehicles';
$bo_table = preg_replace('/[^a-z0-9_]/i', '', $bo_table);
if ($bo_table === '') {
    $bo_table = 'vehicles';
}

$limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 12;
if ($limit < 1) {
    $limit = 12;
}
if ($limit > 40) {
    $limit = 40;
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

$sql = " select wr_id, wr_subject, wr_1, wr_2, wr_3, wr_4, wr_5
           from {$write_table}
          where wr_is_comment = 0
          order by wr_num, wr_reply
          limit {$limit} ";
$result = sql_query($sql, false);
$items = array();

if ($result) {
    while ($row = sql_fetch_array($result)) {
        $wr_id = (int) $row['wr_id'];
        $href = G5_BBS_URL . '/board.php?bo_table=' . rawurlencode($bo_table) . '&wr_id=' . $wr_id;
        if (function_exists('get_pretty_url')) {
            $pretty = get_pretty_url($bo_table, $wr_id);
            if ($pretty) {
                $href = $pretty;
            }
        }

        $image = '';
        if (function_exists('get_list_thumbnail')) {
            $thumb = get_list_thumbnail($bo_table, $wr_id, 640, 400, false, true);
            if (!empty($thumb['src'])) {
                $image = $thumb['src'];
            }
        }

        $items[] = array(
            'id'           => $wr_id,
            'manufacturer' => get_text($row['wr_1'] !== '' ? $row['wr_1'] : '브랜드'),
            'name'         => get_text($row['wr_subject']),
            'purpose'      => get_text($row['wr_2'] !== '' ? $row['wr_2'] : '상담 후 확인'),
            'fuel'         => get_text($row['wr_3'] !== '' ? $row['wr_3'] : '상담 후 확인'),
            'type'         => get_text($row['wr_4'] !== '' ? $row['wr_4'] : '세단'),
            'status'       => get_text($row['wr_5'] !== '' ? $row['wr_5'] : '상담 가능'),
            'image'        => $image,
            'href'         => $href,
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
