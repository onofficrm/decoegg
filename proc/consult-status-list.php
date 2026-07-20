<?php
/**
 * 최근 상담 현황 (익명화 JSON) — 홈 SPA용
 * URL: /proc/consult-status-list.php?limit=8
 *
 * 우선 cases 게시판 공개 글 사용 (개인정보 안전).
 * wr_1 상황, wr_2 차량, wr_4 진행상태, wr_name 작성자명(마스킹)
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

function onoff_mask_person_name($name)
{
    $name = trim(strip_tags((string) $name));
    if ($name === '') {
        return '고객';
    }
    if (function_exists('mb_substr') && function_exists('mb_strlen')) {
        $first = mb_substr($name, 0, 1, 'UTF-8');
        return $first . '○○';
    }
    return substr($name, 0, 1) . '○○';
}

$bo_table = function_exists('g5site_cfg') ? g5site_cfg('cases_bo_table', 'cases') : 'cases';
$bo_table = preg_replace('/[^a-z0-9_]/i', '', $bo_table);
if ($bo_table === '') {
    $bo_table = 'cases';
}

$limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 8;
if ($limit < 1) {
    $limit = 8;
}
if ($limit > 20) {
    $limit = 20;
}

$board = sql_fetch(" select * from {$g5['board_table']} where bo_table = '" . sql_real_escape_string($bo_table) . "' ");
if (empty($board['bo_table'])) {
    echo json_encode(
        array(
            'success' => true,
            'ready'   => false,
            'items'   => array(),
        ),
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

$write_table = $g5['write_prefix'] . $bo_table;
$sql = " select wr_id, wr_subject, wr_name, wr_1, wr_2, wr_4
           from {$write_table}
          where wr_is_comment = 0
          order by wr_num, wr_reply
          limit {$limit} ";
$result = sql_query($sql, false);
$items = array();

if ($result) {
    while ($row = sql_fetch_array($result)) {
        $type = trim($row['wr_1']);
        $detail = trim($row['wr_2']);
        if ($detail === '') {
            $detail = get_text(function_exists('cut_str') ? cut_str($row['wr_subject'], 20) : substr($row['wr_subject'], 0, 20));
        }
        $status = trim($row['wr_4']);
        if ($status === '') {
            $status = '상담 진행';
        }

        $items[] = array(
            'id'     => (int) $row['wr_id'],
            'name'   => onoff_mask_person_name($row['wr_name']),
            'type'   => get_text($type !== '' ? $type : '상담 고객'),
            'detail' => get_text($detail),
            'status' => get_text($status),
        );
    }
}

echo json_encode(
    array(
        'success' => true,
        'ready'   => true,
        'count'   => count($items),
        'items'   => $items,
    ),
    JSON_UNESCAPED_UNICODE
);
exit;
