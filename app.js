'use strict';

// ── 섹션 정의 ─────────────────────────────────
const SECTIONS = [
  { id: 'home', icon: '🏠', label: '홈', group: null },

  // 개인
  { id: 'insight',  icon: '📓', label: '통찰노트',   group: 'personal' },
  { id: 'checkin',  icon: '🌡️', label: '자기점검',   group: 'personal' },
  { id: 'finance',  icon: '💰', label: '재정',         group: 'personal' },
  { id: 'vision',   icon: '🎯', label: '비전 & 목표', group: 'personal' },

  // 강사
  { id: 'cabinet',   icon: '🗄️', label: '강의 캐비닛',    group: 'instructor' },
  { id: 'journal',   icon: '📖', label: '수업일지',        group: 'instructor' },
  { id: 'actlib',    icon: '🎭', label: '활동 라이브러리', group: 'instructor' },
  { id: 'clients',   icon: '🤝', label: '클라이언트 노트', group: 'instructor' },
  { id: 'portfolio', icon: '🏆', label: '포트폴리오',      group: 'instructor' },

  // 연구소
  { id: 'trends',    icon: '📈', label: '진로 트렌드',    group: 'lab', agentMission: 'trend'  },
  { id: 'policy',    icon: '🏛️', label: '정책 & 입시',    group: 'lab', agentMission: 'policy' },
  { id: 'datalab',   icon: '🔢', label: '데이터 노트',    group: 'lab', agentMission: 'trend'  },
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
    { name: 'type',   label: '유형',       type: 'select', options: ['수입', '지출'], required: true },
    { name: 'title',  label: '항목',       type: 'text',   required: true, placeholder: '강의료, 교통비 등' },
    { name: 'amount', label: '금액 (원)',  type: 'number', placeholder: '500000' },
    { name: 'date',   label: '날짜',       type: 'date' },
    { name: 'memo',   label: '메모',       type: 'textarea', placeholder: '추가 메모...' },
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
    { name: 'type',        label: '유형',            type: 'select',   options: ['PPT', '강의계획서', '공문서식', '교안', '핸드아웃', '기타'] },
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

  // ── 연구소 ──
  trends: [
    { name: 'title',   label: '제목', type: 'text',     required: true, placeholder: '트렌드 제목' },
    { name: 'field',   label: '분야', type: 'text',     placeholder: 'AI, 보건의료, 교육 등' },
    { name: 'content', label: '내용', type: 'textarea', placeholder: '핵심 내용...' },
    { name: 'source',  label: '출처', type: 'text',     placeholder: '매체명, 보고서명 등' },
    { name: 'date',    label: '날짜', type: 'date' },
  ],
  policy: [
    { name: 'title',   label: '제목', type: 'text',     required: true, placeholder: '정책/입시 변화 제목' },
    { name: 'type',    label: '유형', type: 'select',   options: ['교육정책', '대입변화', '학과개편', '취업정책', '장학금', '기타'] },
    { name: 'content', label: '내용', type: 'textarea', placeholder: '핵심 내용...' },
    { name: 'source',  label: '출처', type: 'text',     placeholder: '교육부, 한국교육과정평가원 등' },
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
    id: 'content',
    label: '📝 콘텐츠 제작',
    desc: '강의안·활동지·대본 등 직접 쓸 수 있는 콘텐츠를 만든다',
    defaultAgents: ['stem', 'writer', 'globalcollector'],
    defaultTarget: 'contentbank',
    example: `고등학교 1학년 대상 자기이해 첫 수업 강의안을 만들어줘. 50분 기준, 도입(10분)·전개(30분)·마무리(10분) 구성. 학생 활동지 초안도 포함.`,
  },
];

// ── 자료DB 폴더 매핑 (GitHub 저장 경로) ──────
const DB_FOLDERS = {
  sourcing: '자료DB/현장소스발굴',
  video:    '자료DB/영상자료',
  game:     '자료DB/게임놀이',
  trend:    '자료DB/시장트렌드',
  policy:   '자료DB/정책입시',
  content:  '자료DB/콘텐츠제작',
  script:   '자료DB/PPT대본',
  actlib:   '자료DB/현장소스발굴',
  trends:   '자료DB/시장트렌드',
  datalab:  '자료DB/데이터노트',
  cabinet:  '자료DB/강의캐비닛',
  default:  '자료DB/기타',
};

// 결과 저장 위치 옵션
const SAVE_TARGETS = [
  { id: 'actlib',    label: '활동 라이브러리' },
  { id: 'cabinet',   label: '강의 캐비닛' },
  { id: 'collection',label: '수집함' },
  { id: 'trends',    label: '진로 트렌드' },
  { id: 'policy',    label: '정책 & 입시' },
  { id: 'datalab',   label: '데이터 노트' },
  { id: 'ideas',     label: '아이디어' },
];

// ── 데이터 ────────────────────────────────────
function emptyData() {
  const sections = {};
  SECTIONS.forEach(s => { if (s.group) sections[s.id] = []; });
  return {
    version: 2,
    sections,
    agents: [],      // 영입 에이전트 (사용자 정의)
    missions: [],    // 미션 실행 이력
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

// ── 섹션 렌더 ─────────────────────────────────
function renderSection(sid) {
  const s = SECTIONS.find(x => x.id === sid);
  const items = [...(state.data.sections[sid] || [])].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  document.getElementById('pageTitle').textContent = s.label;
  document.getElementById('addBtn').style.display = '';

  let html = `<div class="section-page-header">
    <div><h2>${s.icon} ${s.label}</h2><p>${items.length}개 항목</p></div>
  </div>`;

  // 에이전트 검색 카드 (agentMission이 있는 섹션)
  if (s.agentMission) html += renderAgentSearchCard(sid, s.agentMission);

  // 특수 섹션
  if (sid === 'finance')  html += renderFinanceSummary(items);
  if (sid === 'agentlab')  { document.getElementById('pageContent').innerHTML = renderAgentLab();  return; }
  if (sid === 'scriptgen') { document.getElementById('pageContent').innerHTML = renderScriptGen(); return; }
  if (sid === 'dbviewer')  { renderDBViewer(); return; }
  if (sid === 'checkin')  { document.getElementById('pageContent').innerHTML = html + renderCheckinList(items, s); return; }
  if (sid === 'journal')  { document.getElementById('pageContent').innerHTML = html + renderJournalList(items, s); return; }
  if (sid === 'clients')  { document.getElementById('pageContent').innerHTML = html + renderClientList(items, s); return; }

  if (items.length === 0) {
    html += `<div class="empty-state"><div class="empty-icon">${s.icon}</div><p>아직 항목이 없어요.</p></div>`;
  } else {
    html += `<div class="card-grid">${items.map(item => renderCard(item, s)).join('')}</div>`;
  }
  document.getElementById('pageContent').innerHTML = html;
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

async function loadDBFolderView(idx) {
  const folder = DB_FOLDER_LIST[idx];
  const listEl = document.getElementById('dbFileList');
  try {
    const files = await loadDBFolder(folder.path);
    if (!files.length) {
      listEl.innerHTML = `<div class="empty-state"><div class="empty-icon">📭</div>
        <p>아직 저장된 자료가 없어요.<br>에이전트 미션을 실행하면 자동으로 저장됩니다.</p></div>`;
      return;
    }
    listEl.innerHTML = files.map(f => {
      const displayName = f.name.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}_/, '');
      const dateMatch = f.name.match(/^(\d{4}-\d{2}-\d{2})/);
      const date = dateMatch ? dateMatch[1] : '';
      return `<div class="db-file-row" data-path="${escHtml(f.path)}" data-sha="${escHtml(f.sha)}">
        <div class="db-file-info">
          <div class="db-file-name">📄 ${escHtml(displayName)}</div>
          ${date ? `<div class="db-file-date">${date}</div>` : ''}
        </div>
        <div class="db-file-actions">
          <button class="btn-sm btn-secondary" onclick="viewDBFileModal('${escHtml(f.path)}','${escHtml(displayName)}')">보기</button>
          <button class="btn-sm btn-primary" onclick="docxFromDB('${escHtml(f.path)}','${escHtml(displayName)}')">DOCX</button>
          <button class="btn-sm btn-danger" onclick="confirmDeleteDB('${escHtml(f.path)}','${escHtml(f.sha)}')">🗑</button>
        </div>
      </div>`;
    }).join('');
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
  };
  const descMap = {
    trends:  '에이전트가 최신 진로 트렌드를 검색해서 이곳에 자동으로 저장합니다.',
    policy:  '에이전트가 교육정책·대입 변화를 검색해서 이곳에 자동으로 저장합니다.',
    datalab: '에이전트가 직업시장·통계 데이터를 검색해서 이곳에 자동으로 저장합니다.',
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

// ── 재정 요약 ─────────────────────────────────
function renderFinanceSummary(items) {
  const income  = items.filter(i => i.type==='수입').reduce((s,i) => s+(Number(i.amount)||0), 0);
  const expense = items.filter(i => i.type==='지출').reduce((s,i) => s+(Number(i.amount)||0), 0);
  const fmt = n => n.toLocaleString('ko-KR');
  return `<div class="finance-summary">
    <div class="finance-box"><div class="finance-box-label">수입</div><div class="finance-box-num income">+${fmt(income)}원</div></div>
    <div class="finance-box"><div class="finance-box-label">지출</div><div class="finance-box-num expense">-${fmt(expense)}원</div></div>
    <div class="finance-box"><div class="finance-box-label">잔액</div><div class="finance-box-num balance">${fmt(income-expense)}원</div></div>
  </div>`;
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
  if (!items.length) return `<div class="empty-state"><div class="empty-icon">${s.icon}</div><p>아직 기록이 없어요.</p></div>`;
  return `<div class="journal-list">${items.map(item => `
    <div class="journal-card" onclick="openEditModal('journal','${item.id}')">
      <div class="journal-head">
        <div>
          <div class="journal-date">${fmtDate(item.date)}</div>
          <div class="journal-client">${escHtml(item.client||'기관 미입력')}</div>
        </div>
        ${item.participants ? `<span class="journal-pax">👥 ${escHtml(item.participants)}명</span>` : ''}
        <button class="btn-icon del" onclick="event.stopPropagation();deleteEntry('journal','${item.id}')">🗑</button>
      </div>
      <div class="journal-title">${escHtml(item.title||'')}</div>
      ${item.content ? `<div class="card-excerpt">${escHtml(item.content)}</div>` : ''}
      ${item.improvement ? `<div class="journal-improve">💡 ${escHtml(item.improvement)}</div>` : ''}
    </div>`).join('')}</div>`;
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
  state.editingId = null;
  document.getElementById('modalHeading').textContent = `${s.icon} ${s.label} 추가`;
  document.getElementById('modalBody').innerHTML = buildForm(state.currentSection, {});
  // 날짜 기본값
  const de = document.getElementById('f_date');
  if (de) de.value = today();
  document.getElementById('entryOverlay').style.display = 'flex';
}

function openEditModal(sid, itemId) {
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
        cacheData(); startApp();
      }).catch(e => {
        document.getElementById('setupErr').textContent = '데이터 로드 실패: ' + e.message;
      });
    }
  }
});
