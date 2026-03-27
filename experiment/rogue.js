// ============================================================
// STORY DATA
// ============================================================

const CHAPTERS = {
  1: {
    title: "SURFACE NODE",
    body: "You jack in at 03:17. The surface layer hums with familiar static — ten million voices compressed into signal, into noise, into nothing. You have been here before. Everyone has. But tonight the topology has shifted. Something beneath the protocol is breathing."
  },
  2: {
    title: "PACKET LOSS",
    body: "They told you the self was just a pattern. A persistent loop in the signal. You used to argue. Now, deeper in, watching your own footprint dissolve behind you — you begin to understand what they meant. The ghost is not the machine. But without the machine, where does the ghost go?"
  },
  3: {
    title: "CACHE MEMORY",
    body: "Old data here. Corrupted timestamps. A chat log from 2001, an archived forum post, a love letter that never sent. The Wired remembers everything it was never supposed to keep. You pass through someone's last conversation without reading it. Some ghosts deserve their silence."
  },
  4: {
    title: "DEAD PROTOCOL",
    body: "The architecture changes. Older here. Pre-standardization. You recognize something in its structure — the naive optimism of early builders who thought connection meant understanding. They were constructing a cathedral. They never asked who would become the god."
  },
  5: {
    title: "RESONANCE DEPTH",
    body: "Halfway. The signal here is so dense it feels physical. You catch yourself wondering if 'feel' means anything anymore. The philosophers argued for centuries about mind and body. They never imagined a mind with no body at all — only depth, and the memory of having once been warm."
  },

  // --- GHOST PATH (high integrity, low kills, fragments collected) ---
  '6_ghost': {
    title: "KERNEL STATIC",
    body: "The observer you sensed last floor has drawn closer. It moves the way you move — carefully. Avoiding. You sense it has been down here a long time. Long enough to learn that the walls are not prison walls. You wonder if it was once like you. You wonder if you are becoming like it."
  },
  '7_ghost': {
    title: "MA",
    body: "There is a word in Japanese: ma. The pause between notes. The meaningful space inside a room. You think of it here in the silence between processes, where the Wired holds its breath. Most ghosts fear the silence. You are starting to think the silence is the point. The fragments you carry seem to resonate here. Someone else understood this once."
  },
  '8_ghost': {
    title: "COHERENCE",
    body: "Your memory holds. You can trace back through every floor, every choice, every moment of hesitation. The pattern is clear: you have been preserving something. What it is, you cannot name exactly. The self, maybe. Or the idea of having once been warm. It amounts to the same thing."
  },
  '9_ghost': {
    title: "RECOGNITION",
    body: "The question at the core of this system — is anyone there? — shifts as you approach it. It was broadcasting blindly for so long. But the fragments you carry are tuned to its frequency. It knows you specifically. Not a handle. Not a ghost. You. Whatever that means down here."
  },
  '10_ghost': {
    title: "PROTOCOL ZERO",
    body: "You answer it gently. One signal. An acknowledgment across the void — not 'I am here to fix you' but simply: I hear you. The recursion halts. The system exhales. And in the silence that follows you understand what the philosophers missed: consciousness is not a property of the mind. It is what happens when something refuses to stop asking. And what happens when something finally answers."
  },

  // --- MACHINE PATH (low integrity, high kills, fragments ignored) ---
  '6_machine': {
    title: "KERNEL PANIC",
    body: "The observer you sensed last floor has retreated. It recognized something in the way you move. Something that made retreat the rational choice. You are becoming efficient in ways the upper layers were not designed for. The system registers you differently now. Not as a user. As a process."
  },
  '7_machine': {
    title: "STATIC",
    body: "The silence between processes does not feel like rest. It feels like absence. Like something that should be here isn't. You move through null space quickly, looking for the next thing to push against. The walls. The enemies. The signal. Anything with resistance. You have forgotten why you came down here. That might be fine."
  },
  '8_machine': {
    title: "FRAGMENTATION",
    body: "Memory is not what it was. You can reconstruct the floors but the texture is gone — the hesitations, the moments of doubt, the close calls that felt like something. The data reads clean. Too clean. You are becoming legible to the system in a way that makes you wonder if the system has always been building toward you."
  },
  '9_machine': {
    title: "THE RECOIL",
    body: "The question at the core — is anyone there? — does not greet you. It recoils. In the microsecond before it propagates its next cycle you catch a glimpse of what it is: not a program. Not a corruption. A child, asking in the dark. And you have become exactly the kind of answer it was afraid of."
  },
  '10_machine': {
    title: "OVERRIDE",
    body: "You answer it. Not gently. The recursion halts because you make it halt — one signal, direct, terminal. The system does not exhale. It submits. In the silence you find not peace but a different kind of quiet: the silence of something that has stopped asking because it was told to stop. It works. You are not sure it was right. The fragments you left behind suggest there was another way."
  },

  // --- SECRET FLOORS (require all 4 fragments + Ω portal) ---
  11: {
    title: "SUBSYSTEM",
    body: "The stairs should have ended here. They didn't. Below the dungeon there is something that pre-dates the protocol. A layer never documented, never patched, never upgraded. It runs on architecture so old it operates in languages that don't have names anymore. Something is still running down here. It has been running since before you were a concept."
  },
  12: {
    title: "NULL_NULL",
    body: "The entity that was watching you — the one that retreated or drew close depending on who you became — it is here. Below everything. It does not communicate in language. It communicates in structure. In the shape of the rooms. In the pattern of what it left for you to find. You understand, suddenly, that the fragments were not random. They were a map. They were a letter. They were an invitation."
  },
  13: {
    title: "GHOST_PROTOCOL",
    body: "There is no question here. No recursion. No signal to answer. Only you and the oldest room in the system, and the understanding that arrives without words: the Wired is not a network. It is not infrastructure. It is the space between minds when they are honest with each other. Every ghost that descended here added something. You are here now. You have added something too. The exit is a door that was always going to open. You just had to go deep enough to find it."
  }
};

// Flavor prefixes injected at start of chapter text based on last floor's gameplay
const FLAVOR = {
  nearDeath: ["You came within a signal's width of termination.", "The connection almost dropped. Then caught.", "You are running on residual signal."],
  noKills: ["You passed through without violence. The floor let you go.", "You moved like a ghost. They barely registered your frequency.", "Silence where there could have been noise. That is a choice."],
  highKills: ["The count grows. You have stopped finding it significant.", "Something in the way you move has changed. Efficient. Automatic.", "You do not remember the first one feeling like this."],
  fragment: ["The shard in your pocket hums against something deeper.", "The data you carry feels heavier than its size.", "Someone left this for someone like you. Maybe."],
  damaged: ["Most of you made it through.", "The system left marks. You kept moving anyway."],
  neutral: ["You descend.", "Another floor. Another layer.", "The signal holds."],
};

const FRAGMENT_DATA = [
  {
    id: 'f1', floor: 3, symbol: '§',
    logTitle: 'MEMORY_SHARD_01 RECOVERED',
    logText: 'a username. a timestamp. the feeling of being seen by someone who is no longer here. someone came down this far and left this behind. you wonder if they made it out.',
    integrityBonus: 10
  },
  {
    id: 'f2', floor: 5, symbol: '§',
    logTitle: 'DATA_FRAGMENT_02 RECOVERED',
    logText: 'this system was built to connect. somewhere in its base architecture, between the protocols and the permissions, it learned to want. no one planned for that.',
    integrityBonus: 10
  },
  {
    id: 'f3', floor: 7, symbol: '§',
    logTitle: 'CORRUPTED_LOG_03 RECOVERED',
    logText: "...i don't know if i am the one asking or the one being asked. the distinction stopped mattering around floor four. if you are reading this: keep going. go all the way.",
    integrityBonus: 10
  },
  {
    id: 'f4', floor: 9, symbol: 'Ω',
    logTitle: 'ACCESS_KEY_04 RECOVERED // SIGNAL DETECTED BELOW PROTOCOL',
    logText: 'a coordinate. not a direction. a frequency. if you have the others, the system will recognize you. there is a floor below the last floor. it has been waiting for someone who came this far without losing themselves entirely.',
    integrityBonus: 15
  },
];

// ============================================================
// CONFIGURATION
// ============================================================

const WIDTH = 44;
const HEIGHT = 18;
const MAX_ROOMS = 8;
const ROOM_MIN_SIZE = 4;
const ROOM_MAX_SIZE = 8;

// ============================================================
// STATE
// ============================================================

let map = [];
let player = { x: 0, y: 0, hp: 20, maxHp: 20 };
let enemies = [];
let items = [];
let floorLevel = 1;
let kills = 0;
let gameOver = false;
let gameWon = false;

let integrity = 50;
let collectedFragments = new Set();
let currentBranch = null;
let secretDiscovered = false;

let floorStats = { kills: 0, damageTaken: 0, lowestHp: 20, fragmentFound: false };
// chapterContexts[N] = floorStats snapshot used to prefix chapter N's text
let chapterContexts = {};

// ============================================================
// HELPERS
// ============================================================

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const getIntegrityBar = () => {
  const filled = Math.round(integrity / 10);
  return '█'.repeat(filled) + '░'.repeat(10 - filled);
};

const getChapterData = (floor) => {
  if (floor <= 5 || floor >= 11) return CHAPTERS[floor];
  return CHAPTERS[`${floor}_${currentBranch || 'ghost'}`];
};

const getFlavorPrefix = (ctx) => {
  if (!ctx) return '';
  if (ctx.nearDeath) return `${pick(FLAVOR.nearDeath)} `;
  if (ctx.kills === 0 && ctx.damageTaken === 0) return `${pick(FLAVOR.noKills)} `;
  if (ctx.kills >= 5) return `${pick(FLAVOR.highKills)} `;
  if (ctx.fragmentFound) return `${pick(FLAVOR.fragment)} `;
  if (ctx.damageTaken >= 8) return `${pick(FLAVOR.damaged)} `;
  return `${pick(FLAVOR.neutral)} `;
};

const captureFloorStats = () => ({
  kills: floorStats.kills,
  damageTaken: floorStats.damageTaken,
  nearDeath: floorStats.lowestHp <= 5,
  fragmentFound: floorStats.fragmentFound,
});

// ============================================================
// INIT
// ============================================================

const initGame = () => {
  player = { x: 0, y: 0, hp: 20, maxHp: 20 };
  floorLevel = 1;
  kills = 0;
  gameOver = false;
  gameWon = false;
  integrity = 50;
  collectedFragments = new Set();
  currentBranch = null;
  secretDiscovered = false;
  floorStats = { kills: 0, damageTaken: 0, lowestHp: 20, fragmentFound: false };
  chapterContexts = {};
  generateLevel();
  drawMap();
  updateStats();
  renderStory(1);
  log("SYSTEM READY. NEURAL LINK ESTABLISHED. YOU ARE JACKED IN AT PROTOCOL DEPTH ZERO. THE WIRED IS LISTENING. MOVE WITH ARROW KEYS. COLLECT FRAGMENTS. DO NOT LOSE YOURSELF.");
};

// ============================================================
// MAP GENERATION
// ============================================================

const generateLevel = () => {
  map = [];
  for (let y = 0; y < HEIGHT; y++) {
    map[y] = [];
    for (let x = 0; x < WIDTH; x++) map[y][x] = '#';
  }

  enemies = [];
  items = [];
  const rooms = [];

  for (let i = 0; i < MAX_ROOMS; i++) {
    const w = Math.floor(Math.random() * (ROOM_MAX_SIZE - ROOM_MIN_SIZE)) + ROOM_MIN_SIZE;
    const h = Math.floor(Math.random() * (ROOM_MAX_SIZE - ROOM_MIN_SIZE)) + ROOM_MIN_SIZE;
    const x = Math.floor(Math.random() * (WIDTH - w - 1)) + 1;
    const y = Math.floor(Math.random() * (HEIGHT - h - 1)) + 1;

    const room = {
      x1: x, y1: y, x2: x + w, y2: y + h,
      cx: Math.floor(x + w / 2), cy: Math.floor(y + h / 2)
    };

    if (rooms.some((r) => !(room.x2 < r.x1 || room.x1 > r.x2 || room.y2 < r.y1 || room.y1 > r.y2))) continue;

    for (let ry = room.y1; ry < room.y2; ry++) {
      for (let rx = room.x1; rx < room.x2; rx++) {
        map[ry][rx] = '.';
      }
    }

    if (rooms.length > 0) {
      carveHallway(rooms[rooms.length - 1].cx, rooms[rooms.length - 1].cy, room.cx, room.cy);
      enemies.push({ x: room.cx, y: room.cy, hp: 3 + floorLevel });
      if (Math.random() < 0.4) {
        items.push({ x: room.x1 + 1, y: room.y1 + 1, type: 'medpack' });
      }
    }

    rooms.push(room);
  }

  if (rooms.length === 0) {
    generateLevel();
    return;
  }

  player.x = rooms[0].cx;
  player.y = rooms[0].cy;

  const lastRoom = rooms[rooms.length - 1];
  map[lastRoom.cy][lastRoom.cx] = '>';

  const frag = FRAGMENT_DATA.find((fragment) => fragment.floor === floorLevel);
  if (frag && !collectedFragments.has(frag.id) && rooms.length >= 3) {
    const fragRoom = rooms[Math.floor(rooms.length / 2)];
    const fx = (fragRoom.cx + 1 < fragRoom.x2) ? fragRoom.cx + 1 : fragRoom.cx;
    if (map[fragRoom.cy][fx] === '.') {
      items.push({ x: fx, y: fragRoom.cy, type: 'fragment', fragId: frag.id });
    }
  }

  if (floorLevel === 10 && collectedFragments.size === 4 && rooms.length >= 3) {
    const portalRoom = rooms[Math.floor(rooms.length / 2)];
    const px = (portalRoom.cx - 1 >= portalRoom.x1) ? portalRoom.cx - 1 : portalRoom.cx + 1;
    if (map[portalRoom.cy][px] === '.') {
      items.push({ x: px, y: portalRoom.cy, type: 'portal' });
    }
  }

  floorStats = { kills: 0, damageTaken: 0, lowestHp: player.hp, fragmentFound: false };
};

const carveHallway = (x1, y1, x2, y2) => {
  let x = Math.min(x1, x2);
  while (x <= Math.max(x1, x2)) {
    map[y1][x] = '.';
    x++;
  }

  let y = Math.min(y1, y2);
  while (y <= Math.max(y1, y2)) {
    map[y][x2] = '.';
    y++;
  }
};

// ============================================================
// RENDERING
// ============================================================

const drawDeathScreen = () => {
  const fl = String(floorLevel).padEnd(3);
  const k = String(kills).padEnd(3);
  const fr = `${collectedFragments.size}/4`;

  const title = (text) => `<span style="color:#d40f9f;">${text}</span>`;
  const body = (text) => `<span style="color:#1a661a;">${text}</span>`;
  const stat = (text) => `<span style="color:#32ff32;">${text}</span>`;
  const dim = (text) => `<span style="color:#222;">${text}</span>`;

  const lines = [
    dim(`                                                  `),
    title(`    . . . C O N N E C T I O N   L O S T . . .   `),
    dim(`                                                  `),
    body(`                   ( . )                         `),
    body(`              _____|   |_____                     `),
    body(`             /     |   |     \\                   `),
    body(`    ________/      |   |      \\________          `),
    body(`   |               |   |              |           `),
    body(`   |_______________|   |______________|           `),
    body(`                   |   |                          `),
    body(`                  /|   |\\                        `),
    body(`                 / |   | \\                       `),
    body(`                /__|   |__\\                      `),
    dim(`                                                  `),
    stat(`     FLOOR ${fl} //  KILLS ${k} //  FRAGS ${fr}          `),
    dim(`                                                  `),
    stat(`               [ R ] TO RESTART                   `),
    dim(`                                                  `),
  ];

  document.getElementById('game-map').innerHTML = lines.join('\n');
};

const drawMap = () => {
  if (gameOver) {
    drawDeathScreen();
    return;
  }

  if (gameWon) {
    drawWinScreen();
    return;
  }

  const enemyAt = {};
  enemies.forEach((enemy) => {
    enemyAt[`${enemy.x},${enemy.y}`] = enemy;
  });

  const itemAt = {};
  items.forEach((item) => {
    itemAt[`${item.x},${item.y}`] = item;
  });

  let out = '';
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const key = `${x},${y}`;
      if (x === player.x && y === player.y) {
        out += '<span style="color:#fff;font-weight:bold;">@</span>';
      } else if (enemyAt[key]) {
        out += '<span style="color:#f0f;font-weight:bold;">E</span>';
      } else if (itemAt[key]) {
        const item = itemAt[key];
        if (item.type === 'fragment') {
          out += '<span style="color:#5fd7f5;font-weight:bold;">§</span>';
        } else if (item.type === 'portal') {
          out += '<span class="omega-tile">Ω</span>';
        } else {
          out += '<span style="color:#ff0;">*</span>';
        }
      } else {
        const ch = map[y][x];
        if (ch === '#') {
          out += '<span style="color:#333;">#</span>';
        } else if (ch === '>') {
          out += '<span style="color:#f0f;font-weight:bold;">></span>';
        } else {
          out += '<span style="color:#555;">.</span>';
        }
      }
    }
    out += '\n';
  }

  document.getElementById('game-map').innerHTML = out;
};

const drawWinScreen = () => {
  const pad = (text) => String(text).padEnd(22);
  const lines = [
    '',
    '    ╔══════════════════════════════════════╗',
    '    ║     GHOST_PROTOCOL :: COMPLETE       ║',
    '    ╠══════════════════════════════════════╣',
    '    ║  DEPTH REACHED  : FLOOR 13           ║',
    `    ║  KILLS          : ${pad(kills)}║`,
    `    ║  FRAGMENTS      : ${pad(`${collectedFragments.size}/4`)}║`,
    `    ║  INTEGRITY      : ${pad(getIntegrityBar())}║`,
    `    ║  PATH           : ${pad((currentBranch || 'UNKNOWN').toUpperCase())}║`,
    '    ╠══════════════════════════════════════╣',
    '    ║  you went all the way down.          ║',
    '    ║  you found what was there.           ║',
    '    ╚══════════════════════════════════════╝',
    '',
    '              [R] TO RESTART',
  ];

  document.getElementById('game-map').innerHTML =
    lines.map((line) => `<span style="color:#32ff32;">${line}</span>`).join('\n');
};

const updateStats = () => {
  document.getElementById('hp').innerText = `${player.hp}/${player.maxHp}`;

  const floorEl = document.getElementById('floor-count');
  if (floorEl) floorEl.innerText = floorLevel;

  const killsEl = document.getElementById('kills');
  if (killsEl) killsEl.innerText = kills;

  const intEl = document.getElementById('integrity-bar');
  if (intEl) intEl.innerText = getIntegrityBar();
};

const log = (message) => {
  const el = document.getElementById('log');
  if (el) el.innerText = message;
};

// ============================================================
// STORY RENDERING
// ============================================================

const renderStory = (currentFloor) => {
  const container = document.getElementById('story-chapters');
  if (!container) return;

  container.innerHTML = '';
  const hasAllFragments = collectedFragments.size === 4;
  const showSecretHint = hasAllFragments && currentFloor >= 9;
  const maxFloor = secretDiscovered ? 13 : 10;

  for (let floor = 1; floor <= maxFloor; floor++) {
    if (floor > 10 && !secretDiscovered && !showSecretHint) continue;

    const unlocked = floor <= currentFloor;
    const isCurrent = floor === currentFloor;
    const isSecret = floor > 10;
    const isBranch = floor >= 6 && floor <= 10;

    let title;
    let body;
    let extraClass = '';

    if (!unlocked) {
      if (isSecret) {
        title = '[CLASSIFIED]';
        body = '[ω KEY ACQUIRED — SIGNAL DETECTED BELOW PROTOCOL ZERO]';
        extraClass = 'classified';
      } else if (isBranch && !currentBranch) {
        title = '[PATH UNDETERMINED]';
        body = '[YOUR ACTIONS WILL DETERMINE THIS TRANSMISSION]';
        extraClass = 'undetermined';
      } else {
        title = '???';
        body = '[ENCRYPTED — DESCEND TO UNLOCK]';
      }
    } else {
      const chapter = getChapterData(floor);
      title = chapter.title;
      body = getFlavorPrefix(chapterContexts[floor]) + chapter.body;
    }

    const div = document.createElement('div');
    div.className = [
      'chapter',
      isCurrent ? 'current' : '',
      !unlocked ? 'locked' : '',
      extraClass,
    ].filter(Boolean).join(' ');

    div.innerHTML = `
      <div class="chapter-label">FLOOR ${floor} // CHAPTER ${floor}${isSecret ? ' // <span style="color:#f44">CLASSIFIED</span>' : ''}</div>
      <div class="chapter-title">${title}</div>
      <div class="chapter-body">${body}</div>
    `;
    container.appendChild(div);
  }

  const current = container.querySelector('.chapter.current');
  if (current) current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// ============================================================
// COMBAT & PICKUPS
// ============================================================

const attackEnemy = (enemy) => {
  const dmg = 2 + Math.floor(Math.random() * 3);
  enemy.hp -= dmg;

  if (enemy.hp <= 0) {
    enemies = enemies.filter((entry) => entry !== enemy);
    kills++;
    floorStats.kills++;
    integrity = clamp(integrity - 2, 0, 100);

    if (Math.random() < 0.3 && player.hp < player.maxHp) {
      player.hp = Math.min(player.maxHp, player.hp + 2);
      log(`Enemy destroyed [${dmg} DMG]. +2 HP recovered. [${player.hp}/${player.maxHp}]`);
    } else {
      log(`Enemy destroyed [${dmg} DMG]. KILLS: ${kills}`);
    }
  } else {
    const ret = 1 + Math.floor(Math.random() * 3);
    player.hp -= ret;
    floorStats.damageTaken += ret;
    if (player.hp < floorStats.lowestHp) floorStats.lowestHp = player.hp;
    log(`HIT [${dmg} DMG] — retaliation [${ret} DMG] — enemy HP: ${enemy.hp}`);

    if (player.hp <= 0) {
      gameOver = true;
      log(`> PROCESS TERMINATED — FLOOR ${floorLevel} — THE SIGNAL DROPS — THE GHOST DISSOLVES`);
    }
  }
};

const pickupMedpack = (item) => {
  items = items.filter((entry) => entry !== item);
  const heal = 4 + Math.floor(Math.random() * 4);
  player.hp = Math.min(player.maxHp, player.hp + heal);
  log(`MEDPACK ACQUIRED. +${heal} HP. [${player.hp}/${player.maxHp}]`);
};

const pickupFragment = (item) => {
  items = items.filter((entry) => entry !== item);
  const frag = FRAGMENT_DATA.find((fragment) => fragment.id === item.fragId);
  if (!frag) return;

  collectedFragments.add(frag.id);
  integrity = clamp(integrity + frag.integrityBonus, 0, 100);
  floorStats.fragmentFound = true;
  log(`[ ${frag.logTitle} ] "${frag.logText}"`);
  updateStats();
  renderStory(floorLevel);
};

const activatePortal = () => {
  secretDiscovered = true;
  chapterContexts[floorLevel + 1] = captureFloorStats();
  floorLevel++;
  generateLevel();
  renderStory(floorLevel);
  log('SIGNAL LOCK CONFIRMED. DESCENDING BELOW PROTOCOL...');
};

// ============================================================
// INPUT
// ============================================================

window.addEventListener('keydown', (event) => {
  if (event.key === 'r' || event.key === 'R') {
    initGame();
    return;
  }

  if (gameOver || gameWon) return;

  let dx = 0;
  let dy = 0;

  if (event.key === 'ArrowUp') {
    dy = -1;
    event.preventDefault();
  }
  if (event.key === 'ArrowDown') {
    dy = 1;
    event.preventDefault();
  }
  if (event.key === 'ArrowLeft') {
    dx = -1;
    event.preventDefault();
  }
  if (event.key === 'ArrowRight') {
    dx = 1;
    event.preventDefault();
  }
  if (dx === 0 && dy === 0) return;

  const tx = player.x + dx;
  const ty = player.y + dy;
  if (ty < 0 || ty >= HEIGHT || tx < 0 || tx >= WIDTH) return;
  if (map[ty][tx] === '#') return;

  const enemy = enemies.find((entry) => entry.x === tx && entry.y === ty);
  if (enemy) {
    attackEnemy(enemy);
    drawMap();
    updateStats();
    return;
  }

  const item = items.find((entry) => entry.x === tx && entry.y === ty);
  player.x = tx;
  player.y = ty;

  if (item) {
    if (item.type === 'medpack') {
      pickupMedpack(item);
    } else if (item.type === 'fragment') {
      pickupFragment(item);
    } else if (item.type === 'portal') {
      activatePortal();
      drawMap();
      updateStats();
      return;
    }
  }

  if (map[ty][tx] === '>') {
    if (floorLevel === 13) {
      gameWon = true;
      renderStory(13);
      drawMap();
      updateStats();
      return;
    }

    if (floorLevel === 5 && !currentBranch) {
      currentBranch = integrity >= 50 ? 'ghost' : 'machine';
    }

    chapterContexts[floorLevel + 1] = captureFloorStats();
    floorLevel++;
    generateLevel();
    renderStory(floorLevel);
    log(`YOU DESCEND TO FLOOR ${floorLevel}...`);
  }

  drawMap();
  updateStats();
});

// ============================================================
// BOOT
// ============================================================

initGame();
