/* zykken — menu + appear fallback + modules + lead form */
(function () {
  "use strict";

  /* appear fallback: if CSS animations are off, show content */
  var appears = Array.prototype.slice.call(document.querySelectorAll(".appear"));
  appears.forEach(function (el) {
    el.addEventListener("animationend", function () { el.classList.add("is-in"); }, { once: true });
  });
  requestAnimationFrame(function () {
    requestAnimationFrame(function check() {
      if (document.body.classList.contains("is-loading")) { setTimeout(check, 300); return; }
      var ok = false;
      try {
        var probe = document.querySelector(".appear");
        var anims = probe && probe.getAnimations ? probe.getAnimations() : [];
        ok = anims.some(function (a) { return a.playState === "running" || a.playState === "finished"; });
      } catch (e) { ok = false; }
      if (!ok) document.querySelectorAll(".appear, .hero-photo").forEach(function (el) { el.classList.add("is-in"); });
    });
  });

  /* hero scroll fade — REMOVED: was causing scroll feedback loop */

  /* nav — free links, no container. backdrop click + esc + focus */
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("site-nav");
  var backdrop = document.querySelector(".menu-backdrop");
  var savedScroll = 0;
  function setMenu(open) {
    var isOpen = document.body.classList.contains("menu-open");
    if (open === isOpen) return;
    if (open) {
      savedScroll = window.scrollY || window.pageYOffset || 0;
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
      if (savedScroll) {
        window.scrollTo(0, savedScroll);
        savedScroll = 0;
      }
    }
    if (burger) {
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    if (open && nav) {
      var first = nav.querySelector("a");
      if (first) first.focus({ preventScroll: true });
    }
  }
  if (burger) burger.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
  if (backdrop) backdrop.addEventListener("click", function () { setMenu(false); });
  if (nav) nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 901px)").matches && document.body.classList.contains("menu-open")) {
      setMenu(false);
    }
  });

  /* secondary site background — separate from the homepage hero video */
  (function contentVideoBackground() {
    var host = document.querySelector(".home-main, .page-sub");
    if (!host || host.querySelector(".content-video-bg")) return;

    var shell = document.createElement("div");
    shell.className = "content-video-bg";
    shell.setAttribute("aria-hidden", "true");

    var stage = document.createElement("div");
    stage.className = "content-video-stage";

    var video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.tabIndex = -1;
    video.src = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260723_145606_ab143199-b593-4941-bb1b-9afca215416b.mp4";

    function reveal() { shell.classList.add("is-ready"); }
    video.addEventListener("canplay", reveal, { once: true });
    video.addEventListener("error", function () { shell.classList.add("has-error"); }, { once: true });

    stage.appendChild(video);
    shell.appendChild(stage);
    host.insertBefore(shell, host.firstChild);
    if (video.readyState >= 2) reveal();
  })();

  /* auto active link fallback (in case markup missed) */
  try {
    var path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (nav && !nav.querySelector("a.active")) {
      nav.querySelectorAll("a").forEach(function (a) {
        var href = (a.getAttribute("href") || "").toLowerCase();
        if (href === path || (path === "" && href === "index.html")) {
          a.classList.add("active");
          a.setAttribute("aria-current", "page");
        }
      });
    }
  } catch (e) {}

  /* multilingual greeting loader; alternate markup paths remain as safe fallbacks */
  (function loader() {
    var l = document.getElementById("loader");
    if (!l) return;
    var counterMask = l.querySelector(".counter-loader-mask");
    if (counterMask) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { l.remove(); return; }
      document.body.classList.add("is-loading");

      var counter = document.getElementById("loaderCount"),
          counterBar = document.getElementById("loaderBar"),
          counterStarted = performance.now(),
          counterLoaded = document.readyState === "complete",
          counterFinished = false,
          counterFrame = 0;
      var repeatCounter = false;
      try { repeatCounter = sessionStorage.getItem("zykken_boot") === "1"; } catch (e) {}
      var counterDuration = repeatCounter ? 1350 : 3200;
      var counterMaximum = repeatCounter ? 2400 : 5200;

      function counterEase(value) {
        return 1 - Math.pow(1 - Math.max(0, Math.min(1, value)), 3);
      }
      function renderCounter(progress) {
        var safe = Math.max(0, Math.min(1, progress));
        if (counter) counter.textContent = String(Math.round(safe * 100));
        if (counterBar) counterBar.style.transform = "scaleX(" + safe.toFixed(4) + ")";
      }
      function replayCounterEntrance() {
        try {
          var els = Array.prototype.slice.call(document.querySelectorAll(".page .appear, .page-sub .appear"));
          els.forEach(function (el) { el.classList.add("is-in"); });
        } catch (e) {}
      }
      function finishCounter() {
        if (counterFinished) return;
        counterFinished = true;
        cancelAnimationFrame(counterFrame);
        renderCounter(1);
        try { sessionStorage.setItem("zykken_boot", "1"); } catch (e) {}
        document.body.classList.remove("is-loading");
        document.body.classList.add("is-ready");
        replayCounterEntrance();
        l.classList.add("is-closing");
        setTimeout(function () { l.classList.add("done"); }, 700);
        setTimeout(function () { if (l.parentNode) l.parentNode.removeChild(l); }, 1080);
      }
      function tickCounter(now) {
        if (counterFinished) return;
        var elapsed = now - counterStarted;
        var linear = Math.min(1, elapsed / counterDuration);
        var progress = counterEase(linear);
        if (!counterLoaded && linear >= 1) progress = 0.96;
        renderCounter(progress);
        if (counterLoaded && linear >= 1) { finishCounter(); return; }
        counterFrame = requestAnimationFrame(tickCounter);
      }

      requestAnimationFrame(function () {
        l.classList.add("is-running");
        counterFrame = requestAnimationFrame(tickCounter);
      });
      window.addEventListener("load", function () { counterLoaded = true; }, { once: true });
      setTimeout(finishCounter, counterMaximum);
      l.addEventListener("click", function () {
        if (performance.now() - counterStarted < 800 || counterFinished) return;
        finishCounter();
      });
      return;
    }
    var pyramidHost = l.querySelector(".pyramid-loader");
    var pyramidBlocks = document.getElementById("pyramidBlocks");
    if (pyramidHost && pyramidBlocks) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { l.remove(); return; }
      document.body.classList.add("is-loading");

      var svgNS = "http://www.w3.org/2000/svg";
      var cubeData = [];
      var cubeWidth = 44, cubeDepth = 22, cubeHeight = 30, buildIndex = 0;
      for (var level = 0; level < 4; level++) {
        var side = 4 - level;
        for (var row = 0; row < side; row++) {
          for (var column = 0; column < side; column++) {
            var worldX = column + level * 0.5;
            var worldY = row + level * 0.5;
            cubeData.push({
              level: level,
              order: buildIndex++,
              x: 210 + (worldX - worldY) * cubeWidth / 2,
              y: 195 + (worldX + worldY - 3) * cubeDepth / 2 - level * cubeHeight
            });
          }
        }
      }
      cubeData.sort(function (a, b) { return a.level - b.level || a.y - b.y || a.x - b.x; });

      function polygon(className, points) {
        var face = document.createElementNS(svgNS, "polygon");
        face.setAttribute("class", className);
        face.setAttribute("points", points);
        return face;
      }
      cubeData.forEach(function (cube) {
        var position = document.createElementNS(svgNS, "g");
        position.setAttribute("transform", "translate(" + cube.x + " " + cube.y + ")");
        var block = document.createElementNS(svgNS, "g");
        block.setAttribute("class", "pyramid-block");
        block.style.setProperty("--build-delay", (180 + cube.order * 48) + "ms");
        block.style.setProperty("--out-delay", ((cubeData.length - cube.order - 1) * 28) + "ms");
        block.appendChild(polygon("pyramid-face-left", "-22,0 0,11 0,41 -22,30"));
        block.appendChild(polygon("pyramid-face-right", "0,11 22,0 22,30 0,41"));
        block.appendChild(polygon("pyramid-face-top", "0,-11 22,0 0,11 -22,0"));
        position.appendChild(block);
        pyramidBlocks.appendChild(position);
      });

      var pyramidStatus = document.getElementById("loaderStatus"),
          pyramidPhase = document.getElementById("loaderPhase"),
          pyramidBar = document.getElementById("loaderBar"),
          pyramidFinished = false,
          pyramidLoaded = document.readyState === "complete",
          pyramidStarted = performance.now(),
          pyramidReadyTimer,
          pyramidTimers = [];
      var repeatPyramid = false;
      try { repeatPyramid = sessionStorage.getItem("zykken_boot") === "1"; } catch (e) {}
      var pyramidMinimum = repeatPyramid ? 1280 : 4900;
      var pyramidMaximum = repeatPyramid ? 2300 : 7000;

      function setPyramidPhase(name, phase, progress) {
        if (pyramidStatus) pyramidStatus.textContent = name;
        if (pyramidPhase) pyramidPhase.textContent = phase;
        if (pyramidBar) pyramidBar.style.transform = "scaleX(" + progress + ")";
      }
      function replayPyramidEntrance() {
        try {
          var els = Array.prototype.slice.call(document.querySelectorAll(".page .appear, .page-sub .appear"));
          els.forEach(function (el) { el.classList.add("is-in"); });
        } catch (e) {}
      }
      function finishPyramid() {
        if (pyramidFinished) return;
        pyramidFinished = true;
        pyramidTimers.forEach(clearTimeout);
        clearInterval(pyramidReadyTimer);
        try { sessionStorage.setItem("zykken_boot", "1"); } catch (e) {}
        setTimeout(function () {
          l.classList.add("done");
          document.body.classList.remove("is-loading");
          document.body.classList.add("is-ready");
          replayPyramidEntrance();
        }, repeatPyramid ? 180 : 240);
        setTimeout(function () { if (l.parentNode) l.parentNode.removeChild(l); }, 1440);
      }

      if (repeatPyramid) {
        pyramidHost.classList.add("is-thinking");
        setPyramidPhase("Systems ready", "03 / 03", 1);
      } else {
        requestAnimationFrame(function () {
          pyramidHost.classList.add("is-building");
          setPyramidPhase("Building an idea", "01 / 03", 0.12);
        });
        pyramidTimers.push(setTimeout(function () {
          pyramidHost.classList.remove("is-building");
          pyramidHost.classList.add("is-thinking");
          setPyramidPhase("Thinking it through", "02 / 03", 0.72);
        }, 2380));
        pyramidTimers.push(setTimeout(function () {
          pyramidHost.classList.remove("is-thinking");
          pyramidHost.classList.add("is-dismantling");
          setPyramidPhase("Making room again", "03 / 03", 0.94);
        }, 3540));
      }
      window.addEventListener("load", function () { pyramidLoaded = true; }, { once: true });
      pyramidReadyTimer = setInterval(function () {
        if (pyramidLoaded && performance.now() - pyramidStarted >= pyramidMinimum) finishPyramid();
      }, 80);
      setTimeout(finishPyramid, pyramidMaximum);
      l.addEventListener("click", function () {
        if (performance.now() - pyramidStarted < 900 || pyramidFinished) return;
        finishPyramid();
      });
      return;
    }
    var greetingHost = l.querySelector(".loader-greetings");
    if (greetingHost) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { l.remove(); return; }
      document.body.classList.add("is-loading");

      var greetings = Array.prototype.slice.call(greetingHost.querySelectorAll("span")),
          language = document.getElementById("loaderLanguage"),
          count = document.getElementById("loaderCount"),
          greetingBar = document.getElementById("loaderBar"),
          greetingTrack = l.querySelector(".loader-progress"),
          active = -1,
          finished = false,
          loaded = document.readyState === "complete",
          started = performance.now(),
          sequenceTimer,
          readyTimer;
      var repeatGreeting = false;
      try { repeatGreeting = sessionStorage.getItem("zykken_greeting_boot_v2") === "1"; } catch (e) {}
      var minimum = repeatGreeting ? 1180 : 4380;
      var maximum = repeatGreeting ? 2200 : 6000;

      function twoDigits(value) { return value < 9 ? "0" + (value + 1) : String(value + 1); }
      function showGreeting(index) {
        active = Math.max(0, Math.min(greetings.length - 1, index));
        greetings.forEach(function (word, i) {
          var distance = i - active;
          word.classList.remove("is-current", "is-prev", "is-next", "is-past");
          if (distance === 0) word.classList.add("is-current");
          else if (distance === -1) word.classList.add("is-prev");
          else if (distance === 1) word.classList.add("is-next");
          else if (distance < -1) word.classList.add("is-past");
        });
        var greetingProgress = (active + 1) / greetings.length;
        if (language) language.textContent = greetings[active].getAttribute("data-language") || "WELCOME";
        if (count) count.textContent = twoDigits(active) + " / " + (greetings.length < 10 ? "0" : "") + greetings.length;
        if (greetingBar) greetingBar.style.transform = "scaleX(" + greetingProgress + ")";
        if (greetingTrack) greetingTrack.style.setProperty("--loader-progress", (greetingProgress * 100) + "%");
      }
      function replayEntrance() {
        /* Safe: just ensure all appear elements are visible — no flash */
        try {
          var els = Array.prototype.slice.call(document.querySelectorAll(".page .appear, .page-sub .appear"));
          els.forEach(function (el) { el.classList.add("is-in"); });
        } catch (e) {}
      }
      function finishGreeting() {
        if (finished) return;
        finished = true;
        clearInterval(sequenceTimer);
        clearInterval(readyTimer);
        showGreeting(greetings.length - 1);
        try { sessionStorage.setItem("zykken_greeting_boot_v2", "1"); } catch (e) {}
        var exitDelay = repeatGreeting ? 260 : 420;
        setTimeout(function () {
          l.classList.add("done");
          document.body.classList.remove("is-loading");
          document.body.classList.add("is-ready");
          replayEntrance();
        }, exitDelay);
        setTimeout(function () { if (l.parentNode) l.parentNode.removeChild(l); }, exitDelay + 1320);
      }

      if (repeatGreeting) {
        requestAnimationFrame(function () { showGreeting(greetings.length - 1); });
      } else {
        requestAnimationFrame(function () { showGreeting(0); });
        sequenceTimer = setInterval(function () {
          if (active < greetings.length - 1) showGreeting(active + 1);
          else clearInterval(sequenceTimer);
        }, 520);
      }
      window.addEventListener("load", function () { loaded = true; }, { once: true });
      readyTimer = setInterval(function () {
        if (loaded && performance.now() - started >= minimum) finishGreeting();
      }, 80);
      setTimeout(finishGreeting, maximum);
      l.addEventListener("click", function () {
        if (performance.now() - started < 1050 || finished) return;
        showGreeting(greetings.length - 1);
        setTimeout(finishGreeting, 380);
      });
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { l.remove(); return; }
    document.body.classList.add("is-loading");
    var bar = document.getElementById("loaderBar"),
        pct = document.getElementById("loaderPct"),
        ghost = document.getElementById("loaderGhost"),
        head = document.getElementById("loaderHead"),
        status = document.getElementById("loaderStatus");
    var repeat = false;
    try { repeat = sessionStorage.getItem("zykken_boot") === "1"; } catch (e) {}
    var ringC = 2 * Math.PI * 26;
    function setProgress(v) {
      var s = Math.max(0, Math.min(1, v / 100));
      if (bar) bar.style.transform = "scaleX(" + s + ")";
      if (head) head.style.left = (s * 100) + "%";
      if (pct) pct.textContent = pad(v);
      if (ghost) ghost.textContent = pad(v);
      var ring = document.getElementById("loaderRing");
      if (ring) { ring.style.strokeDasharray = ringC; ring.style.strokeDashoffset = ringC * (1 - s); }
    }
    /* pixel veil — staggered block dissolve that opens the page */
    function buildPixels() {
      try {
        var v = document.getElementById("pixelveil");
        if (!v || v.dataset.built) return;
        var cell = Math.max(72, Math.min(110, Math.floor(Math.min(window.innerWidth, 1400) / 12)));
        var cols = Math.ceil(window.innerWidth / cell), rows = Math.ceil(window.innerHeight / cell);
        while (cols * rows > 180 && cell < 160) { cell += 10; cols = Math.ceil(window.innerWidth / cell); rows = Math.ceil(window.innerHeight / cell); }
        v.style.gridTemplateColumns = "repeat(" + cols + ",1fr)";
        v.style.gridTemplateRows = "repeat(" + rows + ",1fr)";
        var cx = (cols - 1) / 2, cy = (rows - 1) / 2, max = Math.sqrt(cx * cx + cy * cy) || 1;
        var origins = ["center", "top left", "top right", "bottom left", "bottom right"];
        for (var i = 0; i < cols * rows; i++) {
          var d = document.createElement("div"); d.className = "pxcell";
          var x = i % cols, y = Math.floor(i / cols);
          var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)) / max;
          d.dataset.dist = dist.toFixed(3);
          d.style.transformOrigin = origins[(x + y) % origins.length];
          v.appendChild(d);
        }
        v.dataset.built = "1";
      } catch (e) {}
    }
    function clearPixels(spreadMs) {
      try {
        var v = document.getElementById("pixelveil");
        if (!v || !v.dataset.built) return;
        var cells = v.querySelectorAll(".pxcell");
        cells.forEach(function (c) {
          var d = parseFloat(c.dataset.dist || "0");
          c.style.setProperty("--pd", Math.round(d * (spreadMs || 550) + Math.random() * 120) + "ms");
        });
        void v.offsetWidth;
        cells.forEach(function (c) { c.classList.add("out"); });
        setTimeout(function () { if (v.parentNode) v.parentNode.removeChild(v); }, (spreadMs || 550) + 750);
      } catch (e) {}
    }
    buildPixels();
    var phrases = ["mapping workflows", "tuning voice agents", "polishing pixels", "wiring CRM + calendar"];
    var pi = 0, statusTimer = setInterval(function () {
      pi = (pi + 1) % phrases.length;
      if (status) status.textContent = phrases[pi];
    }, 650);
    var t0 = performance.now(), minDur = repeat ? 750 : 1400, maxWait = repeat ? 1600 : 2800, loaded = false, finished = false;
    if (repeat && status) status.textContent = "welcome back";
    function pad(v) { v = Math.max(0, Math.min(100, Math.round(v))); return (v < 10 ? "00" + v : v < 100 ? "0" + v : "" + v); }
    function replayHero() {
      try {
        var els = Array.prototype.slice.call(document.querySelectorAll(".page .appear, .page-sub .appear"));
        els.forEach(function (el) { el.classList.add("is-in"); });
        var heroPhoto = document.querySelector(".hero-photo");
        if (heroPhoto) heroPhoto.classList.add("is-in");
      } catch (e) {}
    }
    function finish() {
      if (finished) return; finished = true;
      clearInterval(statusTimer);
      setProgress(100);
      if (status) status.textContent = "ready";
      try { sessionStorage.setItem("zykken_boot", "1"); } catch (e) {}
      setTimeout(function () {
        l.classList.add("done");
        clearPixels(repeat ? 350 : 550);
        setTimeout(function () {
          document.body.classList.remove("is-loading");
          document.body.classList.add("is-ready");
          replayHero();
        }, repeat ? 150 : 260);
        setTimeout(function () { if (l.parentNode) l.parentNode.removeChild(l); }, 1050);
      }, 250);
    }
    function tick(t) {
      if (finished) return;
      var elapsed = t - t0;
      var target = loaded ? 100 : 88; /* ease to 88 until window load, then snap */
      var span = loaded ? 450 : minDur;
      var p = Math.min(1, elapsed / span) * target;
      var e = 1 - Math.pow(1 - Math.min(1, elapsed / span), 3);
      var v = e * target;
      setProgress(v);
      if (loaded && elapsed > span - 50) { finish(); return; }
      if (!loaded) requestAnimationFrame(tick);
    }
    function onLoaded() { loaded = true; var t1 = performance.now(); (function snap(t) {
      var p = Math.min(1, (t - t1) / 450), e = 1 - Math.pow(1 - p, 3);
      var cur = pct ? parseInt(pct.textContent, 10) || 0 : 0;
      var v = cur + (100 - cur) * e;
      setProgress(v);
      if (p < 1) requestAnimationFrame(snap); else finish();
    })(t1); }
    /* click to skip (after the wordmark has shown) */
    l.addEventListener("click", function () {
      if (performance.now() - t0 > 600 && !finished) { loaded = true; onLoaded(); }
    });
    if (document.readyState === "complete") { setTimeout(onLoaded, Math.max(0, 900 - (performance.now() - t0))); }
    else {
      window.addEventListener("load", function () { setTimeout(onLoaded, 350); }, { once: true });
      if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () {}).catch(function () {}); }
    }
    requestAnimationFrame(tick);
    setTimeout(function () { if (!finished) { loaded = true; onLoaded(); } }, maxWait);
    setTimeout(function () { var v = document.getElementById("pixelveil"); if (v && v.parentNode) v.parentNode.removeChild(v); }, 6000);
  })();

  /* reveal on scroll */
  try {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach(function (el) { io.observe(el); });
  } catch (e) {
    document.querySelectorAll("[data-reveal]").forEach(function (el) { el.style.opacity = 1; el.style.transform = "none"; });
  }

  /* toast helper */
  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._h);
    t._h = setTimeout(function(){ t.classList.remove("show"); }, 4200);
  }

  /* faq */
  document.querySelectorAll(".f-item button").forEach(function (b) {
    b.addEventListener("click", function () {
      var it = b.parentElement, was = it.classList.contains("open");
      document.querySelectorAll(".f-item").forEach(function (x) { x.classList.remove("open"); x.querySelector("button").setAttribute("aria-expanded", "false"); });
      if (!was) { it.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
    });
  });

  /* timeline */
  document.querySelectorAll(".tl-row").forEach(function (r) {
    r.addEventListener("click", function () {
      var was = r.classList.contains("active");
      document.querySelectorAll(".tl-row").forEach(function (x) { x.classList.remove("active"); });
      if (!was) r.classList.add("active");
    });
  });

  /* work filter */
  var fbtns = document.querySelectorAll(".filters button");
  if (fbtns.length) fbtns.forEach(function (b) {
    b.addEventListener("click", function () {
      fbtns.forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("active");
      b.setAttribute("aria-pressed", "true");
      var f = b.getAttribute("data-filter");
      document.querySelectorAll(".case").forEach(function (c) {
        c.style.display = (f === "all" || c.getAttribute("data-cat") === f) ? "" : "none";
      });
    });
  });

  /* roi calculator */
  var hrs = document.getElementById("hrs"), cost = document.getElementById("cost");
  if (hrs && cost) {
    var hv = document.getElementById("hrsV"), cv = document.getElementById("costV"),
        ms = document.getElementById("saveMo"), hs = document.getElementById("saveHr"), yearly = document.getElementById("valueYr");
    function upd() {
      var H = +hrs.value, C = +cost.value;
      if (hv) hv.textContent = H + " hrs/wk";
      if (cv) cv.textContent = "$" + C + "/hr";
      var m = Math.round(H * 4.33 * C * 0.8);
      if (ms) ms.textContent = "$" + m.toLocaleString();
      if (hs) hs.textContent = Math.round(H * 4.33 * 0.8).toLocaleString() + " hrs";
      if (yearly) yearly.textContent = "$" + (m * 12).toLocaleString();
    }
    hrs.addEventListener("input", upd); cost.addEventListener("input", upd); upd();
  }

  /* triage */
  var tri = document.querySelector(".triage");
  if (tri) {
    var out = document.getElementById("triageOut");
    var fits = {
      starter: ["Automation Starter", "$900"],
      growth: ["Growth System", "$2,250"],
      revenue: ["Revenue System", "$4,000"],
      custom: ["Custom Build", "$6,000+"]
    };
    tri.querySelectorAll("[data-package-fit]").forEach(function (b) {
      b.addEventListener("click", function () {
        tri.querySelectorAll("[data-package-fit]").forEach(function (x) {
          x.classList.remove("on");
          x.setAttribute("aria-pressed", "false");
        });
        b.classList.add("on");
        b.setAttribute("aria-pressed", "true");
        var fit = fits[b.getAttribute("data-package-fit")];
        if (fit && out) out.innerHTML = "Suggested starting point → <b>" + fit[0] + "</b> · from " + fit[1] + ". We’ll confirm your scope and fixed quote after discovery.";
      });
    });
  }

  /* lead forms — validate, persist, WhatsApp handoff */
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  document.querySelectorAll("form.lead").forEach(function (f) {
    var nameEl = f.querySelector('[name="name"]');
    var emailEl = f.querySelector('[name="email"]');
    var phoneEl = f.querySelector('[name="phone"]');
    var needEl = f.querySelector('[name="need"]');
    var msgEl = f.querySelector('[name="message"]');
    var btn = f.querySelector('button[type="submit"]');
    var okBox = f.parentElement ? f.parentElement.querySelector(".form-ok") : null;
    if (!okBox) okBox = document.getElementById("formOk");

    /* restore draft */
    try {
      var draft = JSON.parse(localStorage.getItem("zykken_lead") || "{}");
      if (draft.name && nameEl && !nameEl.value) nameEl.value = draft.name;
      if (draft.email && emailEl && !emailEl.value) emailEl.value = draft.email;
      if (draft.phone && phoneEl && !phoneEl.value) phoneEl.value = draft.phone;
      if (draft.need && needEl) needEl.value = draft.need;
    } catch (e) {}

    function setErr(input, bad) {
      if (!input) return;
      var lab = input.closest("label");
      if (lab) lab.classList.toggle("invalid", !!bad);
    }

    [nameEl, emailEl, phoneEl].forEach(function (inp) {
      if (inp) inp.addEventListener("input", function () { setErr(inp, false); });
    });

    f.addEventListener("submit", function (e) {
      e.preventDefault();

      /* honeypot */
      var hp = f.querySelector('[name="company_site"]');
      if (hp && hp.value) return;

      var name = (nameEl && nameEl.value || "").trim();
      var email = (emailEl && emailEl.value || "").trim();
      var phone = (phoneEl && phoneEl.value || "").trim();
      var needV = (needEl && needEl.value || "automation");
      var msg = (msgEl && msgEl.value || "").trim();

      var bad = false;
      if (!name || name.length < 2) { setErr(nameEl, true); bad = true; }
      if (!validEmail(email)) { setErr(emailEl, true); bad = true; }
      if (phone && phone.replace(/\D/g, "").length < 7) { setErr(phoneEl, true); bad = true; }
      if (bad) { toast("Please add your name + a valid email."); return; }

      try { localStorage.setItem("zykken_lead", JSON.stringify({ name: name, email: email, phone: phone, need: needV })); } catch (e) {}

      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Sending…"; }

      var waText = "Hi zykken — I'm " + name + " (" + email + (phone ? ", " + phone : "") + "). I need: " + needV + ". " + (msg ? "Context: " + msg.slice(0, 280) : "Please send my free audit.");
      var waUrl = "https://wa.me/919000000000?text=" + encodeURIComponent(waText);
      var mailUrl = "mailto:hello@zykken.com?subject=" + encodeURIComponent("Free audit — " + name) +
        "&body=" + encodeURIComponent("Name: " + name + "\nEmail: " + email + "\nPhone: " + phone + "\nNeed: " + needV + "\n\n" + msg);

      setTimeout(function () {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || "Request audit →"; }
        toast("Request received — we reply within 12 hours.");
        if (okBox) {
          okBox.innerHTML = "Thanks <b>" + name.replace(/</g, "&lt;") + "</b> — audit request saved. We reply to <b>" +
            email.replace(/</g, "&lt;") + "</b> within 12 hours.<br><span style='display:flex;gap:10px;margin-top:12px;flex-wrap:wrap'>" +
            "<a class='btn btn-solid' style='height:38px' href='" + waUrl + "'>Continue on WhatsApp</a>" +
            "<a class='btn btn-ghost' style='height:38px' href='" + mailUrl + "'>Or open email</a></span>";
          okBox.classList.add("show");
          okBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        f.reset();
      }, 650);
    });
  });

  /* footer year */
  document.querySelectorAll(".js-year").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
