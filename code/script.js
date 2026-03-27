const HITCOUNT_URL = 'https://weirdscifi.ratiosemper.com/neocities.php?sitename=pocketperson';
const TIMEZONE_DELAY_MS = 3000;
const MATRIX_INTERVAL_MS = 50;
const GLITCH_INTERVAL_MS = 3000;
const MATRIX_FONT_SIZE = 14;
const LOCATIONS = [
  { name: 'Los Angeles', zone: 'America/Los_Angeles' },
  { name: 'Washington DC', zone: 'America/New_York' },
  { name: 'Geneva', zone: 'Europe/Zurich' },
  { name: 'New Delhi', zone: 'Asia/Kolkata' },
  { name: 'Kyoto', zone: 'Asia/Tokyo' },
];

let currentTimezoneIndex = 0;

const getLogPath = () => document.body.dataset.logPath || 'log.json';
const getProfilePath = () => document.body.dataset.profilePath || 'data.json';

const convertEpoch = (timestamp) => {
  const parsedTimestamp = Number(timestamp);
  if (Number.isNaN(parsedTimestamp)) {
    return 'UNKNOWN DATE';
  }

  return new Date(parsedTimestamp * 1000).toLocaleString();
};

const generateKatakana = () => {
  const lowerBound = 0x30A0;
  const upperBound = 0x30FF;
  const randomCodePoint =
    Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;

  return String.fromCharCode(randomCodePoint);
};

const hitcount = async () => {
  const viewCount = document.querySelector('.views');
  if (!viewCount) {
    return;
  }

  try {
    const response = await fetch(HITCOUNT_URL);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const siteData = await response.json();
    const views = siteData?.info?.views;

    if (typeof views === 'number') {
      viewCount.textContent = views.toString().padStart(7, '0');
    }
  } catch (error) {
    console.error('Failed to load hit counter:', error);
  }
};

const updateTimezoneSlider = () => {
  const container = document.getElementById('timezone-container');
  if (!container) {
    return;
  }

  const location = LOCATIONS[currentTimezoneIndex];
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: location.zone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());

  const slide = document.createElement('div');
  slide.className = 'timezone-slide active';
  slide.textContent = `${location.name}: ${time}`;

  container.replaceChildren(slide);
  currentTimezoneIndex = (currentTimezoneIndex + 1) % LOCATIONS.length;
};

const initMatrixRain = () => {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) {
    return;
  }

  const context = canvas.getContext('2d');
  if (!context) {
    return;
  }

  let drops = [];

  const resetCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / MATRIX_FONT_SIZE);
    drops = Array.from(
      { length: columns },
      () => Math.random() * -100
    );
  };

  const draw = () => {
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#32ff32';
    context.font = `${MATRIX_FONT_SIZE}px monospace`;

    drops.forEach((drop, index) => {
      const x = index * MATRIX_FONT_SIZE;
      const y = drop * MATRIX_FONT_SIZE;

      context.fillText(generateKatakana(), x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[index] = 0;
        return;
      }

      drops[index] += 1;
    });
  };

  resetCanvas();
  window.addEventListener('resize', resetCanvas);
  window.setInterval(draw, MATRIX_INTERVAL_MS);
};

const triggerRandomGlitch = () => {
  const glitchElements = document.querySelectorAll('.glitch');
  if (glitchElements.length === 0) {
    return;
  }

  window.setInterval(() => {
    if (Math.random() <= 0.7) {
      return;
    }

    glitchElements.forEach((element) => {
      element.style.animation = 'none';
      window.setTimeout(() => {
        element.style.animation = '';
      }, 50);
    });
  }, GLITCH_INTERVAL_MS);
};

const loadLog = async () => {
  try {
    const response = await fetch(getLogPath());
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to load logs:', error);
    return [];
  }
};

const mainPageLog = async () => {
  const title = document.getElementById('title');
  const date = document.getElementById('date');
  const content = document.getElementById('content');
  if (!title || !date || !content) {
    return;
  }

  const logs = await loadLog();
  const latestLog = logs.at(-1);

  if (!latestLog) {
    title.textContent = 'NO TRANSMISSIONS FOUND';
    date.textContent = 'Awaiting signal...';
    content.textContent = 'No log entries yet.';
    return;
  }

  title.textContent = latestLog.title || 'UNTITLED';
  date.textContent = convertEpoch(latestLog.date);

  const excerpt = (latestLog.content || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 20)
    .join(' ');

  content.textContent = excerpt ? `${excerpt}...` : 'No excerpt available.';
};

const logPage = async () => {
  const logsDiv = document.getElementById('logs');
  if (!logsDiv) {
    return;
  }

  const logs = (await loadLog()).slice().reverse();
  logsDiv.replaceChildren();

  const countLine = document.createElement('p');
  countLine.style.cssText =
    'font-size:0.62rem;color:#333;letter-spacing:0.2em;margin-bottom:0.75rem;';
  countLine.textContent = `${String(logs.length).padStart(3, '0')} ENTRIES FOUND`;
  logsDiv.appendChild(countLine);

  if (logs.length === 0) {
    const emptyState = document.createElement('p');
    emptyState.textContent = 'No transmissions logged yet.';
    logsDiv.appendChild(emptyState);
    return;
  }

  const allTags = [...new Set(logs.flatMap((log) => log.tags || []))];
  const filterBar = document.createElement('div');
  filterBar.className = 'log-filter-bar';

  const applyFilter = (tag) => {
    filterBar.querySelectorAll('.log-filter-btn').forEach((button) => {
      button.classList.toggle('active', button.dataset.tag === (tag ?? ''));
    });

    logsDiv.querySelectorAll('.log-card').forEach((card) => {
      const cardTags = card.dataset.tags ? card.dataset.tags.split(',') : [];
      const shouldHide = tag !== null && !cardTags.includes(tag);
      card.classList.toggle('hidden', shouldHide);
    });
  };

  const makeFilterButton = (label, tag) => {
    const button = document.createElement('button');
    button.className = `log-filter-btn${tag === null ? ' active' : ''}`;
    button.dataset.tag = tag ?? '';
    button.textContent = tag === null ? '[ALL]' : `[${label}]`;
    button.addEventListener('click', () => applyFilter(tag));
    return button;
  };

  filterBar.appendChild(makeFilterButton('ALL', null));
  allTags.forEach((tag) => {
    filterBar.appendChild(makeFilterButton(tag, tag));
  });
  logsDiv.appendChild(filterBar);

  const container = document.createElement('div');

  logs.forEach((log, index) => {
    const tags = log.tags || [];

    const card = document.createElement('div');
    card.className = 'log-card';
    card.dataset.tags = tags.join(',');
    card.id = log.ref || `log-${index}`;
    card.style.animationDelay = `${index * 0.08}s`;

    const ref = document.createElement('div');
    ref.className = 'log-card-ref';
    ref.textContent = `TRANSMISSION_${String(logs.length - index).padStart(3, '0')} // ${log.ref || '---'}`;

    const title = document.createElement('h3');
    title.className = 'log-card-title';
    title.textContent = log.title || 'UNTITLED';

    const meta = document.createElement('div');
    meta.className = 'log-card-meta';

    const dateSpan = document.createElement('span');
    dateSpan.textContent = convertEpoch(log.date);
    meta.appendChild(dateSpan);

    tags.forEach((tag) => {
      const tagElement = document.createElement('button');
      tagElement.className = 'log-tag';
      tagElement.textContent = tag;
      tagElement.addEventListener('click', () => applyFilter(tag));
      meta.appendChild(tagElement);
    });

    const body = document.createElement('div');
    body.className = 'log-card-body';
    body.innerHTML = log.content || '';

    card.append(ref, title, meta, body);
    container.appendChild(card);
  });

  logsDiv.appendChild(container);
};

const loadProfile = async () => {
  try {
    const response = await fetch(getProfilePath());
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to load profile data:', error);
    return null;
  }
};

const renderAbout = (about) => {
  const el = document.getElementById('about-content');
  if (!el || !about) return;
  el.innerHTML = Object.entries(about)
    .map(([key, val]) => `${key}: <span class="text-green">${val}</span>`)
    .join('<br>');
};

const renderWatching = (watching) => {
  const el = document.getElementById('watching-content');
  if (!el || !watching) return;
  el.innerHTML = watching.map((item) => {
    const bars = '▓'.repeat(item.bars) + '░'.repeat(10 - item.bars);
    const note = item.note ? `<span class="text-accent">${item.note}</span>` : '<span></span>';
    return `<div class="watch-row"><span class="watch-title">${item.title}</span><span class="text-green">${bars}</span><span class="watch-label">${item.label}</span>${note}</div>`;
  }).join('');
};

const renderInterests = (interests) => {
  const el = document.getElementById('interests-content');
  if (!el || !interests) return;
  const sizeMap = { 1: '0.6rem', 2: '0.75rem', 3: '0.9rem', 4: '1.1rem', 5: '1.3rem' };
  el.innerHTML = interests.map(({ text, weight }) =>
    `<span class="interest-tag" style="font-size:${sizeMap[weight] ?? '0.9rem'}">${text}</span>`
  ).join('');
};

const renderMood = (mood) => {
  const el = document.getElementById('mood-content');
  if (!el || !mood) return;
  const quote = mood.quote.replace(/\n/g, '<br>');
  el.innerHTML = `STATUS: <span class="blink text-green">${mood.status}</span><br><br><em class="mood-quote">"${quote}"</em>`;
};

const initProfile = async () => {
  const data = await loadProfile();
  if (!data) {
    console.error('initProfile: no data returned from', getProfilePath());
    return;
  }
  renderAbout(data.about);
  renderWatching(data.watching);
  renderInterests(data.interests);
  renderMood(data.mood);
  renderSystem(data.system);
};

const renderSystem = (system) => {
  const el = document.getElementById('system-content');
  if (!el || !system) return;
  el.innerHTML = system.map(({ label, value, style }) => {
    let valueHtml;
    if (style === 'vapor')   valueHtml = `<span class="vapor-pulse">${value}</span>`;
    else if (style === 'warning') valueHtml = `<span class="text-warning">${value}</span>`;
    else if (style === 'accent')  valueHtml = `<span class="text-accent">${value}</span>`;
    else                          valueHtml = value;
    return `<div class="system-row"><span class="system-label">${label}:</span>${valueHtml}</div>`;
  }).join('');
};

const initSystem = async () => {
  const data = await loadProfile();
  if (!data) return;
  renderSystem(data.system);
};

const getIntelPath = () => document.body.dataset.intelPath || 'intel.json';

const loadIntel = async () => {
  try {
    const response = await fetch(getIntelPath());
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to load intel data:', error);
    return null;
  }
};

const renderDossier = ({ classification, threat_level, body }) => {
  const meta = document.getElementById('dossier-meta');
  const bodyEl = document.getElementById('dossier-body');
  if (meta) {
    meta.innerHTML = `CLASSIFICATION: ${classification} &nbsp;|&nbsp; THREAT_LEVEL: <span class="text-warning">${threat_level}</span> // probably`;
  }
  if (bodyEl) {
    bodyEl.innerHTML = body
      .map((p) => `<p class="dossier-body">${p}</p>`)
      .join('');
  }
};

const renderSkills = (skills) => {
  const el = document.getElementById('skill-list');
  if (!el || !skills) return;
  el.innerHTML = skills.map(({ name, bars, label, warning }) => {
    const filled = '▓'.repeat(bars) + '░'.repeat(10 - bars);
    const barClass = warning ? 'text-warning' : 'text-green';
    const labelClass = warning ? 'text-warning' : '';
    return `<div class="skill-row"><span class="skill-name">${name}</span><span class="${barClass}">${filled}</span><span class="skill-label ${labelClass}">${label}</span></div>`;
  }).join('');
};

const renderReading = ({ now, next }) => {
  const el = document.getElementById('reading-list');
  if (!el) return;
  el.innerHTML = `
    <span class="text-accent">NOW:</span><br>
    ${now.title}<br>
    <span class="reading-author">— ${now.author}</span><br><br>
    <span class="text-accent">NEXT:</span><br>
    ${next.title}<br>
    <span class="reading-author">— ${next.author}</span>
  `;
};

const renderSignal = (signal) => {
  const el = document.getElementById('signal-list');
  if (!el || !signal) return;
  el.innerHTML = signal.map(({ label, value }, i) =>
    `<span class="signal-label">${label}:</span><br>
    <span class="text-green">${value}</span>${i < signal.length - 1 ? '<br><br>' : ''}`
  ).join('');
};

const renderPhilosophy = (philosophy) => {
  const el = document.getElementById('philosophy-content');
  if (!el || !philosophy) return;
  el.innerHTML = philosophy.map(({ quote, attribution }, i) => {
    const isLast = i === philosophy.length - 1;
    return `<p class="${isLast ? '' : 'philosophy-quote'}">
      <em>"${quote}"</em>
      <span class="philosophy-attribution">— ${attribution}</span>
    </p>`;
  }).join('');
};

const initIntel = async () => {
  const data = await loadIntel();
  if (!data) {
    console.error('initIntel: no data returned from', getIntelPath());
    return;
  }
  renderDossier(data.dossier);
  renderSkills(data.skills);
  renderReading(data.reading);
  renderSignal(data.signal);
  renderPhilosophy(data.philosophy);
};

