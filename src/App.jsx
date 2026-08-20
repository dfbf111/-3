import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import SpecularButton from './components/SpecularButton/SpecularButton.jsx';

const CircularGallery = lazy(() => import('./components/CircularGallery/CircularGallery.jsx'));

const pages = {
  home: '/',
  projects: '/projects',
  about: '/about',
  contact: '/contact',
};

const aboutCopy = {
  eyebrow: 'About',
  title: '简介',
  bodySections: [
    {
      lines: [
        '姓名：练亚奇',
        '毕业院校：汕头大学',
        '专业：公共艺术',
        'GPA：3.09/4.0',
      ],
    },
    {
      heading: '荣誉',
      lines: ['第五届南方公共艺术节学业奖（2018）、全国大学生创新创业大赛国家级（2018）'],
    },
    {
      heading: '工作经验',
      lines: [
        '2019.6-2020.6 汕头市一方文化传播有限公司 平面设计师',
        '2020.9-2021.10 小壹智能科技有限公司 电商美工',
        '2022.5-2025.11 傲基深圳跨境商务股份有限公司 电商美工',
      ],
    },
  ],
  nameLabel: 'Skills',
  nameValue: 'PS/AI/BLENDER/AIGC',
  roleLabel: 'Portrait',
  roleValue: 'CLICK TO VIEW',
  contactLabel: 'Contact',
};

const portraitImagePath = '/assets/portrait.jpg';
const wechatImagePath = '/assets/wechat.jpg';

const aboutLayoutDefaults = {
  top: 360,
  width: 700,
  titleSize: 76,
  bodySize: 16,
  lineHeight: 1.56,
  bodyGap: 43,
};

const projectCopy = {
  eyebrow: 'Projects',
  title: ['探索设计、动态视觉、', '3D 、AICG与品牌的开发。'],
};

const projects = [
  {
    slug: 'signal-pole',
    title: 'Amazon',
    category: 'E-COMMERCE DESIGN',
    year: '2026',
    role: 'E-commerce Visual Design',
    image: '/assets/project-01.png?v=20260813-refresh-2-01',
    description: '围绕竞品 Review 中最受关注的容量、收纳、电脑适配和背负舒适度，重点突出 34L 大容量、双主隔层、5 个口袋、15 英寸电脑隔层及轻量背负，让卖点直观易懂，同时避免竞品常见的功能夸大。采用简洁、现代的都市通勤风，以黑色与棕色呼应产品材质，搭配米白、灰蓝等低饱和背景；整体排版清晰克制，兼顾商务质感与校园、旅行场景，塑造 ANIKA 实用、可靠且有品质感的品牌形象。',
  },
  {
    slug: 'orbital-type',
    title: 'Amazon',
    category: 'E-COMMERCE DESIGN',
    year: '2026',
    role: 'E-commerce Visual Design',
    image: '/assets/project-02.png?v=20260813-refresh-2-02',
    description: '围绕买家最关心的省时清洁、宠物毛发、多地面适用、自动集尘、120分钟续航及智能控制展开，重点回应竞品 Review 中常见的续航、回充、毛发缠绕和维护频率等顾虑，形成清晰的购买决策链路。采用白色产品为核心，搭配暖木色家居场景与科技蓝信息元素，整体简洁、明亮、现代。通过真实生活场景结合直观功能图示，兼顾科技感、家庭亲和力和品牌统一性。',
  },
  {
    slug: 'soft-machine',
    title: 'Amazon',
    category: 'E-COMMERCE DESIGN',
    year: '2025',
    role: 'E-commerce Visual Design',
    image: '/assets/project-03.png?v=20260813-refresh-2-03',
    description: '整体采用军绿色户外机能风，强化 ANIKA 的专业、耐用与便携形象。结合竞品和 Review，图片重点突出电池容量、4档风力、低噪、遥控定时、LED照明及多场景使用。版式简洁、对比强烈，兼顾移动端阅读，并避免使用未经证实的参数。',
  },
  {
    slug: 'liquid-index',
    title: 'Amazon',
    category: 'E-COMMERCE DESIGN',
    year: '2025',
    role: 'E-commerce Visual Design',
    image: '/assets/project-04.png?v=20260813-refresh-2-04',
    description: '结合竞品与 Review 洞察，采用深海军蓝＋金色点缀的科技轻奢风，突出 ANIKA 的专业感与辨识度。整体围绕买家最关注的轻量便携、两档吸力、续航充电、LED照明、可洗HEPA及多场景配件展开；同时针对竞品常见的吸力不足、续航焦虑、配件不清晰等顾虑，用清晰参数、真实场景和结构展示增强购买信心。主图简洁突出产品，副图侧重卖点解释，A+则强化品牌质感与完整使用体验。',
  },
  {
    slug: 'glass-rig',
    title: 'Amazon',
    category: 'E-COMMERCE DESIGN',
    year: '2024',
    role: 'E-commerce Visual Design',
    image: '/assets/project-05.png?v=20260813-refresh-2-05',
    description: '围绕用户最关心的容量、保温、漏水、三种瓶盖、清洁与便携进行信息编排，优先消除购买顾虑，并用成人运动、通勤和户外场景强化使用价值。采用低饱和磨砂黑与冷调蓝灰背景，搭配硬朗、简洁的排版和金属质感光影，呈现专业、耐用、户外感强的品牌形象，同时保持整套主图、副图和 A+ 视觉统一。',
  },
  {
    slug: 'after-image',
    title: 'Amazon',
    category: 'E-COMMERCE DESIGN',
    year: '2024',
    role: 'E-commerce Visual Design',
    image: '/assets/project-06.png?v=20260813-refresh-2-06',
    description: '这套图以竞品常见的开裂、起毛、异味和收纳不便等反馈为参考，重点突出三尺寸组合、汁槽、手柄与收纳架，强化实用性和空间整理优势。整体采用天然竹木色、明亮厨房场景与简洁英文排版，风格清新、自然、现代，塑造 ANIKA 专业可靠且具有生活质感的品牌形象。',
  },
  {
    slug: 'project-07',
    title: 'AI SHORT DRAMA',
    category: 'AIGC VIDEO',
    year: '2026',
    role: 'Design / Production',
    image: '/assets/project-07.png?v=20260814-07',
    video: '/assets/VIDEO01.mp4',
    tools: 'SEEDANCE2.0',
    description: `项目核心是一场古装暖阁中的双人正反打对手戏。

虞晚斜倚锦榻，以慵懒、暧昧的姿态主动试探谢凛；谢凛站在对面，始终保持克制与戒备。剧情通过一组严格遵守 180°轴线的正反打镜头展开：先以双方越肩镜头建立人物关系，再交替切入虞晚与谢凛的近景、特写，通过匹配视线和连续机位强化两人的心理博弈。

整场戏重点不是动作，而是利用正打—反打—特写—再回到正反关系，放大眼神、表情和距离变化，呈现两人之间暧昧试探、克制防守、暗流涌动的关系张力。`,
  },
  {
    slug: 'project-08',
    title: 'AI SHORT DRAMA',
    category: 'AIGC VIDEO',
    year: '2026',
    role: 'Design / Production',
    image: '/assets/project-08.png?v=20260814-08',
    video: '/assets/VIDEO02.mp4',
    tools: 'LTX2.3',
    description: '项目通过 AI 图生视频 + 影视工业化分镜流程 完成制作，将剧本拆解为可控的短视频单元，并精确设计人物一致性、镜头运动、表演动作、光影、音效与前后镜头衔接，形成一套较完整的 AI 短剧制作工作流。',
  },
  {
    slug: 'project-09',
    title: 'Brand',
    category: 'BRAND DESIGN',
    year: '2026',
    role: 'Brand Visual Design',
    image: '/assets/project-09.png?v=20260820-09',
    tools: 'AI/PS/AIGC/BLENDER',
    description: '视觉系统以“磁能轨道”为核心，从磁吸关系、充电线圈与能量轨迹中提取圆弧、节点、三线导轨和脉冲刻度，表现能量的精准吸附、快速传输与稳定释放。Logo以字母A为基础，由两段磁性圆弧构成“Orbit-A”，中部负形象征能量上行与效率提升。宽体几何字标呼应产品的超薄机身和金属结构，可应用于产品、包装及数字界面。',
  },
  {
    slug: 'project-10',
    title: 'Brand',
    category: 'BRAND DESIGN',
    year: '2026',
    role: 'Brand Visual Design',
    image: '/assets/project-10.png?v=20260820-10',
    tools: 'AI/PS/AIGC/BLENDER',
    description: `品牌以“陪伴，自然发生”为核心理念，将人与宠物之间温暖、持续的关系转化为简洁而现代的视觉语言。英文口号“Made for Life Together.”进一步传达品牌为人宠共同生活而设计的价值主张。

标志以“开放拱环＋中心圆点”为核心结构。圆润拱形隐含字母“A”，同时象征家、保护与连接；中央圆点代表宠物，也是人与宠物关系中的情感中心。开放的轮廓表达持续发生的陪伴与自由亲近的相处方式。

英文字标“ANIKA”采用圆角几何结构，与图形标志保持统一。字母中的拱形与圆点被重复强化，使品牌名称本身也具备鲜明的识别特征。`,
  },
];

const amazonSquareDetailImages = Array.from({ length: 6 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  return { src: `/assets/amazon-detail-${number}.png`, layout: 'square' };
});

const amazonWideDetailImages = Array.from({ length: 5 }, (_, index) => {
  const number = String(index + 7).padStart(2, '0');
  return { src: `/assets/amazon-detail-${number}.png`, layout: 'wide' };
});

function makeDetailImages(start) {
  const squareImages = Array.from({ length: 6 }, (_, index) => {
    const number = String(start + index).padStart(2, '0');
    return { src: `/assets/amazon-detail-${number}.png`, layout: 'square' };
  });
  const wideImages = Array.from({ length: 5 }, (_, index) => {
    const number = String(start + 6 + index).padStart(2, '0');
    return { src: `/assets/amazon-detail-${number}.png`, layout: 'wide' };
  });
  return { squareImages, wideImages };
}

const amazonDetailGroupA = makeDetailImages(1);
const amazonDetailGroupB = makeDetailImages(12);
const amazonDetailGroupC = makeDetailImages(24);
const amazonDetailGroupD = {
  squareImages: Array.from({ length: 6 }, (_, index) => {
    const number = String(35 + index).padStart(2, '0');
    return { src: `/assets/amazon-detail-${number}.png`, layout: 'square' };
  }),
  wideImages: Array.from({ length: 5 }, (_, index) => {
    const number = String(41 + index).padStart(2, '0');
    return { src: `/assets/amazon-detail-${number}.png`, layout: 'wide' };
  }),
};
const amazonDetailGroupE = {
  squareImages: Array.from({ length: 6 }, (_, index) => {
    const number = String(46 + index).padStart(2, '0');
    return { src: `/assets/amazon-detail-${number}.png`, layout: 'square' };
  }),
  wideImages: Array.from({ length: 5 }, (_, index) => {
    const number = String(52 + index).padStart(2, '0');
    return { src: `/assets/amazon-detail-${number}.png`, layout: 'wide' };
  }),
};
const amazonDetailGroupF = {
  squareImages: Array.from({ length: 6 }, (_, index) => {
    const number = String(57 + index).padStart(2, '0');
    return { src: `/assets/amazon-detail-${number}.png`, layout: 'square' };
  }),
  wideImages: Array.from({ length: 5 }, (_, index) => {
    const number = String(63 + index).padStart(2, '0');
    return { src: `/assets/amazon-detail-${number}.png`, layout: 'wide' };
  }),
};
const aiDramaDetailGroupA = {
  images: Array.from({ length: 8 }, (_, index) => {
    const number = String(70 + index).padStart(2, '0');
    return { src: `/assets/amazon-detail-${number}.png`, layout: 'wide' };
  }),
};
const aiDramaDetailGroupB = {
  images: Array.from({ length: 9 }, (_, index) => {
    const number = String(78 + index).padStart(2, '0');
    return { src: `/assets/amazon-detail-${number}.png`, layout: 'wide' };
  }),
};

function attachDetailGallery(project, detailGroup) {
  return {
    ...project,
    detailImages: [
      ...detailGroup.squareImages,
      { src: project.image, layout: 'wide' },
      ...detailGroup.wideImages,
    ],
  };
}

function attachProject02Gallery(project) {
  return {
    ...project,
    detailImages: [
      ...amazonDetailGroupC.squareImages.slice(0, 5),
      { src: project.image, layout: 'square' },
      { src: amazonDetailGroupC.squareImages[5].src, layout: 'wide' },
      ...amazonDetailGroupC.wideImages,
    ],
  };
}

function attachProject04Gallery(project) {
  return {
    ...project,
    detailImages: [
      amazonDetailGroupE.squareImages[0],
      amazonDetailGroupE.squareImages[3],
      amazonDetailGroupE.squareImages[2],
      amazonDetailGroupE.squareImages[1],
      amazonDetailGroupE.squareImages[4],
      { src: project.image, layout: 'square' },
      { src: amazonDetailGroupE.squareImages[5].src, layout: 'wide' },
      ...amazonDetailGroupE.wideImages,
    ],
  };
}

function attachProject06Gallery(project) {
  return {
    ...project,
    detailImages: [
      ...amazonDetailGroupF.squareImages.slice(0, 5),
      { src: project.image, layout: 'square' },
      { src: amazonDetailGroupF.squareImages[5].src, layout: 'wide' },
      ...amazonDetailGroupF.wideImages,
    ],
  };
}

function attachProject07Gallery(project) {
  return {
    ...project,
    detailImages: [
      { src: project.image, layout: 'wide' },
      ...aiDramaDetailGroupA.images,
    ],
  };
}

function attachProject08Gallery(project) {
  return {
    ...project,
    detailImages: aiDramaDetailGroupB.images,
  };
}

function attachProject09Gallery(project) {
  return {
    ...project,
    detailImages: Array.from({ length: 19 }, (_, index) => {
      const number = String(87 + index).padStart(2, '0');
      return { src: `/assets/amazon-detail-${number}.png`, layout: 'vertical' };
    }),
  };
}

function attachProject10Gallery(project) {
  return {
    ...project,
    detailImages: Array.from({ length: 14 }, (_, index) => {
      const number = String(index + 1).padStart(2, '0');
      return { src: `/assets/品牌视觉${number}.png`, layout: 'vertical' };
    }),
  };
}

const projectsWithDetailImages = projects.map((project) => (
  project.slug === 'signal-pole'
    ? attachDetailGallery(project, amazonDetailGroupB)
    : project.slug === 'orbital-type'
    ? attachProject02Gallery(project)
    : project.slug === 'soft-machine'
    ? attachDetailGallery(project, amazonDetailGroupD)
    : project.slug === 'liquid-index'
    ? attachProject04Gallery(project)
    : project.slug === 'glass-rig'
    ? attachDetailGallery(project, { squareImages: amazonSquareDetailImages, wideImages: amazonWideDetailImages })
    : project.slug === 'after-image'
    ? attachProject06Gallery(project)
    : project.slug === 'project-07'
    ? attachProject07Gallery(project)
    : project.slug === 'project-08'
    ? attachProject08Gallery(project)
    : project.slug === 'project-09'
    ? attachProject09Gallery(project)
    : project.slug === 'project-10'
    ? attachProject10Gallery(project)
    : project
));

function routeFromPath(pathname) {
  if (pathname === pages.projects) return 'projects';
  if (pathname === pages.about) return 'about';
  if (pathname === pages.contact) return 'contact';
  return 'home';
}

function routeFromLocation() {
  const hashPage = window.location.hash.replace(/^#\/?/, '');
  if (hashPage in pages) return hashPage;
  return routeFromPath(window.location.pathname);
}

export default function App() {
  const [page, setPage] = useState(routeFromLocation);
  const [project, setProject] = useState(null);
  const [lastPage, setLastPage] = useState(page);

  useEffect(() => {
    const onPop = () => {
      const nextPage = routeFromLocation();
      setLastPage(page);
      setPage(nextPage);
      setProject(null);
    };
    window.addEventListener('popstate', onPop);
    window.addEventListener('hashchange', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('hashchange', onPop);
    };
  }, [page]);

  function navigate(next) {
    setProject(null);
    setLastPage(page);
    setPage(next);
    const isStaticPreview = window.location.pathname.endsWith('/preview.html') || window.location.pathname.endsWith('/index.html');
    window.history.pushState({}, '', isStaticPreview ? `#${next}` : pages[next]);
  }

  return (
    <main className={`app app--${page}`}>
      {page === 'home' && <Home navigate={navigate} />}
      {page === 'projects' && <Projects selected={project} setSelected={setProject} onBack={() => navigate('home')} isEnteringFromHome={lastPage === 'home'} />}
      {page === 'about' && <About />}
      {page === 'contact' && <Contact />}
      {(page === 'home' || page === 'projects' || page === 'about') && <Nav current={page} navigate={navigate} />}
      {page !== 'home' && page !== 'projects' && <BackButton onClick={() => navigate('home')} />}
      {page !== 'projects' && page !== 'home' && page !== 'about' && <Nav current={page} navigate={navigate} />}
    </main>
  );
}

function Nav({ current, navigate }) {
  return (
    <nav className="site-nav" aria-label="Primary">
      {['home', 'projects', 'about', 'contact'].map((item) => (
        <button key={item} type="button" aria-current={current === item ? 'page' : undefined} onClick={() => navigate(item)}>
          {item}
        </button>
      ))}
    </nav>
  );
}

function BackButton({ onClick, close = false }) {
  return (
    <button className="back-circle-control" type="button" aria-label="Back" onClick={onClick}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {close ? <path d="m7 7 10 10M17 7 7 17" /> : <path d="M14 6.5 8.5 12l5.5 5.5" />}
      </svg>
    </button>
  );
}

function Home({ navigate }) {
  return (
    <section className="home-page page-shell" aria-label="Home">
      <header className="home-identity reveal">
        <p>CREATIVE PORTFOLIO</p>
        <h1>ARCHI</h1>
      </header>

      <dl className="home-meta reveal reveal--delay">
        <div>
          <dt>Theme</dt>
          <dd>LIGHT</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>Creative Development / Motion / 3D Modeling / AIGC</dd>
        </div>
        <div>
          <dt>Index</dt>
          <dd>Portfolio 2026</dd>
        </div>
      </dl>
      <SignalModel navigate={navigate} />
      <TextTuner />
    </section>
  );
}

const textTuneDefaults = {
  titleX: 44,
  titleY: 46,
  eyebrowSize: 14,
  nameSize: 56,
  navX: 37,
  navY: 36,
  navGap: 7,
  navSize: 13,
  metaX: 40,
  metaY: 33,
  metaWidth: 656,
  metaGap: 25,
  metaSize: 12,
};

const textTuneControls = [
  ['titleX', 'Title X', 0, 140, 1],
  ['titleY', 'Title Y', 0, 120, 1],
  ['eyebrowSize', 'Small Size', 10, 22, 0.5],
  ['nameSize', 'Name Size', 36, 92, 1],
  ['navX', 'Nav X', 20, 140, 1],
  ['navY', 'Nav Y', 0, 120, 1],
  ['navGap', 'Nav Gap', 0, 24, 1],
  ['navSize', 'Nav Size', 10, 22, 0.5],
  ['metaX', 'Meta X', 0, 140, 1],
  ['metaY', 'Meta Y', 10, 140, 1],
  ['metaWidth', 'Meta Width', 420, 980, 1],
  ['metaGap', 'Meta Gap', 0, 80, 1],
  ['metaSize', 'Meta Size', 10, 20, 0.5],
];

const textTuneVars = {
  titleX: '--text-title-x',
  titleY: '--text-title-y',
  eyebrowSize: '--text-eyebrow-size',
  nameSize: '--text-name-size',
  navX: '--text-nav-x',
  navY: '--text-nav-y',
  navGap: '--text-nav-gap',
  navSize: '--text-nav-size',
  metaX: '--text-meta-x',
  metaY: '--text-meta-y',
  metaWidth: '--text-meta-width',
  metaGap: '--text-meta-gap',
  metaSize: '--text-meta-size',
};

function readStoredTune(storageKey, defaults) {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return { ...defaults };
    const parsed = JSON.parse(stored);
    return Object.fromEntries(
      Object.entries(defaults).map(([key, defaultValue]) => [
        key,
        Number.isFinite(Number(parsed?.[key])) ? Number(parsed[key]) : defaultValue,
      ]),
    );
  } catch {
    return { ...defaults };
  }
}

function readTextTune() {
  return readStoredTune('text-layout-tune', textTuneDefaults);
}

function applyTextTune(tune) {
  Object.entries(textTuneVars).forEach(([key, variable]) => {
    document.documentElement.style.setProperty(variable, `${tune[key]}px`);
  });
}

function TextTuner() {
  const [tune, setTune] = useState(readTextTune);

  useEffect(() => {
    applyTextTune(tune);
  }, [tune]);

  function updateTune(key, value) {
    const next = { ...tune, [key]: Number(value) };
    setTune(next);
    window.localStorage.setItem('text-layout-tune', JSON.stringify(next));
  }

  function resetTune() {
    setTune(textTuneDefaults);
    window.localStorage.removeItem('text-layout-tune');
  }

  return (
    <div className="text-tuner" aria-label="Text layout tuning controls">
      <div className="text-tuner__head">
        <span>Text Tune</span>
        <button type="button" onClick={resetTune}>Reset</button>
      </div>
      {textTuneControls.map(([key, label, min, max, step]) => (
        <label className="text-tuner__row" key={key}>
          <span>{label}</span>
          <input type="range" min={min} max={max} step={step} value={tune[key]} onChange={(event) => updateTune(key, event.target.value)} />
          <output>{Number(tune[key]).toFixed(step < 1 ? 1 : 0)}</output>
        </label>
      ))}
    </div>
  );
}

const signalTuneDefaults = {
  spinOffset: -0.36,
  scale: 17,
  cameraY: 10,
  cameraZ: 18.8,
  focalLength: 30,
  left: 0,
  bottom: -29,
};

const signalTuneControls = [
  ['spinOffset', '角度', -3.14, 3.14, 0.01],
  ['scale', '大小', 4, 30, 0.1],
  ['cameraY', '上下', -40, 10, 0.1],
  ['cameraZ', '远近', 0, 60, 0.1],
  ['focalLength', '缩放', 30, 240, 1],
  ['left', '左右', -80, 80, 0.5],
  ['bottom', '底部', -80, 80, 0.5],
];

function readSignalTune() {
  return readStoredTune('signal-model-tune', signalTuneDefaults);
}

const renderTuneDefaults = {
  exposure: 0.92,
  envMapIntensity: 0.75,
  envLight: 0.45,
  keyLight: 0.85,
  rimLight: 0.8,
  fillLight: 0.03,
  fog: 0,
};

const renderTuneControls = [
  ['exposure', 'Exposure', 0.4, 2.2, 0.01],
  ['envMapIntensity', 'HDR', 0, 1.5, 0.01],
  ['envLight', 'Env', 0, 4, 0.01],
  ['keyLight', 'Key', 0, 5, 0.01],
  ['rimLight', 'Rim', 0, 5, 0.01],
  ['fillLight', 'Fill', 0, 3, 0.01],
  ['fog', 'Fog', 0, 0.04, 0.001],
];

function readRenderTune() {
  return readStoredTune('signal-render-tune', renderTuneDefaults);
}

const blueTextTuneDefaults = {
  size: 41,
  centerY: 51,
  scaleX: 143,
  gap: 109,
  speed: 100,
};

const blueTextTuneControls = [
  ['size', 'Size', 30, 120, 1],
  ['centerY', 'UpDown', 20, 80, 0.5],
  ['scaleX', 'Width', 20, 180, 1],
  ['gap', 'Gap', 0, 360, 1],
  ['speed', 'Speed', -220, 220, 1],
];

function readBlueTextTune() {
  return readStoredTune('blue-text-tune', blueTextTuneDefaults);
}

const contactTextTuneDefaults = {
  dot: 17,
  x: 50,
  y: 483,
  gap: 6,
  letterGap: 10,
};

const contactTextTuneControls = [
  ['dot', 'Size', 6, 32, 1],
  ['x', 'Left', 10, 90, 0.5],
  ['y', 'UpDown', 220, 720, 1],
  ['gap', 'DotGap', 0, 18, 1],
  ['letterGap', 'Letter', 0, 40, 1],
];

function readContactTextTune() {
  return readStoredTune('contact-text-tune', contactTextTuneDefaults);
}

const aboutPatternTuneDefaults = {
  scale: 68,
  x: 17,
  y: 183,
  rotate: 90,
  opacity: 100,
};

const aboutPatternTuneStorageKey = 'about-pattern-tune-v4-centered-logo';

const aboutPatternTuneControls = [
  ['scale', '大小', 35, 180, 1],
  ['x', '左右', -360, 360, 1],
  ['y', '上下', -360, 360, 1],
  ['rotate', '角度', -180, 180, 1],
  ['opacity', 'Opacity', 0, 100, 1],
];

function readAboutPatternTune() {
  return readStoredTune(aboutPatternTuneStorageKey, aboutPatternTuneDefaults);
}

function SignalModel({ navigate }) {
  const mountRef = useRef(null);
  const tuneRef = useRef(readSignalTune());
  const renderTuneRef = useRef(readRenderTune());
  const blueTextTuneRef = useRef(readBlueTextTune());
  const contactTextTuneRef = useRef(readContactTextTune());
  const aboutPatternTuneRef = useRef(readAboutPatternTune());
  const [tune, setTune] = useState(tuneRef.current);
  const [renderTune, setRenderTune] = useState(renderTuneRef.current);
  const [blueTextTune, setBlueTextTune] = useState(blueTextTuneRef.current);
  const [contactTextTune, setContactTextTune] = useState(contactTextTuneRef.current);
  const [aboutPatternTune, setAboutPatternTune] = useState(aboutPatternTuneRef.current);

  function updateTune(key, value) {
    const next = { ...tuneRef.current, [key]: Number(value) };
    tuneRef.current = next;
    setTune(next);
    window.localStorage.setItem('signal-model-tune', JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('signal-model:tune', { detail: next }));
  }

  function resetTune() {
    tuneRef.current = signalTuneDefaults;
    setTune(signalTuneDefaults);
    window.localStorage.removeItem('signal-model-tune');
    window.dispatchEvent(new CustomEvent('signal-model:tune', { detail: signalTuneDefaults }));
  }

  function updateRenderTune(key, value) {
    const next = { ...renderTuneRef.current, [key]: Number(value) };
    renderTuneRef.current = next;
    setRenderTune(next);
    window.localStorage.setItem('signal-render-tune', JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('signal-render:tune', { detail: next }));
  }

  function resetRenderTune() {
    renderTuneRef.current = renderTuneDefaults;
    setRenderTune(renderTuneDefaults);
    window.localStorage.removeItem('signal-render-tune');
    window.dispatchEvent(new CustomEvent('signal-render:tune', { detail: renderTuneDefaults }));
  }

  function updateBlueTextTune(key, value) {
    const next = { ...blueTextTuneRef.current, [key]: Number(value) };
    blueTextTuneRef.current = next;
    setBlueTextTune(next);
    window.localStorage.setItem('blue-text-tune', JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('blue-text:tune', { detail: next }));
  }

  function resetBlueTextTune() {
    blueTextTuneRef.current = blueTextTuneDefaults;
    setBlueTextTune(blueTextTuneDefaults);
    window.localStorage.removeItem('blue-text-tune');
    window.dispatchEvent(new CustomEvent('blue-text:tune', { detail: blueTextTuneDefaults }));
  }

  function updateContactTextTune(key, value) {
    const next = { ...contactTextTuneRef.current, [key]: Number(value) };
    contactTextTuneRef.current = next;
    setContactTextTune(next);
    window.localStorage.setItem('contact-text-tune', JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('contact-text:tune', { detail: next }));
  }

  function resetContactTextTune() {
    contactTextTuneRef.current = contactTextTuneDefaults;
    setContactTextTune(contactTextTuneDefaults);
    window.localStorage.removeItem('contact-text-tune');
    window.dispatchEvent(new CustomEvent('contact-text:tune', { detail: contactTextTuneDefaults }));
  }

  function updateAboutPatternTune(key, value) {
    const next = { ...aboutPatternTuneRef.current, [key]: Number(value) };
    aboutPatternTuneRef.current = next;
    setAboutPatternTune(next);
    window.localStorage.setItem(aboutPatternTuneStorageKey, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('about-pattern:tune', { detail: next }));
  }

  function resetAboutPatternTune() {
    aboutPatternTuneRef.current = aboutPatternTuneDefaults;
    setAboutPatternTune(aboutPatternTuneDefaults);
    window.localStorage.removeItem(aboutPatternTuneStorageKey);
    window.dispatchEvent(new CustomEvent('about-pattern:tune', { detail: aboutPatternTuneDefaults }));
  }

  useEffect(() => {
    let alive = true;
    let cleanup = () => {};

    async function bootModel() {
      const mount = mountRef.current;
      if (!mount) return;
      function showModelError(message) {
        mount.classList.add('is-ready');
        const errorElement = document.createElement('p');
        errorElement.className = 'model-load-error';
        errorElement.textContent = message;
        mount.appendChild(errorElement);
      }

      const THREE = await import('./vendor/three/three.module.js');
      const { GLTFLoader } = await import('./vendor/three/addons/loaders/GLTFLoader.js');
      const { RGBELoader } = await import('./vendor/three/addons/loaders/RGBELoader.js');
      if (!alive || !mountRef.current) return;

      let renderer;
      try {
        const Renderer = THREE.WebGLRenderer || THREE.WebGL1Renderer;
        renderer = new Renderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(1);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = renderTuneRef.current.exposure;
        mount.appendChild(renderer.domElement);
      } catch (error) {
        showModelError(`WebGL renderer failed: ${error.message || 'unknown error'}`);
        throw error;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-10.66, 10.66, 6, -6, 0.001, 2000);
      let activeCamera = camera;
      const root = new THREE.Group();
      scene.add(root);

      const fallbackEnvironment = makeStudioEnvironment(THREE);
      scene.environment = fallbackEnvironment;
      scene.environmentIntensity = renderTuneRef.current.envMapIntensity;
      scene.fog = new THREE.FogExp2(0xeaf4fa, 0.001);

      scene.fog.density = renderTuneRef.current.fog;

      const hemi = new THREE.HemisphereLight(0xffffff, 0xdff3ff, renderTuneRef.current.envLight);
      scene.add(hemi);
      const key = new THREE.DirectionalLight(0xffffff, renderTuneRef.current.keyLight);
      key.position.set(-4.8, -5.8, 6.4);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xb9e8ff, renderTuneRef.current.rimLight);
      rim.position.set(5.6, -2.6, 4.2);
      scene.add(rim);
      const face = new THREE.DirectionalLight(0xeaf8ff, renderTuneRef.current.fillLight);
      face.position.set(0.8, -6, 1.1);
      scene.add(face);

      const pointer = { x: 0, y: 0 };
      const wheel = { rotation: 0 };
      const tune = { ...tuneRef.current };
      let blueTextTune = { ...blueTextTuneRef.current };
      let contactTextTextureTune = { ...contactTextTuneRef.current };
      let aboutPatternTextureTune = { ...aboutPatternTuneRef.current };
      const cameraRig = { enabled: false, target: new THREE.Vector3(0.02, 0.08, 0.08) };
      const animatedTextures = [];
      const grainientTextures = [];
      const signalMaterials = [];
      const deferredJobs = [];
      const reducedMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
      let frameId = 0;
      let hangPivot = null;
      let spinGroup = null;
      let modelObject = null;
      let modelMaxSize = 1;
      let hdrEnvironment = null;
      let hdrSource = null;
      let pmremGenerator = null;
      let projectsSignMesh = null;
      let contactBallMesh = null;
      let aboutTriangleMesh = null;
      const projectCursorBadge = document.querySelector('.project-cursor-badge');
      const contactCursorBadge = document.querySelector('.contact-cursor-badge');
      const aboutCursorBadge = document.querySelector('.about-cursor-badge');
      const raycaster = new THREE.Raycaster();
      const rayPointer = new THREE.Vector2();
      const normalMatrix = new THREE.Matrix3();
      const hitNormal = new THREE.Vector3();
      const toCamera = new THREE.Vector3();
      const dragState = {
        active: false,
        moved: false,
        startX: 0,
        startY: 0,
        offsetX: 0,
        offsetY: 0,
        tiltX: 0,
        tiltZ: 0,
      };
      const modelFloat = {
        basePosition: new THREE.Vector3(),
        lift: 0.1,
        drift: 0.024,
        tiltX: 0.018,
        tiltZ: 0.026,
      };
      const fixedModelStage = { width: 1600, height: 900 };

      async function loadHdrEnvironment() {
        try {
          pmremGenerator = new THREE.PMREMGenerator(renderer);
          pmremGenerator.compileEquirectangularShader();
          hdrSource = await new RGBELoader().loadAsync('/assets/environment/city.hdr');
          if (!alive) return;
          hdrEnvironment = pmremGenerator.fromEquirectangular(hdrSource).texture;
          scene.environment = hdrEnvironment;
        } catch (error) {
          console.warn('HDR environment failed, using fallback environment', error);
        }
      }

      function scheduleDeferredJob(callback, timeout = 2500) {
        if ('requestIdleCallback' in window) {
          const id = window.requestIdleCallback(callback, { timeout });
          deferredJobs.push({ type: 'idle', id });
          return;
        }
        const id = window.setTimeout(callback, Math.min(timeout, 1200));
        deferredJobs.push({ type: 'timeout', id });
      }

      function applyTune(next = tuneRef.current) {
        Object.assign(tune, next);
        if (modelObject) {
          modelObject.scale.setScalar(tune.scale / modelMaxSize);
        }
        activeCamera.position.x = 0.04;
        activeCamera.position.y = tune.cameraY;
        activeCamera.position.z = tune.cameraZ;
        activeCamera.near = 0.001;
        activeCamera.far = 2000;
        const viewWidth = fixedModelStage.width;
        const viewHeight = fixedModelStage.height;
        activeCamera.zoom = tune.focalLength / 30;
        activeCamera.clearViewOffset();
        activeCamera.setViewOffset(
          viewWidth,
          viewHeight,
          (-tune.left / 100) * viewWidth,
          (tune.bottom / 100) * viewHeight,
          viewWidth,
          viewHeight,
        );
        activeCamera.updateProjectionMatrix();
        if (cameraRig.enabled) {
          activeCamera.lookAt(cameraRig.target);
        }
      }

      function onTune(event) {
        applyTune(event.detail);
      }

      function applyRenderTune(next = renderTuneRef.current) {
        renderer.toneMappingExposure = next.exposure;
        scene.environmentIntensity = next.envMapIntensity;
        hemi.intensity = next.envLight;
        key.intensity = next.keyLight;
        rim.intensity = next.rimLight;
        face.intensity = next.fillLight;
        if (scene.fog) scene.fog.density = next.fog;
      }

      function onRenderTune(event) {
        applyRenderTune(event.detail);
      }

      function onBlueTextTune(event) {
        blueTextTune = event.detail;
      }

      function onContactTextTune(event) {
        contactTextTextureTune = event.detail;
      }

      function onAboutPatternTune(event) {
        aboutPatternTextureTune = event.detail;
      }

      function makeLabelTexture({ text, background, foreground, width = 1400, height = 260, font = '900 82px Arial, sans-serif' }) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = foreground;
        ctx.font = font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.translate(width / 2, height / 2);
        ctx.fillText(text, 0, 8);
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = false;
        texture.anisotropy = 8;
        return texture;
      }

      function makeProjectsArchiveTexture(fontScaleX = 1) {
        const canvas = document.createElement('canvas');
        canvas.width = 2048;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = false;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 8;

        const text = 'PROJECTS ARCHIVE';
        const draw = (time = 0, textTune = blueTextTune) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#2447ff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#ffffff';
          ctx.font = `400 ${textTune.size}px Arial, Helvetica, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const userScaleX = textTune.scaleX / 100;
          const totalScaleX = fontScaleX * userScaleX;
          const cycle = ctx.measureText(text).width * totalScaleX + textTune.gap;
          const offset = (time * textTune.speed) % cycle;
          ctx.save();
          ctx.translate(canvas.width * 0.5, canvas.height * (textTune.centerY / 100));
          ctx.scale(totalScaleX, 1);
          for (let x = -canvas.width - cycle - offset; x < canvas.width + cycle; x += cycle) {
            ctx.fillText(text, x / totalScaleX, 0);
          }
          ctx.restore();
          texture.needsUpdate = true;
        };

        draw(0);
        animatedTextures.push(draw);

        return texture;
      }

      function getProjectsTextScale(mesh) {
        const geometry = mesh.geometry;
        const uv = geometry?.attributes?.uv;
        const position = geometry?.attributes?.position;
        if (!geometry || !uv || !position) return 1;

        geometry.computeBoundingBox();
        const size = new THREE.Vector3();
        geometry.boundingBox.getSize(size);
        size.multiply(mesh.scale);
        const dimensions = [Math.abs(size.x), Math.abs(size.y), Math.abs(size.z)].filter((value) => value > 0.0001).sort((a, b) => b - a);
        if (dimensions.length < 2) return 1;
        const geometryAspect = dimensions[0] / dimensions[1];

        let minU = Infinity;
        let maxU = -Infinity;
        let minV = Infinity;
        let maxV = -Infinity;
        for (let index = 0; index < uv.count; index += 1) {
          const u = uv.getX(index);
          const v = uv.getY(index);
          minU = Math.min(minU, u);
          maxU = Math.max(maxU, u);
          minV = Math.min(minV, v);
          maxV = Math.max(maxV, v);
        }
        const uvWidth = Math.max(0.0001, maxU - minU);
        const uvHeight = Math.max(0.0001, maxV - minV);
        const textureAspect = 2048 / 512;
        const stretch = geometryAspect / ((uvWidth / uvHeight) * textureAspect);
        return THREE.MathUtils.clamp(1 / stretch, 0.18, 2.4);
      }

      function makeContactBallTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = false;
        texture.anisotropy = 8;

        const glyphs = {
          C: ['11110', '10000', '10000', '10000', '10000', '10000', '11110'],
          O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
          N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
          T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
          A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
        };
        const arrowGlyph = ['11000', '01100', '00110', '00011', '00110', '01100', '11000'];
        const text = 'CONTACT';

        const draw = (time = 0, textTune = contactTextTextureTune) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#ef3f42';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          const dot = textTune.dot;
          const gap = textTune.gap;
          const letterGap = textTune.letterGap;
          const rows = 7;
          const letters = [...text];
          const cols = letters.reduce((total, char) => total + glyphs[char][0].length, 0);
          const totalWidth = cols * dot + (letters.length - 1) * letterGap + (cols - letters.length) * gap;
          const totalHeight = rows * dot + (rows - 1) * gap;
          let x = canvas.width * (textTune.x / 100) - totalWidth * 0.5;
          const y = textTune.y - totalHeight * 0.5;
          ctx.fillStyle = '#ffffff';
          letters.forEach((char) => {
            glyphs[char].forEach((row, rowIndex) => {
              [...row].forEach((cell, colIndex) => {
                if (cell === '1') {
                  ctx.fillRect(x + colIndex * (dot + gap), y + rowIndex * (dot + gap), dot, dot);
                }
              });
            });
            x += glyphs[char][0].length * (dot + gap) + letterGap;
          });

          const arrowDot = Math.max(4, dot * 0.62);
          const arrowGap = Math.max(2, gap * 0.65);
          const arrowLetterGap = Math.max(arrowDot * 1.2, letterGap * 0.75);
          const arrowWidth = arrowGlyph[0].length * arrowDot + (arrowGlyph[0].length - 1) * arrowGap;
          const arrowCycle = arrowWidth + arrowLetterGap;
          const arrowOffset = (time * 92) % arrowCycle;
          const arrowY = y + totalHeight + dot * 2.35;
          for (let arrowIndex = -2; arrowIndex < Math.ceil(canvas.width / arrowCycle) + 3; arrowIndex += 1) {
            const baseX = arrowIndex * arrowCycle + arrowOffset;
            arrowGlyph.forEach((row, rowIndex) => {
              [...row].forEach((cell, colIndex) => {
                if (cell === '1') {
                  ctx.fillRect(baseX + colIndex * (arrowDot + arrowGap), arrowY + rowIndex * (arrowDot + arrowGap), arrowDot, arrowDot);
                }
              });
            });
          }
          texture.needsUpdate = true;
        };

        draw(0);
        animatedTextures.push((time) => draw(time, contactTextTextureTune));
        return texture;
      }

      function makeAboutTriangleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = false;
        texture.anisotropy = 8;

        let patternMask = null;
        const image = new Image();
        image.onload = () => {
          patternMask = buildPatternMask(image);
          draw(aboutPatternTextureTune);
        };
        image.src = '/assets/about-pattern-source.png?v=20260811-about-centered-logo-v4';

        function buildPatternMask(sourcePattern) {
          const temp = document.createElement('canvas');
          temp.width = 1024;
          temp.height = 1024;
          const tempCtx = temp.getContext('2d');
          const sourceAspect = sourcePattern.naturalWidth / sourcePattern.naturalHeight;
          const targetWidth = 420;
          const targetHeight = targetWidth / sourceAspect;
          tempCtx.drawImage(sourcePattern, (temp.width - targetWidth) * 0.5, 360, targetWidth, targetHeight);
          const imageData = tempCtx.getImageData(0, 0, temp.width, temp.height);
          const data = imageData.data;
          for (let index = 0; index < data.length; index += 4) {
            if (data[index + 3] < 8) {
              data[index + 3] = 0;
              continue;
            }
            const brightness = (data[index] + data[index + 1] + data[index + 2]) / 3;
            if (brightness < 118) {
              data[index] = 5;
              data[index + 1] = 5;
              data[index + 2] = 5;
              data[index + 3] = 255;
            } else {
              data[index + 3] = 0;
            }
          }
          tempCtx.putImageData(imageData, 0, 0);
          return temp;
        }

        function drawExtractedPattern(patternTune, time = 0) {
          if (!patternMask) return;
          const pulse = 1 + 0.16 * (0.5 - 0.5 * Math.cos(time * Math.PI * 0.72));
          ctx.save();
          ctx.translate(512 + patternTune.x, 512 + patternTune.y);
          ctx.rotate((patternTune.rotate * Math.PI) / 180);
          ctx.scale((patternTune.scale / 100) * pulse, (patternTune.scale / 100) * pulse);
          ctx.translate(-512, -512);
          ctx.globalAlpha = patternTune.opacity / 100;
          ctx.drawImage(patternMask, 0, 0);
          ctx.restore();
        }

        const draw = (patternTune = aboutPatternTextureTune, time = 0) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'rgba(255, 210, 44, 0.92)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          drawExtractedPattern(patternTune, time);
          texture.needsUpdate = true;
        };

        draw(aboutPatternTextureTune, 0);
        animatedTextures.push((time) => draw(aboutPatternTextureTune, time));
        return texture;
      }

      function makeStudioEnvironment(THREE) {
        const canvas = document.createElement('canvas');
        canvas.width = 1536;
        canvas.height = 768;
        const ctx = canvas.getContext('2d');

        const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
        sky.addColorStop(0, '#f9fdff');
        sky.addColorStop(0.28, '#eaf6ff');
        sky.addColorStop(0.58, '#f7fbff');
        sky.addColorStop(1, '#d7e5ee');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(255,255,255,.62)';
        ctx.fillRect(0, 360, canvas.width, 180);
        ctx.fillStyle = 'rgba(168,207,231,.18)';
        ctx.fillRect(0, 480, canvas.width, 288);

        const skyline = [
          [38, 242, 70, 250],
          [126, 188, 108, 304],
          [276, 220, 80, 272],
          [392, 146, 138, 346],
          [580, 204, 96, 288],
          [736, 126, 160, 378],
          [952, 184, 116, 320],
          [1120, 226, 82, 278],
          [1248, 154, 150, 356],
          [1430, 212, 96, 292],
        ];

        skyline.forEach(([x, y, w, h], index) => {
          const glass = ctx.createLinearGradient(x, y, x + w, y + h);
          glass.addColorStop(0, 'rgba(246,252,255,.72)');
          glass.addColorStop(0.46, 'rgba(171,215,242,.26)');
          glass.addColorStop(1, 'rgba(255,255,255,.52)');
          ctx.fillStyle = glass;
          ctx.fillRect(x, y, w, h);
          ctx.strokeStyle = 'rgba(150,176,195,.22)';
          ctx.lineWidth = 3;
          ctx.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);
          ctx.fillStyle = index % 2 ? 'rgba(185,232,255,.54)' : 'rgba(255,255,255,.82)';
          for (let yy = y + 24; yy < y + h - 18; yy += 32) {
            ctx.fillRect(x + 14, yy, w - 28, 4);
          }
          ctx.fillStyle = 'rgba(80,152,205,.16)';
          for (let xx = x + 22; xx < x + w - 18; xx += 28) {
            ctx.fillRect(xx, y + 16, 3, h - 32);
          }
        });

        ctx.fillStyle = 'rgba(12,26,38,.22)';
        ctx.fillRect(0, 548, canvas.width, 46);
        ctx.fillStyle = 'rgba(255,255,255,.9)';
        ctx.fillRect(90, 568, 320, 14);
        ctx.fillRect(618, 566, 230, 12);
        ctx.fillRect(1060, 570, 300, 13);
        ctx.fillStyle = 'rgba(185,232,255,.58)';
        ctx.fillRect(0, 414, canvas.width, 8);
        ctx.fillRect(0, 598, canvas.width, 5);

        ctx.fillStyle = 'rgba(255,255,255,.74)';
        ctx.fillRect(90, 24, 150, 300);
        ctx.fillRect(654, 18, 96, 360);
        ctx.fillRect(1210, 30, 118, 326);
        ctx.fillStyle = 'rgba(185,232,255,.46)';
        ctx.fillRect(476, 42, 70, 230);
        ctx.fillRect(878, 64, 86, 250);

        const texture = new THREE.CanvasTexture(canvas);
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;
        return texture;
      }

      function makeMirrorPosterTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 960;
        canvas.height = 540;
        const ctx = canvas.getContext('2d');
        const glow = ctx.createRadialGradient(560, 230, 40, 520, 270, 520);
        glow.addColorStop(0, '#f6fbff');
        glow.addColorStop(0.25, '#8deaff');
        glow.addColorStop(0.52, '#1544ff');
        glow.addColorStop(1, '#061a7a');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255,255,255,0.32)';
        ctx.beginPath();
        ctx.ellipse(320, 285, 170, 210, -0.38, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,104,191,0.44)';
        ctx.beginPath();
        ctx.arc(455, 335, 96, 0, Math.PI * 2);
        ctx.fill();
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = false;
        texture.anisotropy = 4;
        return texture;
      }

      function hydrateMirrorGrainientTexture(material) {
        const sourceCanvas = document.createElement('canvas');
        sourceCanvas.width = 960;
        sourceCanvas.height = 600;
        const displayContext = sourceCanvas.getContext('2d', { alpha: false });
        const grainCanvas = document.createElement('canvas');
        grainCanvas.width = sourceCanvas.width;
        grainCanvas.height = sourceCanvas.height;
        const texture = new THREE.CanvasTexture(sourceCanvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.anisotropy = 1;

        const oldMap = material.map;
        material.map = texture;
        material.needsUpdate = true;
        oldMap?.dispose?.();

        const grainRenderer = new THREE.WebGLRenderer({
          canvas: grainCanvas,
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
        });
        grainRenderer.outputColorSpace = THREE.SRGBColorSpace;
        grainRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        grainRenderer.setSize(sourceCanvas.width, sourceCanvas.height, false);

        const grainScene = new THREE.Scene();
        const grainCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const grainUniforms = {
          iResolution: { value: new THREE.Vector2(sourceCanvas.width, sourceCanvas.height) },
          iTime: { value: 0 },
          uTimeSpeed: { value: 2 },
          uColorBalance: { value: -0.04 },
          uWarpStrength: { value: 1 },
          uWarpFrequency: { value: 5 },
          uWarpSpeed: { value: 2 },
          uWarpAmplitude: { value: 50 },
          uBlendAngle: { value: 0 },
          uBlendSoftness: { value: 0.05 },
          uRotationAmount: { value: 500 },
          uNoiseScale: { value: 2 },
          uGrainAmount: { value: 0.1 },
          uGrainScale: { value: 2 },
          uGrainAnimated: { value: 0 },
          uContrast: { value: 1.5 },
          uGamma: { value: 1 },
          uSaturation: { value: 1 },
          uCenterOffset: { value: new THREE.Vector2(0, 0) },
          uZoom: { value: 0.9 },
          uColor1: { value: new THREE.Color('#FF9FFC') },
          uColor2: { value: new THREE.Color('#5227FF') },
          uColor3: { value: new THREE.Color('#B497CF') },
        };
        const grainMaterial = new THREE.ShaderMaterial({
          uniforms: grainUniforms,
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = vec4(position.xy, 0.0, 1.0);
            }
          `,
          fragmentShader: `
            precision highp float;
            uniform vec2 iResolution;
            uniform float iTime;
            uniform float uTimeSpeed;
            uniform float uColorBalance;
            uniform float uWarpStrength;
            uniform float uWarpFrequency;
            uniform float uWarpSpeed;
            uniform float uWarpAmplitude;
            uniform float uBlendAngle;
            uniform float uBlendSoftness;
            uniform float uRotationAmount;
            uniform float uNoiseScale;
            uniform float uGrainAmount;
            uniform float uGrainScale;
            uniform float uGrainAnimated;
            uniform float uContrast;
            uniform float uGamma;
            uniform float uSaturation;
            uniform vec2 uCenterOffset;
            uniform float uZoom;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform vec3 uColor3;
            #define S(a,b,t) smoothstep(a,b,t)
            mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
            vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
            float noise(vec2 p){
              vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);
              float n=mix(
                mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),
                mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),
                u.y
              );
              return 0.5+0.5*n;
            }
            void main(){
              float t=iTime*uTimeSpeed;
              vec2 uv=gl_FragCoord.xy/iResolution.xy;
              float ratio=iResolution.x/iResolution.y;
              vec2 tuv=uv-0.5+uCenterOffset;
              tuv/=max(uZoom,0.001);

              float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
              tuv.y*=1.0/ratio;
              tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
              tuv.y*=ratio;

              float frequency=uWarpFrequency;
              float ws=max(uWarpStrength,0.001);
              float amplitude=uWarpAmplitude/ws;
              float warpTime=t*uWarpSpeed;
              tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
              tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

              float b=uColorBalance;
              float s=max(uBlendSoftness,0.0);
              mat2 blendRot=Rot(radians(uBlendAngle));
              float blendX=(tuv*blendRot).x;
              float edge0=-0.3-b-s;
              float edge1=0.2-b+s;
              float v0=0.5-b+s;
              float v1=-0.3-b-s;
              vec3 layer1=mix(uColor3,uColor2,S(edge0,edge1,blendX));
              vec3 layer2=mix(uColor2,uColor1,S(edge0,edge1,blendX));
              vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));

              vec2 grainUv=uv*max(uGrainScale,0.001);
              if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);}
              float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
              col+=(grain-0.5)*uGrainAmount;

              col=(col-0.5)*uContrast+0.5;
              float luma=dot(col,vec3(0.2126,0.7152,0.0722));
              col=mix(vec3(luma),col,uSaturation);
              col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
              col=clamp(col,0.0,1.0);
              gl_FragColor=vec4(col,1.0);
            }
          `,
          depthTest: false,
          depthWrite: false,
        });
        const grainMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), grainMaterial);
        grainScene.add(grainMesh);

        const textLoopConfig = {
          text: '滚动 ✦ 滑轮',
          shape: 'circle',
          separator: '✦',
          speed: 90,
          ribbonColor: '#ffffff',
          ribbonWidth: 86,
          fontSize: 46,
          fontWeight: 800,
          letterSpacing: 2,
          color: '#0000ff',
          curviness: 90,
        };

        function makeInfinityPoints(width, height) {
          const viewWidth = 1200;
          const viewHeight = 520;
          const scale = Math.min(width / viewWidth, height / viewHeight);
          const centerX = width / 2;
          const centerY = height / 2;
          const radius = (150 + textLoopConfig.curviness * 1.4) * scale;
          const loopHeight = Math.min(60 + textLoopConfig.curviness * 0.95, (viewHeight / 2 - textLoopConfig.ribbonWidth / 2 - 6)) * scale;
          const points = [];

          if (textLoopConfig.shape === 'circle') {
            const room = Math.max(20, viewHeight / 2 - Math.max(0, textLoopConfig.ribbonWidth) / 2 - 6) * scale;
            const circleRadius = Math.min(90 + textLoopConfig.curviness * 0.95, room);
            for (let index = 0; index <= 720; index += 1) {
              const theta = (index / 720) * Math.PI * 2;
              points.push({
                x: centerX + circleRadius * Math.cos(theta),
                y: centerY + circleRadius * Math.sin(theta),
              });
            }
            return points;
          }

          function cubic(p0, p1, p2, p3, t) {
            const mt = 1 - t;
            const mt2 = mt * mt;
            const t2 = t * t;
            return {
              x: mt2 * mt * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t2 * t * p3.x,
              y: mt2 * mt * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t2 * t * p3.y,
            };
          }

          const segments = [
            [
              { x: centerX, y: centerY },
              { x: centerX + radius * 0.55, y: centerY - loopHeight },
              { x: centerX + radius, y: centerY - loopHeight },
              { x: centerX + radius, y: centerY },
            ],
            [
              { x: centerX + radius, y: centerY },
              { x: centerX + radius, y: centerY + loopHeight },
              { x: centerX + radius * 0.55, y: centerY + loopHeight },
              { x: centerX, y: centerY },
            ],
            [
              { x: centerX, y: centerY },
              { x: centerX - radius * 0.55, y: centerY - loopHeight },
              { x: centerX - radius, y: centerY - loopHeight },
              { x: centerX - radius, y: centerY },
            ],
            [
              { x: centerX - radius, y: centerY },
              { x: centerX - radius, y: centerY + loopHeight },
              { x: centerX - radius * 0.55, y: centerY + loopHeight },
              { x: centerX, y: centerY },
            ],
          ];

          for (const segment of segments) {
            for (let index = 0; index <= 180; index += 1) {
              if (points.length && index === 0) continue;
              points.push(cubic(segment[0], segment[1], segment[2], segment[3], index / 180));
            }
          }
          return points;
        }

        const textLoopPoints = makeInfinityPoints(sourceCanvas.width, sourceCanvas.height);
        const textLoopLengths = textLoopPoints.reduce((lengths, point, index) => {
          if (index === 0) return [0];
          const previous = textLoopPoints[index - 1];
          const distance = Math.hypot(point.x - previous.x, point.y - previous.y);
          lengths.push(lengths[index - 1] + distance);
          return lengths;
        }, []);
        const textLoopLength = textLoopLengths[textLoopLengths.length - 1] || 1;

        function getTextLoopPoint(distance) {
          const wrapped = ((distance % textLoopLength) + textLoopLength) % textLoopLength;
          let low = 0;
          let high = textLoopLengths.length - 1;
          while (low < high) {
            const middle = Math.floor((low + high) / 2);
            if (textLoopLengths[middle] < wrapped) low = middle + 1;
            else high = middle;
          }
          const index = Math.max(1, low);
          const previousLength = textLoopLengths[index - 1];
          const nextLength = textLoopLengths[index];
          const t = nextLength === previousLength ? 0 : (wrapped - previousLength) / (nextLength - previousLength);
          const previous = textLoopPoints[index - 1];
          const next = textLoopPoints[index];
          return {
            x: previous.x + (next.x - previous.x) * t,
            y: previous.y + (next.y - previous.y) * t,
            angle: Math.atan2(next.y - previous.y, next.x - previous.x),
          };
        }

        function drawTextLoop(elapsed) {
          if (!displayContext) return;
          const ctx = displayContext;
          const width = sourceCanvas.width;
          const height = sourceCanvas.height;
          const loopWidth = Math.min(width, height * (1200 / 520));
          const loopHeight = loopWidth * (520 / 1200);
          const scale = loopWidth / 1200;
          const offsetX = (width - loopWidth) / 2;
          const offsetY = (height - loopHeight) / 2;
          const localPoints = makeInfinityPoints(loopWidth, loopHeight).map((point) => ({
            x: point.x + offsetX,
            y: point.y + offsetY,
          }));
          const fontSize = textLoopConfig.fontSize * scale;

          if (textLoopConfig.shape === 'circle') {
            const centerX = width / 2;
            const centerY = height / 2;
            const ringRadius = Math.min(loopWidth, loopHeight) * 0.34;
            const ringWidth = textLoopConfig.ribbonWidth * scale;
            const labels = ['滚动', '✦', '滑轮', '✦', '滚动', '✦', '滑轮', '✦', '滚动', '✦', '滑轮', '✦'];
            const spin = -(elapsed * textLoopConfig.speed * 0.0025);

            ctx.save();
            ctx.strokeStyle = textLoopConfig.ribbonColor;
            ctx.lineWidth = ringWidth;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.fillStyle = textLoopConfig.color;
            ctx.font = `${textLoopConfig.fontWeight} ${fontSize}px "Microsoft YaHei", "Noto Sans SC", "PingFang SC", "Helvetica Neue", Arial, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            labels.forEach((label, index) => {
              const angle = spin - Math.PI / 2 + (index / labels.length) * Math.PI * 2;
              const x = centerX + Math.cos(angle) * ringRadius;
              const y = centerY + Math.sin(angle) * ringRadius;
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(angle + Math.PI / 2);
              ctx.fillText(label, 0, 0);
              ctx.restore();
            });
            ctx.restore();
            return;
          }

          const localLengths = localPoints.reduce((lengths, point, index) => {
            if (index === 0) return [0];
            const previous = localPoints[index - 1];
            lengths.push(lengths[index - 1] + Math.hypot(point.x - previous.x, point.y - previous.y));
            return lengths;
          }, []);
          const localLength = localLengths[localLengths.length - 1] || 1;

          function getLocalPoint(distance) {
            const wrapped = ((distance % localLength) + localLength) % localLength;
            let low = 0;
            let high = localLengths.length - 1;
            while (low < high) {
              const middle = Math.floor((low + high) / 2);
              if (localLengths[middle] < wrapped) low = middle + 1;
              else high = middle;
            }
            const index = Math.max(1, low);
            const previousLength = localLengths[index - 1];
            const nextLength = localLengths[index];
            const t = nextLength === previousLength ? 0 : (wrapped - previousLength) / (nextLength - previousLength);
            const previous = localPoints[index - 1];
            const next = localPoints[index];
            return {
              x: previous.x + (next.x - previous.x) * t,
              y: previous.y + (next.y - previous.y) * t,
              angle: Math.atan2(next.y - previous.y, next.x - previous.x),
            };
          }

          ctx.save();
          ctx.strokeStyle = textLoopConfig.ribbonColor;
          ctx.lineWidth = textLoopConfig.ribbonWidth * scale;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.beginPath();
          localPoints.forEach((point, index) => {
            if (index === 0) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
          });
          ctx.closePath();
          ctx.stroke();
          ctx.restore();

          const unit = textLoopConfig.text.includes(textLoopConfig.separator)
            ? `${textLoopConfig.text}      `
            : `${textLoopConfig.text}  ${textLoopConfig.separator}      `;
          const letterGap = textLoopConfig.letterSpacing * scale;
          const unitGap = fontSize * 1.8;
          ctx.save();
          ctx.fillStyle = textLoopConfig.color;
          ctx.font = `${textLoopConfig.fontWeight} ${fontSize}px "Helvetica Neue", Arial, "Microsoft YaHei", sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const unitWidth = [...unit].reduce((widthSum, char) => widthSum + Math.max(ctx.measureText(char).width, fontSize * 0.72) + letterGap, 0) + unitGap;
          const repeatCount = Math.ceil(localLength / Math.max(unitWidth, 1)) + 2;
          let cursor = -(elapsed * textLoopConfig.speed * scale) % Math.max(unitWidth, 1);

          for (let repeat = 0; repeat < repeatCount; repeat += 1) {
            for (const char of unit) {
              const charWidth = Math.max(ctx.measureText(char).width, fontSize * 0.72) + letterGap;
              const point = getLocalPoint(cursor + charWidth / 2);
              ctx.save();
              ctx.translate(point.x, point.y);
              ctx.rotate(point.angle);
              ctx.fillText(char, 0, 0);
              ctx.restore();
              cursor += charWidth;
            }
            cursor += unitGap;
          }
          ctx.restore();
        }

        function paintGrainientFrame(elapsed) {
          if (!alive) return;
          grainUniforms.iTime.value = elapsed;
          grainRenderer.render(grainScene, grainCamera);
          if (displayContext) {
            displayContext.drawImage(grainCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height);
            drawTextLoop(elapsed);
          }
          texture.needsUpdate = true;
        }

        animatedTextures.push(paintGrainientFrame);
        grainientTextures.push({
          renderer: grainRenderer,
          texture,
          geometry: grainMesh.geometry,
          material: grainMaterial,
        });
      }

      function decorateModel(rootObject) {
        const contactTexture = makeContactBallTexture();
        const aboutTriangleTexture = makeAboutTriangleTexture();
        rootObject.traverse((object) => {
          if (!object.isMesh) return;
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material, materialIndex) => {
            if (!material) return;
            if (material.name === '材质.004') {
              aboutTriangleMesh = object;
              material.map = aboutTriangleTexture;
              material.color.set('#ffffff');
              material.transparent = true;
              material.opacity = 0.72;
              material.depthWrite = false;
              material.side = THREE.DoubleSide;
              if (material.emissive) {
                material.emissive.set('#1a1200');
                material.emissiveIntensity = 0.02;
              }
            }
            if (material.name === 'to_projects.001') {
              projectsSignMesh = object;
              material.map = makeProjectsArchiveTexture(getProjectsTextScale(object));
              material.color.set('#ffffff');
              material.transparent = false;
              material.opacity = 1;
              material.depthWrite = true;
              material.side = THREE.DoubleSide;
              if (material.emissive) {
                material.emissive.set('#071bff');
                material.emissiveIntensity = 0.08;
              }
            }
            if (material.name === 'hirotos_showreel.001') {
              const videoMaterial = new THREE.MeshBasicMaterial({
                map: makeMirrorPosterTexture(),
                color: 0xffffff,
                side: material.side,
                toneMapped: false,
              });
              videoMaterial.name = material.name;
              hydrateMirrorGrainientTexture(videoMaterial);
              if (Array.isArray(object.material)) {
                object.material[materialIndex] = videoMaterial;
              } else {
                object.material = videoMaterial;
              }
            }
            if (material.name === '材质') {
              const strapMaterial = new THREE.MeshBasicMaterial({
                color: 0xffff0a,
                side: material.side,
                toneMapped: false,
              });
              strapMaterial.name = material.name;
              if (Array.isArray(object.material)) {
                object.material[materialIndex] = strapMaterial;
              } else {
                object.material = strapMaterial;
              }
            }
            if (object.name === 'Keychain-03' || material.name === '材质.001') {
              contactBallMesh = object;
              material.map = contactTexture;
              material.color.set('#ffffff');
              material.transparent = false;
              material.opacity = 1;
              if (material.emissive) {
                material.emissive.set('#210000');
                material.emissiveIntensity = 0.02;
              }
            }
            if (material.map) material.map.anisotropy = 8;
            material.needsUpdate = true;
          });
        });
      }

      function bindModelToPoleAxis(rootObject) {
        rootObject.updateMatrixWorld(true);
        const strapObject = rootObject.getObjectByName('带子');
        const anchor = new THREE.Vector3(0, 0.44, 0);
        if (strapObject) {
          const strapBox = new THREE.Box3().setFromObject(strapObject);
          anchor.set(
            (strapBox.min.x + strapBox.max.x) * 0.5,
            strapBox.max.y,
            (strapBox.min.z + strapBox.max.z) * 0.5,
          );
        }
        const swingPivot = new THREE.Group();
        const spinPivot = new THREE.Group();
        swingPivot.name = 'model_hang_fixed_point';
        spinPivot.name = 'model_center_rotation';
        swingPivot.position.copy(anchor);
        modelFloat.basePosition.copy(anchor);
        spinPivot.position.copy(anchor).multiplyScalar(-1);
        spinPivot.add(rootObject);
        swingPivot.add(spinPivot);
        hangPivot = swingPivot;
        return spinPivot;
      }

      function resize() {
        const rect = mount.parentElement?.getBoundingClientRect() || mount.getBoundingClientRect();
        renderer.domElement.style.width = '';
        renderer.domElement.style.height = '';
        renderer.setSize(fixedModelStage.width, fixedModelStage.height, false);
        const orthoHeight = 12;
        const orthoWidth = orthoHeight * (fixedModelStage.width / fixedModelStage.height);
        activeCamera.left = -orthoWidth / 2;
        activeCamera.right = orthoWidth / 2;
        activeCamera.top = orthoHeight / 2;
        activeCamera.bottom = -orthoHeight / 2;
        applyTune(tune);
      }

      function frame() {
        if (document.hidden) {
          frameId = 0;
          return;
        }
        frameId = requestAnimationFrame(frame);
        const time = performance.now() / 1000;
        root.rotation.y += (0 - root.rotation.y) * 0.08;
        if (!dragState.active) {
          dragState.offsetX += (0 - dragState.offsetX) * 0.14;
          dragState.offsetY += (0 - dragState.offsetY) * 0.14;
          dragState.tiltX += (0 - dragState.tiltX) * 0.12;
          dragState.tiltZ += (0 - dragState.tiltZ) * 0.12;
        }
        if (hangPivot) {
          const motionScale = reducedMotionQuery?.matches ? 0 : 1;
          const floatY = (Math.sin(time * 1.18) * modelFloat.lift + Math.sin(time * 2.04 + 0.7) * 0.022) * motionScale;
          const floatX = Math.sin(time * 0.74 + 1.1) * modelFloat.drift * motionScale;
          const floatTiltX = Math.sin(time * 0.9 + 0.4) * modelFloat.tiltX * motionScale;
          const floatTiltZ = Math.sin(time * 0.76 + 1.8) * modelFloat.tiltZ * motionScale;
          hangPivot.position.x += (modelFloat.basePosition.x + floatX - hangPivot.position.x) * 0.08;
          hangPivot.position.y += (modelFloat.basePosition.y + floatY - hangPivot.position.y) * 0.08;
          hangPivot.position.z += (modelFloat.basePosition.z - hangPivot.position.z) * 0.08;
          hangPivot.rotation.x += (dragState.tiltX + floatTiltX - hangPivot.rotation.x) * 0.2;
          hangPivot.rotation.z += (dragState.tiltZ + floatTiltZ - hangPivot.rotation.z) * 0.2;
        }
        if (spinGroup) spinGroup.rotation.y += (tune.spinOffset + wheel.rotation + pointer.x * 0.012 - spinGroup.rotation.y) * 0.18;
        if (cameraRig.enabled) {
          activeCamera.lookAt(cameraRig.target);
        }
        animatedTextures.forEach((update) => update(time));
        const active = Math.floor(time * 1.25) % 3;
        const colors = ['#ff8060', '#fff2a8', '#b9e8ff'];
        signalMaterials.forEach((material, index) => {
          const on = index === active;
          material.color.set(on ? colors[index] : '#050505');
          material.emissive.set(on ? colors[index] : '#000000');
          material.emissiveIntensity = on ? 4 : 0;
        });
        renderer.render(scene, activeCamera);
      }

      function startFrame() {
        if (!frameId) frame();
      }

      function onVisibilityChange() {
        if (document.hidden) {
          cancelAnimationFrame(frameId);
          frameId = 0;
          return;
        }
        startFrame();
      }

      function onPointerMove(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
        pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
        if (dragState.active) {
          const dx = event.clientX - dragState.startX;
          const dy = event.clientY - dragState.startY;
          if (Math.abs(dx) > 2 || Math.abs(dy) > 2) dragState.moved = true;
          dragState.tiltZ = THREE.MathUtils.clamp(dx / rect.width * 1.25, -0.42, 0.42);
          dragState.tiltX = THREE.MathUtils.clamp(dy / rect.height * 0.55, -0.22, 0.22);
        }
        rayPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        rayPointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
        raycaster.setFromCamera(rayPointer, activeCamera);
        const isOverProjects = isFrontFacingHit(projectsSignMesh);
        const isOverContact = isFrontFacingHit(contactBallMesh, {
          uvBounds: { uMin: 0.08, uMax: 0.92, vMin: 0.18, vMax: 0.62 },
          minDot: 0.16,
        });
        const isOverAbout = isFrontFacingHit(aboutTriangleMesh, {
          uvBounds: { uMin: 0.12, uMax: 0.88, vMin: 0.18, vMax: 0.82 },
          minDot: 0.16,
        });
        [projectCursorBadge, contactCursorBadge, aboutCursorBadge].forEach((badge) => {
          badge?.style.setProperty('--cursor-x', `${event.clientX}px`);
          badge?.style.setProperty('--cursor-y', `${event.clientY}px`);
        });
        projectCursorBadge?.classList.toggle('is-visible', isOverProjects && !isOverContact && !isOverAbout);
        contactCursorBadge?.classList.toggle('is-visible', isOverContact);
        aboutCursorBadge?.classList.toggle('is-visible', isOverAbout && !isOverContact);
      }

      function onPointerLeave() {
        dragState.active = false;
        projectCursorBadge?.classList.remove('is-visible');
        contactCursorBadge?.classList.remove('is-visible');
        aboutCursorBadge?.classList.remove('is-visible');
      }

      function onPointerDown(event) {
        if (event.button !== 0) return;
        dragState.active = true;
        dragState.moved = false;
        dragState.startX = event.clientX;
        dragState.startY = event.clientY;
        dragState.offsetX = 0;
        dragState.offsetY = 0;
        mount.setPointerCapture?.(event.pointerId);
      }

      function onPointerUp(event) {
        dragState.active = false;
        mount.releasePointerCapture?.(event.pointerId);
      }

      function setRayFromPointer(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        rayPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        rayPointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
        raycaster.setFromCamera(rayPointer, activeCamera);
      }

      function isPointerOverProjects(event) {
        if (!projectsSignMesh) return false;
        setRayFromPointer(event);
        return isFrontFacingHit(projectsSignMesh);
      }

      function isPointerOverContact(event) {
        if (!contactBallMesh) return false;
        setRayFromPointer(event);
        return isFrontFacingHit(contactBallMesh, {
          uvBounds: { uMin: 0.08, uMax: 0.92, vMin: 0.18, vMax: 0.62 },
          minDot: 0.16,
        });
      }

      function isPointerOverAbout(event) {
        if (!aboutTriangleMesh) return false;
        setRayFromPointer(event);
        return isFrontFacingHit(aboutTriangleMesh, {
          uvBounds: { uMin: 0.12, uMax: 0.88, vMin: 0.18, vMax: 0.82 },
          minDot: 0.16,
        });
      }

      function isFrontFacingHit(mesh, options = {}) {
        if (!mesh) return false;
        const hits = raycaster.intersectObject(mesh, true);
        if (!hits.length) return false;
        return hits.some((hit) => {
        if (options.uvBounds && hit.uv) {
          const { uMin, uMax, vMin, vMax } = options.uvBounds;
          const u = THREE.MathUtils.euclideanModulo(hit.uv.x, 1);
          const v = THREE.MathUtils.euclideanModulo(hit.uv.y, 1);
          if (u < uMin || u > uMax || v < vMin || v > vMax) return false;
        }
        if (!hit.face) return true;
        normalMatrix.getNormalMatrix(hit.object.matrixWorld);
        hitNormal.copy(hit.face.normal).applyMatrix3(normalMatrix).normalize();
        toCamera.copy(activeCamera.position).sub(hit.point).normalize();
        return hitNormal.dot(toCamera) > (options.minDot ?? 0.08);
        });
      }

      function onClick(event) {
        if (dragState.moved) {
          dragState.moved = false;
          return;
        }
        if (isPointerOverContact(event)) {
          navigate('contact');
          return;
        }
        if (isPointerOverAbout(event)) {
          navigate('about');
          return;
        }
        if (isPointerOverProjects(event)) navigate('projects');
      }

      function onWheel(event) {
        wheel.rotation += event.deltaY * 0.0018;
      }

      new GLTFLoader().load(
        '/assets/hirotos-original-model.glb?v=20260816-original-model',
        (gltf) => {
          try {
            if (!alive) return;
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            model.position.x += 0.02;
            model.position.z -= 0.1;
            modelMaxSize = Math.max(size.x, size.y, size.z);
            modelObject = model;
            model.scale.setScalar(tune.scale / modelMaxSize);
            decorateModel(model);
            spinGroup = bindModelToPoleAxis(model);
            root.add(hangPivot);
            camera.position.set(0.04, -9.9, 7.6);
            camera.near = 0.001;
            camera.far = 2000;
            camera.updateProjectionMatrix();
            cameraRig.enabled = true;
            cameraRig.target.set(0.02, 0.08, 0.08);
            activeCamera = camera;
            applyTune();
            resize();
            mount.classList.add('is-ready');
          } catch (error) {
            console.error('3D model setup failed', error);
            showModelError(`3D model setup failed: ${error.message || 'unknown error'}`);
          }
        },
        undefined,
        (error) => {
          console.error('Failed to load GLB model', error);
          showModelError(`3D model failed: ${error.message || 'unknown error'}`);
        },
      );

      mount.addEventListener('pointermove', onPointerMove);
      mount.addEventListener('pointerdown', onPointerDown);
      mount.addEventListener('pointerup', onPointerUp);
      mount.addEventListener('pointerleave', onPointerLeave);
      mount.addEventListener('click', onClick);
      window.addEventListener('wheel', onWheel, { passive: true });
      window.addEventListener('signal-model:tune', onTune);
      window.addEventListener('signal-render:tune', onRenderTune);
      window.addEventListener('blue-text:tune', onBlueTextTune);
      window.addEventListener('contact-text:tune', onContactTextTune);
      window.addEventListener('about-pattern:tune', onAboutPatternTune);
      window.addEventListener('resize', resize);
      document.addEventListener('visibilitychange', onVisibilityChange);
      applyTune();
      applyRenderTune();
      resize();
      scheduleDeferredJob(loadHdrEnvironment, 1800);
      startFrame();

      cleanup = () => {
        cancelAnimationFrame(frameId);
        mount.removeEventListener('pointermove', onPointerMove);
        mount.removeEventListener('pointerdown', onPointerDown);
        mount.removeEventListener('pointerup', onPointerUp);
        mount.removeEventListener('pointerleave', onPointerLeave);
        mount.removeEventListener('click', onClick);
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('signal-model:tune', onTune);
        window.removeEventListener('signal-render:tune', onRenderTune);
        window.removeEventListener('blue-text:tune', onBlueTextTune);
        window.removeEventListener('contact-text:tune', onContactTextTune);
        window.removeEventListener('about-pattern:tune', onAboutPatternTune);
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        deferredJobs.forEach(({ type, id }) => {
          if (type === 'idle') window.cancelIdleCallback?.(id);
          if (type === 'timeout') window.clearTimeout(id);
        });
        fallbackEnvironment.dispose();
        hdrSource?.dispose();
        hdrEnvironment?.dispose();
        pmremGenerator?.dispose();
        grainientTextures.forEach(({ renderer, texture, geometry, material }) => {
          texture.dispose();
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.forceContextLoss();
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    bootModel().catch((error) => {
      console.error('3D model boot failed', error);
    });
    return () => {
      alive = false;
      cleanup();
    };
  }, []);

  return (
    <>
      <div className="signal-model reveal reveal--delay" aria-label="Interactive portfolio model">
        <div className="signal-model__viewer" ref={mountRef}>
          <button className="model-hotspot model-hotspot--about" type="button" onClick={() => navigate('about')}>
            About
          </button>
          <button
            className="model-hotspot model-hotspot--projects"
            type="button"
            onClick={() => navigate('projects')}
          >
            <span className="visually-hidden">Projects</span>
          </button>
          <button className="model-hotspot model-hotspot--contact" type="button" onClick={() => navigate('contact')}>
            Contact
          </button>
        </div>
      </div>
      <div className="model-tuner" aria-label="Model tuning controls">
        <div className="model-tuner__head">
          <span>模型位置调节</span>
          <button type="button" onClick={resetTune}>Reset</button>
        </div>
        {signalTuneControls.map(([key, label, min, max, step]) => (
          <label className="model-tuner__row" key={key}>
            <span>{label}</span>
            <input type="range" min={min} max={max} step={step} value={tune[key]} onChange={(event) => updateTune(key, event.target.value)} />
            <output>{Number(tune[key]).toFixed(step < 1 ? 2 : 0)}</output>
          </label>
        ))}
      </div>
      <div className="render-tuner" aria-label="Render tuning controls">
        <div className="render-tuner__head">
          <span>Render Tune</span>
          <button type="button" onClick={resetRenderTune}>Reset</button>
        </div>
        {renderTuneControls.map(([key, label, min, max, step]) => (
          <label className="render-tuner__row" key={key}>
            <span>{label}</span>
            <input type="range" min={min} max={max} step={step} value={renderTune[key]} onChange={(event) => updateRenderTune(key, event.target.value)} />
            <output>{Number(renderTune[key]).toFixed(step < 0.01 ? 3 : 2)}</output>
          </label>
        ))}
      </div>
      <div className="blue-text-tuner" aria-label="Blue sign text tuning controls">
        <div className="blue-text-tuner__head">
          <span>Blue Text Tune</span>
          <button type="button" onClick={resetBlueTextTune}>Reset</button>
        </div>
        {blueTextTuneControls.map(([key, label, min, max, step]) => (
          <label className="blue-text-tuner__row" key={key}>
            <span>{label}</span>
            <input type="range" min={min} max={max} step={step} value={blueTextTune[key]} onChange={(event) => updateBlueTextTune(key, event.target.value)} />
            <output>{Number(blueTextTune[key]).toFixed(step < 1 ? 1 : 0)}</output>
          </label>
        ))}
      </div>
      <div className="contact-text-tuner" aria-label="Contact ball text tuning controls">
        <div className="contact-text-tuner__head">
          <span>Contact Text Tune</span>
          <button type="button" onClick={resetContactTextTune}>Reset</button>
        </div>
        {contactTextTuneControls.map(([key, label, min, max, step]) => (
          <label className="contact-text-tuner__row" key={key}>
            <span>{label}</span>
            <input type="range" min={min} max={max} step={step} value={contactTextTune[key]} onChange={(event) => updateContactTextTune(key, event.target.value)} />
            <output>{Number(contactTextTune[key]).toFixed(step < 1 ? 1 : 0)}</output>
          </label>
        ))}
      </div>
      <div className="about-pattern-tuner" aria-label="About triangle pattern tuning controls">
        <div className="about-pattern-tuner__head">
          <span>ABOUT 图案调节</span>
          <button type="button" onClick={resetAboutPatternTune}>Reset</button>
        </div>
        {aboutPatternTuneControls.map(([key, label, min, max, step]) => (
          <label className="about-pattern-tuner__row" key={key}>
            <span>{label}</span>
            <input type="range" min={min} max={max} step={step} value={aboutPatternTune[key]} onChange={(event) => updateAboutPatternTune(key, event.target.value)} />
            <output>{Number(aboutPatternTune[key]).toFixed(0)}</output>
          </label>
        ))}
      </div>
      <div
        className="project-cursor-badge"
        aria-hidden="true"
      >
        <span>项目档案</span>
        <svg viewBox="0 0 36 18" focusable="false">
          <path d="M1 9h30M23 2l8 7-8 7" />
        </svg>
      </div>
      <div className="contact-cursor-badge" aria-hidden="true">
        <span>联系</span>
        <svg viewBox="0 0 36 18" focusable="false">
          <path d="M1 9h30M23 2l8 7-8 7" />
        </svg>
      </div>
      <div className="about-cursor-badge" aria-hidden="true">
        <span>关于我</span>
        <svg viewBox="0 0 36 18" focusable="false">
          <path d="M1 9h30M23 2l8 7-8 7" />
        </svg>
      </div>
    </>
  );
}

function Projects({ selected, setSelected, onBack, isEnteringFromHome }) {
  const [isWheelControlled, setIsWheelControlled] = useState(false);
  const [detailOrigin, setDetailOrigin] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const galleryRef = useRef(null);
  const trackRef = useRef(null);
  const wheelOffsetRef = useRef(0);
  const copy = projectCopy;
  const track = useMemo(() => [...projectsWithDetailImages, ...projectsWithDetailImages], []);
  const categoryActions = [
    { label: '电商设计', category: 'E-COMMERCE DESIGN' },
    { label: '品牌设计', category: 'BRAND DESIGN' },
    { label: 'AIGC视频', category: 'AIGC VIDEO' },
  ];
  const categoryProjects = useMemo(() => (
    activeCategory ? projectsWithDetailImages.filter((item) => item.category === activeCategory) : []
  ), [activeCategory]);
  const carouselItems = useMemo(() => categoryProjects.map((item) => ({
    image: item.image,
    text: item.title,
    project: item,
  })), [categoryProjects]);
  const openCategoryProject = useCallback((item) => {
    setDetailOrigin(null);
    setSelected(item.project);
  }, [setSelected]);

  useEffect(() => {
    const galleryElement = galleryRef.current;
    if (!galleryElement) return undefined;
    let pendingWheelDelta = 0;
    let wheelFrameId = 0;
    let loopWidth = 0;

    function moveGalleryByWheel(event) {
      const trackElement = trackRef.current;
      if (!trackElement) return;

      event.preventDefault();
      setIsWheelControlled(true);

      loopWidth = loopWidth || trackElement.scrollWidth / 2;
      if (!loopWidth) return;

      const wheelDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      pendingWheelDelta += wheelDelta;
      if (wheelFrameId) return;

      wheelFrameId = requestAnimationFrame(() => {
        wheelFrameId = 0;
        const nextOffset = wheelOffsetRef.current - pendingWheelDelta;
        pendingWheelDelta = 0;
        wheelOffsetRef.current = ((nextOffset % loopWidth) + loopWidth) % loopWidth - loopWidth;
        trackElement.style.transform = `translate3d(${wheelOffsetRef.current}px, 0, 0)`;
      });
    }

    galleryElement.addEventListener('wheel', moveGalleryByWheel, { passive: false });
    return () => {
      galleryElement.removeEventListener('wheel', moveGalleryByWheel);
      cancelAnimationFrame(wheelFrameId);
    };
  }, []);

  function resumeGalleryMarquee() {
    const trackElement = trackRef.current;
    wheelOffsetRef.current = 0;
    setIsWheelControlled(false);
    setActiveCategory(null);
    if (trackElement) trackElement.style.transform = '';
  }

  function showCategory(category) {
    setActiveCategory(category);
  }

  function openProject(item, event) {
    const imageElement = event.currentTarget.querySelector('img');
    const rect = imageElement?.getBoundingClientRect();
    setDetailOrigin(rect ? {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    } : null);
    setSelected(item);
  }

  if (selected) {
    return (
      <ProjectDetail
        project={selected}
        openOrigin={detailOrigin}
        onClose={() => {
          setDetailOrigin(null);
          setSelected(null);
        }}
        onSelect={(item) => {
          setDetailOrigin(null);
          setSelected(item);
        }}
      />
    );
  }

  return (
    <section className={`projects-page${isEnteringFromHome ? ' projects-page--enter' : ''}`} aria-label="Projects">
      <div className="projects-gridzoom">
        <header className="projects-gridzoom__header">
          <BackButton onClick={onBack} />
        </header>
        <div className="projects-gridzoom__intro reveal">
          <p>{copy.eyebrow}</p>
          <h1>
            {copy.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
        </div>
        <div className="projects-specular-actions" aria-label="Project actions">
          {categoryActions.map((action) => (
            <SpecularButton
              className={`projects-specular-button${activeCategory === action.category ? ' is-active' : ''}`}
              size="md"
              radius={18}
              tint="#ffffff"
              tintOpacity={0}
              blur={0}
              textColor="#0b0b0a"
              lineColor="#94a3b8"
              baseColor="#525252"
              intensity={1}
              shineSize={10}
              shineFade={40}
              thickness={1}
              speed={0.35}
              followMouse
              proximity={250}
              autoAnimate={false}
              onClick={() => showCategory(action.category)}
              key={action.category}
            >
              {action.label}
            </SpecularButton>
          ))}
        </div>
        <div className="projects-gl-gallery">
          {activeCategory ? (
            <div className="projects-circular-showcase">
              <Suspense fallback={<div className="projects-circular-fallback" aria-label="Loading project gallery" />}>
                <CircularGallery
                  items={carouselItems}
                  bend={1}
                  textColor="#ffffff"
                  borderRadius={0.05}
                  scrollEase={0.05}
                  fontUrl=""
                  font="bold 30px Orbitron"
                  scrollSpeed={2}
                  onItemClick={openCategoryProject}
                />
              </Suspense>
            </div>
          ) : (
            <div className="projects-marquee" ref={galleryRef} onMouseLeave={resumeGalleryMarquee}>
              <div ref={trackRef} className={`projects-marquee__track${isWheelControlled ? ' is-wheel-controlled' : ''}`}>
                <div className="projects-marquee__set">
                  {track.map((item, index) => (
                    <button className={`projects-marquee__item projects-marquee__item--${item.slug}`} type="button" key={`${item.slug}-${index}`} onClick={(event) => openProject(item, event)}>
                      <figure className="projects-marquee__figure">
                        <img src={item.image} alt="" loading="lazy" decoding="async" />
                      </figure>
                      <span className="projects-gl-caption">
                        <span>{item.category}</span>
                        <strong>{item.title}</strong>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectDetail({ project, openOrigin, onClose, onSelect }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [imageMotionStyle, setImageMotionStyle] = useState(null);
  const imageRef = useRef(null);
  const detailImages = project.detailImages?.length ? project.detailImages : [{ src: project.image, layout: 'wide' }];
  const hasDetailGallery = detailImages.length > 1;
  const hasVideoButton = project.category === 'AIGC VIDEO';
  const nextProject = useMemo(() => {
    const currentProjectIndex = projectsWithDetailImages.findIndex((item) => item.slug === project.slug);
    return projectsWithDetailImages[(currentProjectIndex + 1) % projectsWithDetailImages.length];
  }, [project.slug]);

  useEffect(() => {
    if (!isVideoOpen) return undefined;

    function onKeyDown(event) {
      if (event.key === 'Escape') setIsVideoOpen(false);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isVideoOpen]);

  useLayoutEffect(() => {
    if (!openOrigin || !imageRef.current) {
      setImageMotionStyle(null);
      return;
    }

    const target = imageRef.current.getBoundingClientRect();
    if (!target.width || !target.height) {
      setImageMotionStyle(null);
      return;
    }

    const originCenterX = openOrigin.left + openOrigin.width / 2;
    const originCenterY = openOrigin.top + openOrigin.height / 2;
    const targetCenterX = target.left + target.width / 2;
    const targetCenterY = target.top + target.height / 2;

    setImageMotionStyle({
      '--project-open-x': `${originCenterX - targetCenterX}px`,
      '--project-open-y': `${originCenterY - targetCenterY}px`,
      '--project-open-scale-x': openOrigin.width / target.width,
      '--project-open-scale-y': openOrigin.height / target.height,
    });
  }, [openOrigin, project.slug]);

  return (
    <section className="projects-zoom" aria-label={project.title}>
      <header className="projects-zoom__header">
        <BackButton onClick={onClose} close />
      </header>
      <div className="projects-zoom__content reveal">
        <span>{project.category}</span>
        <h2>{project.title}</h2>
        <div className="projects-zoom__description">
          {project.description.split(/\n\s*\n/).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <dl>
          <div>
            <dt>Statement</dt>
            <dd>Practice projects</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>{project.tools || 'AI/PS/AIGC/BLENDER'}</dd>
          </div>
        </dl>
        <div className="projects-zoom__actions">
          <button className="projects-zoom__link" type="button" onClick={() => onSelect(nextProject)}>
            Next project
          </button>
          {hasVideoButton && (
            <button className="projects-zoom__link projects-zoom__link--video" type="button" onClick={() => setIsVideoOpen(true)}>
              <span className="projects-zoom__play-icon" aria-hidden="true" />
              Play video
            </button>
          )}
        </div>
      </div>
      <figure
        ref={imageRef}
        style={imageMotionStyle || undefined}
        className={`projects-zoom__image${hasDetailGallery ? ' projects-zoom__image--gallery' : ''}${project.slug === 'project-07' || project.slug === 'project-08' ? ' projects-zoom__image--poster-flow' : ''}${project.slug === 'project-09' || project.slug === 'project-10' ? ' projects-zoom__image--vertical-flow' : ''}${imageMotionStyle ? ' projects-zoom__image--opening' : ''}`}
      >
        {hasDetailGallery ? (
          <div className="projects-detail-gallery">
            {detailImages.map((image, index) => (
              <img
                className={`projects-detail-gallery__image projects-detail-gallery__image--${image.layout}`}
                src={image.src}
                alt={`${project.title} detail ${index + 1}`}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                key={image.src}
              />
            ))}
          </div>
        ) : (
          <img src={detailImages[0].src} alt={project.title} decoding="async" />
        )}
      </figure>
      <ol className="projects-zoom__map" aria-label="Project map">
        {projectsWithDetailImages.map((item) => (
          <li key={item.slug} className={item.slug === project.slug ? 'is-active' : ''}>
            <button type="button" aria-label={item.title} onClick={() => onSelect(item)}>
              <img src={item.image} alt="" loading="lazy" decoding="async" />
            </button>
          </li>
        ))}
      </ol>
      {isVideoOpen && (
        <div className="video-lightbox" role="dialog" aria-modal="true" aria-label={`${project.title} video`}>
          <button className="video-lightbox__backdrop" type="button" aria-label="Close video preview" onClick={() => setIsVideoOpen(false)} />
          <div className="video-lightbox__panel">
            {project.video ? (
              <video src={project.video} controls autoPlay playsInline preload="metadata" />
            ) : (
              <div className="video-lightbox__empty">
                <span>VIDEO FILE PENDING</span>
              </div>
            )}
            <button className="video-lightbox__close" type="button" aria-label="Close video preview" onClick={() => setIsVideoOpen(false)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m7 7 10 10M17 7 7 17" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function About() {
  const language = 'en';
  const copy = aboutCopy;
  const [isPortraitOpen, setIsPortraitOpen] = useState(false);
  const [isWechatOpen, setIsWechatOpen] = useState(false);
  const layout = aboutLayoutDefaults;

  useEffect(() => {
    if (!isPortraitOpen && !isWechatOpen) return undefined;

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setIsPortraitOpen(false);
        setIsWechatOpen(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isPortraitOpen, isWechatOpen]);

  return (
    <section className="about-page page-shell" aria-label="About">
      <div
        className="about-page__content reveal"
        lang={language}
        style={{
          '--about-top': `${layout.top}px`,
          '--about-width': `${layout.width}px`,
          '--about-title-size': `${layout.titleSize}px`,
          '--about-body-size': `${layout.bodySize}px`,
          '--about-line-height': layout.lineHeight,
          '--about-body-gap': `${layout.bodyGap}px`,
        }}
      >
        <div className="page-shell__intro">
          <p>{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
        </div>
        <div className="about-page__body">
          <div className="about-page__resume" aria-label="Resume summary">
            {copy.bodySections.map((section, sectionIndex) => (
              <section className="about-page__resume-section" key={section.heading || sectionIndex}>
                {section.heading && <h2>{section.heading}</h2>}
                {section.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </section>
            ))}
          </div>
          <dl className="about-page__meta">
            <div>
              <dt>{copy.nameLabel}</dt>
              <dd>{copy.nameValue}</dd>
            </div>
            <div>
              <dt>{copy.roleLabel}</dt>
              <dd>
                <button className="about-page__portrait-trigger" type="button" onClick={() => setIsPortraitOpen(true)}>
                  <span>{copy.roleValue}</span>
                  <Arrow />
                </button>
              </dd>
            </div>
            <div>
              <dt>{copy.contactLabel}</dt>
              <dd className="about-page__contact-links">
                <a href="mailto:939163155@qq.com">
                  <span>939163155@qq.com</span>
                  <Arrow />
                </a>
                <button className="about-page__portrait-trigger" type="button" onClick={() => setIsWechatOpen(true)}>
                  <span>15220051017（微信同号）</span>
                  <Arrow />
                </button>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {isPortraitOpen && (
        <div className="portrait-lightbox" role="dialog" aria-modal="true" aria-label="Portrait preview">
          <button className="portrait-lightbox__backdrop" type="button" aria-label="Close portrait preview" onClick={() => setIsPortraitOpen(false)} />
          <figure className="portrait-lightbox__figure">
            <img src={portraitImagePath} alt="Portrait" decoding="async" />
            <button className="portrait-lightbox__close" type="button" aria-label="Close portrait preview" onClick={() => setIsPortraitOpen(false)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m7 7 10 10M17 7 7 17" />
              </svg>
            </button>
          </figure>
        </div>
      )}
      {isWechatOpen && (
        <div className="portrait-lightbox" role="dialog" aria-modal="true" aria-label="WeChat preview">
          <button className="portrait-lightbox__backdrop" type="button" aria-label="Close WeChat preview" onClick={() => setIsWechatOpen(false)} />
          <figure className="portrait-lightbox__figure">
            <img src={wechatImagePath} alt="WeChat" decoding="async" />
            <button className="portrait-lightbox__close" type="button" aria-label="Close WeChat preview" onClick={() => setIsWechatOpen(false)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m7 7 10 10M17 7 7 17" />
              </svg>
            </button>
          </figure>
        </div>
      )}
    </section>
  );
}

function Contact() {
  const [isWechatOpen, setIsWechatOpen] = useState(false);

  useEffect(() => {
    if (!isWechatOpen) return undefined;

    function onKeyDown(event) {
      if (event.key === 'Escape') setIsWechatOpen(false);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isWechatOpen]);

  return (
    <section className="contact-page page-shell" aria-label="Contact">
      <div className="contact-page__content reveal">
        <div className="page-shell__intro">
          <p>Contact</p>
          <h1>联系我/与我取得联系</h1>
        </div>
        <div className="contact-page__body">
          <div className="contact-page__links" aria-label="Contact links">
            <a href="mailto:939163155@qq.com">
              <span>939163155@qq.com</span>
              <Arrow />
            </a>
            <button className="contact-page__wechat-trigger" type="button" onClick={() => setIsWechatOpen(true)}>
              <span>15220051017（微信同号）</span>
              <Arrow />
            </button>
          </div>
        </div>
      </div>
      {isWechatOpen && (
        <div className="portrait-lightbox" role="dialog" aria-modal="true" aria-label="WeChat preview">
          <button className="portrait-lightbox__backdrop" type="button" aria-label="Close WeChat preview" onClick={() => setIsWechatOpen(false)} />
          <figure className="portrait-lightbox__figure">
            <img src={wechatImagePath} alt="WeChat" decoding="async" />
            <button className="portrait-lightbox__close" type="button" aria-label="Close WeChat preview" onClick={() => setIsWechatOpen(false)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m7 7 10 10M17 7 7 17" />
              </svg>
            </button>
          </figure>
        </div>
      )}
    </section>
  );
}

function Arrow() {
  return (
    <svg aria-hidden="true" className="inline-link-arrow" viewBox="0 0 24 24">
      <polygon points="7.7 17.7 6.3 16.3 14.6 8 7.7 8 9 6 18 6 18 15 16 16.3 16 9.4 7.7 17.7" />
    </svg>
  );
}
