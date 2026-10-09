/* Progressive enhancements for the pre-rendered Zykken website. */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

export function setupGreetingLoader(doc = document, win = window) {
  const loader = doc.getElementById('loader');
  if (!loader) return;
  const motion = win.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !doc.documentElement.classList.contains('is-loading')) {
    loader.remove();
    doc.documentElement.classList.remove('is-loading');
    win.clearTimeout(win.zykkenLoaderTimeout);
    return;
  }
  const words = [...loader.querySelectorAll('.loader-greetings > span')];
  const language = doc.getElementById('loaderLanguage');
  const count = doc.getElementById('loaderCount');
  const bar = doc.getElementById('loaderBar');
  const track = loader.querySelector('.loader-progress');
  const skip = loader.querySelector('[data-loader-skip]');
  const previousFocus = doc.activeElement;
  const regions = [...doc.querySelectorAll('.skip-link, .site-header, main, .site-footer')].filter(el => !el.inert);
  const sessionKey = 'zykken_greeting_boot_v3';
  let repeat = false;
  try { repeat = win.sessionStorage.getItem(sessionKey) === '1'; } catch {}
  let active = -1;
  let finished = false;
  let loaded = doc.readyState === 'complete';
  const started = win.performance.now();
  const minimum = repeat ? 1180 : 4380;
  const maximum = repeat ? 2200 : 6000;
  let sequenceTimer, readyTimer, maximumTimer, exitTimer, removeTimer;
  regions.forEach(el => { el.inert = true; el.setAttribute('data-loader-inert', ''); });
  const showGreeting = index => {
    active = Math.max(0, Math.min(words.length - 1, index));
    words.forEach((word, i) => {
      word.classList.remove('is-current', 'is-prev', 'is-next', 'is-past');
      const distance = i - active;
      if (distance === 0) word.classList.add('is-current');
      else if (distance === -1) word.classList.add('is-prev');
      else if (distance === 1) word.classList.add('is-next');
      else if (distance < -1) word.classList.add('is-past');
    });
    const progress = (active + 1) / words.length;
    language.textContent = words[active].dataset.language;
    count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(words.length).padStart(2, '0')}`;
    bar.style.transform = `scaleX(${progress})`;
    track.style.setProperty('--loader-progress', `${progress * 100}%`);
  };
  const onLoad = () => { loaded = true; };
  const releasePage = () => {
    win.clearTimeout(win.zykkenLoaderTimeout);
    doc.documentElement.classList.remove('is-loading');
    regions.forEach(el => { el.inert = false; el.removeAttribute('data-loader-inert'); });
    if (loader.contains(doc.activeElement)) {
      if (previousFocus !== doc.body && previousFocus?.isConnected) previousFocus.focus({preventScroll:true});
      else doc.activeElement.blur();
    }
  };
  const cleanup = () => {
    [sequenceTimer, readyTimer].forEach(id => win.clearInterval(id));
    [maximumTimer, exitTimer, removeTimer].forEach(id => win.clearTimeout(id));
    win.removeEventListener('load', onLoad);
    win.removeEventListener('zykken:loader-failsafe', dismissImmediately);
    doc.removeEventListener('keydown', onKey);
    motion.removeEventListener?.('change', onMotion);
  };
  const finish = () => {
    if (finished) return;
    finished = true;
    cleanup();
    showGreeting(words.length - 1);
    try { win.sessionStorage.setItem(sessionKey, '1'); } catch {}
    exitTimer = win.setTimeout(() => {
      loader.classList.add('done');
      releasePage();
      loader.setAttribute('aria-hidden', 'true');
      loader.removeAttribute('aria-modal');
    }, repeat ? 260 : 420);
    removeTimer = win.setTimeout(() => loader.remove(), (repeat ? 260 : 420) + 1320);
  };
  const dismissImmediately = () => {
    finished = true;
    cleanup();
    try { win.sessionStorage.setItem(sessionKey, '1'); } catch {}
    releasePage();
    loader.remove();
  };
  const onKey = event => { if (event.key === 'Escape') dismissImmediately(); };
  const onMotion = event => { if (event.matches) dismissImmediately(); };
  skip.addEventListener('click', dismissImmediately);
  loader.addEventListener('click', event => {
    if (!event.target.closest('[data-loader-skip]') && win.performance.now() - started >= 1050) finish();
  });
  doc.addEventListener('keydown', onKey);
  motion.addEventListener?.('change', onMotion);
  win.addEventListener('load', onLoad, {once:true});
  win.addEventListener('zykken:loader-failsafe', dismissImmediately, {once:true});
  showGreeting(repeat ? words.length - 1 : 0);
  skip.focus({preventScroll:true});
  if (!repeat) sequenceTimer = win.setInterval(() => {
    if (active < words.length - 1) showGreeting(active + 1);
    else win.clearInterval(sequenceTimer);
  }, 520);
  readyTimer = win.setInterval(() => { if (loaded && win.performance.now() - started >= minimum) finish(); }, 80);
  maximumTimer = win.setTimeout(finish, maximum);
}

export function validateInquiry(values) {
  const errors = {};
  const name = String(values.name || '').trim();
  const email = String(values.email || '').trim();
  const phone = String(values.phone || '').trim();
  const need = String(values.need || '').trim();
  const message = String(values.message || '').trim();
  if (name.length < 2 || name.length > 120) errors.name = 'Enter your name (at least 2 characters).';
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Enter a valid email address.';
  if (phone.length > 40 || (phone && phone.replace(/\D/g, '').length < 7)) errors.phone = 'Enter a valid phone number, or leave this field blank.';
  if (!['automation', 'website', 'voice', 'software', 'crm'].includes(need)) errors.need = 'Choose the service you are interested in.';
  if (message.length > 1200) errors.message = 'Keep your message to 1,200 characters or fewer.';
  return errors;
}

export function estimateROI(hours, cost) {
  const weeklyHours = Number.isFinite(Number(hours)) ? Math.max(0, Number(hours)) : 0;
  const hourlyCost = Number.isFinite(Number(cost)) ? Math.max(0, Number(cost)) : 0;
  const hoursSaved = weeklyHours * 0.8 * 4.33;
  const monthly = weeklyHours * hourlyCost * 0.8 * 4.33;
  return { hoursSaved, monthly, yearly: monthly * 12 };
}

function setupROICalculators() {
  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
  $$('[data-roi-calculator]').forEach(calculator => {
    const hours = $('[data-roi-hours]', calculator);
    const cost = $('[data-roi-cost]', calculator);
    if (!hours || !cost) return;
    const update = () => {
      const estimate = estimateROI(hours.value, cost.value);
      const values = {
        '[data-roi-hours-label]': `${number.format(hours.value)} hrs/wk`,
        '[data-roi-cost-label]': `${currency.format(cost.value)}/hr`,
        '[data-roi-monthly]': currency.format(estimate.monthly),
        '[data-roi-hours-saved]': `${number.format(estimate.hoursSaved)} hrs`,
        '[data-roi-yearly]': currency.format(estimate.yearly)
      };
      Object.entries(values).forEach(([selector, value]) => {
        const output = $(selector, calculator);
        if (output) output.textContent = value;
      });
      hours.setAttribute('aria-valuetext', `${number.format(hours.value)} hours per week`);
      cost.setAttribute('aria-valuetext', `${currency.format(cost.value)} per hour`);
    };
    hours.addEventListener('input', update);
    cost.addEventListener('input', update);
    update();
  });
}

function setupNavigation() {
  const toggle = $('[data-menu-toggle]');
  const nav = $('[data-nav]');
  if (!toggle || !nav) return;
  const setOpen = open => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    ['main', 'footer', '.site-header .brand'].forEach(selector => { const region = $(selector); if (region) region.inert = open; });
    if (open) nav.querySelector('a')?.focus();
  };
  setOpen(false);
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Tab' && toggle.getAttribute('aria-expanded') === 'true') {
      const targets = [...nav.querySelectorAll('a'), toggle];
      const first = targets[0];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); toggle.focus(); }
      else if (!event.shiftKey && document.activeElement === toggle) { event.preventDefault(); first?.focus(); }
    }
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 1200px)').addEventListener?.('change', event => { if (event.matches) setOpen(false); });
}

function setupCarousels() {
  $$('[data-carousel]').forEach(carousel => {
    const scope = carousel.parentElement;
    const previous = $('[data-carousel-prev]', scope);
    const next = $('[data-carousel-next]', scope);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const update = () => {
      const max = carousel.scrollWidth - carousel.clientWidth;
      if (previous) previous.disabled = carousel.scrollLeft <= 2;
      if (next) next.disabled = max < 2 || carousel.scrollLeft >= max - 2;
    };
    previous?.addEventListener('click', () => carousel.scrollBy({ left: -carousel.clientWidth, behavior: reducedMotion ? 'instant' : 'smooth' }));
    next?.addEventListener('click', () => carousel.scrollBy({ left: carousel.clientWidth, behavior: reducedMotion ? 'instant' : 'smooth' }));
    carousel.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  });
}

function setupWorkFilters() {
  const filters = $$('[data-filter]');
  if (!filters.length) return;
  const cards = $$('[data-category]');
  const selectFilter = button => {
    const selected = button.dataset.filter.toLowerCase();
    filters.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('is-active', active);
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    cards.forEach(card => {
      const visible = selected === 'all' || card.dataset.category.toLowerCase().split(/[,\s]+/).includes(selected);
      card.hidden = !visible;
      if (visible) count++;
    });
    $$('[data-filter-count], [data-filter-result]').forEach(output => {
      output.textContent = output.hasAttribute('data-filter-result')
        ? `Showing ${selected === 'all' ? 'all ' : ''}${count} ${count === 1 ? 'case study' : 'case studies'}`
        : `${count} ${count === 1 ? 'project' : 'projects'}`;
    });
  };
  filters.forEach(button => button.addEventListener('click', () => selectFilter(button)));
}

function setupContactForms() {
  $$('[data-contact-form]').forEach(form => {
    form.noValidate = true;
    const queryNeed = new URLSearchParams(window.location.search).get('need');
    if (['automation', 'website', 'voice', 'software', 'crm'].includes(queryNeed)) {
      const need = form.elements.namedItem('need');
      if (need) need.value = queryNeed;
    }
    let status = $('[data-contact-status]', form);
    if (!status) {
      status = document.createElement('p');
      status.dataset.contactStatus = '';
      status.className = 'form-status';
      form.append(status);
    }
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    const buttons = $$('button[type="submit"], input[type="submit"]', form);
    const setStatus = (message, state, fallback = false) => {
      status.replaceChildren(document.createTextNode(message));
      status.dataset.state = state;
      if (fallback) {
        status.append(document.createTextNode(' '));
        const link = document.createElement('a');
        link.href = 'mailto:info@zykken.com';
        link.textContent = 'Email info@zykken.com';
        status.append(link);
      }
    };
    const setErrors = errors => {
      ['name', 'email', 'phone', 'need', 'message'].forEach(name => {
        const field = form.elements.namedItem(name);
        if (!field) return;
        field.setAttribute('aria-invalid', String(Boolean(errors[name])));
        let note = $(`[data-field-error="${name}"]`, form);
        if (!note && errors[name]) {
          note = document.createElement('span');
          note.dataset.fieldError = name;
          note.className = 'field-error';
          field.insertAdjacentElement('afterend', note);
        }
        if (note) {
          note.id ||= `${form.id || 'inquiry'}-${name}-error`;
          note.textContent = errors[name] || '';
          note.hidden = !errors[name];
          const ids = (field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean).filter(id => id !== note.id);
          if (errors[name]) ids.push(note.id);
          if (ids.length) field.setAttribute('aria-describedby', ids.join(' '));
          else field.removeAttribute('aria-describedby');
        }
      });
    };
    let submitting = false;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (submitting) return;
      const data = Object.fromEntries(new FormData(form));
      const errors = validateInquiry(data);
      setErrors(errors);
      if (Object.keys(errors).length) {
        setStatus('Please check the highlighted fields and try again.', 'error');
        form.elements.namedItem(Object.keys(errors)[0])?.focus();
        return;
      }
      submitting = true;
      buttons.forEach(button => { button.disabled = true; button.setAttribute('aria-busy', 'true'); });
      setStatus('Sending your inquiry…', 'pending');
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(form.action || '/api/contact', {
          method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data), signal: controller.signal
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.ok !== true) {
          setStatus(result.error?.replace(/Please email info@zykken\.com\.?/g, '').trim() || 'We could not send your inquiry. Your details are still here so you can try again.', 'error', true);
          return;
        }
        form.reset();
        setErrors({});
        setStatus('Thanks — your inquiry has been sent. We will get back to you soon.', 'success');
      } catch (error) {
        setStatus(error.name === 'AbortError' ? 'The request took too long. Your details are still here so you can try again.' : 'We could not connect. Your details are still here so you can try again.', 'error', true);
      } finally {
        clearTimeout(timeout);
        submitting = false;
        buttons.forEach(button => { button.disabled = false; button.removeAttribute('aria-busy'); });
      }
    });
  });
}

function setupReveal() {
  const elements = $$('.reveal');
  if (!elements.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    elements.forEach(element => element.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  elements.forEach(element => observer.observe(element));
}

if (typeof document !== 'undefined') {
  document.body.classList.add('js-enhanced');
  $$('.js-year').forEach(element => { element.textContent = new Date().getFullYear(); });
  setupNavigation();
  setupCarousels();
  setupWorkFilters();
  setupROICalculators();
  setupContactForms();
  setupReveal();
  setupGreetingLoader();
}
