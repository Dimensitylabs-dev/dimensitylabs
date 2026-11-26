import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

const R2 = 'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/';
const WORK = [
  ['Roadster 3D', 'designs/roadster-3d-car-landing.mp4', 'roadster-3d'],
  ['Living Portrait', 'aaaf/living-portrait-hero.mp4', 'living-portrait'],
  ['Particle Self', 'aaaf/oraciteslArea.mp4', 'particle-self'],
  ['Robot Jellyfish', 'aaaf/medusa-jellyfish-hero.mp4', 'robot-jellyfish'],
  ['Ink Reveal', 'designs/ink-reveal-hover.mp4', 'ink-reveal'],
  ['Space Voyage', 'designs/space-voyage-video.mp4', 'space-voyage'],
  ['Helion Dispatch', 'designs/helion-dispatch-landing.mp4', 'helion-dispatch'],
  ['Honey Bee', 'designs/honey-bee-melli-landing.mp4', 'honey-bee'],
];
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const mix = (a, b, t) => a + (b - a) * t;
const ease = t => t * t * (3 - 2 * t);
const out = t => 1 - (1 - t) ** 3;
const span = (p, a, b) => clamp((p - a) / (b - a));

/** Dispose any prior mount so Strict Mode / HMR cannot leave a crashing rAF. */
let activeDispose = null;

/**
 * Start the Vante ribbon against the current DOM (#track / #gl / …).
 * Returns a disposer for React Strict Mode / route changes.
 */
export function mount() {
  if (typeof activeDispose === 'function') {
    try { activeDispose(); } catch (_) { /* ignore */ }
    activeDispose = null;
  }

  const $ = id => document.getElementById(id);
  const canvas = $('gl');
  const stage = $('stage');
  const track = $('track');
  if (!canvas || !stage || !track) return () => {};

  const isMobile = () => innerWidth < 768;

  /* ---------- renderer ---------- */
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isMobile(),
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setClearColor(0, 0);
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  const scene = new THREE.Scene();
  const FOV = 30, camera = new THREE.PerspectiveCamera(FOV, 1, .1, 100);

  /* ---------- ribbon path ---------- */
  /* Desktop = larger near-pass. Mobile ribbon stays smaller while scrolling. */
  let path, PATH_L = 1, pathIsMobile = null;
  const SAMPLES = 1200, pathP = [], pathT = [];
  const PH0 = -1.5, PH1 = Math.PI * 2 + 1.35;
  const DESKTOP_CARD = { w: 2.45, h: 1.54, gap: .04 };
  const MOBILE_CARD = { w: 1.2, h: 0.755, gap: .03 };
  function ribbonCard() {
    return isMobile() ? MOBILE_CARD : DESKTOP_CARD;
  }
  function nearDepthBase() {
    // Farther near-pass on mobile → smaller on-screen ribbon while scrolling.
    return isMobile() ? 11.5 : 6.2;
  }
  function buildPath() {
    const base = nearDepthBase();
    const pts = [];
    for (let i = 0; i <= 160; i++) {
      const t = i / 160, ph = mix(PH0, PH1, t), cs = Math.cos(ph), u = 2 * t - 1;
      // a shallow arc close to the camera, then long runs far behind it
      const depth = cs > 0 ? base + 16.4 * cs ** .9 : base + 2.2 * cs;
      const edge = .84 + .5 * span(.14 - t, 0, .14) + .8 * span(t, .84, 1);
      pts.push(new THREE.Vector3(edge * Math.sin(ph) * depth * .561, .5 * Math.sign(u) * Math.abs(u) ** 1.4 * depth * .63, -depth));
    }
    path = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
    path.arcLengthDivisions = 1500;
    PATH_L = path.getLength(); pathP.length = pathT.length = 0;
    for (let i = 0; i <= SAMPLES; i++) { const u = i / SAMPLES; pathP.push(path.getPointAt(u)); pathT.push(path.getTangentAt(u)); }
    pathIsMobile = isMobile();
  }
  const at = (s, op, ot) => {
    const f = clamp(s / PATH_L) * SAMPLES, i = Math.min(SAMPLES - 1, Math.floor(f)), k = f - i;
    op.lerpVectors(pathP[i], pathP[i + 1], k); ot.lerpVectors(pathT[i], pathT[i + 1], k).normalize();
  };

  /* ---------- cards ---------- */
  const CARD_ASPECT = DESKTOP_CARD.w / DESKTOP_CARD.h;
  const NX = 16, NY = 3;
  const MAX_PLAYING = 3;
  const vs = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
  const fs = `uniform sampler2D map;uniform vec2 cover;uniform float aspect,ready,radius;varying vec2 vUv;
void main(){
  vec2 q=(abs(vUv-.5)-.5)*vec2(aspect,1.)+radius;
  float d=length(max(q,0.))+min(max(q.x,q.y),0.)-radius;
  float px=fwidth(d),a=1.-smoothstep(-px,px,d);
  if(a<.01)discard;
  vec2 uv=vUv;if(!gl_FrontFacing)uv.x=1.-uv.x;
  vec3 c=mix(vec3(.075),texture2D(map,(uv-.5)*cover+.5).rgb,ready);
  float edge=smoothstep(-.012-px,-.012,d);
  gl_FragColor=vec4(mix(c,vec3(1.),edge*.1),a);
}`;
  const cards = WORK.map(([title, src, slug], i) => {
    const v = document.createElement('video');
    Object.assign(v, {crossOrigin:'anonymous', muted:true, loop:true, playsInline:true, preload:'metadata', src:R2 + src});
    v.setAttribute('playsinline', '');
    const tex = new THREE.VideoTexture(v);
    tex.colorSpace = THREE.NoColorSpace; tex.minFilter = THREE.LinearFilter; tex.magFilter = THREE.LinearFilter; tex.generateMipmaps = false;
    const geo = new THREE.PlaneGeometry(1, 1, NX, NY);
    const mat = new THREE.ShaderMaterial({vertexShader:vs, fragmentShader:fs, transparent:true, side:THREE.DoubleSide,
      uniforms:{map:{value:tex}, cover:{value:new THREE.Vector2(1, 1)}, aspect:{value:CARD_ASPECT}, ready:{value:0}, radius:{value:.02}}});
    const mesh = new THREE.Mesh(geo, mat); mesh.frustumCulled = false; scene.add(mesh);
    const c = {i, title, slug, href: `/work/${slug}`, v, tex, geo, mat, mesh, rect:null, rank: 0};
    v.addEventListener('loadeddata', () => {
      const va = v.videoWidth / v.videoHeight, ca = CARD_ASPECT;
      mat.uniforms.cover.value.set(va > ca ? ca / va : 1, va > ca ? 1 : va / ca);
      mat.uniforms.ready.value = 1;
    });
    return c;
  });

  /* ---------- layout ---------- */
  const GZ_DESKTOP = 6.6;
  let W = 1, H = 1, asp = 1, cols = 3, rows = 2, tanH = .3153, gridZ = GZ_DESKTOP;
  function resize() {
    W = innerWidth; H = innerHeight; asp = W / H;
    const dprCap = isMobile() ? 1 : 1.5;
    renderer.setPixelRatio(Math.min(devicePixelRatio, dprCap));
    renderer.setSize(W, H, false);
    camera.aspect = asp;
    // Desktop unchanged. Mobile uses a wider FOV so the scrolling ribbon reads smaller.
    if (isMobile()) {
      camera.fov = 58;
    } else if (asp >= 16 / 9) {
      camera.fov = FOV;
    } else if (asp >= 0.85) {
      camera.fov = Math.atan(.561 / asp) * 360 / Math.PI;
    } else {
      camera.fov = 36;
    }
    camera.updateProjectionMatrix();
    tanH = Math.tan(camera.fov * Math.PI / 360);
    cols = asp < .9 ? 2 : 3; rows = asp < .9 ? 3 : 2;
    // Final grid: desktop bigger plane; mobile moderate fill (not the huge ribbon scale).
    gridZ = isMobile() ? 7.0 : GZ_DESKTOP;
    if (pathIsMobile !== isMobile()) buildPath();
  }
  addEventListener('resize', resize); resize(); buildPath();
  function grid(i) {
    const vh = 2 * gridZ * tanH, vw = vh * asp;
    const mobile = isMobile();
    const gw = vw * (cols === 3 ? .88 : mobile ? .90 : .90);
    const gap = gw * (mobile ? .024 : .017);
    const cw = (gw - gap * (cols - 1)) / cols, ch = cw / CARD_ASPECT;
    const rowGap = gap * (mobile ? 1.2 : 1.6);
    const gh = ch * rows + rowGap * (rows - 1);
    const c = i % cols, r = Math.floor(i / cols);
    return {x:-gw / 2 + cw / 2 + c * (cw + gap), y:gh / 2 - ch / 2 - r * (ch + rowGap), w:cw, h:ch, vw, vh, c, r};
  }

  /* ---------- scroll ---------- */
  /* Section-relative progress so the ribbon works mid-page on the DL homepage.
     Dual exponential + light spring damping keeps wheel/trackpad scrub buttery. */
  let target = 0, smoothTarget = 0, p = 0, vel = 0, frozen = false, offscreen = false, raf = 0, lastRenderedP = -1;
  const TARGET_LERP = 0.11;
  const SPRING = 0.038;
  const DAMP = 0.86;
  const readScroll = () => {
    const t = $('track');
    if (!t) return;
    const travel = Math.max(1, t.offsetHeight - innerHeight);
    const top = t.getBoundingClientRect().top + scrollY;
    target = clamp((scrollY - top) / travel);
  };
  addEventListener('scroll', readScroll, {passive:true}); readScroll();

  /* ---------- pose ---------- */
  const op = new THREE.Vector3(), ot = new THREE.Vector3(), up = new THREE.Vector3(), Y = new THREE.Vector3(0, 1, 0), vp = new THREE.Vector3();
  function poseRibbon(c, head, cardW, cardH, step) {
    const pos = c.geo.attributes.position, centre = head - c.i * step;
    for (let iy = 0; iy <= NY; iy++) for (let ix = 0; ix <= NX; ix++) {
      const k = iy * (NX + 1) + ix, lu = ix / NX - .5, lv = .5 - iy / NY;
      at(centre + lu * cardW, op, ot);
      // keep the sheet upright, leaning a little into the turn
      up.copy(Y).addScaledVector(ot, -Y.dot(ot)).normalize();
      vp.copy(op).addScaledVector(up, lv * cardH);
      pos.setXYZ(k, vp.x, vp.y, vp.z);
    }
    pos.needsUpdate = true;
  }
  function poseGrid(c, q) {
    const g = grid(c.i), pos = c.geo.attributes.position;
    const dx = (g.c - (cols - 1) / 2) * 1.2 + (cols === 3 && g.c === 1 ? 0 : 0), dy = g.r < rows / 2 ? 1 : -1;
    const ox = dx * g.vw * .62 * (1 - q), oy = dy * g.vh * (g.c === 1 ? .95 : .34) * (1 - q), tilt = (1 - q) * .22 * (g.c - 1 || .5) * dy;
    const cs = Math.cos(tilt), sn = Math.sin(tilt);
    for (let iy = 0; iy <= NY; iy++) for (let ix = 0; ix <= NX; ix++) {
      const k = iy * (NX + 1) + ix, x = (ix / NX - .5) * g.w, y = (.5 - iy / NY) * g.h;
      pos.setXYZ(k, g.x + ox + x * cs - y * sn, g.y + oy + x * sn + y * cs, -gridZ - (1 - q) * .6 * Math.sin(ix / NX * Math.PI));
    }
    pos.needsUpdate = true;
    c.rect = g;
  }

  const RIB_A = .14, RIB_B = .63;
  function render() {
    if (frozen || offscreen) return;
    const l1 = $('l1'), l2 = $('l2'), cap = $('cap'), rule = $('rule');
    if (!l1 || !l2 || !cap || !rule) return;
    const pp = p;
    const { w: cardW, h: cardH, gap } = ribbonCard();
    const step = cardW + gap;
    // headline runs right across the page in opposite directions
    const rise = 1 - out(span(pp, 0, .12));
    const mobile = isMobile();
    const runFrom = mobile ? -42 : -50;
    const runTo = mobile ? 58 : 76;
    const riseAmt = mobile ? 22 : 34;
    const run = mix(runFrom, runTo, span(pp, 0, .58));
    const hlFade = 1 - span(pp, .62, .72);
    l1.style.transform = `translate3d(${run}vw,${rise * riseAmt}vh,0)`;
    l2.style.transform = `translate3d(${-run}vw,${rise * riseAmt}vh,0)`;
    l1.style.opacity = String(hlFade);
    l2.style.opacity = String(hlFade);
    const capA = (1 - span(pp, .52, .57)) * hlFade;
    cap.style.opacity = String(capA); cap.style.transform = `translate(-50%,calc(-50% + ${rise * riseAmt}vh))`;
    const intro = 1 - span(pp, 0, .05);
    for (const id of ['cross', 'glow']) {
      const el = $(id); if (el) el.style.opacity = intro;
    }
    rule.style.transform = `scaleX(${ease(span(pp, .72, .86))})`;
    rule.style.top = '50%';
    // ribbon, then the grid
    const pr = span(pp, RIB_A, RIB_B), head = mix(0, PATH_L + cards.length * step, pr);
    for (const c of cards) {
      const s = head - c.i * step, end = PATH_L - cardW;
      if (s < end) {
        c.mesh.visible = s > cardW; c.rect = null;
        // Rank by proximity to the near pass (centre of strip under camera).
        c.rank = c.mesh.visible ? Math.abs(s - PATH_L * 0.45) : 1e9;
        if (c.mesh.visible) poseRibbon(c, head, cardW, cardH, step);
      } else if (c.i < cols * rows) {
        // each card flies to its slot the moment it leaves the rail
        const st = mix(RIB_A, RIB_B, (end + c.i * step) / (PATH_L + cards.length * step)), q = out(span(pp, st, st + .13));
        c.mesh.visible = q > .001;
        c.rank = c.mesh.visible ? c.i : 1e9;
        if (c.mesh.visible) poseGrid(c, q);
      } else { c.mesh.visible = false; c.rect = null; c.rank = 1e9; }
    }
    renderer.render(scene, camera);
    lastRenderedP = pp;
  }

  function syncVideos() {
    if (offscreen) {
      for (const c of cards) { if (!c.v.paused) c.v.pause(); }
      return;
    }
    const playable = cards
      .filter(c => c.mesh.visible)
      .sort((a, b) => a.rank - b.rank)
      .slice(0, MAX_PLAYING);
    const playSet = new Set(playable);
    for (const c of cards) {
      if (playSet.has(c)) {
        if (c.v.paused) c.v.play().catch(() => {});
      } else if (!c.v.paused) {
        c.v.pause();
      }
    }
  }

  /* ---------- pick / hover / click ---------- */
  const nameEl = $('name');
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  let hoverCard = null;

  function pickCard(e) {
    // Prefer settled grid hit-testing (stable orthographic-style plane).
    if (p > .86) {
      const nx = (e.clientX / W - .5), ny = (.5 - e.clientY / H);
      for (const c of cards) {
        const g = c.rect; if (!g) continue;
        const x = nx * g.vw, y = ny * g.vh;
        if (Math.abs(x - g.x) < g.w / 2 && Math.abs(y - g.y) < g.h / 2) return c;
      }
    }
    // Ribbon (and transition): raycast against live deformed meshes.
    // Bounding spheres only when picking — not every pose frame.
    for (const c of cards) {
      if (c.mesh.visible) c.geo.computeBoundingSphere();
    }
    pointerNdc.set((e.clientX / W) * 2 - 1, -(e.clientY / H) * 2 + 1);
    raycaster.setFromCamera(pointerNdc, camera);
    const meshes = cards.filter(c => c.mesh.visible).map(c => c.mesh);
    const hits = raycaster.intersectObjects(meshes, false);
    if (!hits.length) return null;
    return cards.find(c => c.mesh === hits[0].object) || null;
  }

  const onPointer = e => {
    const hit = pickCard(e);
    hoverCard = hit;
    stage.style.cursor = hit ? 'pointer' : '';
    if (!nameEl) return;
    nameEl.style.opacity = hit && p > .86 ? 1 : 0;
    if (hit) {
      nameEl.textContent = hit.title;
      nameEl.style.transform = `translate(${e.clientX + 14}px,${e.clientY + 16}px)`;
    }
  };

  const onClick = e => {
    const hit = pickCard(e);
    if (!hit?.href) return;
    e.preventDefault();
    window.location.assign(hit.href);
  };

  stage.addEventListener('pointermove', onPointer);
  stage.addEventListener('click', onClick);

  /* ---------- visibility ---------- */
  const io = new IntersectionObserver((entries) => {
    const entry = entries[0];
    const visible = !!(entry && entry.isIntersecting);
    offscreen = !visible;
    if (offscreen) {
      for (const c of cards) { if (!c.v.paused) c.v.pause(); }
    } else {
      readScroll();
      lastRenderedP = -1;
    }
  }, { root: null, threshold: 0.01, rootMargin: '10% 0px' });
  io.observe(stage);

  /* ---------- loop ---------- */
  function loop() {
    if (!frozen && !offscreen) {
      smoothTarget += (target - smoothTarget) * TARGET_LERP;
      vel += (smoothTarget - p) * SPRING;
      vel *= DAMP;
      p += vel;
      if (Math.abs(smoothTarget - p) < .00004 && Math.abs(vel) < .00004) {
        p = smoothTarget;
        vel = 0;
      }
      const moved = Math.abs(p - lastRenderedP) > .00002;
      if (moved || lastRenderedP < 0) {
        render();
        syncVideos();
      }
    }
    raf = requestAnimationFrame(loop);
  }
  loop();

  const dispose = () => {
    frozen = true;
    offscreen = true;
    cancelAnimationFrame(raf);
    io.disconnect();
    removeEventListener('resize', resize);
    removeEventListener('scroll', readScroll);
    stage.removeEventListener('pointermove', onPointer);
    stage.removeEventListener('click', onClick);
    stage.style.cursor = '';
    hoverCard = null;
    for (const c of cards) {
      c.v.pause();
      c.v.removeAttribute('src');
      c.v.load();
      c.tex.dispose();
      c.geo.dispose();
      c.mat.dispose();
      scene.remove(c.mesh);
    }
    renderer.dispose();
    if (activeDispose === dispose) activeDispose = null;
  };

  activeDispose = dispose;
  return dispose;
}

/* Standalone HTML page boot. */
if (document.getElementById('gl') && !document.querySelector('.vante-ribbon')) {
  mount();
}
