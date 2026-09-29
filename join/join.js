const title = document.querySelector('#invite-title');
const description = document.querySelector('#invite-description');
const eyebrow = document.querySelector('#invite-eyebrow');
const icon = document.querySelector('#group-icon');
const challengeCard = document.querySelector('#challenge');
const challengeName = document.querySelector('#challenge-name');
const challengeSummary = document.querySelector('#challenge-summary');
const memberCount = document.querySelector('#member-count');
const returnHint = document.querySelector('#return-hint');

const weekdays = {
  MONDAY: 'lunes', TUESDAY: 'martes', WEDNESDAY: 'miércoles',
  THURSDAY: 'jueves', FRIDAY: 'viernes', SATURDAY: 'sábado', SUNDAY: 'domingo',
};
const number = new Intl.NumberFormat('es');

function targetSummary(challenge) {
  const target = challenge.target || {};
  if (challenge.trackingType === 'STEPS' && Number.isFinite(target.steps)) {
    return `${number.format(target.steps)} pasos`;
  }
  if (challenge.trackingType === 'SESSION') {
    return target.durationMinutes ? `${number.format(target.durationMinutes)} min por sesión` : 'Sesiones';
  }
  if (challenge.trackingType === 'QUANTITY' && target.quantity != null) {
    const amount = number.format(Number(target.quantity));
    return target.unit === 'PAGES' ? `${amount} páginas` : `${amount} ml`;
  }
  return 'A tu ritmo';
}

function scheduleSummary(schedule) {
  if (!schedule || schedule.type === 'DAILY') return 'Todos los días';
  if (schedule.type === 'TIMES_PER_WEEK') {
    return `${number.format(schedule.timesPerWeek)} veces por semana`;
  }
  if (schedule.type === 'SPECIFIC_DAYS') {
    return (schedule.weekdays || []).map((day) => weekdays[day]).filter(Boolean).join(', ');
  }
  return '';
}

function showUnavailable(code, status) {
  eyebrow.textContent = 'INVITACIÓN NO DISPONIBLE';
  title.textContent = 'Este enlace ya no está disponible';
  if (code === 'INVITATION_EXPIRED') {
    description.textContent = 'La invitación venció. Pídele a quien te invitó que cree una nueva.';
  } else if (code === 'INVITATION_REVOKED') {
    description.textContent = 'La invitación fue revocada. Pídele a quien te invitó un enlace nuevo.';
  } else if (code === 'INVITATION_EXHAUSTED') {
    description.textContent = 'La invitación alcanzó su límite de participantes.';
  } else if (status === 404) {
    description.textContent = 'No encontramos una invitación válida con este enlace.';
  } else {
    description.textContent = 'No pudimos cargar la invitación. Inténtalo de nuevo más tarde.';
  }
  document.querySelector('#download-link').hidden = true;
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

    const group = payload.group || {};
    eyebrow.textContent = 'TE INVITARON A SEGUIR JUNTOS';
    title.textContent = group.name || 'Un grupo de SIGUE';
    document.title = `${title.textContent} · SIGUE`;
    description.textContent = 'Un espacio para compartir un objetivo y acompañarse.';
    icon.textContent = group.icon || 'S';
    icon.style.backgroundColor = ({
      YELLOW: '#fff3cf', ORANGE: '#ffeadc', GREEN: '#e3f7e9', MINT: '#dff7f1',
      BLUE: '#e2f2fb', PURPLE: '#eee8ff', PINK: '#ffebf1',
    })[group.color] || '#fff3cf';

    if (payload.challenge) {
      const challenge = payload.challenge;
      const schedule = scheduleSummary(challenge.schedule);
      challengeName.textContent = challenge.name;
      challengeSummary.textContent = [targetSummary(challenge), schedule].filter(Boolean).join(' · ');
      challengeCard.hidden = false;
    }

    if (Number.isInteger(group.memberCount) && group.memberCount > 0) {
      memberCount.textContent = `${number.format(group.memberCount)} ${group.memberCount === 1 ? 'persona' : 'personas'} en el grupo`;
      memberCount.hidden = false;
    }
    returnHint.hidden = false;
  } catch {
    eyebrow.textContent = 'NO PUDIMOS CARGARLA';
    title.textContent = 'Inténtalo de nuevo';
    description.textContent = 'Revisa tu conexión y vuelve a abrir este enlace.';
  }
}

loadInvitation();
