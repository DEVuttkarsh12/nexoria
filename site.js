/* NEXORA subpages — menu + appear fallback + modules */
(function () {
  var appears = Array.prototype.slice.call(document.querySelectorAll(".appear"));
  appears.forEach(function (el) {
    el.addEventListener("animationend", function () { el.classList.add("is-in"); }, { once: true });
  });
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var ok = false;
      try {
        var probe = document.querySelector(".appear");
        var anims = probe && probe.getAnimations ? probe.getAnimations() : [];
        ok = anims.some(function (a) { return a.playState === "running" || a.playState === "finished"; });
      } catch (e) { ok = false; }
      if (!ok) document.querySelectorAll(".appear").forEach(function (el) { el.classList.add("is-in"); });
    });
  });
  var burger = document.querySelector(".burger");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    if (burger) {
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  }
  if (burger) burger.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
  var nav = document.getElementById("site-nav");
  if (nav) nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  window.addEventListener("resize", function () { if (window.matchMedia("(min-width: 901px)").matches) setMenu(false); });

  /* reveal on scroll */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll("[data-reveal]").forEach(function (el) { io.observe(el); });

  /* faq */
  document.querySelectorAll(".f-item button").forEach(function (b) {
    b.addEventListener("click", function () {
      var it = b.parentElement, was = it.classList.contains("open");
      document.querySelectorAll(".f-item").forEach(function (x) { x.classList.remove("open"); });
      if (!was) it.classList.add("open");
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
      fbtns.forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
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
        ms = document.getElementById("saveMo"), hs = document.getElementById("saveHr"), ro = document.getElementById("roiX");
    function upd() {
      var H = +hrs.value, C = +cost.value;
      hv.textContent = H + " hrs/wk"; cv.textContent = "$" + C + "/hr";
      var m = Math.round(H * 4.33 * C * 0.8);
      ms.textContent = "$" + m.toLocaleString(); hs.textContent = Math.round(H * 4.33 * 0.8).toLocaleString() + " hrs";
      ro.textContent = (m * 12 / 3900).toFixed(1) + "×";
    }
    hrs.addEventListener("input", upd); cost.addEventListener("input", upd); upd();
  }

  /* triage */
  var tri = document.querySelector(".triage");
  if (tri) {
    var out = document.getElementById("triageOut"), budget = "3-8k", need = "automation";
    function copy() {
      var pkg = budget === "under3" ? "Launch" : (need === "software" || budget === "8k+" ? "Empire" : "Autopilot");
      var time = need === "website" ? "~14 days" : need === "software" ? "4–8 weeks" : "21 days";
      out.innerHTML = "Suggested fit → <b>" + pkg + "</b> · typical timeline <b>" + time + "</b>. " +
        (budget === "under3" ? "We start with one sharp win, then compound." : "We map 3 automations in your free audit, then fix-scope the rest.");
    }
    tri.querySelectorAll("[data-budget]").forEach(function (b) {
      b.addEventListener("click", function () {
        tri.querySelectorAll("[data-budget]").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on"); budget = b.getAttribute("data-budget"); copy();
      });
    });
    tri.querySelectorAll("[data-need]").forEach(function (b) {
      b.addEventListener("click", function () {
        tri.querySelectorAll("[data-need]").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on"); need = b.getAttribute("data-need"); copy();
      });
    });
    copy();
  }

  /* forms */
  document.querySelectorAll("form").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var t = document.getElementById("toast");
      if (t) { t.textContent = "Request received — we reply within 12 hours."; t.classList.add("show"); setTimeout(function(){ t.classList.remove("show"); }, 4200); }
      f.reset();
    });
  });
})();
