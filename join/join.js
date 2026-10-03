const title = document.querySelector('#invite-title');
const description = document.querySelector('#invite-description');
const eyebrow = document.querySelector('#invite-eyebrow');
const icon = document.querySelector('#group-icon');
const challengeCard = document.querySelector('#challenge');
const challengeName = document.querySelector('#challenge-name');
const challengeSummary = document.querySelector('#challenge-summary');
const memberCount = document.querySelector('#member-count');
const returnHint = document.querySelector('#return-hint');
const footerNote = document.querySelector('#footer-note');

const copy = {
  es: {
    titleLoading: 'Estamos buscando tu invitación', descriptionLoading: 'Un momento, por favor.', loadingEyebrow: 'JUNTOS, A TU RITMO',
    unavailableEyebrow: 'INVITACIÓN NO DISPONIBLE', unavailableTitle: 'Este enlace ya no está disponible',
    expired: 'La invitación venció. Pídele a quien te invitó que cree una nueva.',
    revoked: 'La invitación fue revocada. Pídele a quien te invitó un enlace nuevo.',
    exhausted: 'La invitación alcanzó su límite de participantes.', notFound: 'No encontramos una invitación válida con este enlace.',
    unavailable: 'No pudimos cargar la invitación. Inténtalo de nuevo más tarde.',
    invited: 'TE INVITARON A SEGUIR JUNTOS', group: 'Un grupo de SIGUE', groupDescription: 'Un espacio para compartir un objetivo y acompañarse.',
    download: 'Descargar SIGUE en App Store', returnHint: 'Después de instalar SIGUE, vuelve a este enlace para abrir la invitación en la app.',
    footer: 'Tus datos personales siguen siendo tuyos.', loadErrorEyebrow: 'NO PUDIMOS CARGARLA', loadErrorTitle: 'Inténtalo de nuevo',
    loadError: 'Revisa tu conexión y vuelve a abrir este enlace.', memberOne: 'persona en el grupo', memberMany: 'personas en el grupo',
    pages: 'páginas', sessions: 'Sesiones', perSession: 'min por sesión', daily: 'Todos los días', timesPerWeek: 'veces por semana', atYourPace: 'A tu ritmo',
    weekdays: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  },
  en: {
    titleLoading: 'Looking for your invitation', descriptionLoading: 'Just a moment.', loadingEyebrow: 'JUNTOS · AT YOUR OWN PACE',
    unavailableEyebrow: 'INVITATION UNAVAILABLE', unavailableTitle: 'This link is no longer available',
    expired: 'This invitation has expired. Ask the person who invited you to create a new one.',
    revoked: 'This invitation was revoked. Ask the person who invited you for a new link.',
    exhausted: 'This invitation has reached its participant limit.', notFound: 'We could not find a valid invitation at this link.',
    unavailable: 'We could not load the invitation. Please try again later.',
    invited: 'YOU HAVE BEEN INVITED TO JUNTOS', group: 'A SIGUE group', groupDescription: 'A place to share a goal and support one another.',
    download: 'Download SIGUE on the App Store', returnHint: 'After installing SIGUE, return to this link to open the invitation in the app.',
    footer: 'Your personal data stays yours.', loadErrorEyebrow: 'WE COULD NOT LOAD IT', loadErrorTitle: 'Please try again',
    loadError: 'Check your connection and open this link again.', memberOne: 'person in this group', memberMany: 'people in this group',
    pages: 'pages', sessions: 'Sessions', perSession: 'min per session', daily: 'Every day', timesPerWeek: 'times per week', atYourPace: 'At your own pace',
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
};
const params = new URLSearchParams(window.location.search);
let language = params.get('lang') === 'en' || params.get('lang') === 'es'
  ? params.get('lang')
  : (() => {
    try {
      const saved = localStorage.getItem('sigue-language');
      return saved === 'en' || saved === 'es' ? saved : (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
    } catch {
      return (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
    }
  })();
let number = new Intl.NumberFormat(language);

function setLanguage(nextLanguage) {
  language = nextLanguage;
  const strings = copy[language];
  document.documentElement.lang = language;
  document.title = language === 'en' ? 'SIGUE Invitation' : 'Invitación a SIGUE';
  const homeLink = document.querySelector('#home-link');
  homeLink.href = language === 'en' ? '/en' : '/es';
  homeLink.textContent = language === 'en' ? 'Explore SIGUE' : 'Conoce SIGUE';
  document.querySelector('#invite-title').textContent = strings.titleLoading;
  description.textContent = strings.descriptionLoading;
  eyebrow.textContent = strings.loadingEyebrow;
  downloadLink.firstChild.nodeValue = `${strings.download} `;
  document.querySelector('#return-hint').textContent = strings.returnHint;
  footerNote.textContent = strings.footer;
  document.querySelectorAll('[data-invite-language]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.inviteLanguage === language));
  });
  number = new Intl.NumberFormat(language);
  try {
    localStorage.setItem('sigue-language', language);
  } catch {
    // The language selector remains usable without storage.
  }
  if (payloadLoaded) renderInvitation();
  else if (unavailableDetails) showUnavailable(unavailableDetails.code, unavailableDetails.status);
  else if (loadError) showLoadError();
}

const downloadLink = document.querySelector('#download-link');
let payloadLoaded = false;
let loadedPayload = null;
let unavailableDetails = null;
let loadError = false;
document.querySelectorAll('[data-invite-language]').forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.inviteLanguage));
});

function targetSummary(challenge) {
  const strings = copy[language];
  const target = challenge.target || {};
  if (challenge.trackingType === 'STEPS' && Number.isFinite(target.steps)) {
    return language === 'en' ? `${number.format(target.steps)} steps` : `${number.format(target.steps)} pasos`;
  }
  if (challenge.trackingType === 'SESSION') {
    return target.durationMinutes ? `${number.format(target.durationMinutes)} ${strings.perSession}` : strings.sessions;
  }
  if (challenge.trackingType === 'QUANTITY' && target.quantity != null) {
    const amount = number.format(Number(target.quantity));
    return target.unit === 'PAGES' ? `${amount} ${strings.pages}` : `${amount} ml`;
  }
  return strings.atYourPace;
}

function scheduleSummary(schedule) {
  const strings = copy[language];
  if (!schedule || schedule.type === 'DAILY') return strings.daily;
  if (schedule.type === 'TIMES_PER_WEEK') {
    return `${number.format(schedule.timesPerWeek)} ${strings.timesPerWeek}`;
  }
  if (schedule.type === 'SPECIFIC_DAYS') {
    const weekdays = { MONDAY: 1, TUESDAY: 2, WEDNESDAY: 3, THURSDAY: 4, FRIDAY: 5, SATURDAY: 6, SUNDAY: 0 };
    return (schedule.weekdays || []).map((day) => strings.weekdays[weekdays[day]]).filter(Boolean).join(', ');
  }
  return '';
}

function showUnavailable(code, status) {
  unavailableDetails = { code, status };
  const strings = copy[language];
  eyebrow.textContent = strings.unavailableEyebrow;
  title.textContent = strings.unavailableTitle;
  document.title = `${strings.unavailableTitle} · SIGUE`;
  if (code === 'INVITATION_EXPIRED') description.textContent = strings.expired;
  else if (code === 'INVITATION_REVOKED') description.textContent = strings.revoked;
  else if (code === 'INVITATION_EXHAUSTED') description.textContent = strings.exhausted;
  else if (status === 404) description.textContent = strings.notFound;
  else description.textContent = strings.unavailable;
  downloadLink.hidden = true;
}

function showLoadError() {
  loadError = true;
  const strings = copy[language];
  eyebrow.textContent = strings.loadErrorEyebrow;
  title.textContent = strings.loadErrorTitle;
  document.title = `${strings.loadErrorTitle} · SIGUE`;
  description.textContent = strings.loadError;
}

function renderInvitation() {
  const strings = copy[language];
  const group = loadedPayload.group || {};
  eyebrow.textContent = strings.invited;
  title.textContent = group.name || strings.group;
  document.title = `${title.textContent} · SIGUE`;
  description.textContent = strings.groupDescription;
  icon.textContent = group.icon || 'S';
  icon.style.backgroundColor = ({
    YELLOW: '#fff3cf', ORANGE: '#ffeadc', GREEN: '#e3f7e9', MINT: '#dff7f1',
    BLUE: '#e2f2fb', PURPLE: '#eee8ff', PINK: '#ffebf1',
  })[group.color] || '#fff3cf';

  if (loadedPayload.challenge) {
    const challenge = loadedPayload.challenge;
    const schedule = scheduleSummary(challenge.schedule);
    challengeName.textContent = challenge.name;
    challengeSummary.textContent = [targetSummary(challenge), schedule].filter(Boolean).join(' · ');
    challengeCard.hidden = false;
  } else {
    challengeCard.hidden = true;
  }

  if (Number.isInteger(group.memberCount) && group.memberCount > 0) {
    const count = number.format(group.memberCount);
    const memberLabel = language === 'en'
      ? (group.memberCount === 1 ? copy.en.memberOne : copy.en.memberMany)
      : (group.memberCount === 1 ? copy.es.memberOne : copy.es.memberMany);
    memberCount.textContent = `${count} ${memberLabel}`;
    memberCount.hidden = false;
  } else {
    memberCount.hidden = true;
  }
  downloadLink.hidden = false;
  returnHint.hidden = false;
}

async function loadInvitation() {
  const match = window.location.pathname.match(/^\/join\/([A-Za-z0-9_-]{43})\/?$/);
  if (!match) {
    showUnavailable('RESOURCE_NOT_FOUND', 404);
    return;
  }

  try {
    const response = await fetch(`/api/invitations/${encodeURIComponent(match[1])}/preview`, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10000),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      showUnavailable(payload?.error?.code, response.status);
      return;
    }
    loadedPayload = payload;
    payloadLoaded = true;
    renderInvitation();
  } catch {
    showLoadError();
  }
}

setLanguage(language);
loadInvitation();
