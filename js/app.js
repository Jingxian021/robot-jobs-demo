/* Robot Industry Job Board — app logic with i18n */

/* ── i18n ────────────────────────────────────────────── */

const I18N = {
  en: {
    _locale: 'en-US',
    brand: 'Robot Works',
    nav_compare: 'Compare',
    nav_about: 'About',
    nav_jobs: 'Jobs',
    hero_eyebrow: 'Robotics only. No noise.',
    hero_title: 'Find your next role in robotics.',
    hero_body: 'A focused job board for engineers, researchers, and operators building the future of physical intelligence.',
    hero_cta: 'Browse open roles',
    filter_date: 'Date',
    filter_location: 'Location',
    filter_position: 'Position',
    filter_salary: 'Min salary (USD)',
    filter_yoe: 'Experience',
    date_any: 'Any time',
    date_week: 'Past week',
    date_month: 'Past month',
    pos_all: 'All positions',
    sal_any: 'Any',
    yoe_any: 'Any',
    yoe_02: '0–2 years',
    yoe_35: '3–5 years',
    yoe_610: '6–10 years',
    yoe_10p: '10+ years',
    results_jobs: 'jobs',
    results_job: 'job',
    active_filters: 'active',
    reset_filters: 'Reset filters',
    saved_toggle: 'Saved jobs',
    sort_newest: 'Newest first',
    sort_oldest: 'Oldest first',
    save: 'Save',
    saved: 'Saved',
    select: 'Select',
    selected: 'Selected',
    compare: 'Compare',
    closed: 'Closed',
    today: 'Today',
    yesterday: 'Yesterday',
    days_ago: 'd ago',
    empty_title: 'No jobs match these filters.',
    empty_body: 'Try removing one filter to see more results.',
    empty_reset: 'Reset all filters',
    saved_empty_title: 'No saved jobs yet',
    saved_empty_body: 'Tap Save on any job to keep it here for later.',
    compare_count: 'selected',
    compare_clear: 'Clear all',
    compare_open: 'Compare now',
    footer_about: 'A focused job discovery site for the robotics industry. No accounts, no applications, no noise.',
    footer_categories: 'Categories',
    footer_allroles: 'All roles',
    footer_regions: 'Regions',
    footer_employers: 'For employers',
    footer_postjob: 'Post a job',
    footer_policy: 'Listing policy',
    footer_contact: 'Contact',
    footer_demo: '© 2026 Robot Works. Demo only.',
    footer_data: 'Data is synthetic for demonstration purposes.',
    footer_back: 'Back to jobs',
    detail_back: '← Back',
    detail_apply: 'Apply on company site',
    detail_actions: 'Actions',
    detail_select_compare: 'Select for compare',
    detail_status: 'Listing status',
    detail_posted: 'Posted',
    detail_verified: 'Verified',
    detail_report: 'Report outdated info',
    detail_related: 'Related roles',
    detail_about: 'About the role',
    detail_resp: 'Responsibilities',
    detail_req: 'Requirements',
    detail_notfound_title: 'Job not found',
    detail_notfound_body: 'The listing may have been removed or the URL is incorrect.',
    detail_back_jobs: 'Back to jobs',
    detail_no_related: 'No related roles right now.',
    compare_title: 'Compare roles',
    compare_add: 'Add jobs',
    compare_clear: 'Clear all',
    compare_empty_title: 'Compare needs at least two jobs',
    compare_empty_body: 'Select two to four jobs from the list to compare them side by side.',
    compare_browse: 'Browse jobs',
    compare_removed_title: 'Compare needs at least two jobs',
    compare_removed_body: 'You removed one too many. Select more jobs to keep comparing.',
    compare_cleared_title: 'Compare cleared',
    compare_cleared_body: 'Your selection has been removed.',
    compare_note: 'Currency-normalized view is not shown in this demo. Salary reflects the original posting currency and period.',
    tbl_company: 'Company',
    tbl_tags: 'Tags',
    tbl_location: 'Location',
    tbl_salary: 'Salary',
    tbl_requirement: 'Requirement',
    tbl_year: 'Year',
    limit_msg: 'Compare is limited to 4 jobs. Remove one to add another.',
    back_to_top: 'Back to top',
    back_to_jobs: 'Back to jobs',
  },
  ja: {
    _locale: 'ja-JP',
    brand: 'Robot Works',
    nav_compare: '比較',
    nav_about: '概要',
    nav_jobs: '求人',
    hero_eyebrow: 'ロボット工学専門。ノイズなし。',
    hero_title: 'ロボット工学の次のキャリアを見つける。',
    hero_body: '物理知能の未来を築くエンジニア、研究者、運用者のための求人サイト。',
    hero_cta: '求人を見る',
    filter_date: '日付',
    filter_location: '場所',
    filter_position: '職種',
    filter_salary: '最低給与（USD）',
    filter_yoe: '経験年数',
    date_any: 'すべて',
    date_week: '過去1週間',
    date_month: '過去1ヶ月',
    pos_all: 'すべての職種',
    sal_any: '指定なし',
    yoe_any: '指定なし',
    yoe_02: '0–2年',
    yoe_35: '3–5年',
    yoe_610: '6–10年',
    yoe_10p: '10年以上',
    results_jobs: '件の求人',
    results_job: '件の求人',
    active_filters: '件適用中',
    reset_filters: 'フィルターリセット',
    saved_toggle: '保存した求人',
    sort_newest: '新着順',
    sort_oldest: '古い順',
    save: '保存',
    saved: '保存済',
    select: '選択',
    selected: '選択中',
    compare: '比較',
    closed: '募集終了',
    today: '今日',
    yesterday: '昨日',
    days_ago: '日前',
    empty_title: 'フィルターに一致する求人はありません。',
    empty_body: 'フィルターを1つ外してもう一度お試しください。',
    empty_reset: 'すべてリセット',
    saved_empty_title: '保存した求人はまだありません',
    saved_empty_body: '求人の「保存」をタップして後で見返せます。',
    compare_count: '件選択中',
    compare_clear: 'すべてクリア',
    compare_open: '比較する',
    footer_about: 'ロボット工学業界に特化した求人サイト。アカウント不要、応募機能なし、ノイズなし。',
    footer_categories: 'カテゴリー',
    footer_allroles: 'すべての求人',
    footer_regions: '地域',
    footer_employers: '採用担当者向け',
    footer_postjob: '求人を掲載',
    footer_policy: '掲載ポリシー',
    footer_contact: 'お問い合わせ',
    footer_demo: '© 2026 Robot Works. デモ版です。',
    footer_data: 'データはデモンストレーション用の合成データです。',
    footer_back: '求人一覧に戻る',
    detail_back: '← 戻る',
    detail_apply: '企業サイトで応募',
    detail_actions: 'アクション',
    detail_select_compare: '比較に追加',
    detail_status: '掲載状況',
    detail_posted: '掲載日',
    detail_verified: '確認日',
    detail_report: '情報が古い場合に報告',
    detail_related: '関連求人',
    detail_about: '役割について',
    detail_resp: '職務内容',
    detail_req: '応募要件',
    detail_notfound_title: '求人が見つかりません',
    detail_notfound_body: '求人が削除されたか、URLが正しくない可能性があります。',
    detail_back_jobs: '求人一覧に戻る',
    detail_no_related: '関連求人は現在ありません。',
    compare_title: '求人を比較',
    compare_add: '求人を追加',
    compare_clear: 'すべてクリア',
    compare_empty_title: '比較には2件以上の求人が必要です',
    compare_empty_body: 'リストから2〜4件の求人を選択して比較できます。',
    compare_browse: '求人を見る',
    compare_removed_title: '比較には2件以上の求人が必要です',
    compare_removed_body: '削除しすぎました。比較を続けるには求人を追加してください。',
    compare_cleared_title: '比較をクリアしました',
    compare_cleared_body: '選択内容は削除されました。',
    compare_note: 'このデモでは通貨換算ビューは表示しません。給与は元の通貨と期間のまま表示されます。',
    tbl_company: '企業',
    tbl_tags: 'タグ',
    tbl_location: '場所',
    tbl_salary: '給与',
    tbl_requirement: '要件',
    tbl_year: '経験年数',
    limit_msg: '比較は最大4件までです。1件削除してから追加してください。',
    back_to_top: 'トップへ戻る',
    back_to_jobs: '求人一覧に戻る',
  },
  zh: {
    _locale: 'zh-CN',
    brand: 'Robot Works',
    nav_compare: '比较',
    nav_about: '关于',
    nav_jobs: '职位',
    hero_eyebrow: '只做机器人。拒绝噪音。',
    hero_title: '找到你的下一份机器人工作。',
    hero_body: '为构建物理智能未来的工程师、研究员和运营人员打造的招聘平台。',
    hero_cta: '浏览职位',
    filter_date: '日期',
    filter_location: '地点',
    filter_position: '职位类型',
    filter_salary: '最低薪资（USD）',
    filter_yoe: '经验年限',
    date_any: '任意时间',
    date_week: '过去一周',
    date_month: '过去一月',
    pos_all: '所有职位',
    sal_any: '不限',
    yoe_any: '不限',
    yoe_02: '0–2年',
    yoe_35: '3–5年',
    yoe_610: '6–10年',
    yoe_10p: '10年以上',
    results_jobs: '个职位',
    results_job: '个职位',
    active_filters: '个筛选',
    reset_filters: '重置筛选',
    saved_toggle: '已保存',
    sort_newest: '最新优先',
    sort_oldest: '最早优先',
    save: '收藏',
    saved: '已收藏',
    select: '选择',
    selected: '已选',
    compare: '比较',
    closed: '已关闭',
    today: '今天',
    yesterday: '昨天',
    days_ago: '天前',
    empty_title: '没有职位匹配这些筛选条件。',
    empty_body: '尝试移除一个筛选条件以查看更多结果。',
    empty_reset: '重置全部筛选',
    saved_empty_title: '还没有收藏的职位',
    saved_empty_body: '点击任意职位的"收藏"按钮，稍后可在此查看。',
    compare_count: '个已选',
    compare_clear: '全部清除',
    compare_open: '立即比较',
    footer_about: '专注于机器人行业的招聘发现平台。无账号、无投递、无噪音。',
    footer_categories: '分类',
    footer_allroles: '全部职位',
    footer_regions: '地区',
    footer_employers: '雇主入口',
    footer_postjob: '发布职位',
    footer_policy: '发布政策',
    footer_contact: '联系我们',
    footer_demo: '© 2026 Robot Works. 仅作演示。',
    footer_data: '数据为演示用途的合成数据。',
    footer_back: '返回职位列表',
    detail_back: '← 返回',
    detail_apply: '前往企业官网申请',
    detail_actions: '操作',
    detail_select_compare: '加入比较',
    detail_status: '职位状态',
    detail_posted: '发布日期',
    detail_verified: '核实日期',
    detail_report: '报告过时信息',
    detail_related: '相关职位',
    detail_about: '关于此职位',
    detail_resp: '岗位职责',
    detail_req: '任职要求',
    detail_notfound_title: '未找到职位',
    detail_notfound_body: '该职位可能已被删除，或链接有误。',
    detail_back_jobs: '返回职位列表',
    detail_no_related: '暂无相关职位。',
    compare_title: '比较职位',
    compare_add: '添加职位',
    compare_clear: '全部清除',
    compare_empty_title: '比较需要至少两个职位',
    compare_empty_body: '从列表中选择 2–4 个职位进行并排比较。',
    compare_browse: '浏览职位',
    compare_removed_title: '比较需要至少两个职位',
    compare_removed_body: '你移除了太多。请选择更多职位继续比较。',
    compare_cleared_title: '已清除比较',
    compare_cleared_body: '你的选择已被清除。',
    compare_note: '此演示不显示货币换算视图。薪资以原始货币和周期显示。',
    tbl_company: '公司',
    tbl_tags: '标签',
    tbl_location: '地点',
    tbl_salary: '薪资',
    tbl_requirement: '要求',
    tbl_year: '经验',
    limit_msg: '最多比较 4 个职位。请先移除一个再添加。',
    back_to_top: '返回顶部',
    back_to_jobs: '返回职位列表',
  },
  de: {
    _locale: 'de-DE',
    brand: 'Robot Works',
    nav_compare: 'Vergleichen',
    nav_about: 'Über',
    nav_jobs: 'Jobs',
    hero_eyebrow: 'Nur Robotik. Kein Rauschen.',
    hero_title: 'Finde deine nächste Stelle in der Robotik.',
    hero_body: 'Eine Stellenbörse für Ingenieure, Forscher und Operatoren, die die Zukunft der physischen Intelligenz bauen.',
    hero_cta: 'Offene Stellen anzeigen',
    filter_date: 'Datum',
    filter_location: 'Standort',
    filter_position: 'Position',
    filter_salary: 'Mindestgehalt (USD)',
    filter_yoe: 'Erfahrung',
    date_any: 'Jederzeit',
    date_week: 'Letzte Woche',
    date_month: 'Letzter Monat',
    pos_all: 'Alle Positionen',
    sal_any: 'Egal',
    yoe_any: 'Egal',
    yoe_02: '0–2 Jahre',
    yoe_35: '3–5 Jahre',
    yoe_610: '6–10 Jahre',
    yoe_10p: '10+ Jahre',
    results_jobs: 'Stellen',
    results_job: 'Stelle',
    active_filters: 'aktiv',
    reset_filters: 'Filter zurücksetzen',
    saved_toggle: 'Gespeicherte Jobs',
    sort_newest: 'Neueste zuerst',
    sort_oldest: 'Älteste zuerst',
    save: 'Speichern',
    saved: 'Gespeichert',
    select: 'Auswählen',
    selected: 'Ausgewählt',
    compare: 'Vergleichen',
    closed: 'Geschlossen',
    today: 'Heute',
    yesterday: 'Gestern',
    days_ago: 'T. her',
    empty_title: 'Keine Stellen entsprechen diesen Filtern.',
    empty_body: 'Entferne einen Filter, um mehr Ergebnisse zu sehen.',
    empty_reset: 'Alle Filter zurücksetzen',
    saved_empty_title: 'Noch keine gespeicherten Jobs',
    saved_empty_body: 'Tippe auf Speichern bei einem Job, um ihn hier für später aufzubewahren.',
    compare_count: 'ausgewählt',
    compare_clear: 'Alle entfernen',
    compare_open: 'Jetzt vergleichen',
    footer_about: 'Eine Stellenbörse für die Robotikindustrie. Keine Konten, keine Bewerbungen, kein Rauschen.',
    footer_categories: 'Kategorien',
    footer_allroles: 'Alle Stellen',
    footer_regions: 'Regionen',
    footer_employers: 'Für Arbeitgeber',
    footer_postjob: 'Job veröffentlichen',
    footer_policy: 'Richtlinien',
    footer_contact: 'Kontakt',
    footer_demo: '© 2026 Robot Works. Nur Demo.',
    footer_data: 'Daten sind synthetisch zu Demonstrationszwecken.',
    footer_back: 'Zurück zu Jobs',
    detail_back: '← Zurück',
    detail_apply: 'Auf Unternehmensseite bewerben',
    detail_actions: 'Aktionen',
    detail_select_compare: 'Zum Vergleichen auswählen',
    detail_status: 'Anzeigestatus',
    detail_posted: 'Veröffentlicht',
    detail_verified: 'Verifiziert',
    detail_report: 'Veraltete Infos melden',
    detail_related: 'Ähnliche Stellen',
    detail_about: 'Über die Stelle',
    detail_resp: 'Verantwortlichkeiten',
    detail_req: 'Anforderungen',
    detail_notfound_title: 'Stelle nicht gefunden',
    detail_notfound_body: 'Die Anzeige wurde möglicherweise entfernt oder die URL ist falsch.',
    detail_back_jobs: 'Zurück zu Jobs',
    detail_no_related: 'Derzeit keine ähnlichen Stellen.',
    compare_title: 'Stellen vergleichen',
    compare_add: 'Jobs hinzufügen',
    compare_clear: 'Alle entfernen',
    compare_empty_title: 'Vergleich benötigt mindestens zwei Jobs',
    compare_empty_body: 'Wähle zwei bis vier Jobs aus der Liste, um sie nebeneinander zu vergleichen.',
    compare_browse: 'Jobs anzeigen',
    compare_removed_title: 'Vergleich benötigt mindestens zwei Jobs',
    compare_removed_body: 'Du hast zu viele entfernt. Wähle mehr Jobs, um weiter zu vergleichen.',
    compare_cleared_title: 'Vergleich geleert',
    compare_cleared_body: 'Deine Auswahl wurde entfernt.',
    compare_note: 'In dieser Demo wird keine Währungsumrechnung angezeigt. Das Gehalt wird in Originalwährung und -zeitraum angezeigt.',
    tbl_company: 'Unternehmen',
    tbl_tags: 'Tags',
    tbl_location: 'Standort',
    tbl_salary: 'Gehalt',
    tbl_requirement: 'Anforderung',
    tbl_year: 'Jahre',
    limit_msg: 'Vergleich ist auf 4 Jobs begrenzt. Entferne einen, um einen weiteren hinzuzufügen.',
    back_to_top: 'Nach oben',
    back_to_jobs: 'Zurück zu Jobs',
  },
};

let LANG = localStorage.getItem('rb_lang') || 'en';
function t(key) {
  return (I18N[LANG] && I18N[LANG][key]) || I18N.en[key] || key;
}
function localeDate(iso) {
  const loc = (I18N[LANG] && I18N[LANG]._locale) || 'en-US';
  return new Date(iso).toLocaleDateString(loc, { year: 'numeric', month: 'short', day: 'numeric' });
}

/* Apply static text translations */
function applyStaticI18n() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    el.placeholder = t(el.getAttribute('data-i18n-ph'));
  });
  document.documentElement.lang = LANG;
  // Mark active language button
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === LANG);
  });
}

/* ── Data ─────────────────────────────────────────────── */

const STORAGE_KEYS = {
  compare: 'rb_compare_jobs',
  saved: 'rb_saved_jobs',
  lang: 'rb_lang',
};

const POSITIONS = [
  'Mechanical Engineering', 'Electrical Engineering', 'Embedded Systems', 'Firmware',
  'Controls', 'Motion Planning', 'SLAM', 'Perception', 'Machine Learning',
  'Software Infrastructure', 'Product Management', 'Technical Program Management',
  'Operations', 'Testing and Validation', 'Technical Sales', 'Research Scientist',
];

const TAGS_POOL = [
  'Manipulator', 'Autonomous Mobile Robot', 'Humanoid', 'Drone', 'Quadruped',
  'Industrial Automation', 'ROS', 'C++', 'Python', 'ISO 13849',
  'On-site', 'Hybrid', 'Visa Sponsorship', 'Equity', 'Relocation Support',
];

const COMPANIES = [
  { name: 'Figure AI', location: 'Sunnyvale, United States', size: '200–500', careers: 'https://www.figure.ai/careers' },
  { name: 'Boston Dynamics', location: 'Waltham, United States', size: '500+', careers: 'https://www.bostondynamics.com/careers' },
  { name: 'Tesla Robotics', location: 'Palo Alto, United States', size: '10,000+', careers: 'https://www.tesla.com/careers' },
  { name: 'Unitree', location: 'Hangzhou, China', size: '500+', careers: 'https://www.unitree.com/careers' },
  { name: 'DJI', location: 'Shenzhen, China', size: '10,000+', careers: 'https://we.dji.com/en-US/careers' },
  { name: 'ABB Robotics', location: 'Zurich, Switzerland', size: '10,000+', careers: 'https://careers.abb' },
  { name: 'KUKA', location: 'Augsburg, Germany', size: '10,000+', careers: 'https://www.kuka.com/en-us/careers' },
  { name: 'FANUC', location: 'Oshino, Japan', size: '10,000+', careers: 'https://www.fanucamerica.com/careers' },
  { name: 'Agility Robotics', location: 'Albany, United States', size: '200–500', careers: 'https://www.agilityrobotics.com/careers' },
  { name: 'Skydio', location: 'San Mateo, United States', size: '500+', careers: 'https://www.skydio.com/careers' },
  { name: 'Nuro', location: 'Mountain View, United States', size: '500+', careers: 'https://www.nuro.ai/careers' },
  { name: 'Covariant', location: 'Berkeley, United States', size: '200–500', careers: 'https://covariant.ai/careers' },
];

const CURRENCIES = {
  'United States': 'USD', China: 'CNY', Germany: 'EUR', Japan: 'JPY', Switzerland: 'CHF',
};

function generateJobs(count = 24) {
  const jobs = [];
  const titles = {
    'Mechanical Engineering': ['Senior Mechanical Engineer', 'Mechanism Designer', 'Actuator Engineer'],
    'Electrical Engineering': ['Electrical Engineer', 'Power Electronics Engineer', 'PCB Designer'],
    'Embedded Systems': ['Embedded Systems Engineer', 'RTOS Engineer', 'Embedded Architect'],
    'Firmware': ['Firmware Engineer', 'Senior Firmware Developer', 'BSP Engineer'],
    'Controls': ['Controls Engineer', 'MPC Engineer', 'Whole-Body Control Engineer'],
    'Motion Planning': ['Motion Planning Engineer', 'Path Planning Lead', 'Trajectory Optimization Engineer'],
    'SLAM': ['SLAM Engineer', 'Localization Engineer', 'Mapping Lead'],
    'Perception': ['Perception Engineer', 'Computer Vision Engineer', '3D Perception Lead'],
    'Machine Learning': ['Robotics ML Engineer', 'Embodied AI Researcher', 'Learning-Based Control Engineer'],
    'Software Infrastructure': ['Robotics Infrastructure Engineer', 'Simulation Engineer', 'CI/CD Engineer'],
    'Product Management': ['Robotics Product Manager', 'Hardware PM', 'Platform PM'],
    'Technical Program Management': ['Technical Program Manager', 'TPM, Robotics'],
    'Operations': ['Manufacturing Engineer', 'Supply Chain Manager', 'Test Operations Lead'],
    'Testing and Validation': ['Validation Engineer', 'Test Engineer', 'QA Lead'],
    'Technical Sales': ['Solutions Engineer', 'Technical Account Manager'],
    'Research Scientist': ['Robotics Research Scientist', 'Research Engineer', 'Principal Scientist'],
  };

  for (let i = 0; i < count; i++) {
    const category = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
    const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
    const country = company.location.split(', ').pop();
    const currency = CURRENCIES[country] || 'USD';
    const yoeBands = ['0–2', '3–5', '6–10', '10+'];
    const yoe = yoeBands[Math.floor(Math.random() * yoeBands.length)];
    const salaryMin = currency === 'CNY' ? 20000 : 80000;
    const salaryMax = currency === 'CNY' ? 80000 : 250000;
    const salary = Math.floor(salaryMin + Math.random() * (salaryMax - salaryMin));
    const salaryTop = Math.floor(salary * (1.2 + Math.random() * 0.6));
    const postedDaysAgo = Math.floor(Math.random() * 30);
    const posted = new Date();
    posted.setDate(posted.getDate() - postedDaysAgo);
    const tagCount = 2 + Math.floor(Math.random() * 4);
    const tags = [];
    while (tags.length < tagCount) {
      const tag = TAGS_POOL[Math.floor(Math.random() * TAGS_POOL.length)];
      if (!tags.includes(tag)) tags.push(tag);
    }

    jobs.push({
      id: `job-${i + 1}`,
      title: titles[category][Math.floor(Math.random() * titles[category].length)],
      company: company.name,
      location: company.location,
      country,
      category,
      salary, salaryTop, currency,
      period: currency === 'CNY' ? 'month' : 'year',
      yoe,
      posted: posted.toISOString().split('T')[0],
      postedDaysAgo,
      tags,
      closed: Math.random() < 0.05,
      description: `Join the ${company.name} robotics team to advance next-generation autonomous systems. You will own core modules from design through production, collaborate with world-class researchers and engineers, and help ship hardware that operates in real-world environments.`,
      requirements: [
        `Bachelor's or Master's in relevant field`,
        `${yoe} years of experience in ${category}`,
        `Strong fundamentals in robotics, math, and software engineering`,
        `Experience with ${tags.slice(0, 2).join(' and ')}`,
        `Ability to work in fast-paced, cross-functional teams`,
      ],
      applyUrl: `${company.careers}#job-${i + 1}`,
      verified: new Date(posted.getTime() + 2 * 86400000).toISOString().split('T')[0],
    });
  }
  return jobs.sort((a, b) => b.posted.localeCompare(a.posted));
}

const JOBS = generateJobs();

/* ── Storage ──────────────────────────────────────────── */

function getStorage(key) { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } }
function setStorage(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
function getCompareSet() { return new Set(getStorage(STORAGE_KEYS.compare)); }
function setCompareSet(s) { setStorage(STORAGE_KEYS.compare, Array.from(s)); }
function getSavedSet() { return new Set(getStorage(STORAGE_KEYS.saved)); }
function setSavedSet(s) { setStorage(STORAGE_KEYS.saved, Array.from(s)); }
function isInCompare(id) { return getCompareSet().has(id); }
function isSaved(id) { return getSavedSet().has(id); }

function toggleCompare(id) {
  const s = getCompareSet();
  if (s.has(id)) { s.delete(id); }
  else if (s.size < 4) { s.add(id); }
  else { alert(t('limit_msg')); return false; }
  setCompareSet(s);
  return true;
}

function toggleSaved(id) {
  const s = getSavedSet();
  if (s.has(id)) s.delete(id); else s.add(id);
  setSavedSet(s);
  return s.has(id);
}

function clearCompare() { setCompareSet(new Set()); }

/* ── Formatting ───────────────────────────────────────── */

function formatSalary(job) {
  if (!job.salary) return 'Not disclosed';
  const period = job.period === 'month' ? '/mo' : '/yr';
  const min = job.currency === 'JPY' ? job.salary.toLocaleString() : Math.round(job.salary / 1000) + 'k';
  const max = job.currency === 'JPY' ? job.salaryTop.toLocaleString() : Math.round(job.salaryTop / 1000) + 'k';
  return `${job.currency} ${min} – ${max}${period}`;
}

function formatDate(iso) { return localeDate(iso); }

function timeAgo(days) {
  if (days === 0) return t('today');
  if (days === 1) return t('yesterday');
  return `${days}${t('days_ago')}`;
}

/* ── URL state ────────────────────────────────────────── */

function readFiltersFromURL() {
  const p = new URLSearchParams(window.location.search);
  return { date: p.get('date') || '', location: p.get('location') || '', position: p.get('position') || '', salary: p.get('salary') || '', yoe: p.get('yoe') || '' };
}

function writeFiltersToURL(filters) {
  const p = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => { if (v) p.set(k, v); });
  const qs = p.toString();
  window.history.replaceState({}, '', qs ? `?${qs}` : window.location.pathname);
}

/* ── Filtering & sorting ──────────────────────────────── */

function filterJobs(jobs, filters) {
  return jobs.filter((job) => {
    if (filters.date) {
      if (filters.date === 'week' && job.postedDaysAgo > 7) return false;
      if (filters.date === 'month' && job.postedDaysAgo > 30) return false;
    }
    if (filters.location) { const q = filters.location.toLowerCase(); if (!job.location.toLowerCase().includes(q)) return false; }
    if (filters.position && job.category !== filters.position) return false;
    if (filters.salary) { const min = parseInt(filters.salary, 10); if (job.salaryTop < min) return false; }
    if (filters.yoe && job.yoe !== filters.yoe) return false;
    return true;
  });
}

function activeFilterCount(filters) { return Object.values(filters).filter(Boolean).length; }

/* ── Rendering: job row ──────────────────────────────── */

function renderJobRow(job) {
  const compared = isInCompare(job.id);
  const saved = isSaved(job.id);
  return `
    <article class="job-row" data-id="${job.id}">
      <div class="job-main">
        <a href="detail.html?id=${job.id}" class="job-title">${job.title}</a>
        <div class="job-company">${job.company}${job.closed ? ` <span class="badge badge-closed">${t('closed')}</span>` : ''}</div>
      </div>
      <div class="job-cell">${job.location}</div>
      <div class="job-cell">${formatSalary(job)}</div>
      <div class="job-category">${job.category}</div>
      <div class="job-date">${timeAgo(job.postedDaysAgo)}</div>
      <div class="job-actions">
        <button class="action-btn save-btn ${saved ? 'active' : ''}" data-id="${job.id}">${saved ? t('saved') : t('save')}</button>
        <button class="action-btn select-btn ${compared ? 'active' : ''}" data-id="${job.id}">${compared ? t('selected') : t('select')}</button>
        <button class="action-btn compare-btn" data-id="${job.id}">${t('compare')}</button>
      </div>
    </article>`;
}

function renderJobList(container, jobs, callbacks) {
  if (!container) return;
  if (jobs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>${callbacks.savedMode ? t('saved_empty_title') : t('empty_title')}</h3>
        <p>${callbacks.savedMode ? t('saved_empty_body') : t('empty_body')}</p>
        ${callbacks.savedMode ? '' : `<button class="btn btn-outline" id="reset-filters">${t('empty_reset')}</button>`}
      </div>`;
    const r = document.getElementById('reset-filters');
    if (r) r.addEventListener('click', callbacks.resetFilters);
    return;
  }
  container.innerHTML = jobs.map(renderJobRow).join('');
  attachJobActions(container);
}

function attachJobActions(container) {
  container.querySelectorAll('.save-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.id;
      const nowSaved = toggleSaved(id);
      btn.classList.toggle('active', nowSaved);
      btn.textContent = nowSaved ? t('saved') : t('save');
      updateSavedToggle();
    });
  });

  container.querySelectorAll('.select-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.id;
      const ok = toggleCompare(id);
      if (!ok) return;
      btn.classList.toggle('active', isInCompare(id));
      btn.textContent = isInCompare(id) ? t('selected') : t('select');
      updateCompareBar();
      updateHeader();
    });
  });

  container.querySelectorAll('.compare-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.id;
      const s = getCompareSet();
      if (!s.has(id)) {
        if (s.size >= 4) { alert(t('limit_msg')); return; }
        s.add(id);
        setCompareSet(s);
      }
      window.location.href = 'compare.html';
    });
  });
}

/* ── Compare bar ──────────────────────────────────────── */

function updateCompareBar() {
  const bar = document.getElementById('compare-bar');
  if (!bar) return;
  const ids = Array.from(getCompareSet());
  if (ids.length === 0) { bar.classList.remove('visible'); return; }
  bar.classList.add('visible');
  bar.querySelector('.compare-thumbs').innerHTML = ids.map((id) => {
    const job = JOBS.find((j) => j.id === id);
    return job ? `<div class="thumb" title="${job.title}">${job.company.slice(0, 2)}</div>` : '';
  }).join('');
  bar.querySelector('.compare-count').textContent = `${ids.length} ${t('compare_count')}`;
}

function initCompareBar() {
  const bar = document.getElementById('compare-bar');
  if (!bar) return;
  bar.querySelector('.compare-clear')?.addEventListener('click', () => {
    clearCompare();
    updateCompareBar();
    updateHeader();
    document.querySelectorAll('.select-btn').forEach((btn) => {
      btn.classList.remove('active');
      btn.textContent = t('select');
    });
  });
  bar.querySelector('.compare-open')?.addEventListener('click', () => { window.location.href = 'compare.html'; });
  updateCompareBar();
}

function updateHeader() {
  const chip = document.getElementById('compare-chip');
  if (!chip) return;
  const count = getCompareSet().size;
  chip.querySelector('.count').textContent = count;
  chip.classList.toggle('hidden', count === 0);
}

function updateSavedToggle() {
  const btn = document.getElementById('saved-toggle');
  if (!btn) return;
  const count = getSavedSet().size;
  btn.querySelector('.saved-count').textContent = count;
}

/* ── Home page ────────────────────────────────────────── */

let sortOrder = 'desc';

function initHome() {
  const list = document.getElementById('job-list');
  const countEl = document.getElementById('results-count');
  const filterCountEl = document.getElementById('active-filter-count');
  const inputs = {
    date: document.getElementById('filter-date'),
    location: document.getElementById('filter-location'),
    position: document.getElementById('filter-position'),
    salary: document.getElementById('filter-salary'),
    yoe: document.getElementById('filter-yoe'),
  };

  let filters = readFiltersFromURL();
  let savedMode = false;
  Object.entries(inputs).forEach(([key, el]) => { if (el) el.value = filters[key] || ''; });

  function apply() {
    filters = Object.fromEntries(Object.entries(inputs).map(([k, el]) => [k, el?.value || '']));
    writeFiltersToURL(filters);
    let filtered = filterJobs(JOBS, filters);
    filtered = filtered.slice().sort((a, b) =>
      sortOrder === 'desc' ? b.posted.localeCompare(a.posted) : a.posted.localeCompare(b.posted)
    );
    if (savedMode) filtered = filtered.filter((j) => isSaved(j.id));
    renderJobList(list, filtered, { resetFilters, savedMode });
    const n = filtered.length;
    if (countEl) countEl.textContent = `${n} ${n === 1 ? t('results_job') : t('results_jobs')}`;
    if (filterCountEl) filterCountEl.textContent = activeFilterCount(filters) > 0 ? `${activeFilterCount(filters)} ${t('active_filters')}` : '';
    updateCompareBar();
    updateSavedToggle();
  }

  Object.values(inputs).forEach((el) => { el?.addEventListener('input', apply); el?.addEventListener('change', apply); });

  function resetFilters() {
    Object.values(inputs).forEach((el) => { if (el) el.value = ''; });
    savedMode = false;
    document.getElementById('saved-toggle')?.classList.remove('active');
    apply();
  }

  document.getElementById('reset-filters')?.addEventListener('click', resetFilters);

  document.getElementById('sort-toggle')?.addEventListener('click', () => {
    sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    const icon = document.getElementById('sort-icon');
    const label = document.getElementById('sort-label');
    if (icon) icon.textContent = sortOrder === 'desc' ? '↓' : '↑';
    if (label) label.textContent = sortOrder === 'desc' ? t('sort_newest') : t('sort_oldest');
    apply();
  });

  document.getElementById('saved-toggle')?.addEventListener('click', () => {
    savedMode = !savedMode;
    document.getElementById('saved-toggle')?.classList.toggle('active', savedMode);
    apply();
  });

  apply();
  initCompareBar();
  updateHeader();
  updateSavedToggle();
}

/* ── Detail page ──────────────────────────────────────── */

function initDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const job = JOBS.find((j) => j.id === id);
  if (!job) {
    document.getElementById('detail-content').innerHTML = `
      <div class="empty-state">
        <h3>${t('detail_notfound_title')}</h3>
        <p>${t('detail_notfound_body')}</p>
        <a href="index.html" class="btn btn-primary">${t('detail_back_jobs')}</a>
      </div>`;
    return;
  }

  document.getElementById('detail-title').textContent = job.title;
  document.getElementById('detail-company').textContent = job.company;
  document.getElementById('detail-location').textContent = job.location;
  document.getElementById('detail-salary').textContent = formatSalary(job);
  document.getElementById('detail-yoe').textContent = job.yoe + ' years';
  document.getElementById('detail-category').textContent = job.category;
  document.getElementById('detail-posted').textContent = formatDate(job.posted);
  document.getElementById('detail-verified').textContent = formatDate(job.verified);
  document.getElementById('detail-source').textContent = job.applyUrl;
  const applyLink = document.getElementById('detail-apply');
  applyLink.href = job.applyUrl;
  applyLink.target = '_blank';
  applyLink.rel = 'noopener';

  document.getElementById('detail-description').innerHTML = `
    <h3>${t('detail_about')}</h3>
    <p>${job.description}</p>
    <h3>${t('detail_resp')}</h3>
    <ul>
      <li>Design, build, and iterate on ${job.category.toLowerCase()} systems for production robots.</li>
      <li>Collaborate closely with hardware, software, and operations teams.</li>
      <li>Analyze field and simulation data to drive design decisions.</li>
      <li>Mentor junior engineers and contribute to team standards.</li>
    </ul>
    <h3>${t('detail_req')}</h3>
    <ul>${job.requirements.map((r) => `<li>${r}</li>`).join('')}</ul>`;

  const selectBtn = document.getElementById('detail-select');
  selectBtn.textContent = isInCompare(job.id) ? t('selected') : t('detail_select_compare');
  selectBtn.classList.toggle('active', isInCompare(job.id));
  selectBtn.addEventListener('click', () => {
    const ok = toggleCompare(job.id);
    if (!ok) return;
    selectBtn.classList.toggle('active', isInCompare(job.id));
    selectBtn.textContent = isInCompare(job.id) ? t('selected') : t('detail_select_compare');
    updateCompareBar();
    updateHeader();
  });

  const saveBtn = document.getElementById('detail-save');
  saveBtn.textContent = isSaved(job.id) ? t('saved') : t('save');
  saveBtn.classList.toggle('active', isSaved(job.id));
  saveBtn.addEventListener('click', () => {
    const nowSaved = toggleSaved(job.id);
    saveBtn.classList.toggle('active', nowSaved);
    saveBtn.textContent = nowSaved ? t('saved') : t('save');
  });

  const related = JOBS.filter((j) => j.category === job.category && j.id !== job.id).slice(0, 4);
  const relatedEl = document.getElementById('related-list');
  if (relatedEl) {
    if (related.length === 0) {
      relatedEl.innerHTML = `<p class="text-secondary">${t('detail_no_related')}</p>`;
    } else {
      relatedEl.innerHTML = related.map(renderJobRow).join('');
      attachJobActions(relatedEl);
    }
  }

  initCompareBar();
  updateHeader();
}

/* ── Compare page ─────────────────────────────────────── */

function initCompare() {
  const ids = Array.from(getCompareSet());
  const container = document.getElementById('compare-content');

  if (ids.length < 2) {
    container.innerHTML = `
      <div class="compare-empty">
        <h3>${t('compare_empty_title')}</h3>
        <p>${t('compare_empty_body')}</p>
        <a href="index.html" class="btn btn-primary">${t('compare_browse')}</a>
      </div>`;
    return;
  }

  let selected = ids.map((id) => JOBS.find((j) => j.id === id)).filter(Boolean);

  function render() {
    const rows = [
      { label: t('tbl_company'), render: (j) => `<div class="compare-job-head"><h3>${j.company}</h3><p>${j.location}</p></div>` },
      { label: t('tbl_tags'), render: (j) => `<div class="tag-list">${j.tags.map((tag) => `<span class="badge">${tag}</span>`).join('')}</div>` },
      { label: t('tbl_location'), render: (j) => j.location },
      { label: t('tbl_salary'), render: (j) => formatSalary(j) },
      { label: t('tbl_requirement'), render: (j) => `<ul style="padding-left:1rem;margin:0;color:var(--ink-secondary)">${j.requirements.map((r) => `<li>${r}</li>`).join('')}</ul>` },
      { label: t('tbl_year'), render: (j) => j.yoe + ' years' },
    ];

    const thead = `<tr><th></th>${selected.map((j, idx) => `<th><div class="compare-job-head"><button class="remove-job" data-idx="${idx}">×</button><h3>${j.title}</h3><p>${j.company}</p><a class="compare-apply" href="${j.applyUrl}" target="_blank" rel="noopener">${t('detail_apply')}</a></div></th>`).join('')}</tr>`;
    const tbody = rows.map((row) => `<tr><th>${row.label}</th>${selected.map((j) => `<td>${row.render(j)}</td>`).join('')}</tr>`).join('');

    container.innerHTML = `
      <div class="compare-table-wrap">
        <table class="compare-table">
          <thead>${thead}</thead>
          <tbody>${tbody}</tbody>
        </table>
      </div>
      <div class="mt-lg"><p class="text-small text-tertiary">${t('compare_note')}</p></div>`;

    container.querySelectorAll('.remove-job').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        selected.splice(idx, 1);
        setCompareSet(new Set(selected.map((j) => j.id)));
        updateHeader();
        if (selected.length < 2) {
          container.innerHTML = `
            <div class="compare-empty">
              <h3>${t('compare_removed_title')}</h3>
              <p>${t('compare_removed_body')}</p>
              <a href="index.html" class="btn btn-primary">${t('compare_browse')}</a>
            </div>`;
        } else { render(); }
      });
    });
  }

  document.getElementById('compare-clear')?.addEventListener('click', () => {
    clearCompare();
    updateHeader();
    container.innerHTML = `
      <div class="compare-empty">
        <h3>${t('compare_cleared_title')}</h3>
        <p>${t('compare_cleared_body')}</p>
        <a href="index.html" class="btn btn-primary">${t('compare_browse')}</a>
      </div>`;
  });

  render();
  updateHeader();
}

/* ── Language switcher ────────────────────────────────── */

function initLangSwitcher() {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      LANG = btn.dataset.lang;
      localStorage.setItem(STORAGE_KEYS.lang, LANG);
      location.reload();
    });
  });
}

/* ── Back to top (home page) ──────────────────────────── */

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Detail page safe back navigation ─────────────────── */

function safeBack() {
  const referrer = document.referrer;
  const origin = window.location.origin;
  if (referrer && (referrer.startsWith(origin) || referrer.includes(window.location.host))) {
    if (!referrer.includes('detail.html')) {
      history.back();
      return;
    }
  }
  window.location.href = 'index.html';
}

function initDetailBack() {
  const topBtn = document.getElementById('detail-back');
  topBtn?.addEventListener('click', safeBack);
  const sideBtn = document.getElementById('sidebar-back');
  sideBtn?.addEventListener('click', safeBack);
}

/* ── Router ───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  applyStaticI18n();
  initLangSwitcher();
  const page = document.body.dataset.page;
  if (page === 'home') { initHome(); initBackToTop(); }
  if (page === 'detail') { initDetail(); initDetailBack(); }
  if (page === 'compare') initCompare();
});
