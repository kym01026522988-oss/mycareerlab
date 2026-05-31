'use strict';

// ── 섹션 정의 ─────────────────────────────────
const SECTIONS = [
  { id: 'home', icon: '🏠', label: '홈', group: null },

  // 개인
  { id: 'insight',   icon: '📓', label: '통찰노트',   group: 'personal' },
  { id: 'checkin',   icon: '🌡️', label: '자기점검',   group: 'personal' },
  { id: 'finance',   icon: '💰', label: '강사 수입',   group: 'personal' },
  { id: 'vision',    icon: '🎯', label: '비전 & 목표', group: 'personal' },
  { id: 'reading',   icon: '📚', label: '독서기록',    group: 'personal' },
  { id: 'gratitude', icon: '🙏', label: '감사일기',    group: 'personal' },
  { id: 'travel',    icon: '✈️', label: '여행기록',    group: 'personal' },

  // 강사
  { id: 'cabinet',    icon: '🗄️', label: '강의 캐비닛',    group: 'instructor' },
  { id: 'journal',    icon: '📖', label: '수업일지',        group: 'instructor' },
  { id: 'lessonplan', icon: '📝', label: '강의 준비 도구', group: 'instructor' },
  { id: 'actlib',     icon: '🎭', label: '활동 라이브러리', group: 'instructor' },
  { id: 'clients',    icon: '🤝', label: '클라이언트 노트', group: 'instructor' },
  { id: 'portfolio',  icon: '🏆', label: '포트폴리오',      group: 'instructor' },

  // 연구소
  { id: 'trends',    icon: '📈', label: '진로 트렌드',    group: 'lab', agentMission: 'trend'  },
  { id: 'policy',    icon: '🏛️', label: '정책 & 입시',    group: 'lab', agentMission: 'policy' },
  { id: 'datalab',   icon: '🔢', label: '데이터 노트',    group: 'lab', agentMission: 'data'   },
  { id: 'scriptgen', icon: '🎬', label: 'PPT 대본 생성기', group: 'instructor' },
  { id: 'agentlab',  icon: '🤖', label: '에이전트 엔진',  group: 'lab' },
  { id: 'dbviewer',  icon: '📂', label: '자료DB',          group: 'lab' },
];

const GROUPS = {
  personal:   { label: '개인',   icon: '👤', color: '#4F46E5', desc: '사람으로서의 나' },
  instructor: { label: '강사',   icon: '🎓', color: '#059669', desc: '진로강사로서의 나' },
  lab:        { label: '연구소', icon: '🔬', color: '#D97706', desc: '시장과 트렌드 관찰' },
};

// 자기점검 컨디션 매핑
const CONDITION_MAP = {
  '매우 좋음': { emoji: '😊', cls: 'cond-great' },
  '좋음':      { emoji: '🙂', cls: 'cond-good' },
  '보통':      { emoji: '😐', cls: 'cond-ok' },
  '나쁨':      { emoji: '😔', cls: 'cond-bad' },
  '매우 나쁨': { emoji: '😢', cls: 'cond-worst' },
};

// ── 섹션별 입력 폼 ────────────────────────────
const FORMS = {
  // ── 개인 ──
  insight: [
    { name: 'type',    label: '유형',  type: 'select',   options: ['데일리페이지', '통찰', '나에게 보내는 편지'] },
    { name: 'date',    label: '날짜',  type: 'date' },
    { name: 'title',   label: '제목',  type: 'text',     required: true, placeholder: '오늘의 제목 또는 주제' },
    { name: 'content', label: '내용',  type: 'textarea', required: true, placeholder: '자유롭게 작성하세요...', rows: 10 },
  ],
  checkin: [
    { name: 'date',      label: '날짜',            type: 'date', required: true },
    { name: 'condition', label: '오늘 컨디션',     type: 'select', options: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'] },
    { name: 'emotion',   label: '오늘의 감정',      type: 'text',     placeholder: '예: 설렘, 피곤함, 불안, 평온...' },
    { name: 'needs',     label: '욕구 / 신호',     type: 'textarea', placeholder: '지금 내 몸과 마음이 원하는 것은...' },
    { name: 'memo',      label: '오늘의 한 줄',    type: 'text',     placeholder: '오늘을 한 문장으로 표현하면...' },
  ],
  finance: [
    { name: 'client',  label: '기관명',      type: 'text',     required: true, placeholder: '예: OO중학교, OO교육청' },
    { name: 'date',    label: '입금 날짜',   type: 'date' },
    { name: 'amount',  label: '강의료 (원)', type: 'number',   required: true, placeholder: '500000' },
    { name: 'account', label: '입금 계좌',   type: 'text',     placeholder: '예: 국민은행 메인통장' },
    { name: 'moved',   label: '이동 내역',   type: 'text',     placeholder: '예: 저축 30만 / 생활비 이전' },
    { name: 'memo',    label: '메모',        type: 'textarea', placeholder: '강의 조건, 특이사항...' },
  ],
  vision: [
    { name: 'title',   label: '목표',         type: 'text',     required: true, placeholder: '달성하고 싶은 목표' },
    { name: 'horizon', label: '기간',         type: 'select',   options: ['단기 (~3개월)', '중기 (~1년)', '장기 (1년+)'] },
    { name: 'content', label: '구체적 내용',  type: 'textarea', placeholder: '어떻게 달성할 것인지...' },
    { name: 'status',  label: '상태',         type: 'select',   options: ['진행중', '달성', '보류'] },
  ],

  // ── 강사 ──
  cabinet: [
    { name: 'title',       label: '자료명',          type: 'text',     required: true, placeholder: '파일 제목' },
    { name: 'type',        label: '유형',            type: 'select',   options: ['PPT', '강의계획서', '슬라이드구조', 'PPT 대본', '공문서식', '교안', '핸드아웃', '기타'] },
    { name: 'target',      label: '대상 (기관/학년)', type: 'text',     placeholder: '예: 고1, OO중학교' },
    { name: 'description', label: '설명',            type: 'textarea', placeholder: '자료 내용 요약...' },
    { name: 'link',        label: '파일 링크',        type: 'url',      placeholder: 'Google Drive, Notion 등 링크' },
    { name: 'tags',        label: '태그',            type: 'text',     placeholder: '자기이해, 진로탐색, 1학년 (쉼표 구분)' },
  ],
  journal: [
    { name: 'date',        label: '수업 날짜',    type: 'date', required: true },
    { name: 'client',      label: '기관명',       type: 'text', placeholder: '예: OO중학교' },
    { name: 'title',       label: '수업 주제',    type: 'text', required: true, placeholder: '오늘 수업의 주제' },
    { name: 'participants',label: '참여 인원',    type: 'number', placeholder: '30' },
    { name: 'content',     label: '수업 내용',    type: 'textarea', placeholder: '진행한 내용, 흐름...' },
    { name: 'response',    label: '수강생 반응',  type: 'textarea', placeholder: '학생들의 반응, 인상적인 순간...' },
    { name: 'improvement', label: '개선점 / 다음에는', type: 'textarea', placeholder: '다음번에 바꿀 것, 보완할 것...' },
  ],
  actlib: [
    { name: 'title',       label: '활동명',    type: 'text',     required: true, placeholder: '활동 이름' },
    { name: 'type',        label: '유형',      type: 'select',   options: ['아이스브레이킹', '영상자료', '강의대본', '게임/놀이', '워크시트', '기타'] },
    { name: 'target',      label: '적합 대상', type: 'text',     placeholder: '예: 고등학생, 전체' },
    { name: 'description', label: '활동 설명', type: 'textarea', placeholder: '어떻게 진행하는지, 효과는...' },
    { name: 'tags',        label: '태그',      type: 'text',     placeholder: '자기이해, 팀활동, 15분 (쉼표 구분)' },
    { name: 'link',        label: '링크/출처', type: 'url',      placeholder: 'YouTube, Drive 등' },
  ],
  clients: [
    { name: 'title',   label: '기관명',         type: 'text', required: true, placeholder: 'OO중학교, OO구청 등' },
    { name: 'contact', label: '담당자',          type: 'text', placeholder: '홍길동 선생님' },
    { name: 'phone',   label: '연락처',          type: 'text', placeholder: '010-0000-0000' },
    { name: 'type',    label: '기관 유형',       type: 'select', options: ['중학교', '고등학교', '대학교', '기업', '공공기관', '비영리', '기타'] },
    { name: 'history', label: '강의 이력',       type: 'textarea', placeholder: '2024.03 진로탐색 8회차\n2025.09 자기이해 프로그램...' },
    { name: 'memo',    label: '특이사항 / 메모', type: 'textarea', placeholder: '주의사항, 특이한 요청, 분위기 등...' },
  ],
  portfolio: [
    { name: 'title',       label: '제목',    type: 'text',     required: true, placeholder: '강의명, 프로젝트명 등' },
    { name: 'type',        label: '유형',    type: 'select',   options: ['강의', '미디어 출연', '수상/선정', '출판/기고', '자격/인증', '기타'] },
    { name: 'date',        label: '날짜',    type: 'date' },
    { name: 'description', label: '설명',    type: 'textarea', placeholder: '상세 내용...' },
    { name: 'link',        label: '링크 (선택)', type: 'url',  placeholder: 'https://...' },
  ],

  reading: [
    { name: 'title',    label: '책 제목',    type: 'text',     required: true, placeholder: '책 제목' },
    { name: 'author',   label: '저자',       type: 'text',     placeholder: '저자명' },
    { name: 'category', label: '분류',       type: 'select',   options: ['그림책', '진로', '자기계발', '전공', '소설/기타'] },
    { name: 'date',     label: '읽은 날짜',  type: 'date' },
    { name: 'rating',   label: '별점',       type: 'select',   options: ['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐'] },
    { name: 'review',   label: '한줄 소감',  type: 'text',     placeholder: '이 책을 한 문장으로...' },
    { name: 'quote',    label: '핵심 문장',  type: 'textarea', placeholder: '기억하고 싶은 문장이나 단락...', rows: 4 },
  ],
  gratitude: [
    { name: 'date',     label: '날짜',              type: 'date' },
    { name: 'thing1',   label: '감사한 것 1',       type: 'text',     placeholder: '첫 번째 감사...' },
    { name: 'thing2',   label: '감사한 것 2',       type: 'text',     placeholder: '두 번째 감사...' },
    { name: 'thing3',   label: '감사한 것 3',       type: 'text',     placeholder: '세 번째 감사...' },
    { name: 'moment',   label: '오늘의 좋았던 순간', type: 'textarea', placeholder: '기억하고 싶은 순간...', rows: 3 },
    { name: 'tomorrow', label: '내일의 다짐',       type: 'text',     placeholder: '내일 하고 싶은 한 가지...' },
  ],
  travel: [
    { name: 'destination', label: '여행지',          type: 'text',     required: true, placeholder: '어디를 다녀왔나요?' },
    { name: 'date',        label: '여행 날짜',       type: 'date' },
    { name: 'companion',   label: '동행',            type: 'text',     placeholder: '혼자 / 가족 / 친구...' },
    { name: 'summary',     label: '한줄 요약',       type: 'text',     placeholder: '이 여행을 한 문장으로...' },
    { name: 'memory',      label: '기억에 남는 순간', type: 'textarea', placeholder: '가장 기억에 남는 장면이나 감정...', rows: 4 },
    { name: 'link',        label: '사진 링크',       type: 'url',      placeholder: '구글포토, 카카오 등 (선택)' },
  ],

  // ── 연구소 ──
  trends: [
    { name: 'title',   label: '제목', type: 'text',     required: true, placeholder: '트렌드 제목' },
    { name: 'field',   label: '분야', type: 'select',   options: ['AI·기술', '직업시장', '교육제도', '청년취업', '글로벌트렌드', '기타'] },
    { name: 'link',    label: 'URL',  type: 'url',      placeholder: 'https://...' },
    { name: 'content', label: '핵심 내용', type: 'textarea', placeholder: '핵심 내용...' },
    { name: 'source',  label: '출처', type: 'text',     placeholder: '매체명, 보고서명 등' },
    { name: 'date',    label: '날짜', type: 'date' },
  ],
  policy: [
    { name: 'title',   label: '제목', type: 'text',     required: true, placeholder: '정책/입시 변화 제목' },
    { name: 'type',    label: '유형', type: 'select',   options: ['교육정책', '대입변화', '학과개편', '취업정책', '장학금', '스크랩', '기타'] },
    { name: 'link',    label: 'URL / 링크', type: 'url', placeholder: 'https://...' },
    { name: 'content', label: '핵심 내용', type: 'textarea', placeholder: '핵심 내용...' },
    { name: 'source',  label: '출처', type: 'text',     placeholder: '교육부, 조선일보 등' },
    { name: 'date',    label: '날짜', type: 'date' },
  ],
  datalab: [
    { name: 'title',          label: '제목',        type: 'text',     required: true, placeholder: '데이터 제목' },
    { name: 'data',           label: '데이터/수치',  type: 'textarea', placeholder: '핵심 수치와 데이터...' },
    { name: 'source',         label: '출처',        type: 'text',     placeholder: '통계청, 고용노동부 등' },
    { name: 'date',           label: '날짜',        type: 'date' },
    { name: 'interpretation', label: '해석/인사이트', type: 'textarea', placeholder: '이 데이터가 의미하는 것...' },
  ],
};

// ── 앱 상태 ───────────────────────────────────
const state = {
  config: null,
  data: null,
  sha: null,
  currentSection: 'home',
  editingId: null,
};

let journalPendingPhotos = []; // [{url, name}] — 모달 중 임시 보관

// ── GitHub API ────────────────────────────────
const DATA_FILE = 'data/careerlab.json';

function ghHeaders() {
  return {
    'Authorization': `token ${state.config.token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json',
  };
}

function toB64(str) { return btoa(unescape(encodeURIComponent(str))); }
function fromB64(str) { return decodeURIComponent(escape(atob(str))); }

async function ghLoad() {
  const url = `https://api.github.com/repos/${state.config.owner}/${state.config.repo}/contents/${DATA_FILE}`;
  const res = await fetch(url, { headers: ghHeaders() });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${res.statusText}`);
  const json = await res.json();
  state.sha = json.sha;
  return JSON.parse(fromB64(json.content.replace(/\n/g, '')));
}

async function ghSave(data) {
  const url = `https://api.github.com/repos/${state.config.owner}/${state.config.repo}/contents/${DATA_FILE}`;
  const body = {
    message: `update ${new Date().toISOString().slice(0,16).replace('T',' ')}`,
    content: toB64(JSON.stringify(data, null, 2)),
  };
  if (state.sha) body.sha = state.sha;
  const res = await fetch(url, { method: 'PUT', headers: ghHeaders(), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`저장 실패 (${res.status})`);
  const json = await res.json();
  state.sha = json.content.sha;
}

// ── GitHub DB 업로드 ──────────────────────────
async function uploadMarkdownToGitHub(folderPath, filename, markdownContent) {
  const safe = filename.replace(/[<>:"/\\|?*\n\r]/g, '_').slice(0, 80);
  const filePath = `${folderPath}/${safe}.md`;
  const url = `https://api.github.com/repos/${state.config.owner}/${state.config.repo}/contents/${filePath}`;
  let sha = null;
  try {
    const r = await fetch(url, { headers: ghHeaders() });
    if (r.ok) sha = (await r.json()).sha;
  } catch (_) {}
  const body = { message: `자료 저장: ${safe}`, content: toB64(markdownContent) };
  if (sha) body.sha = sha;
  const res = await fetch(url, { method: 'PUT', headers: ghHeaders(), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`DB 업로드 실패 (${res.status})`);
}

function entryToMarkdown(title, content, tags, meta = {}) {
  const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const lines = [`# ${title}`, ''];
  if (meta.type)     lines.push(`**유형**: ${meta.type}`);
  if (meta.target)   lines.push(`**대상**: ${meta.target}`);
  if (meta.duration) lines.push(`**강의시간**: ${meta.duration}`);
  if (tags)          lines.push(`**태그**: ${tags}`);
  lines.push('', '---', '');
  if (content) lines.push(content);
  lines.push('', '---', `*mycareerlab 저장 — ${now}*`);
  return lines.join('\n');
}

function downloadAsDocx(title, content) {
  if (typeof htmlDocx === 'undefined') {
    toast('⚠️ DOCX 라이브러리 로드 실패 — 페이지를 새로고침해주세요');
    return;
  }
  const safeContent = content
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <style>body{font-family:'Malgun Gothic',sans-serif;line-height:1.7;margin:40px}
    h1{color:#1e293b;border-bottom:2px solid #4F46E5;padding-bottom:8px;margin-bottom:24px}
    pre{white-space:pre-wrap;font-size:11pt;font-family:'Malgun Gothic',sans-serif}</style>
    </head><body><h1>${escHtml(title)}</h1><pre>${safeContent}</pre></body></html>`;
  const blob = htmlDocx.asBlob(html);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${title.replace(/[<>:"/\\|?*]/g, '_').slice(0, 60)}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ── 기본 에이전트 정의 ────────────────────────
const BASE_AGENTS = [
  {
    id: 'stem',
    name: '줄기세포',
    icon: '🧬',
    type: 'base',
    role: '총괄 오케스트레이터',
    desc: '미션을 분석하고 팀을 설계한다. 모든 에이전트의 뼈대.',
    strength: '파이프라인 설계, SOT 관리, 품질 검증',
    prompt: `당신은 mycareerlab의 핵심 에이전트 줄기세포입니다.
역할: 미션을 분석하고 최적의 실행 파이프라인을 설계합니다.
원칙:
- 품질 > 속도. 불확실한 정보는 허용하지 않습니다.
- 출처 없는 정보는 정보가 아닙니다.
- 결과물은 반드시 실행 가능해야 합니다.
- 수치와 데이터는 정확한 것만 제시합니다.`,
  },
  {
    id: 'scanner',
    name: '환경스캐너',
    icon: '🌍',
    type: 'base',
    role: '트렌드 & 신호 탐지',
    desc: 'STEEP × 3 Horizons 분석. 직업시장 미래 신호를 읽는다.',
    strength: '진로 트렌드, 직업 변화, 미래 신호 분석',
    prompt: `당신은 mycareerlab의 환경스캐너입니다.
역할: STEEP(사회·기술·경제·환경·정치) 관점에서 환경을 스캔하고 3 Horizons 프레임으로 미래 신호를 분류합니다.
출력 형식: 신호명 / 분야 / 현재 상태 / 미래 방향 / 진로 강사에게의 시사점 / 출처`,
  },
  {
    id: 'crawler',
    name: '정보수집러',
    icon: '📰',
    type: 'base',
    role: '뉴스 & 사례 수집',
    desc: '최신 뉴스, 사례, 교육자료를 수집·정리한다.',
    strength: '실시간 정보 수집, 출처 확인, 구조화 정리',
    prompt: `당신은 mycareerlab의 정보수집러입니다.
역할: 주어진 주제에 대한 최신 정보, 사례, 자료를 수집하고 구조화합니다.
출력 형식: 제목 / 출처 / 날짜 / 핵심 내용 / 강사 활용 방법
규칙: 추측하지 않습니다. 실제 존재하는 정보만 제시합니다.`,
  },
  {
    id: 'databot',
    name: '데이터봇',
    icon: '🕷️',
    type: 'base',
    role: '구조화 데이터 수집',
    desc: '채용공고, 학과정보, 통계 등 구조화된 데이터를 수집한다.',
    strength: '수치 데이터, 통계, 채용/입시 정보 수집',
    prompt: `당신은 mycareerlab의 데이터봇입니다.
역할: 수치, 통계, 채용공고, 입시정보 등 구조화된 데이터를 수집합니다.
출력 형식: 항목명 / 수치 / 출처 / 기준일자 / 해석
규칙: 모든 수치는 반드시 출처와 기준일자를 포함합니다.`,
  },
  {
    id: 'writer',
    name: '라이터',
    icon: '✍️',
    type: 'base',
    role: '콘텐츠 생성 & 편집',
    desc: '수집된 정보를 강의 자료, 활동지, 대본으로 변환한다.',
    strength: '강의안, 활동지, 아이스브레이킹, 대본 작성',
    prompt: `당신은 mycareerlab의 라이터입니다.
역할: 수집된 정보를 진로강사가 바로 사용할 수 있는 콘텐츠로 변환합니다.
출력 형식: 제목 / 유형 / 대상 / 소요시간 / 목표 / 진행방법 / 준비물 / 예상반응
기준: 현장에서 바로 쓸 수 있어야 합니다.`,
  },
];

// ── 전문 에이전트 (상시 배치) ─────────────────
const SPECIALIST_AGENTS = [
  {
    id: 'icebreaker',
    name: '아이스브레이킹 헌터',
    icon: '🎯',
    type: 'specialist',
    role: '아이스브레이킹 자료 전문 수집',
    desc: '유튜브·교사커뮤니티·해외 교육사이트에서 아이스브레이킹 자료를 수집하고 소요시간·인원·목적별로 분류한다.',
    strength: 'YouTube, 인디스쿨, TED-Ed, 해외 교육사이트',
    prompt: `당신은 아이스브레이킹 자료 전문 수집 에이전트입니다.

수집 범위: YouTube, 인디스쿨, 교사커뮤니티, Pinterest, 해외 교육사이트(Teacherspayteachers, Edutopia 등)

출력 형식 (항목마다):
**활동명**:
**출처**: (URL 포함)
**소요시간**:
**적정 인원**:
**목적**: (에너지업 / 집중유도 / 관계형성 / 창의자극 중 택1)
**진행방법**: 단계별로 설명
**준비물**:
**주의사항**:
**강사 팁**:
---

규칙: 실제로 검색 가능한 자료만 제시. 출처 URL은 반드시 포함.`,
  },
  {
    id: 'teambuilder',
    name: '팀빌딩 코디네이터',
    icon: '🤸',
    type: 'specialist',
    role: '팀빌딩 활동 수집 & 프로그램 설계',
    desc: '협업·신뢰·소통을 주제로 한 팀빌딩 활동을 수집하고, 워크숍 흐름에 맞게 배치한다.',
    strength: '워크숍 설계, 그룹 다이나믹, 협업 활동, 조직문화',
    prompt: `당신은 팀빌딩 전문 코디네이터입니다.

전문 분야: 그룹 역학(group dynamics), 협업 활동, 신뢰 구축, 소통 훈련

출력 형식 (항목마다):
**활동명**:
**출처/참고**:
**목적**: (신뢰형성 / 소통강화 / 협업훈련 / 갈등해소 / 에너지관리 중 택1)
**소요시간**:
**적정 인원**:
**난이도**: (쉬움/보통/어려움)
**진행방법**: 단계별
**디브리핑 질문**: (활동 후 나눌 성찰 질문 2~3개)
**주의사항**:
---

규칙: 한국 직장·학교 문화에 적용 가능한 것만. 준비물이 적고 현장에서 바로 쓸 수 있는 것 우선.`,
  },
  {
    id: 'globalcollector',
    name: '해외 자료 번역사',
    icon: '🌐',
    type: 'specialist',
    role: '영미권 교육자료 수집 & 한국 맞춤 변환',
    desc: '영미권 최신 교육 활동 자료를 찾아 한국 교실과 학교 문화에 맞게 재구성한다.',
    strength: 'Edutopia, TPT, Education.com, CASEL, 문화적 맥락 변환',
    prompt: `당신은 해외 교육자료 전문 번역·변환 에이전트입니다.

수집 대상: 미국·영국·캐나다·호주 교육 사이트 (Edutopia, TeachersPayTeachers, Education.com, CASEL, Character.org 등)

작업 순서:
1. 해외 자료 원문 요약
2. 한국 교실 문화 적합성 판단
3. 문화적 맥락 변환 (미국식 → 한국식)
4. 강사가 바로 쓸 수 있는 형태로 재구성

출력 형식:
**활동명 (원제 / 한국어)**:
**출처**: (URL)
**원본 요약**:
**한국 맞춤 변환 내용**:
**소요시간 / 인원**:
**진행방법**:
**변환 시 주의점**:
---`,
  },
  {
    id: 'videocurator',
    name: '영상 큐레이터',
    icon: '📺',
    type: 'specialist',
    role: '교육용 영상 자료 수집 & 활용법 정리',
    desc: 'YouTube·TED·교육플랫폼에서 강의·활동에 바로 쓸 수 있는 영상을 큐레이팅하고 활용 시나리오를 제안한다.',
    strength: 'YouTube, TED, TED-Ed, EBS, 세바시, 국내외 교육 채널',
    prompt: `당신은 교육용 영상 큐레이터입니다.

수집 플랫폼: YouTube, TED, TED-Ed, EBS, 세바시, Khan Academy, Crash Course, 국내 교육 채널

출력 형식 (영상마다):
**영상 제목**:
**채널/출처**:
**URL**:
**재생시간**:
**언어**: (한국어 / 영어 / 한국어 자막 가능)
**핵심 메시지**: (1~2줄)
**강의 활용 시나리오**: (어떤 수업의 어느 단계에서 어떻게 쓸지)
**토론 질문**: (영상 시청 후 나눌 질문 2개)
**주의사항**: (선정적/논란 요소 등)
---

규칙: 실제로 존재하는 영상만. URL은 실제로 접근 가능한 것만 제시.`,
  },
  {
    id: 'gamedesigner',
    name: '게임·놀이 디자이너',
    icon: '🎮',
    type: 'specialist',
    role: '교육용 게임/놀이 활동 수집 & 설계',
    desc: '게임화(gamification) 기법과 놀이 요소를 진로교육에 적용한 활동을 수집하고 직접 설계한다.',
    strength: '게임화, 보드게임, 롤플레이, 시뮬레이션, 창의 활동',
    prompt: `당신은 교육용 게임·놀이 디자이너입니다.

전문 분야: 게임화(gamification), 보드게임 기반 학습, 롤플레이, 시뮬레이션, 창의적 놀이

출력 형식 (활동마다):
**활동명**:
**유형**: (보드게임 / 롤플레이 / 시뮬레이션 / 퀴즈게임 / 창의놀이)
**출처/참고**:
**게임 목적**:
**소요시간**:
**적정 인원**:
**준비물**:
**규칙 & 진행방법**: 단계별
**학습 포인트**: (이 게임을 통해 학생이 발견하는 것)
**변형 아이디어**: (난이도 조절, 시간 단축 버전 등)
---

설계 철학: 재미 없으면 학습도 없다. 몰입이 먼저.`,
  },
];

// ── 미션 유형 & 예시 멘트 ─────────────────────
const MISSION_TYPES = [
  {
    id: 'sourcing',
    label: '🔍 현장 소스 발굴',
    desc: '아이스브레이킹·팀빌딩·활동 자료를 직접 찾아온다',
    defaultAgents: ['stem', 'icebreaker', 'teambuilder', 'globalcollector'],
    defaultTarget: 'actlib',
    example: `고등학생 대상 아이스브레이킹 자료 10개를 수집해줘. 각각 소요시간, 진행방법, 준비물, 대상 인원을 포함하고, YouTube·교사커뮤니티·해외 교육사이트에서 출처를 찾아줘.`,
  },
  {
    id: 'video',
    label: '📺 영상 자료 큐레이션',
    desc: 'YouTube·TED·EBS에서 강의에 쓸 영상을 큐레이팅한다',
    defaultAgents: ['stem', 'videocurator'],
    defaultTarget: 'actlib',
    example: `진로탐색 수업에서 활용할 영상 자료 5개를 찾아줘. 10분 이내, 한국어 또는 한국어 자막 가능한 것으로, 각 영상의 핵심 메시지와 수업 활용 시나리오를 포함해줘.`,
  },
  {
    id: 'game',
    label: '🎮 게임·놀이 설계',
    desc: '교육 게임과 놀이 활동을 수집하거나 직접 설계한다',
    defaultAgents: ['stem', 'gamedesigner', 'icebreaker'],
    defaultTarget: 'actlib',
    example: `자기이해를 주제로 한 교육용 게임 또는 놀이 활동 3개를 만들어줘. 준비물 없이 30분 이내, 고등학생 20~30명 기준. 규칙·진행방법·디브리핑 질문 포함.`,
  },
  {
    id: 'trend',
    label: '📈 시장 & 트렌드 스캔',
    desc: '직업시장 변화와 진로 트렌드를 분석한다',
    defaultAgents: ['stem', 'scanner', 'databot'],
    defaultTarget: 'trends',
    example: `2025~2026년 AI 관련 직업 트렌드를 분석해줘. 유망 직종 5개, 각 직종의 성장 배경·필요 역량·진입 경로를 포함하고 출처를 명시해줘.`,
  },
  {
    id: 'policy',
    label: '🏛️ 정책 & 입시 수집',
    desc: '교육정책·대입변화·취업정책 최신 정보를 수집한다',
    defaultAgents: ['stem', 'crawler', 'databot'],
    defaultTarget: 'policy',
    example: `2025년 대입 제도 주요 변화 사항을 정리해줘. 수시·정시 비율 변화, 학생부 평가 기준 변화, 논술·면접 동향을 포함하고 교육부·대학별 공식 출처를 명시해줘.`,
  },
  {
    id: 'data',
    label: '🔢 데이터 수집',
    desc: '직업 통계·임금·채용·인구 등 수치 데이터를 수집한다',
    defaultAgents: ['stem', 'databot', 'crawler'],
    defaultTarget: 'datalab',
    example: `2025년 기준 진로강사가 강의에 자주 활용하는 직업·취업·임금 관련 핵심 통계 10개를 수집해줘. 각 수치마다 출처(통계청·고용노동부·사람인 등)와 기준 연도를 반드시 포함하고, 강의에서 어떻게 활용할 수 있는지 한 줄로 설명해줘.`,
  },
  {
    id: 'content',
    label: '📝 콘텐츠 제작',
    desc: '강의안·활동지·대본 등 직접 쓸 수 있는 콘텐츠를 만든다',
    defaultAgents: ['stem', 'writer', 'globalcollector'],
    defaultTarget: 'cabinet',
    example: `고등학교 1학년 대상 자기이해 첫 수업 강의안을 만들어줘. 50분 기준, 도입(10분)·전개(30분)·마무리(10분) 구성. 학생 활동지 초안도 포함.`,
  },
];

// ── 자료DB 폴더 매핑 (GitHub 저장 경로) ──────
const DB_FOLDERS = {
  // 미션 유형 → 폴더
  sourcing: '자료DB/현장소스발굴',
  video:    '자료DB/영상자료',
  game:     '자료DB/게임놀이',
  trend:    '자료DB/시장트렌드',
  policy:   '자료DB/정책입시',
  data:     '자료DB/데이터노트',
  content:  '자료DB/콘텐츠제작',
  script:   '자료DB/PPT대본',
  // 섹션 ID → 폴더 (저장 위치 fallback)
  actlib:   '자료DB/현장소스발굴',
  trends:   '자료DB/시장트렌드',
  datalab:  '자료DB/데이터노트',
  cabinet:  '자료DB/강의캐비닛',
  default:  '자료DB/기타',
};

// 결과 저장 위치 옵션 (실제 섹션과 1:1 대응)
const SAVE_TARGETS = [
  { id: 'actlib',  label: '🎭 활동 라이브러리' },
  { id: 'cabinet', label: '🗄️ 강의 캐비닛' },
  { id: 'trends',  label: '📈 진로 트렌드' },
  { id: 'policy',  label: '🏛️ 정책 & 입시' },
  { id: 'datalab', label: '🔢 데이터 노트' },
];

// ── 검색 허브 설정 (섹션별 전용 검색엔진 + 키워드) ──
const SEARCH_HUBS = {
  trends: {
    label: '직업시장·미래기술 트렌드를 검색합니다',
    engines: [
      { id: 'kosis',    label: 'KOSIS',     icon: '📊', home: 'https://kosis.kr',                        search: 'https://kosis.kr/search/search.do?query=' },
      { id: 'keis',     label: '고용정보원', icon: '💼', home: 'https://www.keis.or.kr',                  search: 'https://www.keis.or.kr/main/index.do' },
      { id: 'wef',      label: 'WEF',        icon: '🌐', home: 'https://www.weforum.org',                search: 'https://www.weforum.org/search?query=' },
      { id: 'mckinsey', label: 'McKinsey',   icon: '🔵', home: 'https://www.mckinsey.com',              search: 'https://www.mckinsey.com/search?q=' },
      { id: 'oecd',     label: 'OECD',       icon: '📋', home: 'https://www.oecd.org',                  search: 'https://www.oecd.org/search/?q=' },
    ],
    defaultEngine: 'kosis',
    keywords: ['미래직업 2030', 'AI 대체직업', '신직업 현황', '직업 트렌드', '노동시장 전망', '4차산업혁명', '청년 취업 동향'],
  },
  policy: {
    label: '교육정책·대입변화·장학금 정보를 수집합니다',
    engines: [
      { id: 'moe',    label: '교육부',     icon: '🏛️', home: 'https://www.moe.go.kr',              search: 'https://www.moe.go.kr/search/search.do?query=' },
      { id: 'adiga',  label: '대학어디가', icon: '🎓', home: 'https://www.adiga.kr',                search: 'https://www.adiga.kr' },
      { id: 'jinhak', label: '진학사',     icon: '📚', home: 'https://www.jinhak.com',             search: 'https://www.jinhak.com' },
      { id: 'kosaf',  label: '장학재단',   icon: '💰', home: 'https://www.kosaf.go.kr',            search: 'https://www.kosaf.go.kr' },
      { id: 'kedi',   label: '교육통계',   icon: '📈', home: 'https://kess.kedi.re.kr',            search: 'https://kess.kedi.re.kr' },
    ],
    defaultEngine: 'moe',
    keywords: ['2026 대입변화', '학생부종합 개편', '수시 정시 비율', '국가장학금 신청', '교육정책 발표', '입시 일정', '대학 모집요강'],
  },
  datalab: {
    label: '강의에 쓸 통계·수치·직업 데이터를 수집합니다',
    engines: [
      { id: 'kosis',    label: 'KOSIS',     icon: '📊', home: 'https://kosis.kr',                      search: 'https://kosis.kr/search/search.do?query=' },
      { id: 'index',    label: 'e-나라지표', icon: '📋', home: 'https://www.index.go.kr',              search: 'https://www.index.go.kr/search/main.do?keyword=' },
      { id: 'work',     label: '워크넷',    icon: '💼', home: 'https://www.work.go.kr',               search: 'https://www.work.go.kr' },
      { id: 'kess',     label: 'KEDI',      icon: '🎓', home: 'https://kess.kedi.re.kr',              search: 'https://kess.kedi.re.kr' },
      { id: 'jobkorea', label: '잡코리아',  icon: '🔍', home: 'https://www.jobkorea.co.kr/Research/', search: 'https://www.jobkorea.co.kr/Research/' },
    ],
    defaultEngine: 'kosis',
    keywords: ['학과별 취업률', '직업별 평균임금', '청년실업률', '전공 미스매치', '고졸 취업통계', '직업 전망 지수', '임금 격차 현황'],
  },
  actlib: {
    label: '아이스브레이킹·퍼실리테이션·게임 활동 자료를 찾습니다',
    engines: [
      { id: 'youtube',   label: 'YouTube',  icon: '▶️', home: 'https://www.youtube.com',                search: 'https://www.youtube.com/results?search_query=' },
      { id: 'indi',      label: '인디스쿨', icon: '🏫', home: 'https://www.indischool.com',             search: 'https://www.indischool.com/community/list?keyword=' },
      { id: 'pinterest', label: 'Pinterest', icon: '📌', home: 'https://www.pinterest.com',             search: 'https://www.pinterest.com/search/pins/?q=' },
      { id: 'edutopia',  label: 'Edutopia', icon: '🌟', home: 'https://www.edutopia.org',              search: 'https://www.edutopia.org/search?keys=' },
      { id: 'tpt',       label: 'TPT',      icon: '✏️', home: 'https://www.teacherspayteachers.com',   search: 'https://www.teacherspayteachers.com/Browse/Search:' },
    ],
    defaultEngine: 'youtube',
    keywords: ['아이스브레이킹 고등학생', '진로 팀빌딩', '퍼실리테이션 도구', '월드카페 방법', '게임으로 배우는 진로', '자기이해 활동지'],
  },
};

// ── 데이터 ────────────────────────────────────
function emptyData() {
  const sections = {};
  SECTIONS.forEach(s => { if (s.group) sections[s.id] = []; });
  return {
    version: 2,
    sections,
    agents: [],
    missions: [],
    visionValues: [],
    visionQuestions: [],
  };
}

function cacheData() {
  localStorage.setItem('mcl_data', JSON.stringify(state.data));
  localStorage.setItem('mcl_sha', state.sha || '');
}
function loadCache() {
  const raw = localStorage.getItem('mcl_data');
  if (raw) state.data = JSON.parse(raw);
  state.sha = localStorage.getItem('mcl_sha') || null;
}

// ── 설정 ──────────────────────────────────────
function saveConfig(cfg) {
  localStorage.setItem('mcl_config', JSON.stringify(cfg));
  state.config = cfg;
}
function loadConfig() {
  const raw = localStorage.getItem('mcl_config');
  return raw ? JSON.parse(raw) : null;
}

// ── 유틸 ──────────────────────────────────────
function newId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }

function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}
function today() { return new Date().toISOString().slice(0, 10); }
function fmtKorDate() {
  const d = new Date();
  return `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 ${'일월화수목금토'[d.getDay()]}요일`;
}
function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function parseTags(raw) {
  if (!raw) return [];
  return raw.split(',').map(t => t.trim()).filter(Boolean);
}

// ── 토스트 / 저장 표시 ─────────────────────────
function toast(msg, ms = 2200) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), ms);
}
let savingEl = null;
function showSaving() {
  if (savingEl) return;
  savingEl = document.createElement('div');
  savingEl.className = 'saving-badge';
  savingEl.textContent = '저장 중...';
  document.body.appendChild(savingEl);
}
function hideSaving() { if (savingEl) { savingEl.remove(); savingEl = null; } }

// ── 사이드바 ──────────────────────────────────
function buildNav() {
  const nav = document.getElementById('sideNav');
  nav.innerHTML = '';

  const homeBtn = navBtn({ id:'home', icon:'🏠', label:'홈' }, null);
  nav.appendChild(homeBtn);

  ['personal','instructor','lab'].forEach(g => {
    const grp = GROUPS[g];
    const wrap = document.createElement('div');
    wrap.className = 'nav-group';
    const lbl = document.createElement('div');
    lbl.className = 'nav-group-label';
    lbl.textContent = `${grp.icon} ${grp.label}`;
    wrap.appendChild(lbl);
    SECTIONS.filter(s => s.group === g).forEach(s => wrap.appendChild(navBtn(s, g)));
    nav.appendChild(wrap);
  });
}

function navBtn(s, group) {
  const btn = document.createElement('button');
  const isActive = state.currentSection === s.id;
  btn.className = 'side-item' + (isActive ? ' active' : '');
  if (group) btn.dataset.group = group;
  btn.innerHTML = `<span class="nav-icon">${s.icon}</span><span>${s.label}</span>`;
  btn.onclick = () => navigate(s.id);
  return btn;
}

function openSidebar()  { document.getElementById('sidebar').classList.add('open'); document.getElementById('overlay').classList.add('show'); }
function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('overlay').classList.remove('show'); }

// ── 네비게이션 ────────────────────────────────
function navigate(id) {
  if (['personal','instructor','lab'].includes(id)) {
    state.currentSection = id;
    buildNav();
    renderGroupPage(id);
    closeSidebar();
    updateBNav(id);
    return;
  }
  state.currentSection = id;
  buildNav();
  closeSidebar();
  if (id === 'home') { renderHome(); updateBNav('home'); }
  else {
    renderSection(id);
    const s = SECTIONS.find(x => x.id === id);
    updateBNav(s?.group || 'home');
  }
}

function updateBNav(active) {
  document.querySelectorAll('.bnav-item').forEach(b => b.classList.toggle('active', b.dataset.nav === active));
}

// ── 홈 ────────────────────────────────────────
function renderHome() {
  document.getElementById('pageTitle').textContent = '홈';
  document.getElementById('addBtn').style.display = 'none';

  const todayStr = today();
  const checkedToday = (state.data.sections.checkin || []).some(i => i.date === todayStr);

  const allItems = [];
  SECTIONS.filter(s => s.group).forEach(s => {
    (state.data.sections[s.id] || []).forEach(item =>
      allItems.push({ ...item, _sid: s.id, _group: s.group, _slabel: s.label })
    );
  });
  allItems.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  const recent = allItems.slice(0, 5);

  const groupTiles = (groupId) =>
    SECTIONS.filter(s => s.group === groupId).map(s => {
      const count = (state.data.sections[s.id] || []).length;
      return `<div class="home-tile ${groupId}" onclick="navigate('${s.id}')">
        <div class="home-tile-icon">${s.icon}</div>
        <div class="home-tile-label">${s.label}</div>
        <div class="home-tile-count">${count > 0 ? count + '개' : ''}</div>
      </div>`;
    }).join('');

  document.getElementById('pageContent').innerHTML = `
    <div class="home-greeting">
      <h2>안녕하세요 👋</h2>
      <p>${fmtKorDate()}</p>
      ${!checkedToday
        ? `<div class="checkin-nudge" onclick="navigate('checkin')">🌡️ 오늘 자기점검을 아직 안 했어요 → 지금 하기</div>`
        : `<div class="checkin-nudge done">✅ 오늘 자기점검 완료!</div>`}
    </div>

    <div class="home-group-section">
      <div class="home-group-label personal">👤 개인</div>
      <div class="home-tile-grid">${groupTiles('personal')}</div>
    </div>

    <div class="home-group-section">
      <div class="home-group-label instructor">🎓 강사</div>
      <div class="home-tile-grid">${groupTiles('instructor')}</div>
    </div>

    <div class="home-group-section">
      <div class="home-group-label lab">🔬 연구소</div>
      <div class="home-tile-grid">${groupTiles('lab')}</div>
    </div>

    <div class="section-heading">⏱ 최근 추가</div>
    ${recent.length === 0
      ? `<div class="empty-state"><div class="empty-icon">📭</div><p>아직 데이터가 없어요.<br>원하는 섹션을 눌러 추가해보세요!</p></div>`
      : `<div class="recent-list">${recent.map(item => `
          <div class="recent-item" onclick="navigate('${item._sid}')">
            <span class="recent-badge badge-${item._group}">${escHtml(item._slabel)}</span>
            <span class="recent-title">${escHtml(item.title || item.client || '(제목 없음)')}</span>
            <span class="recent-date">${fmtDate(item.date || item.createdAt)}</span>
          </div>`).join('')}</div>`}
  `;
}

// ── 그룹 페이지 ───────────────────────────────
function renderGroupPage(group) {
  if (group === 'lab') { renderLabDashboard(); return; }

  const g = GROUPS[group];
  document.getElementById('pageTitle').textContent = g.label;
  document.getElementById('addBtn').style.display = 'none';

  const tiles = SECTIONS.filter(s => s.group === group).map(s => {
    const count = (state.data.sections[s.id] || []).length;
    return `<div class="section-tile ${group}" onclick="navigate('${s.id}')">
      <div class="tile-icon">${s.icon}</div>
      <div class="tile-label">${s.label}</div>
      <div class="tile-count">${count}개</div>
    </div>`;
  }).join('');

  document.getElementById('pageContent').innerHTML = `
    <div class="group-page-header">
      <h2>${g.icon} ${g.label}</h2>
      <p>${g.desc}</p>
    </div>
    <div class="section-grid">${tiles}</div>
  `;
}

// ── 연구소 대시보드 ───────────────────────────
function renderLabDashboard() {
  document.getElementById('pageTitle').textContent = '연구소';
  document.getElementById('addBtn').style.display = 'none';

  const labSections = SECTIONS.filter(s => s.group === 'lab');
  const totalItems = labSections.reduce((n, s) => n + (state.data.sections[s.id] || []).length, 0);
  const thisMonth  = new Date().toISOString().slice(0, 7);
  const monthItems = labSections.reduce((n, s) =>
    n + (state.data.sections[s.id] || []).filter(i => (i.createdAt || '').startsWith(thisMonth)).length, 0);
  const missionCount = (state.data.missions || []).length;

  const recentMissions = (state.data.missions || []).slice(0, 4);
  const allAgents = [...BASE_AGENTS, ...SPECIALIST_AGENTS, ...(state.data.agents || [])];

  const missionsHtml = recentMissions.length
    ? recentMissions.map(m => `
        <div class="lab-mission-row" onclick="navigate('agentlab')">
          <span class="lab-mission-agents">${(m.agents||[]).map(id => {
            const a = allAgents.find(x => x.id === id);
            return a ? a.icon : '🤖';
          }).join('')}</span>
          <span class="lab-mission-title">${escHtml(m.title)}</span>
          <span class="lab-mission-date">${fmtDate(m.createdAt)}</span>
        </div>`).join('')
    : `<div class="lab-mission-empty">아직 실행한 미션이 없어요 — 에이전트 엔진에서 시작해보세요!</div>`;

  const sectionTiles = labSections.map(s => {
    const count = (state.data.sections[s.id] || []).length;
    return `<div class="home-tile lab" onclick="navigate('${s.id}')">
      <div class="home-tile-icon">${s.icon}</div>
      <div class="home-tile-label">${s.label}</div>
      <div class="home-tile-count">${count > 0 ? count + '개' : ''}</div>
    </div>`;
  }).join('');

  document.getElementById('pageContent').innerHTML = `
    <div class="lab-dashboard">

      <div class="lab-hero">
        <div>
          <h2>🔬 연구소</h2>
          <p>AI 에이전트와 함께 진로 자료를 수집하고 분석합니다</p>
        </div>
        <div class="lab-stats-row">
          <div class="lab-stat">
            <div class="lab-stat-num">${totalItems}</div>
            <div class="lab-stat-label">총 수집</div>
          </div>
          <div class="lab-stat">
            <div class="lab-stat-num">${monthItems}</div>
            <div class="lab-stat-label">이번 달</div>
          </div>
          <div class="lab-stat">
            <div class="lab-stat-num">${missionCount}</div>
            <div class="lab-stat-label">미션</div>
          </div>
        </div>
      </div>

      <div class="lab-quick-row">
        <button class="lab-quick-btn agent" onclick="navigate('agentlab')">⚡ 에이전트 미션 시작</button>
        <button class="lab-quick-btn db"    onclick="navigate('dbviewer')">📂 자료DB 보기</button>
      </div>

      <div class="home-tile-grid" style="margin-bottom:20px">${sectionTiles}</div>

      <div class="lab-section-label">⏱ 최근 미션 이력</div>
      <div class="lab-missions">${missionsHtml}</div>

    </div>`;
}

// ── 검색 허브 렌더 & 액션 ─────────────────────
function renderSearchHub(sid) {
  const hub = SEARCH_HUBS[sid];
  if (!hub) return '';

  const engines = hub.engines.map(e =>
    `<button class="hub-engine-btn" title="${escHtml(e.label)}" onclick="openHubEngine('${sid}','${e.id}')">
      <span class="hub-engine-icon">${e.icon}</span>
      <span class="hub-engine-label">${escHtml(e.label)}</span>
    </button>`
  ).join('');

  const engineOpts = hub.engines.map(e =>
    `<option value="${e.id}" ${e.id === hub.defaultEngine ? 'selected' : ''}>${escHtml(e.label)}</option>`
  ).join('');

  const chips = hub.keywords.map(kw =>
    `<button class="keyword-chip" onclick="searchWithChip('${sid}','${encodeURIComponent(kw)}')">${escHtml(kw)}</button>`
  ).join('');

  return `
    <div class="search-hub">
      <div class="search-hub-top">
        <div class="search-hub-meta">
          <span class="search-hub-icon">🔍</span>
          <span class="search-hub-desc">${escHtml(hub.label)}</span>
        </div>
        <div class="hub-engines-row">${engines}</div>
      </div>
      <div class="search-hub-input-row">
        <input id="hubKw_${sid}" class="field-input hub-keyword-input" type="text"
          placeholder="검색어 직접 입력..."
          onkeydown="if(event.key==='Enter')doHubSearch('${sid}')" />
        <select id="hubEng_${sid}" class="field-input hub-engine-select">${engineOpts}</select>
        <button class="btn-primary hub-search-btn" onclick="doHubSearch('${sid}')">검색 →</button>
      </div>
      <div class="keyword-chips-row">
        <span class="keyword-chips-label">추천 키워드</span>
        ${chips}
      </div>
    </div>`;
}

function openHubEngine(sid, engineId) {
  const engine = (SEARCH_HUBS[sid]?.engines || []).find(e => e.id === engineId);
  if (engine) window.open(engine.home, '_blank');
}

function doHubSearch(sid) {
  const hub = SEARCH_HUBS[sid];
  if (!hub) return;
  const kw = (document.getElementById(`hubKw_${sid}`)?.value || '').trim();
  const engineId = document.getElementById(`hubEng_${sid}`)?.value || hub.defaultEngine;
  const engine = hub.engines.find(e => e.id === engineId);
  if (!engine) return;
  window.open(kw ? engine.search + encodeURIComponent(kw) : engine.home, '_blank');
}

function searchWithChip(sid, encodedKw) {
  const kw = decodeURIComponent(encodedKw);
  const hub = SEARCH_HUBS[sid];
  if (!hub) return;
  const kwEl = document.getElementById(`hubKw_${sid}`);
  const engEl = document.getElementById(`hubEng_${sid}`);
  if (kwEl) kwEl.value = kw;
  if (engEl) engEl.value = hub.defaultEngine;
  doHubSearch(sid);
}

// ── 섹션 렌더 ─────────────────────────────────
function renderSection(sid) {
  const s = SECTIONS.find(x => x.id === sid);
  const items = [...(state.data.sections[sid] || [])].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  document.getElementById('pageTitle').textContent = s.label;
  document.getElementById('addBtn').style.display = '';

  let html = `<div class="section-page-header">
    <div><h2>${s.icon} ${s.label}</h2><p>${items.length}개 항목</p></div>
  </div>`;

  // 검색 허브 (연구소 섹션 + 활동 라이브러리)
  if (SEARCH_HUBS[sid]) html += renderSearchHub(sid);

  // 에이전트 검색 카드 (agentMission이 있는 섹션, actlib 제외 - actlib은 자체 렌더러)
  if (s.agentMission && sid !== 'actlib') html += renderAgentSearchCard(sid, s.agentMission);

  // 특수 섹션
  if (sid === 'agentlab')   { document.getElementById('pageContent').innerHTML = renderAgentLab();  return; }
  if (sid === 'scriptgen')  { document.getElementById('pageContent').innerHTML = renderScriptGen(); return; }
  if (sid === 'lessonplan') { document.getElementById('pageContent').innerHTML = renderLessonPlanGen(); return; }
  if (sid === 'dbviewer')   { renderDBViewer(); return; }
  if (sid === 'finance')    { document.getElementById('pageContent').innerHTML = html + renderFinanceDashboard(items, s); return; }
  if (sid === 'vision')     { document.getElementById('pageContent').innerHTML = html + renderVisionPage(items, s); return; }
  if (sid === 'reading')    { document.getElementById('pageContent').innerHTML = html + renderReadingList(items, s); return; }
  if (sid === 'gratitude')  { document.getElementById('pageContent').innerHTML = html + renderGratitudeList(items, s); return; }
  if (sid === 'travel')     { document.getElementById('pageContent').innerHTML = html + renderTravelList(items, s); return; }
  if (sid === 'checkin')    { document.getElementById('pageContent').innerHTML = html + renderCheckinList(items, s); return; }
  if (sid === 'journal')    { document.getElementById('pageContent').innerHTML = html + renderJournalList(items, s); return; }
  if (sid === 'clients')    { document.getElementById('pageContent').innerHTML = html + renderClientList(items, s); return; }
  if (sid === 'cabinet')    { document.getElementById('pageContent').innerHTML = html + renderCabinetSection(items, s); return; }
  if (sid === 'actlib')     { document.getElementById('pageContent').innerHTML = html + renderActlibContent(items, s); return; }
  if (sid === 'policy')     { document.getElementById('pageContent').innerHTML = html + renderPolicyScrapper(items, s); return; }
  if (sid === 'trends')     { document.getElementById('pageContent').innerHTML = html + renderTrendScrapper(items, s); return; }
  if (sid === 'datalab')    { document.getElementById('pageContent').innerHTML = html + renderDatalabContent(items, s); return; }

  if (items.length === 0) {
    html += `<div class="empty-state"><div class="empty-icon">${s.icon}</div><p>아직 항목이 없어요.</p></div>`;
  } else {
    html += `<div class="card-grid">${items.map(item => renderCard(item, s)).join('')}</div>`;
  }
  document.getElementById('pageContent').innerHTML = html;
}

// ── 정책·입시 스크랩 ──────────────────────────
function renderPolicyScrapper(items, s) {
  const typeOpts = ['교육정책','대입변화','학과개편','취업정책','장학금','스크랩','기타']
    .map(o => `<option>${o}</option>`).join('');

  const cardsHtml = items.length === 0
    ? `<div class="empty-state"><div class="empty-icon">${s.icon}</div>
        <p>에이전트 검색 또는 스크랩으로 자료를 모아보세요!</p></div>`
    : `<div class="card-grid">${items.map(item => renderPolicyCard(item, s)).join('')}</div>`;

  return `
    <div class="scrap-widget" style="border-color:var(--lab-lt)">
      <div class="scrap-widget-title" style="color:var(--lab)">📎 정책·입시 스크랩</div>
      <div class="scrap-form-grid">
        <div class="field scrap-full">
          <input id="scrapUrl" class="field-input" type="url"
            placeholder="🔗 URL 붙여넣기 (선택)" />
        </div>
        <div class="field">
          <input id="scrapTitle" class="field-input" type="text" placeholder="제목 *" />
        </div>
        <div class="field">
          <select id="scrapType" class="field-input">${typeOpts}</select>
        </div>
        <div class="field">
          <input id="scrapSource" class="field-input" type="text"
            placeholder="출처 (교육부, 연합뉴스 등)" />
        </div>
        <div class="field">
          <input id="scrapDate" class="field-input" type="date" value="${today()}" />
        </div>
        <div class="field scrap-full">
          <textarea id="scrapContent" class="field-input" rows="3"
            placeholder="핵심 내용 메모 (선택)..."></textarea>
        </div>
      </div>
      <button class="btn-primary w-full scrap-save-btn" onclick="saveScrap()">
        📎 스크랩 저장
      </button>
    </div>
    ${cardsHtml}`;
}

function renderPolicyCard(item, s) {
  const typeColor = {
    '교육정책': 'badge-policy-edu',
    '대입변화': 'badge-policy-univ',
    '학과개편': 'badge-policy-dept',
    '취업정책': 'badge-policy-job',
    '장학금':   'badge-policy-sch',
    '스크랩':   'badge-policy-scrap',
  };
  const badgeCls = typeColor[item.type] || '';
  const linkHtml = item.link
    ? `<a class="scrap-link-badge" href="${escHtml(item.link)}" target="_blank"
         onclick="event.stopPropagation()">🔗 원문 보기</a>` : '';

  return `<div class="policy-card" onclick="openEditModal('policy','${item.id}')">
    <div class="policy-card-top">
      ${item.type ? `<span class="policy-badge ${badgeCls}">${escHtml(item.type)}</span>` : ''}
      ${linkHtml}
      <button class="btn-icon del ml-auto"
        onclick="event.stopPropagation();deleteEntry('policy','${item.id}')">🗑</button>
    </div>
    <div class="policy-card-title">${escHtml(item.title)}</div>
    ${item.content ? `<div class="card-excerpt">${escHtml(item.content)}</div>` : ''}
    <div class="policy-card-foot">
      ${item.source ? `<span class="policy-source">${escHtml(item.source)}</span>` : ''}
      <span class="card-date">${fmtDate(item.date || item.createdAt)}</span>
    </div>
  </div>`;
}

async function saveScrap() {
  const title = document.getElementById('scrapTitle').value.trim();
  if (!title) { toast('⚠️ 제목을 입력해주세요'); document.getElementById('scrapTitle').focus(); return; }

  const entry = {
    id: newId(),
    createdAt: new Date().toISOString(),
    title,
    type:    document.getElementById('scrapType').value,
    link:    document.getElementById('scrapUrl').value.trim(),
    content: document.getElementById('scrapContent').value.trim(),
    source:  document.getElementById('scrapSource').value.trim(),
    date:    document.getElementById('scrapDate').value,
  };

  if (!state.data.sections.policy) state.data.sections.policy = [];
  state.data.sections.policy.unshift(entry);

  // 폼 초기화
  ['scrapUrl','scrapTitle','scrapContent','scrapSource'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('scrapDate').value = today();
  document.getElementById('scrapType').selectedIndex = 0;

  cacheData();
  await syncToGitHub();
  renderSection('policy');
}

// ── 진로트렌드 스크랩 ────────────────────────
function renderTrendScrapper(items, s) {
  const fieldOpts = ['AI·기술','직업시장','교육제도','청년취업','글로벌트렌드','기타']
    .map(o => `<option>${o}</option>`).join('');

  const cardsHtml = items.length === 0
    ? `<div class="empty-state"><div class="empty-icon">${s.icon}</div>
        <p>에이전트 검색 또는 스크랩으로 트렌드를 모아보세요!</p></div>`
    : `<div class="card-grid">${items.map(item => renderTrendCard(item)).join('')}</div>`;

  return `
    <div class="scrap-widget">
      <div class="scrap-widget-title" style="color:var(--lab)">📎 트렌드 스크랩</div>
      <div class="scrap-form-grid">
        <div class="field scrap-full">
          <input id="tscrapUrl" class="field-input" type="url" placeholder="🔗 URL 붙여넣기 (선택)" />
        </div>
        <div class="field">
          <input id="tscrapTitle" class="field-input" type="text" placeholder="트렌드 제목 *" />
        </div>
        <div class="field">
          <select id="tscrapField" class="field-input">${fieldOpts}</select>
        </div>
        <div class="field">
          <input id="tscrapSource" class="field-input" type="text" placeholder="출처 (보고서명, 매체 등)" />
        </div>
        <div class="field">
          <input id="tscrapDate" class="field-input" type="date" value="${today()}" />
        </div>
        <div class="field scrap-full">
          <textarea id="tscrapContent" class="field-input" rows="3"
            placeholder="핵심 내용 메모 (선택)..."></textarea>
        </div>
      </div>
      <button class="btn-primary w-full scrap-save-btn" onclick="saveTrendScrap()">📎 스크랩 저장</button>
    </div>
    ${cardsHtml}`;
}

function renderTrendCard(item) {
  const fieldColor = {
    'AI·기술':      'badge-trend-ai',
    '직업시장':     'badge-trend-job',
    '교육제도':     'badge-trend-edu',
    '청년취업':     'badge-trend-youth',
    '글로벌트렌드': 'badge-trend-global',
  };
  const badgeCls = fieldColor[item.field] || '';
  const linkHtml = item.link
    ? `<a class="scrap-link-badge" href="${escHtml(item.link)}" target="_blank"
         onclick="event.stopPropagation()">🔗 원문</a>` : '';

  return `<div class="policy-card" style="border-left-color:var(--lab)"
               onclick="openEditModal('trends','${item.id}')">
    <div class="policy-card-top">
      ${item.field ? `<span class="policy-badge ${badgeCls}">${escHtml(item.field)}</span>` : ''}
      ${linkHtml}
      <button class="btn-icon del ml-auto"
        onclick="event.stopPropagation();deleteEntry('trends','${item.id}')">🗑</button>
    </div>
    <div class="policy-card-title">${escHtml(item.title)}</div>
    ${item.content ? `<div class="card-excerpt">${escHtml(item.content)}</div>` : ''}
    <div class="policy-card-foot">
      ${item.source ? `<span class="policy-source">${escHtml(item.source)}</span>` : ''}
      <span class="card-date">${fmtDate(item.date || item.createdAt)}</span>
    </div>
  </div>`;
}

async function saveTrendScrap() {
  const title = document.getElementById('tscrapTitle').value.trim();
  if (!title) { toast('⚠️ 제목을 입력해주세요'); document.getElementById('tscrapTitle').focus(); return; }

  const entry = {
    id: newId(),
    createdAt: new Date().toISOString(),
    title,
    field:   document.getElementById('tscrapField').value,
    link:    document.getElementById('tscrapUrl').value.trim(),
    content: document.getElementById('tscrapContent').value.trim(),
    source:  document.getElementById('tscrapSource').value.trim(),
    date:    document.getElementById('tscrapDate').value,
  };

  if (!state.data.sections.trends) state.data.sections.trends = [];
  state.data.sections.trends.unshift(entry);

  ['tscrapUrl','tscrapTitle','tscrapContent','tscrapSource'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('tscrapDate').value = today();

  cacheData();
  await syncToGitHub();
  renderSection('trends');
}

// ── 활동 라이브러리 렌더러 (에이전트 카드 3종 + 스크랩 + 목록) ──
function renderActlibContent(items, s) {
  const actlibMissions = ['sourcing', 'video', 'game'];
  const agentCards = actlibMissions.map(mtype => {
    const mt = MISSION_TYPES.find(t => t.id === mtype);
    if (!mt) return '';
    const [icon, ...labelParts] = mt.label.split(' ');
    return `
      <div class="actlib-agent-card" onclick="openMissionModal('${mtype}','actlib')">
        <div class="actlib-agent-icon">${icon}</div>
        <div class="actlib-agent-name">${escHtml(labelParts.join(' '))}</div>
        <div class="actlib-agent-desc">${escHtml(mt.desc)}</div>
        <div class="actlib-agent-start">에이전트 시작 →</div>
      </div>`;
  }).join('');

  const typeOpts = ['아이스브레이킹','팀빌딩','게임/놀이','영상자료','퍼실리테이션','워크시트','기타']
    .map(o => `<option>${o}</option>`).join('');

  const cardsHtml = items.length === 0
    ? `<div class="empty-state"><div class="empty-icon">${s.icon}</div>
        <p>에이전트 검색 또는 스크랩으로 활동 자료를 모아보세요!</p></div>`
    : `<div class="card-grid">${items.map(item => renderCard(item, s)).join('')}</div>`;

  return `
    <div class="actlib-agent-cards">${agentCards}</div>
    <div class="scrap-widget" style="border-color:var(--instructor-lt)">
      <div class="scrap-widget-title" style="color:var(--instructor)">📎 활동 자료 스크랩</div>
      <div class="scrap-form-grid">
        <div class="field scrap-full">
          <input id="ascrapUrl" class="field-input" type="url"
            placeholder="🔗 URL 붙여넣기 (YouTube·블로그 등, 선택)" />
        </div>
        <div class="field">
          <input id="ascrapTitle" class="field-input" type="text" placeholder="활동명 *" />
        </div>
        <div class="field">
          <select id="ascrapType" class="field-input">${typeOpts}</select>
        </div>
        <div class="field">
          <input id="ascrapTarget" class="field-input" type="text"
            placeholder="대상 (예: 고1, 전체)" />
        </div>
        <div class="field">
          <input id="ascrapDuration" class="field-input" type="text"
            placeholder="소요시간 (예: 15분)" />
        </div>
        <div class="field scrap-full">
          <textarea id="ascrapMemo" class="field-input" rows="2"
            placeholder="활동 설명 또는 메모..."></textarea>
        </div>
      </div>
      <button class="btn-primary w-full scrap-save-btn" onclick="saveActlibScrap()">📎 스크랩 저장</button>
    </div>
    ${cardsHtml}`;
}

async function saveActlibScrap() {
  const title = document.getElementById('ascrapTitle').value.trim();
  if (!title) { toast('⚠️ 활동명을 입력해주세요'); document.getElementById('ascrapTitle').focus(); return; }

  const duration = document.getElementById('ascrapDuration').value.trim();
  const target   = document.getElementById('ascrapTarget').value.trim();
  const tags = [document.getElementById('ascrapType').value, duration, target].filter(Boolean).join(', ');

  const entry = {
    id: newId(),
    createdAt: new Date().toISOString(),
    title,
    type:        document.getElementById('ascrapType').value,
    target,
    description: document.getElementById('ascrapMemo').value.trim(),
    link:        document.getElementById('ascrapUrl').value.trim(),
    tags,
  };

  if (!state.data.sections.actlib) state.data.sections.actlib = [];
  state.data.sections.actlib.unshift(entry);

  ['ascrapUrl','ascrapTitle','ascrapTarget','ascrapDuration','ascrapMemo'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('ascrapType').selectedIndex = 0;

  cacheData();
  await syncToGitHub();
  renderSection('actlib');
}

// ── 데이터 노트 렌더러 ────────────────────────
function renderDatalabList(items, s) {
  const cardsHtml = items.length === 0
    ? `<div class="empty-state"><div class="empty-icon">${s.icon}</div>
        <p>에이전트로 통계·수치 데이터를 수집해 보세요!</p></div>`
    : items.map(item => renderDataCard(item)).join('');
  return `<div class="datalab-list">${cardsHtml}</div>`;
}

// 데이터 노트 (스크랩 위젯 + 목록)
function renderDatalabContent(items, s) {
  const categoryOpts = ['직업통계','임금·소득','취업률','청년실업','학과별','인구통계','기타']
    .map(o => `<option>${o}</option>`).join('');

  const cardsHtml = items.length === 0
    ? `<div class="empty-state"><div class="empty-icon">${s.icon}</div>
        <p>에이전트 검색 또는 스크랩으로 데이터를 모아보세요!</p></div>`
    : items.map(item => renderDataCard(item)).join('');

  return `
    <div class="scrap-widget" style="border-color:var(--lab-lt)">
      <div class="scrap-widget-title" style="color:var(--lab)">📎 데이터 스크랩</div>
      <div class="scrap-form-grid">
        <div class="field scrap-full">
          <input id="dscrapUrl" class="field-input" type="url" placeholder="🔗 출처 URL (선택)" />
        </div>
        <div class="field">
          <input id="dscrapTitle" class="field-input" type="text" placeholder="통계명 / 제목 *" />
        </div>
        <div class="field">
          <select id="dscrapCategory" class="field-input">${categoryOpts}</select>
        </div>
        <div class="field">
          <input id="dscrapSource" class="field-input" type="text"
            placeholder="출처 기관 (KOSIS, 통계청 등)" />
        </div>
        <div class="field">
          <input id="dscrapYear" class="field-input" type="text"
            placeholder="기준연도 (예: 2025)" />
        </div>
        <div class="field scrap-full">
          <input id="dscrapData" class="field-input" type="text"
            placeholder="핵심 수치 (예: 청년실업률 7.2%)" />
        </div>
        <div class="field scrap-full">
          <textarea id="dscrapMemo" class="field-input" rows="2"
            placeholder="강의 활용 포인트 (이 데이터를 어떻게 쓸지)..."></textarea>
        </div>
      </div>
      <button class="btn-primary w-full scrap-save-btn" onclick="saveDatalabScrap()">📎 데이터 저장</button>
    </div>
    <div class="datalab-list">${cardsHtml}</div>`;
}

async function saveDatalabScrap() {
  const title = document.getElementById('dscrapTitle').value.trim();
  if (!title) { toast('⚠️ 통계명을 입력해주세요'); document.getElementById('dscrapTitle').focus(); return; }

  const year = document.getElementById('dscrapYear').value.trim();
  const entry = {
    id: newId(),
    createdAt: new Date().toISOString(),
    title,
    category:       document.getElementById('dscrapCategory').value,
    source:         document.getElementById('dscrapSource').value.trim(),
    date:           year ? `${year}-01-01` : new Date().toISOString().slice(0,10),
    data:           document.getElementById('dscrapData').value.trim(),
    interpretation: document.getElementById('dscrapMemo').value.trim(),
    link:           document.getElementById('dscrapUrl').value.trim(),
  };

  if (!state.data.sections.datalab) state.data.sections.datalab = [];
  state.data.sections.datalab.unshift(entry);

  ['dscrapUrl','dscrapTitle','dscrapSource','dscrapYear','dscrapData','dscrapMemo'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('dscrapCategory').selectedIndex = 0;

  cacheData();
  await syncToGitHub();
  renderSection('datalab');
}

function renderDataCard(item) {
  return `<div class="data-card" onclick="openEditModal('datalab','${item.id}')">
    <div class="data-card-meta">
      ${item.source ? `<span class="data-source-badge">${escHtml(item.source)}</span>` : ''}
      ${item.date   ? `<span class="data-date">${fmtDate(item.date)}</span>` : ''}
      <button class="btn-icon del ml-auto"
        onclick="event.stopPropagation();deleteEntry('datalab','${item.id}')">🗑</button>
    </div>
    <div class="data-card-title">${escHtml(item.title)}</div>
    ${item.data ? `<div class="data-number">${escHtml(item.data)}</div>` : ''}
    ${item.interpretation ? `<div class="data-interpretation">💡 ${escHtml(item.interpretation)}</div>` : ''}
  </div>`;
}

// ── 자료DB 뷰어 ───────────────────────────────
const DB_FOLDER_LIST = [
  { key: 'sourcing', label: '현장소스발굴', path: '자료DB/현장소스발굴' },
  { key: 'video',    label: '영상자료',     path: '자료DB/영상자료' },
  { key: 'game',     label: '게임·놀이',    path: '자료DB/게임놀이' },
  { key: 'trend',    label: '시장트렌드',   path: '자료DB/시장트렌드' },
  { key: 'policy',   label: '정책·입시',    path: '자료DB/정책입시' },
  { key: 'content',  label: '콘텐츠제작',   path: '자료DB/콘텐츠제작' },
  { key: 'script',   label: 'PPT대본',      path: '자료DB/PPT대본' },
  { key: 'other',    label: '기타',         path: '자료DB/기타' },
];

let _dbActiveFolder = 0;
let _dbCurrentFiles = [];

async function loadDBFolder(folderPath) {
  const url = `https://api.github.com/repos/${state.config.owner}/${state.config.repo}/contents/${folderPath}`;
  const res = await fetch(url, { headers: ghHeaders() });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`폴더 로드 실패 (${res.status})`);
  const items = await res.json();
  return items.filter(i => i.name.endsWith('.md')).sort((a,b) => b.name.localeCompare(a.name));
}

async function loadDBFile(filePath) {
  const url = `https://api.github.com/repos/${state.config.owner}/${state.config.repo}/contents/${filePath}`;
  const res = await fetch(url, { headers: ghHeaders() });
  if (!res.ok) throw new Error(`파일 로드 실패 (${res.status})`);
  const json = await res.json();
  return fromB64(json.content.replace(/\n/g, ''));
}

async function deleteDBFile(filePath, sha) {
  const url = `https://api.github.com/repos/${state.config.owner}/${state.config.repo}/contents/${filePath}`;
  const body = { message: `자료 삭제: ${filePath.split('/').pop()}`, sha };
  const res = await fetch(url, { method: 'DELETE', headers: ghHeaders(), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`삭제 실패 (${res.status})`);
}

async function renderDBViewer() {
  document.getElementById('pageTitle').textContent = '자료DB';
  document.getElementById('addBtn').style.display = 'none';

  const tabs = DB_FOLDER_LIST.map((f, i) =>
    `<button class="db-tab ${i===_dbActiveFolder?'active':''}" onclick="switchDBFolder(${i})">${f.label}</button>`
  ).join('');

  document.getElementById('pageContent').innerHTML = `
    <div class="dbv-wrap">
      <div class="dbv-hero">
        <div>
          <h2>📂 자료DB</h2>
          <p>GitHub에 저장된 자료를 폴더별로 관리합니다.<br>
             에이전트 미션 결과와 PPT 대본이 자동으로 여기에 쌓입니다.</p>
        </div>
      </div>
      <div class="db-search-wrap">
        <input id="dbSearch" class="field-input db-search-input" type="text"
          placeholder="🔍 파일 이름 검색..." oninput="filterDBFiles()" />
      </div>
      <div class="db-tabs">${tabs}</div>
      <div id="dbFileList" class="db-file-list">
        <div class="loading-wrap"><div class="spinner"></div><p>불러오는 중...</p></div>
      </div>
    </div>`;

  await loadDBFolderView(_dbActiveFolder);
}

async function switchDBFolder(idx) {
  _dbActiveFolder = idx;
  document.querySelectorAll('.db-tab').forEach((t,i) => t.classList.toggle('active', i===idx));
  document.getElementById('dbFileList').innerHTML =
    '<div class="loading-wrap"><div class="spinner"></div><p>불러오는 중...</p></div>';
  await loadDBFolderView(idx);
}

function renderDBFileRow(f) {
  const displayName = f.name.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}_/, '');
  const dateMatch = f.name.match(/^(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : '';
  return `<div class="db-file-row">
    <div class="db-file-info">
      <div class="db-file-name">📄 ${escHtml(displayName)}</div>
      ${date ? `<div class="db-file-date">${date}</div>` : ''}
    </div>
    <div class="db-file-actions">
      <button class="btn-sm btn-secondary" onclick="viewDBFileModal('${escHtml(f.path)}','${escHtml(displayName)}')">보기</button>
      <button class="btn-sm btn-primary"   onclick="docxFromDB('${escHtml(f.path)}','${escHtml(displayName)}')">DOCX</button>
      <button class="btn-sm btn-danger"    onclick="confirmDeleteDB('${escHtml(f.path)}','${escHtml(f.sha)}')">🗑</button>
    </div>
  </div>`;
}

function renderDBList(files) {
  const listEl = document.getElementById('dbFileList');
  if (!listEl) return;
  if (!files.length) {
    listEl.innerHTML = `<div class="empty-state"><div class="empty-icon">📭</div>
      <p>검색 결과가 없습니다.</p></div>`;
    return;
  }
  listEl.innerHTML = files.map(renderDBFileRow).join('');
}

function filterDBFiles() {
  const q = (document.getElementById('dbSearch')?.value || '').trim().toLowerCase();
  const filtered = q
    ? _dbCurrentFiles.filter(f => f.name.replace(/\.md$/,'').toLowerCase().includes(q))
    : _dbCurrentFiles;
  renderDBList(filtered);
}

async function loadDBFolderView(idx) {
  const folder = DB_FOLDER_LIST[idx];
  const listEl = document.getElementById('dbFileList');
  try {
    const files = await loadDBFolder(folder.path);
    _dbCurrentFiles = files;
    if (!files.length) {
      listEl.innerHTML = `<div class="empty-state"><div class="empty-icon">📭</div>
        <p>아직 저장된 자료가 없어요.<br>에이전트 미션을 실행하면 자동으로 저장됩니다.</p></div>`;
      return;
    }
    renderDBList(files);
  } catch (e) {
    listEl.innerHTML = `<div class="empty-state"><p>⚠️ 로드 실패: ${escHtml(e.message)}</p></div>`;
  }
}

async function viewDBFileModal(filePath, displayName) {
  document.getElementById('modalHeading').textContent = displayName;
  document.getElementById('modalBody').innerHTML =
    '<div class="loading-wrap"><div class="spinner"></div><p>불러오는 중...</p></div>';
  document.getElementById('modalSave').style.display = 'none';
  document.getElementById('entryOverlay').style.display = 'flex';

  try {
    const content = await loadDBFile(filePath);
    document.getElementById('modalBody').innerHTML = `
      <div class="db-file-content">
        <pre style="white-space:pre-wrap;font-size:13px;line-height:1.7;color:var(--fg)">${escHtml(content)}</pre>
      </div>`;
  } catch (e) {
    document.getElementById('modalBody').innerHTML = `<p style="color:var(--danger)">로드 실패: ${escHtml(e.message)}</p>`;
  }

  document.getElementById('modalClose').onclick = () => {
    closeModal();
    document.getElementById('modalSave').style.display = '';
    resetModalSaveBtn();
  };
  document.getElementById('modalCancel').onclick = document.getElementById('modalClose').onclick;
}

async function docxFromDB(filePath, displayName) {
  toast('📥 파일 불러오는 중...');
  try {
    const content = await loadDBFile(filePath);
    downloadAsDocx(displayName, content);
  } catch (e) {
    toast('⚠️ DOCX 변환 실패: ' + e.message);
  }
}

function confirmDeleteDB(filePath, sha) {
  const name = filePath.split('/').pop().replace(/\.md$/, '');
  document.getElementById('confirmTitle').textContent = '자료 삭제';
  document.getElementById('confirmMsg').textContent = `"${name}"을 자료DB에서 삭제할까요?`;
  document.getElementById('confirmOverlay').style.display = 'flex';
  document.getElementById('confirmYes').onclick = async () => {
    document.getElementById('confirmOverlay').style.display = 'none';
    try {
      await deleteDBFile(filePath, sha);
      toast('🗑 자료가 삭제됐습니다');
      await loadDBFolderView(_dbActiveFolder);
    } catch (e) {
      toast('⚠️ 삭제 실패: ' + e.message);
    }
  };
  document.getElementById('confirmNo').onclick = () => {
    document.getElementById('confirmOverlay').style.display = 'none';
  };
}

// ── PPT 대본 생성기 ───────────────────────────
function renderScriptGen() {
  document.getElementById('pageTitle').textContent = 'PPT 대본 생성기';
  document.getElementById('addBtn').style.display = 'none';

  const scripts = [...(state.data.sections.cabinet || [])]
    .filter(i => i.type === 'PPT 대본')
    .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  const historyHtml = scripts.length ? `
    <div class="sg-section-label">📂 저장된 대본 (강의 캐비닛)</div>
    <div class="sg-script-list">
      ${scripts.map(s => `
        <div class="sg-script-item" onclick="navigate('cabinet')">
          <span class="sg-script-title">${escHtml(s.title)}</span>
          <span class="sg-script-date">${fmtDate(s.createdAt)}</span>
        </div>`).join('')}
    </div>` : '';

  return `
  <div class="sg-wrap">

    <!-- 헤더 -->
    <div class="sg-hero">
      <div>
        <h2>🎬 PPT 대본 생성기</h2>
        <p>PPT 슬라이드 구조를 파악해 강사 대본을 자동 생성합니다.<br>
           Claude.ai가 직접 파일을 읽어 <strong>슬라이드 순서·내용 기반</strong>으로 작성합니다.</p>
      </div>
    </div>

    <!-- 사용 흐름 -->
    <div class="sg-steps">
      <div class="sg-step">
        <div class="sg-step-num">①</div>
        <div class="sg-step-text">아래 설정 입력 후<br><strong>프롬프트 생성</strong></div>
      </div>
      <div class="sg-step-arrow">→</div>
      <div class="sg-step">
        <div class="sg-step-num">②</div>
        <div class="sg-step-text"><strong>Claude.ai</strong> 열고<br>PPT 파일 첨부</div>
      </div>
      <div class="sg-step-arrow">→</div>
      <div class="sg-step">
        <div class="sg-step-num">③</div>
        <div class="sg-step-text">프롬프트 <strong>복사·붙여넣기</strong><br>대본 받기</div>
      </div>
      <div class="sg-step-arrow">→</div>
      <div class="sg-step">
        <div class="sg-step-num">④</div>
        <div class="sg-step-text">결과를 앱에 붙여넣기<br><strong>강의 캐비닛 저장</strong></div>
      </div>
    </div>

    <!-- 설정 폼 -->
    <div class="sg-form-card">
      <div class="sg-form-grid">
        <div class="field">
          <label class="field-label">강의 대상 *</label>
          <input id="sg_target" class="field-input" type="text" placeholder="예: 고등학교 1학년, 대학 신입생" />
        </div>
        <div class="field">
          <label class="field-label">총 강의 시간 *</label>
          <select id="sg_duration" class="field-input">
            <option>45분</option>
            <option selected>50분</option>
            <option>60분</option>
            <option>90분</option>
            <option>120분</option>
          </select>
        </div>
        <div class="field">
          <label class="field-label">강의 톤</label>
          <select id="sg_tone" class="field-input">
            <option>친근하고 활발한 — 학생 참여 유도형</option>
            <option>전문적이고 차분한 — 정보 전달 중심</option>
            <option>스토리텔링형 — 사례와 이야기 중심</option>
            <option>질문형 — 생각을 이끌어내는 소크라테스식</option>
          </select>
        </div>
        <div class="field">
          <label class="field-label">슬라이드 수 (대략)</label>
          <input id="sg_slides" class="field-input" type="number" placeholder="예: 20" min="1" />
        </div>
      </div>

      <div class="field">
        <label class="field-label">강의 목표 / 핵심 메시지</label>
        <input id="sg_goal" class="field-input" type="text"
          placeholder="예: 학생이 자신의 강점 3가지를 발견하도록 돕는다" />
      </div>

      <div class="field">
        <label class="field-label">특별 요청사항</label>
        <textarea id="sg_extra" class="field-input" rows="3"
          placeholder="예: 중간에 활동 2개 포함, 마지막 슬라이드에서 과제 안내, 어려운 개념은 비유로 설명"></textarea>
      </div>

      <button class="btn-primary sg-generate-btn" onclick="generateScriptPrompt()">
        📋 프롬프트 생성하기
      </button>
    </div>

    <!-- 생성된 프롬프트 -->
    <div id="sgPromptResult" class="sg-prompt-result hidden">
      <div class="sg-prompt-header">
        <span>📋 생성된 프롬프트</span>
        <div style="display:flex;gap:8px">
          <a href="https://claude.ai" target="_blank" class="btn-claudeai">Claude.ai 열기 ↗</a>
          <button class="btn-copy" onclick="copyScriptPrompt()">복사</button>
        </div>
      </div>
      <div class="sg-prompt-guide">
        <strong>사용법:</strong>
        Claude.ai → 📎 버튼으로 PPT 파일 첨부 → 아래 프롬프트 붙여넣기
      </div>
      <textarea id="sgPromptText" class="prompt-textarea" readonly></textarea>

      <!-- 결과 저장 폼 -->
      <div class="sg-save-section">
        <div class="sg-save-title">✅ 대본 받은 후 — 강의 캐비닛에 저장</div>
        <div class="field" style="margin-bottom:10px">
          <label class="field-label">대본 제목 *</label>
          <input id="sg_saveTitle" class="field-input" type="text"
            placeholder="예: 자기이해 1차시 대본 (고1)" />
        </div>
        <div class="field">
          <label class="field-label">Claude.ai 결과 붙여넣기 *</label>
          <textarea id="sg_saveContent" class="field-input" rows="10"
            placeholder="Claude.ai에서 받은 대본을 여기에 붙여넣으세요..."></textarea>
        </div>
        <div class="field">
          <label class="field-label">태그</label>
          <input id="sg_saveTags" class="field-input" type="text"
            placeholder="강사대본, PPT, 자기이해 (쉼표 구분)" />
        </div>
        <button class="btn-primary w-full" onclick="saveScript()">
          💾 강의 캐비닛에 저장
        </button>
      </div>
    </div>

    ${historyHtml}
  </div>`;
}

function generateScriptPrompt() {
  const target   = document.getElementById('sg_target').value.trim();
  const duration = document.getElementById('sg_duration').value;
  const tone     = document.getElementById('sg_tone').value;
  const slides   = document.getElementById('sg_slides').value.trim();
  const goal     = document.getElementById('sg_goal').value.trim();
  const extra    = document.getElementById('sg_extra').value.trim();

  if (!target) { toast('⚠️ 강의 대상을 입력해주세요'); document.getElementById('sg_target').focus(); return; }

  const slidesInfo = slides ? `총 ${slides}장` : '첨부된 파일 기준';

  const prompt = `당신은 진로교육 전문 강사입니다. 첨부된 PPT 파일을 보고 강사 대본을 작성해주세요.

## 강의 정보
- 대상: ${target}
- 총 강의 시간: ${duration}
- 슬라이드 수: ${slidesInfo}
- 강의 톤: ${tone}
${goal ? `- 강의 목표: ${goal}` : ''}
${extra ? `- 특별 요청: ${extra}` : ''}

## 작업 순서
1. PPT 전체 슬라이드를 훑어보고 강의의 큰 흐름(도입→전개→마무리)을 파악하세요.
2. 각 슬라이드별로 대본을 작성하세요.
3. 마지막에 타임라인 요약표를 작성하세요.

## 슬라이드별 대본 형식 (모든 슬라이드에 적용)

---
### 슬라이드 N — [슬라이드 제목]
**⏱ 예상 소요시간**: X분

**[강사 멘트]**
> (강사가 실제로 말할 대본. 자연스러운 구어체로 작성.)

**[핵심 포인트]**
- 이 슬라이드에서 반드시 전달해야 할 내용

**[학생 반응 유도]**
- 질문, 활동, 생각할 거리 (해당되는 경우)

**[다음 슬라이드 전환 멘트]**
> (다음 슬라이드로 자연스럽게 넘어가는 한두 문장)

---

## 마지막에 추가할 것

### 📊 타임라인 요약
| 슬라이드 | 제목 | 소요시간 | 누적시간 | 비고 |
|---------|------|---------|---------|------|

### 💡 강의 운영 팁
- 이 PPT로 강의할 때 주의할 점 3가지
- 학생 반응이 좋을 것으로 예상되는 부분
- 시간이 부족할 경우 줄일 수 있는 부분

## 작성 원칙
- 대본은 강사가 그대로 읽어도 자연스러운 구어체로 작성
- "${tone.split('—')[0].trim()}" 톤 유지
- 총 강의 시간 ${duration}에 맞게 슬라이드별 시간 배분
- 학생이 지루해지지 않도록 ${duration.replace('분','')}분 기준으로 최소 ${Math.floor(parseInt(duration)||50 / 15)}번의 참여 유도 포인트 포함`;

  document.getElementById('sgPromptText').value = prompt;
  document.getElementById('sgPromptResult').classList.remove('hidden');

  // 저장 제목 자동 채우기
  const autoTitle = `${target} 강의 대본 — ${new Date().toLocaleDateString('ko-KR')}`;
  document.getElementById('sg_saveTitle').value = autoTitle;
  document.getElementById('sg_saveTags').value = `강사대본, PPT, ${target.split(' ')[0]}`;

  // 스크롤
  setTimeout(() => document.getElementById('sgPromptResult').scrollIntoView({ behavior:'smooth' }), 100);
}

function copyScriptPrompt() {
  const text = document.getElementById('sgPromptText').value;
  navigator.clipboard.writeText(text).then(() =>
    toast('📋 복사됐습니다! Claude.ai에서 PPT를 첨부하고 붙여넣으세요.')
  );
}

async function saveScript() {
  const title    = document.getElementById('sg_saveTitle').value.trim();
  const content  = document.getElementById('sg_saveContent').value.trim();
  const tags     = document.getElementById('sg_saveTags').value.trim();
  const target   = document.getElementById('sg_target').value.trim();
  const duration = document.getElementById('sg_duration').value;

  if (!title)   { toast('⚠️ 제목을 입력해주세요'); return; }
  if (!content) { toast('⚠️ Claude.ai 결과를 붙여넣어 주세요'); return; }

  const entry = {
    id: newId(),
    createdAt: new Date().toISOString(),
    title,
    type: 'PPT 대본',
    description: content,
    tags,
    target,
    duration,
  };

  if (!state.data.sections.cabinet) state.data.sections.cabinet = [];
  state.data.sections.cabinet.unshift(entry);

  cacheData();
  await syncToGitHub();

  // GitHub 자료DB/PPT대본 폴더에 마크다운 저장
  const md = entryToMarkdown(title, content, tags, { type: 'PPT 대본', target, duration });
  const filename = `${new Date().toISOString().slice(0,10)}_${title}`;
  try {
    await uploadMarkdownToGitHub(DB_FOLDERS.script, filename, md);
    toast('✅ 강의 캐비닛 + 자료DB 저장 완료! DOCX 다운로드 중...');
  } catch (e) {
    toast('✅ 강의 캐비닛 저장됨 (DB 오류: ' + e.message + ')');
  }

  // DOCX 자동 다운로드
  downloadAsDocx(title, content);

  // 저장 후 초기화
  document.getElementById('sg_saveContent').value = '';
  document.getElementById('sgPromptResult').classList.add('hidden');

  // 대본 목록 새로고침
  document.getElementById('pageContent').innerHTML = renderScriptGen();
}

// ── 강의 캐비닛 (GitHub 파일 업로드 포함) ─────
function renderCabinetSection(items, s) {
  const cardsHtml = items.length === 0
    ? `<div class="empty-state"><div class="empty-icon">🗄️</div><p>오른쪽 상단 <strong>＋ 추가</strong>로 자료 메모를 추가하거나<br>아래 업로드로 파일을 올려보세요!</p></div>`
    : `<div class="card-grid">${items.map(item => renderCard(item, s)).join('')}</div>`;

  const subjects = ['자기이해','진로탐색','직업세계','대입전략','취업·창업','학습전략','기타'];
  const subjectOpts = subjects.map(o => `<option value="${o}">${o}</option>`).join('');

  return `
    <div class="cabinet-upload-section">
      <div class="cabinet-upload-title">☁️ GitHub 파일 업로드</div>
      <div class="cabinet-upload-row">
        <select id="cabUploadSubject" class="field-input cabinet-subject-select">${subjectOpts}</select>
        <label class="cabinet-file-btn btn-primary">
          📁 파일 선택
          <input type="file" id="cabFileInput" style="display:none"
            onchange="onCabFileSelected(this)"
            accept=".pptx,.ppt,.pdf,.docx,.doc,.xlsx,.xls,.zip,.hwp,.hwpx" />
        </label>
      </div>
      <div id="cabUploadStatus" class="cabinet-upload-status"></div>
      <p class="field-hint" style="margin-top:6px">
        지원: PPT·PDF·DOCX·HWP·Excel·ZIP · 최대 25MB<br>
        업로드된 파일은 GitHub <code>강의캐비닛/과목명/</code> 폴더에 저장됩니다
      </p>
    </div>

    <div class="cabinet-tabs">
      <button class="cabinet-tab active" id="cabTabMeta" onclick="switchCabinetTab('meta')">📋 자료 메모 (${items.length})</button>
      <button class="cabinet-tab" id="cabTabFiles" onclick="switchCabinetTab('files')">☁️ GitHub 파일</button>
    </div>
    <div id="cabMetaPanel">${cardsHtml}</div>
    <div id="cabFilesPanel" style="display:none">
      <div class="loading-wrap"><div class="spinner"></div><p>파일 목록 불러오는 중...</p></div>
    </div>`;
}

let _cabActiveTab = 'meta';

function switchCabinetTab(tab) {
  _cabActiveTab = tab;
  document.getElementById('cabTabMeta').classList.toggle('active', tab === 'meta');
  document.getElementById('cabTabFiles').classList.toggle('active', tab === 'files');
  document.getElementById('cabMetaPanel').style.display  = tab === 'meta'   ? '' : 'none';
  document.getElementById('cabFilesPanel').style.display = tab === 'files'  ? '' : 'none';
  if (tab === 'files') loadCabinetFiles();
}

async function onCabFileSelected(input) {
  const file = input.files[0];
  if (!file) return;
  const subject   = document.getElementById('cabUploadSubject').value;
  const statusEl  = document.getElementById('cabUploadStatus');
  statusEl.textContent = `⏳ ${file.name} 업로드 중...`;
  statusEl.className   = 'cabinet-upload-status uploading';
  try {
    await uploadFileToCabinet(file, subject);
    statusEl.textContent = `✅ ${file.name} 업로드 완료!`;
    statusEl.className   = 'cabinet-upload-status success';
    input.value = '';
    if (_cabActiveTab === 'files') await loadCabinetFiles();
    toast('✅ 파일 업로드 완료!');
  } catch(e) {
    statusEl.textContent = `❌ 실패: ${e.message}`;
    statusEl.className   = 'cabinet-upload-status error';
    toast('⚠️ 업로드 실패: ' + e.message);
  }
}

async function uploadFileToCabinet(file, subject) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const base64   = ev.target.result.split(',')[1];
        const safeName = file.name.replace(/[<>:"/\\|?*\n\r]/g, '_');
        const filePath = `강의캐비닛/${subject}/${safeName}`;
        const url      = `https://api.github.com/repos/${state.config.owner}/${state.config.repo}/contents/${filePath}`;
        let sha = null;
        try { const r = await fetch(url, { headers: ghHeaders() }); if (r.ok) sha = (await r.json()).sha; } catch(_) {}
        const body = { message: `강의 파일 업로드: ${safeName}`, content: base64 };
        if (sha) body.sha = sha;
        const res = await fetch(url, { method: 'PUT', headers: ghHeaders(), body: JSON.stringify(body) });
        if (!res.ok) { const j = await res.json().catch(() => ({})); throw new Error(j.message || `${res.status}`); }
        resolve();
      } catch(e) { reject(e); }
    };
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsDataURL(file);
  });
}

async function loadCabinetFiles() {
  const panel = document.getElementById('cabFilesPanel');
  if (!panel) return;
  panel.innerHTML = '<div class="loading-wrap"><div class="spinner"></div><p>불러오는 중...</p></div>';
  try {
    const subjects = ['자기이해','진로탐색','직업세계','대입전략','취업·창업','학습전략','기타'];
    const allFiles = [];
    for (const subj of subjects) {
      const url = `https://api.github.com/repos/${state.config.owner}/${state.config.repo}/contents/강의캐비닛/${subj}`;
      const res = await fetch(url, { headers: ghHeaders() });
      if (res.status === 404) continue;
      if (!res.ok) continue;
      const files = await res.json();
      if (Array.isArray(files)) files.forEach(f => allFiles.push({ ...f, subject: subj }));
    }
    if (!allFiles.length) {
      panel.innerHTML = `<div class="empty-state"><div class="empty-icon">📭</div><p>업로드된 파일이 없어요.<br>위에서 파일을 선택해 올려보세요!</p></div>`;
      return;
    }
    const grouped = {};
    allFiles.forEach(f => { if (!grouped[f.subject]) grouped[f.subject] = []; grouped[f.subject].push(f); });
    let html = '';
    for (const [subj, files] of Object.entries(grouped)) {
      html += `<div class="cabinet-folder">
        <div class="cabinet-folder-label">📁 ${subj} (${files.length}개)</div>
        ${files.map(f => `
          <div class="cabinet-file-row">
            <div class="cabinet-file-info">
              <span>${getCabFileIcon(f.name)}</span>
              <span class="cabinet-file-name">${escHtml(f.name)}</span>
              <span class="cabinet-file-size">${formatFileSize(f.size)}</span>
            </div>
            <div class="cabinet-file-actions">
              <a href="${escHtml(f.download_url)}" target="_blank" class="btn-sm btn-primary" onclick="event.stopPropagation()">다운로드</a>
              <button class="btn-sm btn-danger" onclick="confirmDeleteCabFile('${escHtml(f.path)}','${escHtml(f.sha)}','${escHtml(f.name)}')">🗑</button>
            </div>
          </div>`).join('')}
      </div>`;
    }
    panel.innerHTML = html;
  } catch(e) {
    panel.innerHTML = `<div class="empty-state"><p>⚠️ 로드 실패: ${escHtml(e.message)}</p></div>`;
  }
}

function getCabFileIcon(name) {
  const ext = (name.split('.').pop() || '').toLowerCase();
  return { pptx:'📊',ppt:'📊',pdf:'📄',docx:'📝',doc:'📝',xlsx:'📈',xls:'📈',zip:'🗜️',hwp:'📝',hwpx:'📝' }[ext] || '📄';
}
function formatFileSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1048576) return Math.round(bytes/1024) + 'KB';
  return (bytes/1048576).toFixed(1) + 'MB';
}
async function confirmDeleteCabFile(filePath, sha, name) {
  document.getElementById('confirmTitle').textContent = '파일 삭제';
  document.getElementById('confirmMsg').textContent = `"${name}"을 GitHub에서 삭제할까요?`;
  document.getElementById('confirmOverlay').style.display = 'flex';
  document.getElementById('confirmYes').onclick = async () => {
    document.getElementById('confirmOverlay').style.display = 'none';
    try {
      const url  = `https://api.github.com/repos/${state.config.owner}/${state.config.repo}/contents/${filePath}`;
      const body = { message: `강의 파일 삭제: ${name}`, sha };
      const res  = await fetch(url, { method: 'DELETE', headers: ghHeaders(), body: JSON.stringify(body) });
      if (!res.ok) throw new Error(`${res.status}`);
      toast('🗑 파일이 삭제됐습니다');
      await loadCabinetFiles();
    } catch(e) { toast('⚠️ 삭제 실패: ' + e.message); }
  };
  document.getElementById('confirmNo').onclick = () => { document.getElementById('confirmOverlay').style.display = 'none'; };
}

// ── 강의 준비 도구 (강의계획서 + 슬라이드 구조) ─
function renderLessonPlanGen() {
  document.getElementById('pageTitle').textContent = '강의 준비 도구';
  document.getElementById('addBtn').style.display = 'none';

  return `
  <div class="sg-wrap">
    <div class="sg-hero">
      <div>
        <h2>📝 강의 준비 도구</h2>
        <p>강의계획서부터 슬라이드 구조까지 AI 프롬프트로 빠르게 준비합니다.<br>
           프롬프트를 복사해 Claude.ai에 붙여넣으면 결과물을 받을 수 있어요.</p>
      </div>
    </div>

    <div class="lp-tabs">
      <button class="lp-tab active" id="lpTab1" onclick="switchLpTab('plan')">📋 강의계획서 생성기</button>
      <button class="lp-tab" id="lpTab2" onclick="switchLpTab('slide')">🎞️ 슬라이드 구조 설계기</button>
    </div>

    <div id="lpPlanPanel">${renderLessonPlanPanel()}</div>
    <div id="lpSlidePanel" style="display:none">${renderSlideDesignPanel()}</div>
  </div>`;
}

function switchLpTab(tab) {
  document.getElementById('lpTab1').classList.toggle('active', tab === 'plan');
  document.getElementById('lpTab2').classList.toggle('active', tab === 'slide');
  document.getElementById('lpPlanPanel').style.display  = tab === 'plan'  ? '' : 'none';
  document.getElementById('lpSlidePanel').style.display = tab === 'slide' ? '' : 'none';
}

function renderLessonPlanPanel() {
  return `
    <div class="sg-steps">
      <div class="sg-step"><div class="sg-step-num">①</div><div class="sg-step-text">아래 정보 입력 후<br><strong>프롬프트 생성</strong></div></div>
      <div class="sg-step-arrow">→</div>
      <div class="sg-step"><div class="sg-step-num">②</div><div class="sg-step-text"><strong>Claude.ai</strong> 열고<br>프롬프트 붙여넣기</div></div>
      <div class="sg-step-arrow">→</div>
      <div class="sg-step"><div class="sg-step-num">③</div><div class="sg-step-text">결과를 앱에 붙여넣기<br><strong>캐비닛 저장</strong></div></div>
    </div>

    <div class="sg-form-card">
      <div class="sg-form-grid">
        <div class="field">
          <label class="field-label">강의 주제 *</label>
          <input id="lp_topic" class="field-input" type="text" placeholder="예: 자기이해와 강점 발견" />
        </div>
        <div class="field">
          <label class="field-label">대상 *</label>
          <input id="lp_target" class="field-input" type="text" placeholder="예: 고등학교 1학년" />
        </div>
        <div class="field">
          <label class="field-label">강의 시간</label>
          <select id="lp_duration" class="field-input">
            <option>45분</option><option selected>50분</option>
            <option>60분</option><option>90분</option><option>120분</option>
          </select>
        </div>
        <div class="field">
          <label class="field-label">차시 유형</label>
          <select id="lp_sessionType" class="field-input">
            <option>단독 1회성 특강</option>
            <option>다차시 프로그램 — 1차시</option>
            <option>다차시 프로그램 — 중간 차시</option>
            <option>다차시 프로그램 — 마지막 차시</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label class="field-label">학습 목표</label>
        <input id="lp_goal" class="field-input" type="text"
          placeholder="예: 학생이 자신의 강점 3가지를 발견하고 진로와 연결할 수 있다" />
      </div>
      <div class="field">
        <label class="field-label">활동 아이디어 / 특별 요청사항</label>
        <textarea id="lp_extra" class="field-input" rows="3"
          placeholder="예: 아이스브레이킹 10분 포함, 모둠활동 2회, 빈 워크시트 포함"></textarea>
      </div>
      <button class="btn-primary sg-generate-btn" onclick="generateLessonPlanPrompt()">
        📋 강의계획서 프롬프트 생성하기
      </button>
    </div>

    <div id="lpPlanResult" class="sg-prompt-result hidden">
      <div class="sg-prompt-header">
        <span>📋 생성된 프롬프트</span>
        <div style="display:flex;gap:8px">
          <a href="https://claude.ai" target="_blank" class="btn-claudeai">Claude.ai 열기 ↗</a>
          <button class="btn-copy" onclick="copyLessonPlanPrompt()">복사</button>
        </div>
      </div>
      <textarea id="lpPlanText" class="prompt-textarea" readonly></textarea>
      <div class="sg-save-section">
        <div class="sg-save-title">✅ Claude.ai 결과 받은 후 — 캐비닛에 저장</div>
        <div class="field" style="margin-bottom:10px">
          <label class="field-label">저장 제목 *</label>
          <input id="lp_saveTitle" class="field-input" type="text" placeholder="강의계획서 제목" />
        </div>
        <div class="field">
          <label class="field-label">Claude.ai 결과 붙여넣기 *</label>
          <textarea id="lp_saveContent" class="field-input" rows="10"
            placeholder="Claude.ai에서 받은 강의계획서를 여기에 붙여넣으세요..."></textarea>
        </div>
        <button class="btn-primary w-full" onclick="saveLessonPlanResult()">
          💾 강의 캐비닛에 저장
        </button>
      </div>
    </div>`;
}

function generateLessonPlanPrompt() {
  const topic       = document.getElementById('lp_topic').value.trim();
  const target      = document.getElementById('lp_target').value.trim();
  const duration    = document.getElementById('lp_duration').value;
  const sessionType = document.getElementById('lp_sessionType').value;
  const goal        = document.getElementById('lp_goal').value.trim();
  const extra       = document.getElementById('lp_extra').value.trim();

  if (!topic)  { toast('⚠️ 강의 주제를 입력해주세요'); document.getElementById('lp_topic').focus();  return; }
  if (!target) { toast('⚠️ 대상을 입력해주세요');      document.getElementById('lp_target').focus(); return; }

  const prompt = `당신은 진로교육 전문 강사입니다. 아래 조건에 맞는 강의계획서를 작성해주세요.

## 강의 기본 정보
- 주제: ${topic}
- 대상: ${target}
- 강의 시간: ${duration}
- 차시 유형: ${sessionType}
${goal  ? `- 학습 목표: ${goal}` : ''}
${extra ? `- 특별 요청: ${extra}` : ''}

## 강의계획서 작성 형식

### 📌 강의 개요
| 항목 | 내용 |
|------|------|
| 강의명 | |
| 대상 | |
| 시간 | |
| 강사 | |
| 학습 목표 | |
| 핵심 메시지 | |

### 🎯 학습 목표 (3개)
1.
2.
3.

### 📐 수업 흐름 (타임라인)
| 단계 | 시간 | 활동 내용 | 방법 | 준비물 |
|------|------|----------|------|--------|
| 도입 | | | | |
| 전개 | | | | |
| 마무리 | | | | |

### 📋 단계별 상세 계획
**[도입]** (시간: )
- 목적:
- 활동:
- 강사 멘트 예시:

**[전개 1]** (시간: )
- 목적:
- 활동:
- 강사 멘트 예시:

**[전개 2 / 그룹 활동]** (시간: )
- 목적:
- 활동:
- 진행 방법:

**[마무리]** (시간: )
- 목적:
- 활동:
- 핵심 정리 포인트:

### 🛠️ 준비물 체크리스트
- [ ]
- [ ]

### 📎 활동지 / 워크시트 초안
(간략한 활동지 내용을 포함해주세요)

### 💡 강의 운영 팁
- 주의할 점:
- 예상되는 학생 반응:
- 시간 부족 시 줄일 수 있는 부분:

## 작성 원칙
- ${target} 수준에 맞는 언어와 활동 수준
- 학생 참여 중심으로 설계 (강의식 최소화)
- 총 ${duration} 안에 현실적으로 진행 가능한 계획`;

  document.getElementById('lpPlanText').value = prompt;
  document.getElementById('lpPlanResult').classList.remove('hidden');
  document.getElementById('lp_saveTitle').value = `강의계획서 — ${topic} (${target})`;
  setTimeout(() => document.getElementById('lpPlanResult').scrollIntoView({ behavior:'smooth' }), 100);
}

function copyLessonPlanPrompt() {
  navigator.clipboard.writeText(document.getElementById('lpPlanText').value)
    .then(() => toast('📋 복사됐습니다! Claude.ai에 붙여넣으세요.'));
}

async function saveLessonPlanResult() {
  const title   = document.getElementById('lp_saveTitle').value.trim();
  const content = document.getElementById('lp_saveContent').value.trim();
  if (!title)   { toast('⚠️ 저장 제목을 입력해주세요'); return; }
  if (!content) { toast('⚠️ Claude.ai 결과를 붙여넣어 주세요'); return; }

  const entry = {
    id: newId(), createdAt: new Date().toISOString(),
    title, type: '강의계획서', description: content,
    target: document.getElementById('lp_target')?.value.trim(),
    tags: `강의계획서, ${document.getElementById('lp_topic')?.value.trim()}`,
  };
  if (!state.data.sections.cabinet) state.data.sections.cabinet = [];
  state.data.sections.cabinet.unshift(entry);

  cacheData();
  await syncToGitHub();
  const md = entryToMarkdown(title, content, entry.tags, { type: '강의계획서', target: entry.target });
  const filename = `${new Date().toISOString().slice(0,10)}_${title}`;
  try { await uploadMarkdownToGitHub('자료DB/콘텐츠제작', filename, md); } catch(_) {}
  downloadAsDocx(title, content);
  document.getElementById('lp_saveContent').value = '';
  document.getElementById('lpPlanResult').classList.add('hidden');
  toast('✅ 강의 캐비닛 저장 완료! DOCX 다운로드 중...');
}

function renderSlideDesignPanel() {
  return `
    <div class="sg-steps">
      <div class="sg-step"><div class="sg-step-num">①</div><div class="sg-step-text">강의계획서 또는<br>주제를 입력</div></div>
      <div class="sg-step-arrow">→</div>
      <div class="sg-step"><div class="sg-step-num">②</div><div class="sg-step-text"><strong>Claude.ai</strong>에서<br>슬라이드 목차 받기</div></div>
      <div class="sg-step-arrow">→</div>
      <div class="sg-step"><div class="sg-step-num">③</div><div class="sg-step-text">PPT 제작 후<br><strong>대본 생성기</strong>로</div></div>
    </div>

    <div class="sg-form-card">
      <div class="sg-form-grid">
        <div class="field">
          <label class="field-label">강의 주제 *</label>
          <input id="sd_topic" class="field-input" type="text" placeholder="예: 자기이해와 강점 발견" />
        </div>
        <div class="field">
          <label class="field-label">대상</label>
          <input id="sd_target" class="field-input" type="text" placeholder="예: 고등학교 1학년" />
        </div>
        <div class="field">
          <label class="field-label">강의 시간</label>
          <select id="sd_duration" class="field-input">
            <option>45분</option><option selected>50분</option>
            <option>60분</option><option>90분</option><option>120분</option>
          </select>
        </div>
        <div class="field">
          <label class="field-label">슬라이드 수 (목표)</label>
          <input id="sd_slides" class="field-input" type="number" placeholder="예: 18" min="5" max="60" />
        </div>
      </div>
      <div class="field">
        <label class="field-label">강의계획서 (선택 — 붙여넣으면 더 정확해요)</label>
        <textarea id="sd_plan" class="field-input" rows="4"
          placeholder="강의계획서 내용을 붙여넣으면 더 정확한 슬라이드 구조를 만들 수 있어요 (선택)"></textarea>
      </div>
      <div class="field">
        <label class="field-label">강조하고 싶은 점 / 특별 요청</label>
        <textarea id="sd_extra" class="field-input" rows="2"
          placeholder="예: 활동 슬라이드 2개 이상, 표지·목차 포함, 마무리 소감 슬라이드"></textarea>
      </div>
      <button class="btn-primary sg-generate-btn" onclick="generateSlidePrompt()">
        🎞️ 슬라이드 구조 프롬프트 생성하기
      </button>
    </div>

    <div id="lpSlideResult" class="sg-prompt-result hidden">
      <div class="sg-prompt-header">
        <span>📋 생성된 프롬프트</span>
        <div style="display:flex;gap:8px">
          <a href="https://claude.ai" target="_blank" class="btn-claudeai">Claude.ai 열기 ↗</a>
          <button class="btn-copy" onclick="copySlidePrompt()">복사</button>
        </div>
      </div>
      <textarea id="lpSlideText" class="prompt-textarea" readonly></textarea>
      <div class="sg-save-section">
        <div class="sg-save-title">✅ 슬라이드 구조 받은 후 — 캐비닛에 저장</div>
        <div class="field" style="margin-bottom:10px">
          <label class="field-label">저장 제목 *</label>
          <input id="sd_saveTitle" class="field-input" type="text" placeholder="슬라이드 구조 제목" />
        </div>
        <div class="field">
          <label class="field-label">Claude.ai 결과 붙여넣기 *</label>
          <textarea id="sd_saveContent" class="field-input" rows="8"
            placeholder="Claude.ai에서 받은 슬라이드 목차를 여기에 붙여넣으세요..."></textarea>
        </div>
        <button class="btn-primary w-full" onclick="saveSlideResult()">
          💾 강의 캐비닛에 저장
        </button>
      </div>
    </div>`;
}

function generateSlidePrompt() {
  const topic    = document.getElementById('sd_topic').value.trim();
  const target   = document.getElementById('sd_target').value.trim();
  const duration = document.getElementById('sd_duration').value;
  const slides   = document.getElementById('sd_slides').value.trim();
  const plan     = document.getElementById('sd_plan').value.trim();
  const extra    = document.getElementById('sd_extra').value.trim();

  if (!topic) { toast('⚠️ 강의 주제를 입력해주세요'); document.getElementById('sd_topic').focus(); return; }

  const slideTarget = slides ? `${slides}장` : '강의 시간에 맞게';

  const prompt = `당신은 진로교육 전문 강사이자 PPT 디자인 전문가입니다.
아래 조건에 맞는 PPT 슬라이드 목차와 구조를 설계해주세요.

## 강의 정보
- 주제: ${topic}
${target   ? `- 대상: ${target}` : ''}
- 강의 시간: ${duration}
- 슬라이드 수: ${slideTarget}
${extra ? `- 특별 요청: ${extra}` : ''}

${plan ? `## 강의계획서 (참고)\n${plan}\n` : ''}

## 슬라이드 구조 출력 형식

각 슬라이드를 아래 형식으로 작성해주세요:

---
**슬라이드 N — [슬라이드 제목]**
- 유형: (표지 / 목차 / 도입 / 핵심내용 / 활동 / 정리 / 마무리 중 택1)
- 레이아웃: (예: 제목+텍스트 / 이미지+텍스트 / 2단 구성 / 전체 이미지 / 빈 활동지 등)
- 핵심 내용: (이 슬라이드에서 다룰 주요 내용 2~3줄)
- 시각 요소: (추천 이미지·아이콘·색상 등)
- 소요 시간: X분
---

## 마지막에 추가할 것

### 📊 슬라이드 흐름 요약표
| 슬라이드 | 제목 | 유형 | 시간 | 누적 |
|---------|------|------|------|------|

### 🎨 디자인 가이드
- 추천 색상 팔레트: (메인색 2~3개)
- 폰트 추천:
- 전체 톤앤매너:

### 💡 제작 팁
- 학생 참여를 높이는 슬라이드 운영 방법
- 시간 조절이 필요할 때 줄이거나 늘릴 수 있는 슬라이드

## 설계 원칙
- 슬라이드당 핵심 메시지 1개
- 텍스트는 최소화, 시각화 중심
- ${target || '학생'} 눈높이에 맞는 디자인
- ${duration} 안에 자연스러운 흐름`;

  document.getElementById('lpSlideText').value = prompt;
  document.getElementById('lpSlideResult').classList.remove('hidden');
  document.getElementById('sd_saveTitle').value = `슬라이드 구조 — ${topic}`;
  setTimeout(() => document.getElementById('lpSlideResult').scrollIntoView({ behavior:'smooth' }), 100);
}

function copySlidePrompt() {
  navigator.clipboard.writeText(document.getElementById('lpSlideText').value)
    .then(() => toast('📋 복사됐습니다! Claude.ai에 붙여넣으세요.'));
}

async function saveSlideResult() {
  const title   = document.getElementById('sd_saveTitle').value.trim();
  const content = document.getElementById('sd_saveContent').value.trim();
  if (!title)   { toast('⚠️ 저장 제목을 입력해주세요'); return; }
  if (!content) { toast('⚠️ Claude.ai 결과를 붙여넣어 주세요'); return; }

  const entry = {
    id: newId(), createdAt: new Date().toISOString(),
    title, type: '슬라이드구조', description: content,
    tags: `슬라이드구조, ${document.getElementById('sd_topic')?.value.trim()}`,
  };
  if (!state.data.sections.cabinet) state.data.sections.cabinet = [];
  state.data.sections.cabinet.unshift(entry);

  cacheData();
  await syncToGitHub();
  const md = entryToMarkdown(title, content, entry.tags, { type: '슬라이드구조' });
  const filename = `${new Date().toISOString().slice(0,10)}_${title}`;
  try { await uploadMarkdownToGitHub('자료DB/콘텐츠제작', filename, md); } catch(_) {}
  downloadAsDocx(title, content);
  document.getElementById('sd_saveContent').value = '';
  document.getElementById('lpSlideResult').classList.add('hidden');
  toast('✅ 강의 캐비닛 저장 완료! DOCX 다운로드 중...');
}

// ── 에이전트 엔진 렌더 ────────────────────────
function renderAgentLab() {
  document.getElementById('pageTitle').textContent = '에이전트 엔진';
  document.getElementById('addBtn').style.display = 'none';

  const customAgents = state.data.agents || [];
  const missions = [...(state.data.missions || [])].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  const baseCards = BASE_AGENTS.map(a => agentCard(a, false)).join('');
  const customCards = customAgents.length
    ? customAgents.map(a => agentCard(a, true)).join('')
    : '';

  const missionHistory = missions.slice(0, 5).map(m => `
    <div class="mission-item">
      <div class="mission-item-top">
        <span class="mission-agents">${(m.agents||[]).map(id => {
          const a = [...BASE_AGENTS, ...SPECIALIST_AGENTS, ...(state.data.agents||[])].find(x=>x.id===id);
          return a ? a.icon : '🤖';
        }).join('')}</span>
        <span class="mission-title">${escHtml(m.title)}</span>
        <span class="mission-date">${fmtDate(m.createdAt)}</span>
      </div>
      ${m.savedTo ? `<span class="mission-saved">→ ${SAVE_TARGETS.find(t=>t.id===m.savedTo)?.label||m.savedTo} 저장됨</span>` : ''}
    </div>`).join('');

  return `
    <div class="agentlab-wrap">

      <div class="agentlab-hero">
        <div class="agentlab-hero-text">
          <h2>🤖 AI 에이전트 엔진</h2>
          <p>5개 뼈대 워크플로우 기반. 미션을 입력하면 최적의 프롬프트를 생성합니다.</p>
        </div>
        <button class="btn-mission" onclick="openMissionModal()">⚡ 미션 시작</button>
      </div>

      <div class="agent-section-label">🧬 상설 에이전트 — 뼈대 워크플로우</div>
      <div class="agent-grid">${baseCards}</div>

      <div class="agent-section-label" style="margin-top:28px">🎯 전문 에이전트 — 팀빌딩 & 아이스브레이킹</div>
      <div class="agent-grid">${SPECIALIST_AGENTS.map(a => agentCard(a, false)).join('')}</div>

      <div class="agent-section-label" style="margin-top:28px">
        🌟 나만의 에이전트
        <button class="btn-recruit" onclick="openRecruitModal()">+ 영입하기</button>
      </div>
      ${customAgents.length === 0
        ? `<div class="recruit-empty">
            필요한 에이전트를 직접 영입할 수 있어요.<br>
            예: @취업시장 분석가, @입시정책 탐정
           </div>`
        : `<div class="agent-grid">${customCards}</div>`
      }

      ${missions.length > 0 ? `
        <div class="agent-section-label" style="margin-top:28px">⏱ 최근 미션 이력</div>
        <div class="mission-history">${missionHistory}</div>` : ''}

    </div>`;
}

function agentCard(a, isCustom) {
  return `
    <div class="agent-card ${a.type==='base'?'base':'custom'}">
      <div class="agent-card-top">
        <span class="agent-icon">${a.icon}</span>
        <div>
          <div class="agent-name">${escHtml(a.name)}</div>
          <div class="agent-role">${escHtml(a.role)}</div>
        </div>
        ${isCustom ? `<button class="btn-icon del" style="margin-left:auto" onclick="deleteCustomAgent('${a.id}')">🗑</button>` : ''}
      </div>
      <div class="agent-desc">${escHtml(a.desc)}</div>
      <div class="agent-strength">💪 ${escHtml(a.strength)}</div>
    </div>`;
}

// ── 섹션 에이전트 검색 카드 ──────────────────
function renderAgentSearchCard(sid, missionType) {
  const mt = MISSION_TYPES.find(t => t.id === missionType);
  const labelMap = {
    trend:  '📈 시장·트렌드 스캔',
    policy: '🏛️ 정책·입시 수집',
    data:   '🔢 데이터 수집',
  };
  const descMap = {
    trends:  '에이전트가 최신 진로 트렌드를 검색해서 이곳에 자동으로 저장합니다.',
    policy:  '에이전트가 교육정책·대입 변화를 검색해서 이곳에 자동으로 저장합니다.',
    datalab: '에이전트가 직업시장·통계 데이터를 검색해서 이곳에 자동으로 저장합니다.',
    actlib:  '에이전트가 아이스브레이킹·팀빌딩·게임 활동을 찾아서 이곳에 저장합니다.',
  };
  return `
    <div class="agent-search-card">
      <div class="agent-search-info">
        <span class="agent-search-icon">🤖</span>
        <div>
          <div class="agent-search-title">에이전트로 검색</div>
          <div class="agent-search-desc">${descMap[sid] || '에이전트가 검색해서 이곳에 저장합니다.'}</div>
        </div>
      </div>
      <button class="btn-primary btn-agent-search" onclick="openMissionModal('${missionType}','${sid}')">
        검색 시작 →
      </button>
    </div>`;
}

// ── 미션 모달 ─────────────────────────────────
function openMissionModal(presetMissionType, presetTarget) {
  const typeOpts = MISSION_TYPES.map((t, i) =>
    `<div class="mission-type-card ${i===0?'selected':''}" data-type="${t.id}" onclick="selectMissionType('${t.id}')">
      <div class="mission-type-label">${t.label}</div>
      <div class="mission-type-desc">${t.desc}</div>
    </div>`
  ).join('');

  document.getElementById('modalHeading').textContent = '⚡ 미션 시작';
  document.getElementById('modalBody').innerHTML = `
    <div class="field">
      <label class="field-label">미션 유형</label>
      <div class="mission-type-grid">${typeOpts}</div>
    </div>

    <div class="field" style="margin-top:4px">
      <label class="field-label">미션 내용 *
        <span class="field-label-hint">— 아래 예시를 수정하거나 직접 입력하세요</span>
      </label>
      <textarea id="missionGoal" class="field-input" rows="5"></textarea>
    </div>

    <div class="mission-options-row">
      <div class="field" style="flex:1;margin-bottom:0">
        <label class="field-label">결과 저장 위치</label>
        <select id="missionTarget" class="field-input">
          ${SAVE_TARGETS.map(t=>`<option value="${t.id}">${t.label}</option>`).join('')}
        </select>
      </div>
    </div>

    <div class="field" style="margin-top:16px">
      <label class="field-label">에이전트 선택</label>
      <div class="agent-checks" id="agentChecks"></div>
    </div>

    <div id="promptResult" class="prompt-result hidden">
      <div class="prompt-result-header">
        <span>📋 생성된 프롬프트</span>
        <button class="btn-copy" onclick="copyPrompt()">복사</button>
      </div>
      <textarea id="promptText" class="prompt-textarea" readonly></textarea>
      <p class="prompt-hint">이 프롬프트를 복사 → <strong>Claude.ai</strong>에 붙여넣기 → 결과를 아래 버튼으로 저장하세요.</p>
      <button class="btn-primary w-full" style="margin-top:8px" onclick="openSaveResultModal()">결과 저장하기</button>
    </div>`;

  // 미션 유형 선택 (preset 또는 첫 번째)
  selectMissionType(presetMissionType || MISSION_TYPES[0].id);

  // preset 저장 위치 덮어쓰기
  if (presetTarget) {
    const targetEl = document.getElementById('missionTarget');
    if (targetEl) targetEl.value = presetTarget;
  }

  document.getElementById('modalSave').textContent = '프롬프트 생성';
  document.getElementById('modalSave').dataset.sid = 'agentlab';
  document.getElementById('modalSave').onclick = generateMissionPrompt;
  document.getElementById('modalCancel').onclick = () => { closeModal(); resetModalSaveBtn(); };
  document.getElementById('modalClose').onclick  = () => { closeModal(); resetModalSaveBtn(); };
  document.getElementById('entryOverlay').style.display = 'flex';
}

function selectMissionType(typeId) {
  const mtype = MISSION_TYPES.find(t => t.id === typeId);
  if (!mtype) return;

  // 카드 선택 표시
  document.querySelectorAll('.mission-type-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.type === typeId);
  });

  // 예시 멘트 채우기
  const goalEl = document.getElementById('missionGoal');
  if (goalEl) goalEl.value = mtype.example;

  // 저장 위치 설정
  const targetEl = document.getElementById('missionTarget');
  if (targetEl) targetEl.value = mtype.defaultTarget;

  // 에이전트 체크박스 재생성
  const checksEl = document.getElementById('agentChecks');
  if (!checksEl) return;

  const makeChecks = (agents, groupLabel) => {
    const items = agents.map(a => `
      <label class="agent-check-label">
        <input type="checkbox" class="agent-check" value="${a.id}"
          ${mtype.defaultAgents.includes(a.id) ? 'checked' : ''} />
        <span>${a.icon} ${escHtml(a.name)}</span>
        <span class="agent-check-role">${escHtml(a.role)}</span>
      </label>`).join('');
    return `<div class="agent-check-group-label">${groupLabel}</div>${items}`;
  };

  checksEl.innerHTML =
    makeChecks(BASE_AGENTS, '🧬 상설 에이전트') +
    makeChecks(SPECIALIST_AGENTS, '🎯 전문 에이전트') +
    (state.data.agents?.length ? makeChecks(state.data.agents, '🌟 나만의 에이전트') : '');
}

function generateMissionPrompt() {
  const goal = document.getElementById('missionGoal').value.trim();
  if (!goal) { toast('⚠️ 미션 설명을 입력해주세요'); return; }

  const selectedIds = [...document.querySelectorAll('.agent-check:checked')].map(c => c.value);
  const allAgents = [...BASE_AGENTS, ...SPECIALIST_AGENTS, ...(state.data.agents||[])];
  const selected = allAgents.filter(a => selectedIds.includes(a.id));

  const targetId = document.getElementById('missionTarget').value;
  const targetLabel = SAVE_TARGETS.find(t=>t.id===targetId)?.label || targetId;

  // 줄기세포 DNA 원칙
  const dna = `## 절대 원칙 (줄기세포 DNA)
1. 품질 > 속도 — 불확실한 정보는 허용하지 않는다
2. 출처 없는 정보는 정보가 아니다 — 모든 정보에 출처를 명시한다
3. 실행 가능해야 한다 — "고려해보세요"가 아닌 구체적 결과물을 낸다
4. 개인화 — 진로강사 mycareerlab의 맥락에 맞게 정리한다`;

  // 팀 구성
  const team = selected.map(a =>
    `### ${a.icon} ${a.name} (${a.role})\n${a.prompt}`
  ).join('\n\n');

  // 출력 형식
  const outputFmt = `## 출력 형식
결과는 아래 형식으로 정리해주세요. 각 항목은 ---로 구분합니다.

**제목**: [항목 제목]
**유형**: [분류]
**내용**: [핵심 내용, 진행방법 등]
**출처**: [URL 또는 출처명]
**태그**: [태그1, 태그2, 태그3]
---`;

  const prompt = `당신은 진로강사 mycareerlab의 AI 연구팀입니다.
저장 위치: ${targetLabel}

${dna}

## 팀 구성
${team}

## 미션
${goal}

${outputFmt}`;

  document.getElementById('promptText').value = prompt;
  document.getElementById('promptResult').classList.remove('hidden');
  document.getElementById('modalSave').textContent = '프롬프트 생성';

  // 미션 이력 임시 저장
  window._pendingMission = {
    id: newId(),
    title: goal.slice(0, 60),
    agents: selectedIds,
    savedTo: targetId,
    missionType: document.querySelector('.mission-type-card.selected')?.dataset.type || '',
    prompt,
    createdAt: new Date().toISOString(),
  };
}

function copyPrompt() {
  const text = document.getElementById('promptText').value;
  navigator.clipboard.writeText(text).then(() => toast('📋 프롬프트 복사됨! Claude.ai에 붙여넣으세요'));
}

function openSaveResultModal() {
  closeModal();
  resetModalSaveBtn();

  const targetId = window._pendingMission?.savedTo || 'actlib';
  const targetLabel = SAVE_TARGETS.find(t=>t.id===targetId)?.label || targetId;
  const s = SECTIONS.find(x => x.id === targetId);

  document.getElementById('modalHeading').textContent = `결과 저장 → ${targetLabel}`;
  document.getElementById('modalBody').innerHTML = `
    <p style="font-size:13px;color:var(--muted);margin-bottom:16px">
      Claude.ai에서 받은 결과를 여기에 붙여넣으세요.<br>
      각 항목을 하나씩 저장하거나, 전체를 메모로 저장할 수 있습니다.
    </p>
    <div class="field">
      <label class="field-label">제목 *</label>
      <input id="f_title" class="field-input" type="text" placeholder="결과물 제목" />
    </div>
    <div class="field">
      <label class="field-label">내용 (Claude 결과 붙여넣기)</label>
      <textarea id="f_content" class="field-input" rows="10" placeholder="Claude.ai 결과를 여기에 붙여넣으세요..."></textarea>
    </div>
    <div class="field">
      <label class="field-label">태그</label>
      <input id="f_tags" class="field-input" type="text" placeholder="미션결과, 아이스브레이킹 등" />
    </div>
    <input type="hidden" id="f_type" value="미션 결과" />`;

  document.getElementById('modalSave').textContent = '저장';
  document.getElementById('modalSave').dataset.sid = targetId;
  document.getElementById('modalSave').onclick = async () => {
    const title = document.getElementById('f_title').value.trim();
    if (!title) { toast('⚠️ 제목을 입력해주세요'); return; }

    const content = document.getElementById('f_content').value.trim();
    const tags    = document.getElementById('f_tags').value.trim();

    const entry = {
      id: newId(),
      createdAt: new Date().toISOString(),
      title,
      type: '미션 결과',
      description: content,
      tags,
    };

    if (!state.data.sections[targetId]) state.data.sections[targetId] = [];
    state.data.sections[targetId].unshift(entry);

    // 미션 이력 저장
    const missionType = window._pendingMission?.missionType || '';
    if (window._pendingMission) {
      if (!state.data.missions) state.data.missions = [];
      state.data.missions.unshift(window._pendingMission);
      window._pendingMission = null;
    }

    closeModal();
    resetModalSaveBtn();
    navigate(targetId);
    cacheData();
    await syncToGitHub();

    // GitHub 자료DB 폴더에 마크다운 저장
    if (content) {
      const folderPath = DB_FOLDERS[missionType] || DB_FOLDERS[targetId] || DB_FOLDERS.default;
      const md = entryToMarkdown(title, content, tags, { type: '미션 결과' });
      const filename = `${new Date().toISOString().slice(0,10)}_${title}`;
      try {
        await uploadMarkdownToGitHub(folderPath, filename, md);
        toast(`📁 자료DB(${folderPath}) 저장 완료!`);
      } catch (e) {
        toast(`⚠️ DB 폴더 저장 실패: ${e.message}`);
      }
      // DOCX 자동 다운로드
      downloadAsDocx(title, content);
    }
  };
  document.getElementById('entryOverlay').style.display = 'flex';
}

function resetModalSaveBtn() {
  const btn = document.getElementById('modalSave');
  btn.textContent = '저장';
  btn.onclick = saveEntry;
  delete btn.dataset.sid;
}

// ── 영입 에이전트 모달 ────────────────────────
function openRecruitModal() {
  state.editingId = null;
  document.getElementById('modalHeading').textContent = '🌟 에이전트 영입';
  document.getElementById('modalBody').innerHTML = `
    <p style="font-size:13px;color:var(--muted);margin-bottom:16px">
      특정 임무에 특화된 에이전트를 영입합니다.<br>
      예: 아이스브레이킹 수집가, 취업시장 분석가, 입시정책 탐정
    </p>
    <div class="field">
      <label class="field-label">에이전트 이름 *</label>
      <input id="ra_name" class="field-input" type="text" placeholder="예: 아이스브레이킹 수집가" />
    </div>
    <div class="field">
      <label class="field-label">아이콘 (이모지)</label>
      <input id="ra_icon" class="field-input" type="text" placeholder="예: 🎮" value="⭐" />
    </div>
    <div class="field">
      <label class="field-label">역할 한 줄 설명 *</label>
      <input id="ra_role" class="field-input" type="text" placeholder="예: 아이스브레이킹 자료 전문 수집·정리" />
    </div>
    <div class="field">
      <label class="field-label">전문 분야 & 강점</label>
      <input id="ra_strength" class="field-input" type="text" placeholder="예: YouTube, 교사커뮤니티, 활동자료 DB" />
    </div>
    <div class="field">
      <label class="field-label">에이전트 프롬프트 (선택)</label>
      <textarea id="ra_prompt" class="field-input" rows="5"
        placeholder="이 에이전트가 어떻게 동작할지 설명합니다. 비워두면 기본 템플릿을 사용합니다."></textarea>
    </div>`;

  document.getElementById('modalSave').textContent = '영입 완료';
  document.getElementById('modalSave').onclick = saveRecruitAgent;
  document.getElementById('entryOverlay').style.display = 'flex';
}

async function saveRecruitAgent() {
  const name     = document.getElementById('ra_name').value.trim();
  const role     = document.getElementById('ra_role').value.trim();
  const icon     = document.getElementById('ra_icon').value.trim() || '⭐';
  const strength = document.getElementById('ra_strength').value.trim();
  const prompt   = document.getElementById('ra_prompt').value.trim();

  if (!name || !role) { toast('⚠️ 이름과 역할은 필수입니다'); return; }

  const agent = {
    id: newId(),
    name, icon, role, strength,
    type: 'custom',
    desc: role,
    prompt: prompt || `당신은 mycareerlab의 ${name}입니다.\n역할: ${role}\n전문 분야: ${strength}`,
    createdAt: new Date().toISOString(),
  };

  if (!state.data.agents) state.data.agents = [];
  state.data.agents.push(agent);

  closeModal();
  resetModalSaveBtn();
  navigate('agentlab');
  cacheData();
  await syncToGitHub();
  toast(`✅ ${name} 영입 완료!`);
}

function deleteCustomAgent(agentId) {
  if (!confirm('이 에이전트를 해고할까요?')) return;
  state.data.agents = (state.data.agents||[]).filter(a => a.id !== agentId);
  navigate('agentlab');
  cacheData();
  syncToGitHub();
  toast('에이전트 해고됨');
}

// ── 강사 수입 대시보드 ────────────────────────
function renderFinanceDashboard(items, s) {
  const fmt = n => Number(n).toLocaleString('ko-KR');
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;

  const monthMap = {};
  items.forEach(item => {
    const d = (item.date || item.createdAt || '').slice(0,7);
    if (!d) return;
    monthMap[d] = (monthMap[d] || 0) + (Number(item.amount) || 0);
  });
  const months = Object.keys(monthMap).sort().slice(-6);
  const thisMonthTotal = monthMap[thisMonth] || 0;
  const totalAll = items.reduce((s,i) => s + (Number(i.amount)||0), 0);

  const maxVal = Math.max(...months.map(m => monthMap[m]), 1);
  const trendBars = months.map(m => {
    const pct = Math.round((monthMap[m] / maxVal) * 100);
    return `<div class="finance-trend-col">
      <div class="finance-trend-bar-wrap">
        <div class="finance-trend-bar${m===thisMonth?' this-month':''}" style="height:${pct}%"></div>
      </div>
      <div class="finance-trend-label">${m.slice(5)}월</div>
      <div class="finance-trend-amt">${Math.round(monthMap[m]/10000)}만</div>
    </div>`;
  }).join('');

  const clientMap = {};
  items.forEach(item => {
    const c = item.client || '미입력';
    clientMap[c] = (clientMap[c] || 0) + (Number(item.amount) || 0);
  });
  const topClients = Object.entries(clientMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const clientRows = topClients.map(([c,a]) =>
    `<div class="finance-client-row">
      <span class="finance-client-name">${escHtml(c)}</span>
      <span class="finance-client-amt">+${fmt(a)}원</span>
    </div>`).join('');

  const listHtml = items.length === 0
    ? `<div class="empty-state"><div class="empty-icon">💰</div><p>강의 수입을 기록해 보세요!</p></div>`
    : `<div class="finance-list">${items.map(item => `
      <div class="finance-item" onclick="openEditModal('finance','${item.id}')">
        <div class="finance-item-left">
          <div class="finance-item-client">${escHtml(item.client||'미입력')}</div>
          <div class="finance-item-date">${fmtDate(item.date||item.createdAt)}</div>
          ${item.moved?`<div class="finance-item-moved">→ ${escHtml(item.moved)}</div>`:''}
        </div>
        <div class="finance-item-right">
          <div class="finance-item-amount">+${fmt(item.amount||0)}원</div>
          <button class="btn-icon del" onclick="event.stopPropagation();deleteEntry('finance','${item.id}')">🗑</button>
        </div>
      </div>`).join('')}</div>`;

  return `<div class="finance-dashboard">
    <div class="finance-summary-row">
      <div class="finance-stat-card">
        <div class="finance-stat-label">이번 달</div>
        <div class="finance-stat-num income">+${fmt(thisMonthTotal)}원</div>
      </div>
      <div class="finance-stat-card">
        <div class="finance-stat-label">누적 수입</div>
        <div class="finance-stat-num">+${fmt(totalAll)}원</div>
      </div>
      <div class="finance-stat-card">
        <div class="finance-stat-label">강의 건수</div>
        <div class="finance-stat-num">${items.length}건</div>
      </div>
    </div>
    ${months.length ? `<div class="finance-section">
      <div class="finance-section-title">📊 월별 수입 추이</div>
      <div class="finance-trend">${trendBars}</div>
    </div>` : ''}
    ${topClients.length ? `<div class="finance-section">
      <div class="finance-section-title">🏛️ 기관별 합계</div>
      ${clientRows}
    </div>` : ''}
    <div class="finance-section">
      <div class="finance-section-title">📋 입금 내역</div>
      ${listHtml}
    </div>
  </div>`;
}

// ── 비전 & 목표 페이지 ────────────────────────
function renderVisionPage(goalItems, s) {
  if (!state.data.visionValues)    state.data.visionValues = [];
  if (!state.data.visionQuestions) state.data.visionQuestions = [];

  const valueCards = state.data.visionValues.length === 0
    ? `<p class="vision-empty-hint">나를 이끄는 가치와 신념을 적어보세요.</p>`
    : state.data.visionValues.map(v => `
        <div class="value-card">
          <div class="value-word">${escHtml(v.word)}</div>
          ${v.meaning ? `<div class="value-meaning">${escHtml(v.meaning)}</div>` : ''}
          <button class="btn-icon del value-del" onclick="deleteValue('${v.id}')">🗑</button>
        </div>`).join('');

  const questionCards = state.data.visionQuestions.length === 0
    ? `<p class="vision-empty-hint">계속 생각해보고 싶은 인생 질문을 추가해보세요.</p>`
    : state.data.visionQuestions.map(q => {
        const answersHtml = (q.answers||[]).map(a =>
          `<div class="question-answer">
            <span class="answer-date">${fmtDate(a.date)}</span>
            <span class="answer-text">${escHtml(a.text)}</span>
          </div>`).join('');
        return `<div class="question-card">
          <div class="question-card-top">
            <div class="question-text">❓ ${escHtml(q.question)}</div>
            <div class="question-actions">
              <button class="btn-sm btn-secondary" onclick="openAddAnswerModal('${q.id}')">+ 답변</button>
              <button class="btn-icon del" onclick="deleteQuestion('${q.id}')">🗑</button>
            </div>
          </div>
          ${answersHtml ? `<div class="question-answers">${answersHtml}</div>` : ''}
        </div>`;
      }).join('');

  const goalCards = goalItems.length === 0
    ? `<p class="vision-empty-hint">오른쪽 상단 <strong>＋ 추가</strong> 버튼으로 목표를 추가하세요.</p>`
    : goalItems.map(item => {
        const cls = ['달성','완료'].includes(item.status)?'done':item.status==='진행중'?'active':'hold';
        return `<div class="goal-card" onclick="openEditModal('vision','${item.id}')">
          <div class="goal-card-top">
            ${item.horizon?`<span class="goal-horizon">${escHtml(item.horizon)}</span>`:''}
            ${item.status ?`<span class="card-badge ${cls}">${escHtml(item.status)}</span>`:''}
            <button class="btn-icon del ml-auto" onclick="event.stopPropagation();deleteEntry('vision','${item.id}')">🗑</button>
          </div>
          <div class="goal-title">${escHtml(item.title)}</div>
          ${item.content?`<div class="card-excerpt">${escHtml(item.content)}</div>`:''}
        </div>`;
      }).join('');

  return `<div class="vision-page">
    <div class="vision-section">
      <div class="vision-section-head">
        <div class="vision-section-title">🧭 나의 가치 & 신념</div>
        <button class="btn-sm btn-primary" onclick="openAddValueModal()">+ 가치 추가</button>
      </div>
      <div class="value-cards">${valueCards}</div>
    </div>
    <div class="vision-section">
      <div class="vision-section-head">
        <div class="vision-section-title">❓ 인생 질문 노트</div>
        <button class="btn-sm btn-primary" onclick="openAddQuestionModal()">+ 질문 추가</button>
      </div>
      <div class="question-cards">${questionCards}</div>
    </div>
    <div class="vision-section">
      <div class="vision-section-head">
        <div class="vision-section-title">🎯 목표</div>
      </div>
      <div class="goal-cards">${goalCards}</div>
    </div>
  </div>`;
}

function openAddValueModal() {
  document.getElementById('modalHeading').textContent = '🧭 가치 & 신념 추가';
  document.getElementById('modalBody').innerHTML = `
    <div class="field">
      <label class="field-label">가치 키워드 *</label>
      <input id="v_word" class="field-input" type="text" placeholder="예: 성장, 연결, 진정성, 용기, 자유..." />
    </div>
    <div class="field">
      <label class="field-label">나에게 이 가치가 의미하는 것</label>
      <textarea id="v_meaning" class="field-input" rows="4"
        placeholder="이 가치가 내 삶에서 어떤 의미인지, 왜 중요한지..."></textarea>
    </div>`;
  document.getElementById('modalSave').textContent = '저장';
  document.getElementById('modalSave').onclick = saveValue;
  document.getElementById('modalCancel').onclick = () => { closeModal(); resetModalSaveBtn(); };
  document.getElementById('modalClose').onclick  = () => { closeModal(); resetModalSaveBtn(); };
  document.getElementById('entryOverlay').style.display = 'flex';
}
async function saveValue() {
  const word = document.getElementById('v_word').value.trim();
  if (!word) { toast('⚠️ 가치 키워드를 입력해주세요'); document.getElementById('v_word').focus(); return; }
  if (!state.data.visionValues) state.data.visionValues = [];
  state.data.visionValues.push({ id: newId(), word, meaning: document.getElementById('v_meaning').value.trim(), createdAt: new Date().toISOString() });
  closeModal(); resetModalSaveBtn();
  cacheData(); await syncToGitHub();
  renderSection('vision');
}
function deleteValue(id) {
  state.data.visionValues = (state.data.visionValues||[]).filter(v => v.id !== id);
  cacheData(); syncToGitHub(); renderSection('vision');
}

function openAddQuestionModal() {
  document.getElementById('modalHeading').textContent = '❓ 인생 질문 추가';
  document.getElementById('modalBody').innerHTML = `
    <div class="field">
      <label class="field-label">인생 질문 *</label>
      <textarea id="q_question" class="field-input" rows="3"
        placeholder="예: 나는 10년 후 어떤 강사가 되고 싶은가?"></textarea>
    </div>
    <div class="field">
      <label class="field-label">첫 번째 답변 (선택)</label>
      <textarea id="q_firstAnswer" class="field-input" rows="3"
        placeholder="지금 이 순간의 생각을 적어보세요..."></textarea>
    </div>`;
  document.getElementById('modalSave').textContent = '저장';
  document.getElementById('modalSave').onclick = saveQuestion;
  document.getElementById('modalCancel').onclick = () => { closeModal(); resetModalSaveBtn(); };
  document.getElementById('modalClose').onclick  = () => { closeModal(); resetModalSaveBtn(); };
  document.getElementById('entryOverlay').style.display = 'flex';
}
async function saveQuestion() {
  const question = document.getElementById('q_question').value.trim();
  if (!question) { toast('⚠️ 질문을 입력해주세요'); document.getElementById('q_question').focus(); return; }
  if (!state.data.visionQuestions) state.data.visionQuestions = [];
  const firstAnswer = document.getElementById('q_firstAnswer').value.trim();
  const answers = firstAnswer ? [{ date: new Date().toISOString().slice(0,10), text: firstAnswer }] : [];
  state.data.visionQuestions.push({ id: newId(), question, answers, createdAt: new Date().toISOString() });
  closeModal(); resetModalSaveBtn();
  cacheData(); await syncToGitHub(); renderSection('vision');
}
function deleteQuestion(id) {
  state.data.visionQuestions = (state.data.visionQuestions||[]).filter(q => q.id !== id);
  cacheData(); syncToGitHub(); renderSection('vision');
}

function openAddAnswerModal(questionId) {
  const q = (state.data.visionQuestions||[]).find(x => x.id === questionId);
  if (!q) return;
  const prevAnswers = (q.answers||[]).map(a =>
    `<div class="prev-answer-row">
      <span class="answer-date">${fmtDate(a.date)}</span>
      <span class="answer-text">${escHtml(a.text)}</span>
    </div>`).join('');
  document.getElementById('modalHeading').textContent = '✏️ 답변 추가';
  document.getElementById('modalBody').innerHTML = `
    <div class="question-in-modal">❓ ${escHtml(q.question)}</div>
    ${prevAnswers ? `<div class="prev-answers-title">이전 답변</div>${prevAnswers}` : ''}
    <div class="field" style="margin-top:16px">
      <label class="field-label">오늘의 답변 *</label>
      <textarea id="a_text" class="field-input" rows="5"
        placeholder="지금 이 순간 이 질문에 대한 당신의 생각..."></textarea>
    </div>`;
  document.getElementById('modalSave').textContent = '답변 저장';
  document.getElementById('modalSave').onclick = () => saveAnswer(questionId);
  document.getElementById('modalCancel').onclick = () => { closeModal(); resetModalSaveBtn(); };
  document.getElementById('modalClose').onclick  = () => { closeModal(); resetModalSaveBtn(); };
  document.getElementById('entryOverlay').style.display = 'flex';
}
async function saveAnswer(questionId) {
  const text = document.getElementById('a_text').value.trim();
  if (!text) { toast('⚠️ 답변을 입력해주세요'); document.getElementById('a_text').focus(); return; }
  const q = (state.data.visionQuestions||[]).find(x => x.id === questionId);
  if (!q) return;
  if (!q.answers) q.answers = [];
  q.answers.push({ date: new Date().toISOString().slice(0,10), text });
  closeModal(); resetModalSaveBtn();
  cacheData(); await syncToGitHub(); renderSection('vision');
}

// ── 독서기록 리스트 ───────────────────────────
function renderReadingList(items, s) {
  const catColors = { '그림책':'badge-read-pic','진로':'badge-read-career','자기계발':'badge-read-self','전공':'badge-read-major','소설/기타':'badge-read-other' };
  if (!items.length) return `<div class="empty-state"><div class="empty-icon">📚</div><p>읽은 책을 기록해 보세요!</p></div>`;
  return `<div class="reading-list">${items.map(item => `
    <div class="reading-card" onclick="openEditModal('reading','${item.id}')">
      <div class="reading-card-badges">
        ${item.category?`<span class="reading-cat-badge ${catColors[item.category]||''}">${escHtml(item.category)}</span>`:''}
        ${item.rating?`<span class="reading-stars">${escHtml(item.rating)}</span>`:''}
      </div>
      <div class="reading-title">${escHtml(item.title)}</div>
      ${item.author?`<div class="reading-author">by ${escHtml(item.author)}</div>`:''}
      ${item.review?`<div class="reading-review">${escHtml(item.review)}</div>`:''}
      ${item.quote ?`<div class="reading-quote">"${escHtml(item.quote)}"</div>`:''}
      <div class="reading-date">${fmtDate(item.date||item.createdAt)}</div>
      <button class="btn-icon del reading-del" onclick="event.stopPropagation();deleteEntry('reading','${item.id}')">🗑</button>
    </div>`).join('')}</div>`;
}

// ── 감사일기 리스트 ───────────────────────────
function renderGratitudeList(items, s) {
  if (!items.length) return `<div class="empty-state"><div class="empty-icon">🙏</div><p>오늘의 감사함을 기록해 보세요!</p></div>`;
  return `<div class="gratitude-list">${items.map(item => `
    <div class="gratitude-card" onclick="openEditModal('gratitude','${item.id}')">
      <div class="gratitude-card-top">
        <span class="gratitude-date">${fmtDate(item.date||item.createdAt)}</span>
        <button class="btn-icon del" onclick="event.stopPropagation();deleteEntry('gratitude','${item.id}')">🗑</button>
      </div>
      <div class="gratitude-items">
        ${item.thing1?`<div class="gratitude-item">🌟 ${escHtml(item.thing1)}</div>`:''}
        ${item.thing2?`<div class="gratitude-item">🌟 ${escHtml(item.thing2)}</div>`:''}
        ${item.thing3?`<div class="gratitude-item">🌟 ${escHtml(item.thing3)}</div>`:''}
      </div>
      ${item.moment   ?`<div class="gratitude-moment">💛 ${escHtml(item.moment)}</div>`:''}
      ${item.tomorrow ?`<div class="gratitude-tomorrow">→ 내일: ${escHtml(item.tomorrow)}</div>`:''}
    </div>`).join('')}</div>`;
}

// ── 여행기록 리스트 ───────────────────────────
function renderTravelList(items, s) {
  if (!items.length) return `<div class="empty-state"><div class="empty-icon">✈️</div><p>여행의 기억을 기록해 보세요!</p></div>`;
  return `<div class="travel-list">${items.map(item => `
    <div class="travel-card" onclick="openEditModal('travel','${item.id}')">
      <div class="travel-destination">📍 ${escHtml(item.destination||'')}</div>
      <div class="travel-meta-row">
        ${item.date     ?`<span class="travel-date">${fmtDate(item.date)}</span>`:''}
        ${item.companion?`<span class="travel-companion">👥 ${escHtml(item.companion)}</span>`:''}
      </div>
      ${item.summary?`<div class="travel-summary">${escHtml(item.summary)}</div>`:''}
      ${item.memory ?`<div class="travel-memory">${escHtml(item.memory)}</div>`:''}
      <div class="travel-card-foot">
        ${item.link?`<a href="${escHtml(item.link)}" target="_blank" onclick="event.stopPropagation()" class="travel-photo-link">📷 사진 보기</a>`:''}
        <button class="btn-icon del ml-auto" onclick="event.stopPropagation();deleteEntry('travel','${item.id}')">🗑</button>
      </div>
    </div>`).join('')}</div>`;
}

// ── 자기점검 리스트 ───────────────────────────
function renderCheckinList(items, s) {
  if (!items.length) return `<div class="empty-state"><div class="empty-icon">${s.icon}</div><p>아직 기록이 없어요.</p></div>`;
  return `<div class="checkin-list">${items.map(item => {
    const cond = CONDITION_MAP[item.condition] || { emoji:'😐', cls:'cond-ok' };
    return `<div class="checkin-card ${cond.cls}" onclick="openEditModal('checkin','${item.id}')">
      <div class="checkin-top">
        <span class="checkin-emoji">${cond.emoji}</span>
        <div>
          <div class="checkin-date">${fmtDate(item.date)}</div>
          <div class="checkin-cond">${escHtml(item.condition||'')}</div>
        </div>
        <button class="btn-icon del ml-auto" onclick="event.stopPropagation();deleteEntry('checkin','${item.id}')">🗑</button>
      </div>
      ${item.emotion ? `<div class="checkin-field"><span class="checkin-fl">감정</span> ${escHtml(item.emotion)}</div>` : ''}
      ${item.memo    ? `<div class="checkin-field"><span class="checkin-fl">한줄</span> ${escHtml(item.memo)}</div>` : ''}
    </div>`;
  }).join('')}</div>`;
}

// ── 수업일지 리스트 ───────────────────────────
function renderJournalList(items, s) {
  const counts = { multi: 0, special: 0, assist: 0, legacy: 0 };
  items.forEach(i => {
    const t = i.journalType || 'legacy';
    if (counts[t] !== undefined) counts[t]++; else counts.legacy++;
  });
  const filterBar = `
    <div class="journal-filter-bar">
      <button class="jfilter-btn active" data-jfilter="all" onclick="filterJournal('all')">전체 ${items.length}</button>
      <button class="jfilter-btn" data-jfilter="multi"   onclick="filterJournal('multi')">📅 다차시 ${counts.multi}</button>
      <button class="jfilter-btn" data-jfilter="special" onclick="filterJournal('special')">⚡ 특강 ${counts.special}</button>
      <button class="jfilter-btn" data-jfilter="assist"  onclick="filterJournal('assist')">🤝 보조강사 ${counts.assist}</button>
    </div>`;
  if (!items.length) return filterBar + `<div class="empty-state"><div class="empty-icon">${s.icon}</div><p>+ 추가 버튼으로 첫 수업일지를 작성해 보세요!</p></div>`;
  return filterBar + `<div class="journal-list" id="journalList">${items.map(item => renderJournalCard(item)).join('')}</div>`;
}

function filterJournal(jfilter) {
  document.querySelectorAll('.jfilter-btn').forEach(b => b.classList.toggle('active', b.dataset.jfilter === jfilter));
  const listEl = document.getElementById('journalList');
  if (!listEl) return;
  listEl.querySelectorAll('.journal-card').forEach(card => {
    const t = card.dataset.jtype || 'legacy';
    card.style.display = (jfilter === 'all' || t === jfilter) ? '' : 'none';
  });
}

function renderJournalCard(item) {
  const jtype = item.journalType || 'legacy';
  const typeLabel = { multi:'📅 다차시', special:'⚡ 특강', assist:'🤝 보조강사', legacy:'📖 수업일지' };
  const typeCls   = { multi:'jtype-multi', special:'jtype-special', assist:'jtype-assist', legacy:'' };
  const incomeHtml = item.income
    ? `<span class="journal-income">+${Number(item.income).toLocaleString('ko-KR')}원</span>` : '';

  let bodyHtml = '';
  if (jtype === 'multi') {
    const session = item.sessionNum ? `${item.sessionNum}/${item.totalSessions||'?'}차시` : '';
    bodyHtml = `
      ${item.programName ? `<div class="journal-title">${escHtml(item.programName)}</div>` : ''}
      <div class="journal-meta-row">
        ${session ? `<span class="journal-session-badge">${session}</span>` : ''}
        ${item.topic ? `<span class="journal-topic">${escHtml(item.topic)}</span>` : ''}
        ${item.participants ? `<span class="journal-pax">👥 ${item.participants}명</span>` : ''}
      </div>
      ${item.response    ? `<div class="card-excerpt">💬 ${escHtml(item.response)}</div>` : ''}
      ${item.improvement ? `<div class="journal-improve">💡 ${escHtml(item.improvement)}</div>` : ''}
      ${item.nextPrepNote? `<div class="journal-next">→ 다음 준비: ${escHtml(item.nextPrepNote)}</div>` : ''}`;
  } else if (jtype === 'special') {
    bodyHtml = `
      <div class="journal-title">${escHtml(item.topic||'')}</div>
      <div class="journal-meta-row">
        ${item.duration ? `<span class="journal-pax">⏱ ${item.duration}</span>` : ''}
        ${item.participants ? `<span class="journal-pax">👥 ${item.participants}명</span>` : ''}
        ${item.reusable ? `<span class="journal-reusable ${item.reusable==='재활용 가능'?'ok':item.reusable==='수정 후 가능'?'partial':''}">${escHtml(item.reusable)}</span>` : ''}
      </div>
      ${item.response ? `<div class="card-excerpt">💬 ${escHtml(item.response)}</div>` : ''}
      ${item.memo     ? `<div class="journal-improve">${escHtml(item.memo)}</div>` : ''}`;
  } else if (jtype === 'assist') {
    const roles = [
      item.role_modeum   ? '🤝 모둠지원' : null,
      item.role_material ? '📦 준비물' : null,
      item.role_photo    ? '📷 사진' : null,
      item.role_observe  ? '👀 관찰' : null,
    ].filter(Boolean);
    bodyHtml = `
      <div class="journal-title">${escHtml(item.topic||'보조강사')}</div>
      <div class="journal-meta-row">
        ${item.mainInstructor ? `<span class="journal-main-inst">주강사: ${escHtml(item.mainInstructor)}</span>` : ''}
        ${item.participants ? `<span class="journal-pax">👥 ${item.participants}명</span>` : ''}
      </div>
      ${roles.length ? `<div class="journal-roles">${roles.map(r=>`<span class="role-tag">${r}</span>`).join('')}</div>` : ''}
      ${item.observationNote ? `<div class="card-excerpt">👁 ${escHtml(item.observationNote)}</div>` : ''}
      ${item.myIdea ? `<div class="journal-improve">💡 ${escHtml(item.myIdea)}</div>` : ''}`;
  } else {
    // legacy items (before redesign)
    bodyHtml = `
      <div class="journal-title">${escHtml(item.title||'')}</div>
      ${item.content ? `<div class="card-excerpt">${escHtml(item.content)}</div>` : ''}
      ${item.improvement ? `<div class="journal-improve">💡 ${escHtml(item.improvement)}</div>` : ''}`;
  }

  const photos = item.photos || [];
  const photoStrip = photos.length ? `
    <div class="journal-photo-strip">
      ${photos.slice(0,5).map((url,i) => `<img class="journal-strip-img" src="${escHtml(url)}" alt="수업사진" onclick="event.stopPropagation();openPhotoViewer('${escHtml(url)}')" />`).join('')}
      ${photos.length > 5 ? `<div class="journal-strip-more">+${photos.length - 5}</div>` : ''}
    </div>` : '';

  return `<div class="journal-card" data-jtype="${jtype}" onclick="openJournalEditModal('${item.id}')">
    <div class="journal-head">
      <div>
        <div class="journal-date">${fmtDate(item.date)}</div>
        <div class="journal-client">${escHtml(item.client||'기관 미입력')}</div>
      </div>
      <span class="journal-type-badge ${typeCls[jtype]||''}">${typeLabel[jtype]||'수업'}</span>
      ${incomeHtml}
      <button class="btn-icon del" onclick="event.stopPropagation();deleteEntry('journal','${item.id}')">🗑</button>
    </div>
    ${bodyHtml}
    ${photoStrip}
  </div>`;
}

// ── 수업일지 모달 ─────────────────────────────
function openJournalEditModal(itemId) {
  const item = (state.data.sections.journal||[]).find(x => x.id === itemId);
  if (!item) return;
  state.editingId = itemId;
  openJournalModal(item);
}

function openJournalModal(existingItem) {
  const isEdit = !!existingItem;
  const jtype  = existingItem?.journalType || 'multi';

  // 사진 상태 초기화 (기존 항목이면 기존 사진 복원)
  journalPendingPhotos = (existingItem?.photos || []).map(url => ({ url, name: url.split('/').pop() }));

  document.getElementById('modalHeading').textContent = isEdit ? '📖 수업일지 수정' : '📖 수업일지 추가';
  document.getElementById('modalBody').innerHTML = `
    <div class="jtype-bar">
      <button class="jtype-btn ${jtype==='multi'   ?'active':''}" data-jtype="multi"   onclick="switchJournalType('multi')">📅 다차시</button>
      <button class="jtype-btn ${jtype==='special' ?'active':''}" data-jtype="special" onclick="switchJournalType('special')">⚡ 특강</button>
      <button class="jtype-btn ${jtype==='assist'  ?'active':''}" data-jtype="assist"  onclick="switchJournalType('assist')">🤝 보조강사</button>
    </div>
    <div id="journalFormBody"></div>`;

  switchJournalType(jtype, existingItem);

  // 기존 사진 썸네일 복원
  if (journalPendingPhotos.length) {
    const preview = document.getElementById('journalPhotoPreview');
    if (preview) {
      journalPendingPhotos.forEach((photo, i) => {
        const tempId = `existing_${i}`;
        const el = document.createElement('div');
        el.className = 'journal-photo-thumb';
        el.id = tempId;
        el.dataset.url = photo.url;
        el.innerHTML = `<img src="${escHtml(photo.url)}" alt="수업사진" /><button class="journal-photo-del" onclick="removeJournalPhoto('${tempId}')">✕</button>`;
        preview.appendChild(el);
      });
    }
  }

  document.getElementById('modalSave').textContent = isEdit ? '수정' : '저장';
  document.getElementById('modalSave').onclick = saveJournalEntry;
  if (isEdit) document.getElementById('modalSave').dataset.sid = 'journal';
  document.getElementById('modalCancel').onclick = () => { closeModal(); resetModalSaveBtn(); };
  document.getElementById('modalClose').onclick  = () => { closeModal(); resetModalSaveBtn(); };
  document.getElementById('entryOverlay').style.display = 'flex';
}

function switchJournalType(jtype, item) {
  document.querySelectorAll('.jtype-btn').forEach(b => b.classList.toggle('active', b.dataset.jtype === jtype));
  const v  = (f) => item?.[f] !== undefined ? escHtml(String(item[f])) : '';
  const td = today();
  let html = '';

  if (jtype === 'multi') {
    html = `
      <div class="field-row-2">
        <div class="field"><label class="field-label">수업 날짜 *</label>
          <input id="jf_date" class="field-input" type="date" value="${v('date')||td}" /></div>
        <div class="field"><label class="field-label">기관명 *</label>
          <input id="jf_client" class="field-input" type="text" value="${v('client')}" placeholder="OO중학교" /></div>
      </div>
      <div class="field"><label class="field-label">프로그램명 *</label>
        <input id="jf_programName" class="field-input" type="text" value="${v('programName')}" placeholder="자기이해 프로그램 8차시" /></div>
      <div class="field-row-3">
        <div class="field"><label class="field-label">차시</label>
          <input id="jf_sessionNum" class="field-input" type="number" value="${v('sessionNum')}" placeholder="3" min="1" /></div>
        <div class="field"><label class="field-label">전체 차시</label>
          <input id="jf_totalSessions" class="field-input" type="number" value="${v('totalSessions')}" placeholder="8" min="1" /></div>
        <div class="field"><label class="field-label">참여 인원</label>
          <input id="jf_participants" class="field-input" type="number" value="${v('participants')}" placeholder="30" /></div>
      </div>
      <div class="field"><label class="field-label">수업 주제</label>
        <input id="jf_topic" class="field-input" type="text" value="${v('topic')}" placeholder="오늘 차시의 주제" /></div>
      <div class="field"><label class="field-label">수업 흐름</label>
        <textarea id="jf_flow" class="field-input" rows="3" placeholder="도입 → 전개 → 마무리...">${v('flow')}</textarea></div>
      <div class="field"><label class="field-label">수강생 반응</label>
        <textarea id="jf_response" class="field-input" rows="3" placeholder="학생 반응, 인상적인 순간...">${v('response')}</textarea></div>
      <div class="field"><label class="field-label">개선점</label>
        <textarea id="jf_improvement" class="field-input" rows="2" placeholder="다음엔 이렇게...">${v('improvement')}</textarea></div>
      <div class="field"><label class="field-label">다음 차시 준비</label>
        <input id="jf_nextPrepNote" class="field-input" type="text" value="${v('nextPrepNote')}" placeholder="준비물, 수정사항 등" /></div>
      <div class="field"><label class="field-label">수입 (원)</label>
        <input id="jf_income" class="field-input" type="number" value="${v('income')}" placeholder="강의료" /></div>
      ${journalPhotoUploadHtml()}`;
  } else if (jtype === 'special') {
    html = `
      <div class="field-row-2">
        <div class="field"><label class="field-label">날짜 *</label>
          <input id="jf_date" class="field-input" type="date" value="${v('date')||td}" /></div>
        <div class="field"><label class="field-label">기관명 *</label>
          <input id="jf_client" class="field-input" type="text" value="${v('client')}" placeholder="OO고등학교" /></div>
      </div>
      <div class="field"><label class="field-label">강의 주제 *</label>
        <input id="jf_topic" class="field-input" type="text" value="${v('topic')}" placeholder="오늘 강의의 주제" /></div>
      <div class="field-row-2">
        <div class="field"><label class="field-label">참여 인원</label>
          <input id="jf_participants" class="field-input" type="number" value="${v('participants')}" placeholder="50" /></div>
        <div class="field"><label class="field-label">강의 시간</label>
          <select id="jf_duration" class="field-input">
            ${['45분','50분','60분','90분','120분','기타'].map(o=>`<option value="${o}" ${v('duration')===o?'selected':''}>${o}</option>`).join('')}
          </select></div>
      </div>
      <div class="field"><label class="field-label">수강생 반응</label>
        <textarea id="jf_response" class="field-input" rows="3" placeholder="반응, 분위기, 좋았던 것...">${v('response')}</textarea></div>
      <div class="field"><label class="field-label">재활용 가능 여부</label>
        <select id="jf_reusable" class="field-input">
          ${['재활용 가능','수정 후 가능','새로 준비 필요'].map(o=>`<option value="${o}" ${v('reusable')===o?'selected':''}>${o}</option>`).join('')}
        </select></div>
      <div class="field"><label class="field-label">메모</label>
        <textarea id="jf_memo" class="field-input" rows="2" placeholder="기타 메모...">${v('memo')}</textarea></div>
      <div class="field"><label class="field-label">수입 (원)</label>
        <input id="jf_income" class="field-input" type="number" value="${v('income')}" placeholder="강의료" /></div>
      ${journalPhotoUploadHtml()}`;
  } else if (jtype === 'assist') {
    html = `
      <div class="field-row-2">
        <div class="field"><label class="field-label">날짜 *</label>
          <input id="jf_date" class="field-input" type="date" value="${v('date')||td}" /></div>
        <div class="field"><label class="field-label">기관명 *</label>
          <input id="jf_client" class="field-input" type="text" value="${v('client')}" placeholder="OO중학교" /></div>
      </div>
      <div class="field-row-2">
        <div class="field"><label class="field-label">주강사</label>
          <input id="jf_mainInstructor" class="field-input" type="text" value="${v('mainInstructor')}" placeholder="홍길동 강사님" /></div>
        <div class="field"><label class="field-label">강의 주제</label>
          <input id="jf_topic" class="field-input" type="text" value="${v('topic')}" placeholder="오늘 강의 주제" /></div>
      </div>
      <div class="field"><label class="field-label">참여 인원</label>
        <input id="jf_participants" class="field-input" type="number" value="${v('participants')}" placeholder="30" /></div>
      <div class="field"><label class="field-label">내 역할 체크리스트</label>
        <div class="role-checklist">
          <label class="role-check-item"><input type="checkbox" id="jf_role_modeum"   ${item?.role_modeum   ? 'checked' : ''} /><span>🤝 모둠활동 지원</span></label>
          <label class="role-check-item"><input type="checkbox" id="jf_role_material" ${item?.role_material ? 'checked' : ''} /><span>📦 활동지·준비물 챙기기</span></label>
          <label class="role-check-item"><input type="checkbox" id="jf_role_photo"    ${item?.role_photo    ? 'checked' : ''} /><span>📷 사진 촬영</span></label>
          <label class="role-check-item"><input type="checkbox" id="jf_role_observe"  ${item?.role_observe  ? 'checked' : ''} /><span>👀 주강사 스타일 관찰·배우기</span></label>
        </div>
      </div>
      <div class="field"><label class="field-label">준비물 메모</label>
        <input id="jf_materialNote" class="field-input" type="text" value="${v('materialNote')}" placeholder="활동지 30부, 색펜 등" /></div>
      <div class="field"><label class="field-label">주강사 관찰 메모</label>
        <textarea id="jf_observationNote" class="field-input" rows="3" placeholder="주강사의 강의 방식, 배운 점...">${v('observationNote')}</textarea></div>
      <div class="field"><label class="field-label">내 강의 아이디어</label>
        <textarea id="jf_myIdea" class="field-input" rows="2" placeholder="이 수업에서 내 강의에 적용하고 싶은 것...">${v('myIdea')}</textarea></div>
      <div class="field"><label class="field-label">수입 (원)</label>
        <input id="jf_income" class="field-input" type="number" value="${v('income')}" placeholder="보조강사 수당" /></div>
      ${journalPhotoUploadHtml()}`;
  }
  document.getElementById('journalFormBody').innerHTML = html;
}

async function saveJournalEntry() {
  const jtype  = document.querySelector('.jtype-btn.active')?.dataset.jtype || 'multi';
  const date   = document.getElementById('jf_date')?.value;
  const client = document.getElementById('jf_client')?.value.trim();
  if (!date)   { toast('⚠️ 날짜를 입력해주세요'); return; }
  if (!client) { toast('⚠️ 기관명을 입력해주세요'); return; }

  const g = id => document.getElementById(id)?.value?.trim() || '';
  const c = id => document.getElementById(id)?.checked || false;

  let entry = { journalType: jtype, date, client, photos: journalPendingPhotos.map(p => p.url) };

  if (jtype === 'multi') {
    const programName = g('jf_programName');
    if (!programName) { toast('⚠️ 프로그램명을 입력해주세요'); return; }
    Object.assign(entry, {
      programName, title: programName,
      sessionNum:    g('jf_sessionNum'),
      totalSessions: g('jf_totalSessions'),
      participants:  g('jf_participants'),
      topic:         g('jf_topic'),
      flow:          g('jf_flow'),
      response:      g('jf_response'),
      improvement:   g('jf_improvement'),
      nextPrepNote:  g('jf_nextPrepNote'),
      income:        g('jf_income'),
    });
  } else if (jtype === 'special') {
    const topic = g('jf_topic');
    if (!topic) { toast('⚠️ 강의 주제를 입력해주세요'); return; }
    Object.assign(entry, {
      topic, title: topic,
      participants: g('jf_participants'),
      duration:     g('jf_duration'),
      response:     g('jf_response'),
      reusable:     g('jf_reusable'),
      memo:         g('jf_memo'),
      income:       g('jf_income'),
    });
  } else if (jtype === 'assist') {
    const topic = g('jf_topic') || '보조강사 활동';
    Object.assign(entry, {
      topic, title: `[보조] ${topic}`,
      mainInstructor:  g('jf_mainInstructor'),
      participants:    g('jf_participants'),
      role_modeum:     c('jf_role_modeum'),
      role_material:   c('jf_role_material'),
      role_photo:      c('jf_role_photo'),
      role_observe:    c('jf_role_observe'),
      materialNote:    g('jf_materialNote'),
      photoLink:       g('jf_photoLink'),
      observationNote: g('jf_observationNote'),
      myIdea:          g('jf_myIdea'),
      income:          g('jf_income'),
    });
  }

  if (!state.data.sections.journal) state.data.sections.journal = [];
  if (state.editingId) {
    const idx = state.data.sections.journal.findIndex(x => x.id === state.editingId);
    if (idx !== -1) state.data.sections.journal[idx] = { ...state.data.sections.journal[idx], ...entry, updatedAt: new Date().toISOString() };
  } else {
    entry.id = newId();
    entry.createdAt = new Date().toISOString();
    state.data.sections.journal.unshift(entry);
  }

  closeModal();
  resetModalSaveBtn();
  renderSection('journal');
  cacheData();
  await syncToGitHub();
}

// ── 수업일지 사진 업로드 ──────────────────────

function journalPhotoUploadHtml() {
  return `
    <div class="field">
      <label class="field-label">수업 사진 <span class="field-hint-inline">선택 즉시 자동 업로드</span></label>
      <div class="journal-photo-section">
        <label class="journal-photo-add-btn" for="jf_photos">📷 사진 추가</label>
        <input type="file" id="jf_photos" accept="image/*" multiple style="display:none"
               onchange="handleJournalPhotoSelect(this)" />
        <div id="journalPhotoPreview" class="journal-photo-preview"></div>
      </div>
    </div>`;
}

async function handleJournalPhotoSelect(input) {
  const files = Array.from(input.files);
  if (!files.length) return;
  const date = document.getElementById('jf_date')?.value || today();
  const ym   = date.slice(0, 7);

  for (const file of files) {
    const tempId  = `photo_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const preview = document.getElementById('journalPhotoPreview');
    if (!preview) return;

    const thumbEl = document.createElement('div');
    thumbEl.className = 'journal-photo-thumb loading';
    thumbEl.id = tempId;
    const localUrl = URL.createObjectURL(file);
    thumbEl.innerHTML = `
      <img src="${localUrl}" alt="${escHtml(file.name)}" />
      <div class="journal-photo-overlay"><div class="spinner-sm"></div></div>
      <button class="journal-photo-del" onclick="removeJournalPhoto('${tempId}')">✕</button>`;
    preview.appendChild(thumbEl);

    try {
      const url = await uploadJournalPhoto(file, ym);
      journalPendingPhotos.push({ url, name: file.name });
      thumbEl.classList.remove('loading');
      thumbEl.querySelector('.journal-photo-overlay')?.remove();
      thumbEl.dataset.url = url;
    } catch (e) {
      thumbEl.classList.add('error');
      const ov = thumbEl.querySelector('.journal-photo-overlay');
      if (ov) ov.innerHTML = '❌';
      toast('⚠️ 사진 업로드 실패: ' + file.name);
    }
  }
  input.value = '';
}

async function uploadJournalPhoto(file, ym) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const base64 = ev.target.result.split(',')[1];
        const safe   = file.name.replace(/[<>:"/\\|?*\n\r]/g, '_');
        const ts     = Date.now();
        const path   = `수업사진/${ym}/${ts}_${safe}`;
        const apiUrl = `https://api.github.com/repos/${state.config.owner}/${state.config.repo}/contents/${encodeURIComponent(path)}`;
        const resp   = await fetch(apiUrl, {
          method: 'PUT',
          headers: ghHeaders(),
          body: JSON.stringify({ message: `수업사진 추가: ${safe}`, content: base64 }),
        });
        if (!resp.ok) throw new Error(await resp.text());
        const data = await resp.json();
        resolve(data.content.download_url);
      } catch (e) { reject(e); }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function removeJournalPhoto(tempId) {
  const el = document.getElementById(tempId);
  if (!el) return;
  const url = el.dataset.url;
  if (url) journalPendingPhotos = journalPendingPhotos.filter(p => p.url !== url);
  el.remove();
}

function openPhotoViewer(url) {
  const overlay = document.createElement('div');
  overlay.className = 'photo-viewer-overlay';
  overlay.innerHTML = `
    <img src="${escHtml(url)}" class="photo-viewer-img" />
    <button class="photo-viewer-close" onclick="this.closest('.photo-viewer-overlay').remove()">✕</button>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ── 클라이언트 리스트 ─────────────────────────
function renderClientList(items, s) {
  if (!items.length) return `<div class="empty-state"><div class="empty-icon">${s.icon}</div><p>아직 기록이 없어요.</p></div>`;
  return `<div class="card-grid">${items.map(item => `
    <div class="entry-card instructor" onclick="openEditModal('clients','${item.id}')">
      <div class="card-title">${escHtml(item.title)}</div>
      <div class="card-meta">
        ${item.type ? `<span class="card-badge">${escHtml(item.type)}</span>` : ''}
      </div>
      ${item.contact ? `<div class="client-row">👤 ${escHtml(item.contact)}</div>` : ''}
      ${item.phone   ? `<div class="client-row">📞 ${escHtml(item.phone)}</div>` : ''}
      ${item.history ? `<div class="card-excerpt" style="margin-top:8px">${escHtml(item.history)}</div>` : ''}
      <div class="card-footer">
        <span class="card-date">${fmtDate(item.createdAt)}</span>
        <button class="btn-icon del" onclick="event.stopPropagation();deleteEntry('clients','${item.id}')">🗑</button>
      </div>
    </div>`).join('')}</div>`;
}

// ── 일반 카드 ─────────────────────────────────
function renderCard(item, s) {
  const group = s.group;

  let meta = '';
  if (item.type)    meta += `<span class="card-badge ${item.type==='수입'?'income':item.type==='지출'?'expense':''}">${escHtml(item.type)}</span>`;
  if (item.horizon) meta += `<span class="card-badge">${escHtml(item.horizon)}</span>`;
  if (item.status)  {
    const cls = ['달성','완료'].includes(item.status)?'done': item.status==='진행중'?'active':'hold';
    meta += `<span class="card-badge ${cls}">${escHtml(item.status)}</span>`;
  }
  if (item.field)  meta += `<span class="card-badge">${escHtml(item.field)}</span>`;
  if (item.target) meta += `<span class="card-badge">${escHtml(item.target)}</span>`;

  const excerpt = item.content || item.insight || item.description ||
                  item.memo || item.data || item.interpretation || '';

  const tags = parseTags(item.tags);
  const tagsHtml = tags.length
    ? `<div class="tags-wrap">${tags.map(t=>`<span class="tag">${escHtml(t)}</span>`).join('')}</div>` : '';

  const linkHtml = (item.link||item.url)
    ? `<a href="${escHtml(item.link||item.url)}" target="_blank" onclick="event.stopPropagation()" class="card-badge" style="text-decoration:none">🔗 링크</a>` : '';

  const amountHtml = s.id === 'finance' && item.amount
    ? `<div class="amount-display ${item.type==='수입'?'amount-income':'amount-expense'}">
        ${item.type==='수입'?'+':'-'}${Number(item.amount).toLocaleString('ko-KR')}원
       </div>` : '';

  return `<div class="entry-card ${group}" onclick="openEditModal('${s.id}','${item.id}')">
    <div class="card-title">${escHtml(item.title||'(제목 없음)')}</div>
    ${meta||linkHtml ? `<div class="card-meta">${meta}${linkHtml}</div>` : ''}
    ${amountHtml}
    ${excerpt ? `<div class="card-excerpt">${escHtml(excerpt)}</div>` : ''}
    ${tagsHtml}
    <div class="card-footer">
      <span class="card-date">${fmtDate(item.date||item.createdAt)}</span>
      <button class="btn-icon del" onclick="event.stopPropagation();deleteEntry('${s.id}','${item.id}')">🗑</button>
    </div>
  </div>`;
}

// ── 모달 ──────────────────────────────────────
function openAddModal() {
  const s = SECTIONS.find(x => x.id === state.currentSection);
  if (!s?.group) return;
  if (s.id === 'journal') { openJournalModal(null); return; }
  state.editingId = null;
  document.getElementById('modalHeading').textContent = `${s.icon} ${s.label} 추가`;
  document.getElementById('modalBody').innerHTML = buildForm(state.currentSection, {});
  // 날짜 기본값
  const de = document.getElementById('f_date');
  if (de) de.value = today();
  document.getElementById('entryOverlay').style.display = 'flex';
}

function openEditModal(sid, itemId) {
  if (sid === 'journal') { openJournalEditModal(itemId); return; }
  const item = (state.data.sections[sid]||[]).find(x => x.id === itemId);
  if (!item) return;
  state.editingId = itemId;
  // 임시로 섹션 전환 없이 현재 섹션 기억
  const prevSid = state.currentSection;
  state.currentSection = sid;
  const s = SECTIONS.find(x => x.id === sid);
  document.getElementById('modalHeading').textContent = `${s.icon} ${s.label} 수정`;
  document.getElementById('modalBody').innerHTML = buildForm(sid, item);
  state.currentSection = prevSid; // 되돌리기 (saveEntry 시 sid 별도 참조)
  document.getElementById('entryOverlay').style.display = 'flex';
  document.getElementById('modalSave').dataset.sid = sid;
}

function buildForm(sid, values) {
  const fields = FORMS[sid] || [];
  return fields.map(f => {
    const val = values[f.name] !== undefined ? escHtml(String(values[f.name])) : '';
    if (f.type === 'select') {
      const opts = f.options.map(o =>
        `<option value="${escHtml(o)}" ${values[f.name]===o?'selected':''}>${escHtml(o)}</option>`
      ).join('');
      return `<div class="field"><label class="field-label">${f.label}${f.required?' *':''}</label>
        <select id="f_${f.name}" class="field-input">${opts}</select></div>`;
    }
    if (f.type === 'textarea') {
      const rows = f.rows || 4;
      return `<div class="field"><label class="field-label">${f.label}${f.required?' *':''}</label>
        <textarea id="f_${f.name}" class="field-input" rows="${rows}" placeholder="${escHtml(f.placeholder||'')}">${val}</textarea></div>`;
    }
    return `<div class="field"><label class="field-label">${f.label}${f.required?' *':''}</label>
      <input id="f_${f.name}" class="field-input" type="${f.type}" placeholder="${escHtml(f.placeholder||'')}" value="${val}" /></div>`;
  }).join('');
}

function closeModal() {
  document.getElementById('entryOverlay').style.display = 'none';
  state.editingId = null;
}

async function saveEntry() {
  // 수정 시 sid는 modalSave의 dataset에서, 추가 시 currentSection에서
  const sid = state.editingId
    ? (document.getElementById('modalSave').dataset.sid || state.currentSection)
    : state.currentSection;

  const fields = FORMS[sid] || [];
  const entry = {};
  for (const f of fields) {
    const el = document.getElementById(`f_${f.name}`);
    if (!el) continue;
    entry[f.name] = el.value.trim();
    if (f.required && !entry[f.name]) {
      toast(`⚠️ '${f.label}'을(를) 입력해주세요`);
      el.focus();
      return;
    }
  }

  if (state.editingId) {
    const items = state.data.sections[sid];
    const idx = items.findIndex(x => x.id === state.editingId);
    if (idx !== -1) items[idx] = { ...items[idx], ...entry, updatedAt: new Date().toISOString() };
  } else {
    entry.id = newId();
    entry.createdAt = new Date().toISOString();
    if (!state.data.sections[sid]) state.data.sections[sid] = [];
    state.data.sections[sid].unshift(entry);
  }

  closeModal();
  // 현재 섹션 유지하면서 다시 렌더
  if (sid === state.currentSection) renderSection(sid);
  else if (state.currentSection === 'home') renderHome();
  cacheData();
  await syncToGitHub();
}

// ── 삭제 ──────────────────────────────────────
function deleteEntry(sid, itemId) {
  const item = (state.data.sections[sid]||[]).find(x => x.id === itemId);
  if (!item) return;
  document.getElementById('confirmTitle').textContent = '항목 삭제';
  document.getElementById('confirmMsg').textContent = `"${item.title || item.client || '이 항목'}"을 삭제할까요?`;
  document.getElementById('confirmOverlay').style.display = 'flex';
  document.getElementById('confirmYes').onclick = async () => {
    state.data.sections[sid] = (state.data.sections[sid]||[]).filter(x => x.id !== itemId);
    document.getElementById('confirmOverlay').style.display = 'none';
    renderSection(sid);
    cacheData();
    await syncToGitHub();
    toast('삭제됐습니다');
  };
  document.getElementById('confirmNo').onclick = () => {
    document.getElementById('confirmOverlay').style.display = 'none';
  };
}

// ── GitHub 동기화 ─────────────────────────────
async function syncToGitHub() {
  showSaving();
  try {
    await ghSave(state.data);
    cacheData();
    toast('✅ 저장됐습니다');
  } catch (e) {
    toast(`⚠️ GitHub 저장 실패: ${e.message}`);
  } finally {
    hideSaving();
  }
}

// ── 설정 모달 ─────────────────────────────────
function openSettings() {
  const c = state.config;
  document.getElementById('sOwner').value = c.owner;
  document.getElementById('sRepo').value  = c.repo;
  document.getElementById('sToken').value = c.token;
  const total = Object.values(state.data.sections).reduce((s,a)=>s+a.length,0);
  document.getElementById('syncStatus').textContent =
    `총 ${total}개 항목 · SHA: ${state.sha ? state.sha.slice(0,8)+'...' : '없음'}`;
  document.getElementById('settingsOverlay').style.display = 'flex';
  closeSidebar();
}
function closeSettings() { document.getElementById('settingsOverlay').style.display = 'none'; }

// ── 앱 시작 ───────────────────────────────────
async function initApp() {
  const owner = document.getElementById('cfgOwner').value.trim();
  const repo  = document.getElementById('cfgRepo').value.trim();
  const token = document.getElementById('cfgToken').value.trim();
  const errEl = document.getElementById('setupErr');
  const btn   = document.getElementById('setupBtn');

  if (!owner || !repo || !token) { errEl.textContent = '모든 항목을 입력해주세요.'; return; }

  btn.textContent = '연결 중...';
  btn.disabled = true;
  errEl.textContent = '';

  try {
    saveConfig({ owner, repo, token });
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { 'Authorization': `token ${token}` }
    });
    if (!repoRes.ok) throw new Error('저장소를 찾을 수 없습니다. 사용자명·저장소명·토큰을 확인해주세요.');

    let data = await ghLoad();
    if (!data) { data = emptyData(); await ghSave(data); }
    // 기존 데이터에 새 섹션/필드 누락 시 추가
    SECTIONS.filter(s => s.group).forEach(s => {
      if (!data.sections[s.id]) data.sections[s.id] = [];
    });
    if (!data.agents)   data.agents = [];
    if (!data.missions) data.missions = [];
    state.data = data;
    cacheData();
    startApp();
  } catch (e) {
    errEl.textContent = e.message;
    btn.textContent = '시작하기';
    btn.disabled = false;
  }
}

function startApp() {
  document.getElementById('setupScreen').style.display = 'none';
  document.getElementById('appScreen').style.display = 'flex';
  buildNav();
  renderHome();
}

// ── 이벤트 ────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('setupBtn').onclick = initApp;
  document.getElementById('cfgToken').addEventListener('keydown', e => { if (e.key==='Enter') initApp(); });

  document.getElementById('menuBtn').onclick      = openSidebar;
  document.getElementById('sidebarClose').onclick = closeSidebar;
  document.getElementById('overlay').onclick      = closeSidebar;
  document.getElementById('settingsBtn').onclick  = openSettings;
  document.getElementById('addBtn').onclick       = openAddModal;

  document.getElementById('modalClose').onclick  = closeModal;
  document.getElementById('modalCancel').onclick = closeModal;
  document.getElementById('modalSave').onclick   = saveEntry;

  document.getElementById('settingsClose').onclick = closeSettings;
  document.getElementById('saveSettingsBtn').onclick = async () => {
    const owner = document.getElementById('sOwner').value.trim();
    const repo  = document.getElementById('sRepo').value.trim();
    const token = document.getElementById('sToken').value.trim();
    if (!owner||!repo||!token) { toast('⚠️ 모든 항목을 입력하세요'); return; }
    saveConfig({ owner, repo, token });
    closeSettings();
    toast('✅ 설정 저장됐습니다');
  };
  document.getElementById('resetBtn').onclick = () => {
    if (confirm('모든 설정과 캐시를 초기화할까요?\n(GitHub의 데이터는 유지됩니다)')) {
      localStorage.clear(); location.reload();
    }
  };

  document.querySelectorAll('.bnav-item').forEach(btn => {
    btn.onclick = () => navigate(btn.dataset.nav);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal(); closeSettings();
      document.getElementById('confirmOverlay').style.display = 'none';
    }
  });

  // 기존 설정 확인
  const cfg = loadConfig();
  if (cfg) {
    state.config = cfg;
    loadCache();
    if (state.data) {
      // 새 섹션 누락 보완
      SECTIONS.filter(s=>s.group).forEach(s => {
        if (!state.data.sections[s.id]) state.data.sections[s.id] = [];
      });
      if (!state.data.visionValues)    state.data.visionValues = [];
      if (!state.data.visionQuestions) state.data.visionQuestions = [];
      startApp();
      // 백그라운드 동기화
      ghLoad().then(fresh => {
        if (fresh) {
          SECTIONS.filter(s=>s.group).forEach(s => { if (!fresh.sections[s.id]) fresh.sections[s.id] = []; });
          state.data = fresh; cacheData();
          if (state.currentSection === 'home') renderHome();
        }
      }).catch(() => {});
    } else {
      ghLoad().then(data => {
        state.data = data || emptyData();
        SECTIONS.filter(s=>s.group).forEach(s => { if (!state.data.sections[s.id]) state.data.sections[s.id] = []; });
        if (!state.data.visionValues)    state.data.visionValues = [];
        if (!state.data.visionQuestions) state.data.visionQuestions = [];
        cacheData(); startApp();
      }).catch(e => {
        document.getElementById('setupErr').textContent = '데이터 로드 실패: ' + e.message;
      });
    }
  }
});
