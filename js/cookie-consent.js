(() => {
  'use strict';

  // GA4 Landing web stream. An empty ID disables GA.
  const measurementId = 'G-4VVBDBG8P9';
  const configured = /^G-[A-Z0-9]+$/.test(measurementId);
  const preferenceKey = 'sigue.cookie-consent';
  const version = 1;
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const english = document.documentElement.lang.startsWith('en');
  const landingPaths = new Set(['/es', '/en', '/es.html', '/en.html']);
  const mayMeasurePage = configured && landingPaths.has(location.pathname.replace(/\/$/, ''));
  const strings = english ? {
    title: 'Cookies and privacy',
    description: 'Only with your permission, we use Google Analytics to understand visits to this website. Rejecting analytics does not affect access. You can change your choice from “Cookies”.',
    unconfigured: 'Visit analytics is currently disabled. This website remembers your language preference. You can review our privacy policy below.',
    accept: 'Accept analytics', reject: 'Reject analytics', close: 'Close', settings: 'Cookies', privacy: 'Privacy policy',
    enabled: 'Analytics: accepted.', disabled: 'Analytics: rejected.',
    retention: 'Your choice is stored in this browser for 180 days.',
    storageError: 'We could not save your choice in this browser. Analytics stays off. Check your browser settings and try again.',
  } : {
    title: 'Cookies y privacidad',
    description: 'Solo con tu permiso usamos Google Analytics para entender las visitas a esta web. Rechazar la analítica no afecta al acceso. Puedes cambiar tu elección desde «Cookies».',
    unconfigured: 'La analítica de visitas está desactivada. Esta web recuerda tu preferencia de idioma. Puedes consultar nuestra política de privacidad más abajo.',
    accept: 'Aceptar analítica', reject: 'Rechazar analítica', close: 'Cerrar', settings: 'Cookies', privacy: 'Política de privacidad',
    enabled: 'Analítica: aceptada.', disabled: 'Analítica: rechazada.',
    retention: 'Tu elección se guarda en este navegador durante 180 días.',
    storageError: 'No pudimos guardar tu elección en este navegador. La analítica sigue desactivada. Revisa los ajustes del navegador e inténtalo de nuevo.',
  };
  let analyticsLoaded = false;
  let expiryTimer;
  let returnFocus;

  function readChoice() {
    try {
      const choice = JSON.parse(localStorage.getItem(preferenceKey));
      const now = Date.now();
      return choice && choice.version === version && typeof choice.analytics === 'boolean'
        && Number.isFinite(choice.savedAt) && choice.savedAt <= now
        && now - choice.savedAt < lifetime ? choice : null;
    } catch { return null; }
  }

  function persistChoice(analytics) {
    try {
      // Remove an earlier grant first so a failed write cannot leave it in force.
      localStorage.removeItem(preferenceKey);
      const choice = { version, analytics, savedAt: Date.now() };
      localStorage.setItem(preferenceKey, JSON.stringify(choice));
      return readChoice();
    } catch { return null; }
  }

  function clearAnalyticsCookies() {
    const names = document.cookie.split(';').map(item => item.trim().split('=')[0])
      .filter(name => /^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name));
    const host = location.hostname;
    const domains = ['', `; Domain=${host}`, `; Domain=.${host}`];
    if (host === 'holasigue.com' || host.endsWith('.holasigue.com')) domains.push('; Domain=holasigue.com', '; Domain=.holasigue.com');
    const parts = location.pathname.split('/').filter(Boolean);
    const paths = new Set(['/']);
    parts.forEach((_, index) => { paths.add('/' + parts.slice(0, index + 1).join('/')); });
    for (const name of names) for (const domain of domains) for (const path of paths) {
      document.cookie = `${name}=; Max-Age=0; Path=${path}${domain}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
    }
  }

  function stopAnalytics() {
    if (configured) window[`ga-disable-${measurementId}`] = true;
    clearAnalyticsCookies();
  }

  function enableAnalytics() {
    if (!mayMeasurePage || analyticsLoaded || readChoice()?.analytics !== true) return;
    analyticsLoaded = true;
    window[`ga-disable-${measurementId}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    // Basic consent mode: no Google script or request before explicit acceptance.
    window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('set', 'ads_data_redaction', true);
    window.gtag('set', 'url_passthrough', false);
    let referrer = '';
    try { if (document.referrer) referrer = new URL(document.referrer).origin; } catch { /* No referrer is safer than a malformed one. */ }
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: location.origin + location.pathname,
      page_referrer: referrer,
      cookie_expires: lifetime / 1000,
      cookie_update: false,
    });
    window.gtag('event', 'page_view', { page_location: location.origin + location.pathname, page_referrer: referrer, page_title: document.title });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(script);
  }

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  const panel = element('section', '', 'cookie-panel');
  panel.hidden = true;
  panel.setAttribute('aria-labelledby', 'cookie-heading');
  const content = element('div', '', 'cookie-panel-content');
  const heading = element('h2', strings.title);
  heading.id = 'cookie-heading';
  heading.tabIndex = -1;
  const description = element('p', configured ? strings.description : strings.unconfigured);
  const status = element('p', '', 'cookie-status');
  status.setAttribute('role', 'status');
  const privacy = element('a', strings.privacy, 'cookie-privacy');
  privacy.href = english ? '/en/privacy#website' : '/privacidad#website';
  content.append(heading, description, status, privacy);
  const actions = element('div', '', 'cookie-actions');
  const reject = element('button', strings.reject, 'cookie-action');
  const accept = element('button', strings.accept, 'cookie-action');
  const close = element('button', strings.close, 'cookie-close');
  [reject, accept, close].forEach(button => { button.type = 'button'; });
  accept.disabled = !configured;
  actions.append(reject, accept, close);
  panel.append(content, actions);
  document.body.append(panel);

  function reserveSpace() {
    document.documentElement.style.setProperty('--cookie-panel-space', panel.hidden ? '0px' : `${panel.getBoundingClientRect().height + 16}px`);
  }
  if ('ResizeObserver' in window) new ResizeObserver(reserveSpace).observe(panel);
  window.addEventListener('resize', reserveSpace, { passive: true });

  function show(focus = false) {
    const choice = readChoice();
    status.textContent = configured ? `${choice ? choice.analytics ? strings.enabled : strings.disabled : ''} ${strings.retention}`.trim() : '';
    panel.hidden = false;
    reserveSpace();
    if (focus) { returnFocus = document.activeElement; heading.focus({ preventScroll: true }); }
  }
  function hide() {
    panel.hidden = true;
    reserveSpace();
    if (returnFocus instanceof HTMLElement) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  }
  function scheduleExpiry(choice) {
    clearTimeout(expiryTimer);
    if (!choice) return;
    // setTimeout cannot represent 180 days; revisit at most once a day.
    expiryTimer = setTimeout(refresh, Math.min(86400000, Math.max(1, choice.savedAt + lifetime - Date.now())));
  }
  function refresh() {
    const choice = readChoice();
    if (!configured || !choice?.analytics) {
      stopAnalytics();
      if (analyticsLoaded) { location.reload(); return; }
    } else enableAnalytics();
    scheduleExpiry(choice);
    if (configured && !choice) show();
    else if (!panel.hidden) show();
  }
  function choose(analytics) {
    if (analytics && !configured) return;
    if (!analytics) stopAnalytics();
    const choice = persistChoice(analytics);
    if (!choice) {
      stopAnalytics();
      if (analyticsLoaded) {
        // Leave only the disabling flag active; never re-grant after a storage error.
        window.dataLayer = [];
      }
      status.textContent = strings.storageError;
      return;
    }
    if (!analytics && analyticsLoaded) {
      // Unload automatic listeners as well as disabling collection and clearing cookies.
      location.reload();
      return;
    }
    if (analytics) {
      window[`ga-disable-${measurementId}`] = false;
      enableAnalytics();
    }
    scheduleExpiry(choice);
    hide();
  }
  reject.addEventListener('click', () => choose(false));
  accept.addEventListener('click', () => choose(true));
  close.addEventListener('click', hide);
  panel.addEventListener('keydown', event => { if (event.key === 'Escape') hide(); });
  document.querySelectorAll('[data-cookie-settings]').forEach(button => button.addEventListener('click', () => show(true)));
  window.addEventListener('storage', event => { if (event.key === preferenceKey || event.key === null) refresh(); });
  window.addEventListener('pageshow', refresh);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  refresh();
})();
