/** 상담 가능 시간 (한국 시간 기준) */
export type ConsultAvailability = {
  open: boolean;
  label: string;
  detail: string;
};

function getKoreaNow(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
}

export function getConsultAvailability(now = getKoreaNow()): ConsultAvailability {
  const day = now.getDay(); // 0 Sun ... 6 Sat
  const minutes = now.getHours() * 60 + now.getMinutes();

  // 일요: 휴무 / 토요: 10–18 / 평일: 09–20
  if (day === 0) {
    return {
      open: false,
      label: '오늘은 휴무',
      detail: '카카오톡으로 남겨주시면 영업일에 순차 연락드립니다.',
    };
  }

  const start = day === 6 ? 10 * 60 : 9 * 60;
  const end = day === 6 ? 18 * 60 : 20 * 60;

  if (minutes >= start && minutes < end) {
    return {
      open: true,
      label: '지금 상담 가능',
      detail: day === 6 ? '토요일 상담 10:00–18:00 · 평균 응답 약 10분' : '평일 상담 09:00–20:00 · 평균 응답 약 10분',
    };
  }

  if (minutes < start) {
    return {
      open: false,
      label: '곧 상담 시작',
      detail: day === 6 ? '오늘 10:00부터 상담 가능합니다.' : '오늘 09:00부터 상담 가능합니다.',
    };
  }

  return {
    open: false,
    label: '오늘은 상담 종료',
    detail: '카카오톡·상담 신청을 남겨주시면 다음 영업일에 연락드립니다.',
  };
}
