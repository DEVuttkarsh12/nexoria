type Star = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  fallSpeed: number;
  phase: number;
  shimmer: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  age: number;
  duration: number;
  opacity: number;
};

type Renderer = { ready: Promise<void>; dispose: () => void };

function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
}

export function createRenderer(canvas: HTMLCanvasElement): Renderer {
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) return { ready: Promise.resolve(), dispose: () => undefined };

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const backdrop = document.createElement("canvas");
  const backdropContext = backdrop.getContext("2d");
  let width = 0;
  let height = 0;
  let stars: Star[] = [];
  let meteors: Meteor[] = [];
  let frame = 0;
  let lastFrame = 0;
  let nextMeteor = 0;
  let visible = !document.hidden;
  let inView = true;
  let disposed = false;
  let readyResolved = false;
  let resolveReady!: () => void;
  const ready = new Promise<void>((resolve) => { resolveReady = resolve; });

  const addGlow = (x: number, y: number, radius: number, color: string) => {
    if (!backdropContext) return;
    const glow = backdropContext.createRadialGradient(x, y, 0, x, y, radius);
    glow.addColorStop(0, color);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    backdropContext.fillStyle = glow;
    backdropContext.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  };

  const rebuildScene = () => {
    const random = seededRandom(27092026 + width * 17 + height);
    backdrop.width = width;
    backdrop.height = height;
    if (backdropContext) {
      backdropContext.fillStyle = "#010204";
      backdropContext.fillRect(0, 0, width, height);

      // Keep the brightest nebulae near the sides, away from the main copy.
      const span = Math.max(width, height);
      addGlow(width * 0.08, height * 0.22, span * 0.7, "rgba(26,57,92,0.20)");
      addGlow(width * 0.94, height * 0.72, span * 0.65, "rgba(66,42,88,0.17)");
      addGlow(width * 0.63, height * 1.08, span * 0.57, "rgba(24,61,83,0.08)");
      backdropContext.save();
      backdropContext.translate(width * 0.87, height * 0.52);
      backdropContext.rotate(-0.35);
      backdropContext.scale(0.35, 1.08);
      addGlow(0, 0, span * 0.69, "rgba(93,105,153,0.09)");
      backdropContext.restore();

      const edge = backdropContext.createRadialGradient(
        width * 0.5, height * 0.48, span * 0.08,
        width * 0.5, height * 0.48, span * 0.78,
      );
      edge.addColorStop(0, "rgba(0,0,0,0)");
      edge.addColorStop(1, "rgba(0,0,0,0.38)");
      backdropContext.fillStyle = edge;
      backdropContext.fillRect(0, 0, width, height);

      for (let i = 0; i < Math.min(170, Math.round(width * height / 6500)); i++) {
        backdropContext.fillStyle = `rgba(166,191,226,${(0.035 + random() * 0.09).toFixed(3)})`;
        backdropContext.fillRect(random() * width, random() * height, 1, 1);
      }
      for (let i = 0; i < Math.min(115, Math.round(width * height / 9000)); i++) {
        const y = random() * height;
        const x = width * 0.87 - (y - height * 0.5) * 0.28 + (random() - 0.5) * width * 0.28;
        backdropContext.fillStyle = `rgba(175,192,239,${(0.05 + random() * 0.12).toFixed(3)})`;
        backdropContext.fillRect(x, y, 1, 1);
      }
    }

    const count = Math.min(185, Math.max(90, Math.round(width * height / 6800)));
    stars = Array.from({ length: count }, () => {
      const x = random() * width;
      return {
        x,
        y: random() * height,
        radius: random() > 0.93 ? 1.55 : 0.48 + random() * 0.7,
        opacity: (0.19 + random() * 0.31) * (x > width * 0.24 && x < width * 0.76 ? 0.76 : 1),
        fallSpeed: 3 + random() * 10,
        phase: random() * Math.PI * 2,
        shimmer: 0.6 + random() * 1.1,
      };
    });
    meteors = [];
    nextMeteor = performance.now() + 1300;
  };

  const resize = () => {
    const nextWidth = Math.max(1, Math.round(canvas.clientWidth));
    const nextHeight = Math.max(1, Math.round(canvas.clientHeight));
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    if (width === nextWidth && height === nextHeight && canvas.width === Math.round(nextWidth * ratio)) return;
    width = nextWidth;
    height = nextHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    rebuildScene();
  };

  const spawnMeteor = () => {
    const speed = 210 + Math.random() * 120;
    meteors.push({
      x: width * (0.25 + Math.random() * 0.85),
      y: height * (-0.08 + Math.random() * 0.42),
      vx: -speed * 0.55,
      vy: speed * 0.84,
      length: 78 + Math.random() * 90,
      age: 0,
      duration: 1.15 + Math.random() * 0.5,
      opacity: 0.42 + Math.random() * 0.16,
    });
  };

  const draw = (now: number) => {
    frame = 0;
    if (disposed || !visible || !inView) return;
    if (!reducedMotion.matches && now - lastFrame < 32) {
      frame = requestAnimationFrame(draw);
      return;
    }
    const elapsed = Math.min((now - lastFrame) / 1000 || 0, 0.07);
    lastFrame = now;
    resize();
    if (backdropContext) context.drawImage(backdrop, 0, 0, width, height);
    else {
      context.fillStyle = "#010204";
      context.fillRect(0, 0, width, height);
    }

    for (const star of stars) {
      if (!reducedMotion.matches) star.y = (star.y + star.fallSpeed * elapsed) % height;
      const pulse = reducedMotion.matches ? 1 : 0.82 + 0.18 * Math.sin(now * 0.001 * star.shimmer + star.phase);
      context.fillStyle = `rgba(210,225,251,${Math.max(0, star.opacity * pulse).toFixed(3)})`;
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();
    }

    if (!reducedMotion.matches) {
      if (now >= nextMeteor && meteors.length < 2) {
        spawnMeteor();
        nextMeteor = now + 1900 + Math.random() * 2100;
      }
      meteors = meteors.filter((meteor) => meteor.age < meteor.duration);
      for (const meteor of meteors) {
        meteor.age += elapsed;
        meteor.x += meteor.vx * elapsed;
        meteor.y += meteor.vy * elapsed;
        const travel = Math.hypot(meteor.vx, meteor.vy);
        const tailX = meteor.x - meteor.vx / travel * meteor.length;
        const tailY = meteor.y - meteor.vy / travel * meteor.length;
        const fade = Math.min(1, meteor.age / 0.18, (meteor.duration - meteor.age) / 0.35);
        const alpha = Math.max(0, fade) * meteor.opacity;
        const streak = context.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
        streak.addColorStop(0, "rgba(101,150,227,0)");
        streak.addColorStop(0.72, `rgba(135,189,245,${(alpha * 0.35).toFixed(3)})`);
        streak.addColorStop(1, `rgba(226,239,255,${alpha.toFixed(3)})`);
        context.strokeStyle = streak;
        context.lineWidth = 1.5;
        context.beginPath();
        context.moveTo(tailX, tailY);
        context.lineTo(meteor.x, meteor.y);
        context.stroke();
        context.fillStyle = `rgba(230,243,255,${(alpha * 0.8).toFixed(3)})`;
        context.beginPath();
        context.arc(meteor.x, meteor.y, 1.25, 0, Math.PI * 2);
        context.fill();
      }
    }

    if (!readyResolved) {
      readyResolved = true;
      resolveReady();
    }
    if (!reducedMotion.matches) frame = requestAnimationFrame(draw);
  };

  const schedule = () => {
    if (!disposed && visible && inView && !frame) frame = requestAnimationFrame(draw);
  };
  const onVisibility = () => {
    visible = !document.hidden;
    if (visible) schedule();
  };
  const onMotionChange = () => {
    lastFrame = 0;
    schedule();
  };
  const observer = new ResizeObserver(() => {
    resize();
    if (reducedMotion.matches) schedule();
  });
  observer.observe(canvas);
  const intersection = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) schedule();
  });
  intersection.observe(canvas);
  document.addEventListener("visibilitychange", onVisibility);
  reducedMotion.addEventListener("change", onMotionChange);
  schedule();

  return {
    ready,
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotionChange);
    },
  };
}
