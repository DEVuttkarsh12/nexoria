type Renderer = { ready: Promise<void>; dispose: () => void };

const vertexSource = `
attribute vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

const fragmentSource = `
precision highp float;
uniform vec2 uResolution;
uniform vec2 uCenter;
uniform float uTime;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float stars(vec2 p, float scale) {
  vec2 grid = p * scale;
  vec2 cell = floor(grid);
  vec2 point = fract(grid) - 0.5;
  float seed = hash(cell);
  vec2 offset = vec2(hash(cell + 13.7), hash(cell + 41.3)) - 0.5;
  float d = length(point - offset * 0.7);
  float pin = 1.0 - smoothstep(0.012, 0.055, d);
  return pin * step(0.978, seed) * (0.65 + 0.35 * sin(uTime * 0.7 + seed * 60.0));
}

void main() {
  float unit = min(uResolution.x, uResolution.y);
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / unit;
  vec2 center = (uCenter - 0.5 * uResolution) / unit;
  vec2 p = uv - center;
  float radius = length(p);
  float angle = atan(p.y, p.x);

  // Deflect the star field around the event horizon.
  vec2 bent = uv + normalize(p + vec2(0.0001)) * (0.009 / max(radius, 0.05));
  float field = stars(bent, 22.0) + 0.55 * stars(bent + 17.3, 43.0);
  float haze = 0.5 + 0.5 * sin(uv.x * 11.0 + uv.y * 8.0 + sin(uv.y * 5.0));
  vec3 color = vec3(0.006, 0.009, 0.015) + vec3(0.012, 0.019, 0.030) * haze;
  color += field * vec3(0.40, 0.51, 0.65);

  // A thin lensing ring and a tilted accretion disk keep the scene restrained.
  float lens = exp(-pow((radius - 0.139) / 0.010, 2.0));
  float outerGlow = exp(-pow((radius - 0.17) / 0.065, 2.0));
  float diskRadius = length(vec2(p.x, p.y * 3.2));
  float disk = exp(-pow((diskRadius - 0.19) / 0.070, 2.0));
  disk *= smoothstep(0.105, 0.15, radius);
  disk *= 0.67 + 0.33 * sin(angle * 3.0 - uTime * 0.22);
  disk *= mix(0.35, 1.0, smoothstep(-0.1, 0.13, p.x));
  color += lens * vec3(0.22, 0.31, 0.40);
  color += outerGlow * vec3(0.015, 0.025, 0.041);
  color += disk * vec3(0.15, 0.09, 0.065);
  color *= smoothstep(0.105, 0.130, radius);
  gl_FragColor = vec4(color, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, kind: number, source: string) {
  const shader = gl.createShader(kind);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
}

export function createRenderer({ canvas }: { canvas: HTMLCanvasElement }): Renderer {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
  let disposed = false;
  let frame = 0;
  let lastDraw = 0;
  let visible = !document.hidden;
  let inView = true;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let centerX = 0;
  let centerY = 0;
  let targetX = 0;
  let targetY = 0;
  let pointerX = 0;
  let pointerY = 0;
  let pointerActive = false;
  let resolveReady!: () => void;
  const ready = new Promise<void>((resolve) => { resolveReady = resolve; });

  const fallback = () => {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      canvas.width = Math.max(1, canvas.clientWidth);
      canvas.height = Math.max(1, canvas.clientHeight);
      const x = canvas.width * (canvas.width < 700 ? 0.5 : 0.72);
      const y = canvas.height * 0.52;
      const gradient = ctx.createRadialGradient(x, y, 20, x, y, Math.min(canvas.width, canvas.height) * 0.43);
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(0.32, "#2a3544");
      gradient.addColorStop(0.38, "#070b12");
      gradient.addColorStop(1, "#020203");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    resolveReady();
    return { ready, dispose: () => { disposed = true; } };
  };

  if (!gl) return fallback();
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    return fallback();
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    return fallback();
  }

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.useProgram(program);
  const position = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, "uResolution");
  const center = gl.getUniformLocation(program, "uCenter");
  const time = gl.getUniformLocation(program, "uTime");

  const resize = () => {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.max(1, Math.round(canvas.clientWidth * pixelRatio));
    const height = Math.max(1, Math.round(canvas.clientHeight * pixelRatio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      centerX = targetX = width * (canvas.clientWidth < 700 ? 0.5 : 0.72);
      centerY = targetY = height * 0.52;
    }
  };

  const draw = (now: number) => {
    frame = 0;
    if (disposed || !visible || !inView) return;
    if (!reducedMotion.matches && now - lastDraw < 32) {
      frame = requestAnimationFrame(draw);
      return;
    }
    lastDraw = now;
    resize();
    const ratio = canvas.width / Math.max(canvas.clientWidth, 1);
    const baseX = canvas.width * (canvas.clientWidth < 700 ? 0.5 : 0.72);
    const baseY = canvas.height * 0.52;
    targetX = pointerActive && !reducedMotion.matches ? baseX * 0.68 + pointerX * ratio * 0.32 : baseX;
    targetY = pointerActive && !reducedMotion.matches ? baseY * 0.68 + (canvas.clientHeight - pointerY) * ratio * 0.32 : baseY;
    centerX += (targetX - centerX) * 0.075;
    centerY += (targetY - centerY) * 0.075;
    gl.uniform2f(resolution, canvas.width, canvas.height);
    gl.uniform2f(center, centerX, centerY);
    gl.uniform1f(time, reducedMotion.matches ? 0 : now * 0.001);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    resolveReady();
    if (!reducedMotion.matches) frame = requestAnimationFrame(draw);
  };

  const onPointer = (event: PointerEvent) => {
    const host = canvas.closest(".home-main, .page-sub");
    if (!host || !host.contains(event.target as Node)) return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    pointerActive = true;
  };
  const onLeave = () => { pointerActive = false; };
  const onVisibility = () => {
    visible = !document.hidden;
    if (visible && inView && !frame) frame = requestAnimationFrame(draw);
  };
  const observer = new ResizeObserver(() => {
    resize();
    if (reducedMotion.matches && !frame) frame = requestAnimationFrame(draw);
  });
  observer.observe(canvas);
  const intersection = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView && visible && !frame) frame = requestAnimationFrame(draw);
  });
  intersection.observe(canvas);
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("pointerleave", onLeave);
  document.addEventListener("visibilitychange", onVisibility);
  frame = requestAnimationFrame(draw);

  return {
    ready,
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    },
  };
}
