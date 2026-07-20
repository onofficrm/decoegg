<?php
/**
 * 상담 사례 게시판 목록 (홈 SPA용 JSON)
 * URL: /proc/cases-list.php?limit=6
 *
 * 게시판 생성(관리자):
 * - bo_table: cases (또는 _site.config.php cases_bo_table)
 * - 스킨: basic-card 또는 basic-modern
 * - 목록/읽기: 전체(1), 쓰기: 관리자(10)
 *
 * 추가필드 권장:
 * - wr_1 고객 상황
 * - wr_2 필요 차량
 * - wr_3 월 납입 예산
 * - wr_4 진행 상태 (예: 출고 완료)
 * - wr_5 상담 핵심
 * - wr_6 추천 방향
 */
include_once dirname(__FILE__) . '/../_common.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=60');

if (!defined('_GNUBOARD_')) {
    echo json_encode(array('success' => false, 'message' => '접근이 올바르지 않습니다.', 'items' => array()), JSON_UNESCAPED_UNICODE);
    exit;
}

if (is_file(G5_PATH . '/_site.config.php')) {
    include_once G5_PATH . '/_site.config.php';
}

$bo_table = function_exists('g5site_cfg') ? g5site_cfg('cases_bo_table', 'cases') : 'cases';
$bo_table = preg_replace('/[^a-z0-9_]/i', '', $bo_table);
if ($bo_table === '') {
    $bo_table = 'cases';
}

$limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 6;
if ($limit < 1) {
    $limit = 6;
}
if ($limit > 24) {
    $limit = 24;
}

$board = sql_fetch(" select * from {$g5['board_table']} where bo_table = '" . sql_real_escape_string($bo_table) . "' ");
if (empty($board['bo_table'])) {
    echo json_encode(
        array(
            'success'   => true,
            'ready'     => false,
            'bo_table'  => $bo_table,
            'board_url' => '',
            'message'   => 'cases 게시판이 아직 없습니다. 관리자에서 생성해 주세요.',
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

$sql = " select wr_id, wr_subject, wr_content, wr_1, wr_2, wr_3, wr_4, wr_5, wr_6, wr_datetime
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
            $thumb = get_list_thumbnail($bo_table, $wr_id, 640, 360, false, true);
            if (!empty($thumb['src'])) {
                $image = $thumb['src'];
            }
        }

        $content = trim(strip_tags($row['wr_content']));
        $content = preg_replace('/\s+/u', ' ', $content);

        $items[] = array(
            'id'              => $wr_id,
            'title'           => get_text($row['wr_subject']),
            'customerStatus'  => get_text($row['wr_1']),
            'desiredVehicle'  => get_text($row['wr_2']),
            'monthlyBudget'   => get_text($row['wr_3']),
            'progress'        => get_text($row['wr_4'] !== '' ? $row['wr_4'] : '상담 사례'),
            'keyPoint'        => get_text($row['wr_5'] !== '' ? $row['wr_5'] : (function_exists('cut_str') ? cut_str($content, 80) : substr($content, 0, 80))),
            'recommendation'  => get_text($row['wr_6']),
            'review'          => get_text(function_exists('cut_str') ? cut_str($content, 120) : substr($content, 0, 120)),
            'image'           => $image,
            'href'            => $href,
            'datetime'        => $row['wr_datetime'],
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
