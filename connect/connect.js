const apiOrigin = 'https://api.holasigue.com';
const fragment = new URLSearchParams(window.location.hash.slice(1) || window.location.search.slice(1));
const uid = fragment.get('uid');
const error = fragment.get('error');
const mode = fragment.get('mode');
const validUid = typeof uid === 'string' && /^[A-Za-z0-9_-]{20,128}$/.test(uid);
const $ = (selector) => document.querySelector(selector);

const copy = {
  es: {
    page: 'Conectar con SIGUE', loadingTitle: 'Conectar SIGUE con ChatGPT',
    loadingDescription: 'Estamos preparando la conexión.', loginTitle: 'Conectar SIGUE con ChatGPT',
    loginDescription: 'Entra con tu cuenta SIGUE para conectar ChatGPT.',
    consentTitle: 'Autorizar la conexión',
    consentDescription: 'Revisa lo que ChatGPT podrá consultar o preparar en tu cuenta.',
    scopeDescriptions: {
      'profile:read': 'Confirmar qué cuenta SIGUE has conectado.',
      'habits:read': 'Consultar una copia temporal de tus hábitos y resultados diarios del último año.',
      'habits:write': 'Preparar hábitos nuevos y registros de progreso para que SIGUE los aplique en el iPhone.',
      'routine:read': 'Consultar una copia temporal de tus planes y sus resultados.',
      'routine:write': 'Preparar cambios de Rutina para que SIGUE los valide y aplique en el iPhone.',
      'sessions:read': 'Consultar sesiones terminadas de los últimos 90 días: duración, pasos, distancia, velocidad, desnivel, esfuerzo y series y pesos de gimnasio cuando estén disponibles.',
    },
    forgotTitle: 'Recuperar contraseña', forgotDescription: 'Te enviaremos un código al correo de tu cuenta SIGUE.',
    resetTitle: 'Crear nueva contraseña', resetDescription: 'Introduce el código recibido y tu nueva contraseña.',
    unavailableTitle: 'No pudimos continuar la conexión',
    unavailable: 'Vuelve a iniciar la conexión desde ChatGPT.',
    loadError: 'No pudimos consultar la autorización. Revisa tu conexión e inténtalo de nuevo desde ChatGPT.',
    emailLabel: 'Correo electrónico', passwordLabel: 'Contraseña', emailButton: 'Entrar en SIGUE',
    forgotLink: '¿Olvidaste tu contraseña?', forgotButton: 'Enviar código', codeLabel: 'Código de 6 cifras',
    newPasswordLabel: 'Nueva contraseña (12 caracteres como mínimo)', resetButton: 'Cambiar contraseña',
    backToLogin: 'Volver a entrar', emailDivider: 'O entra con tu correo de SIGUE', appleButton: 'Continuar con Apple',
    loginHelp: 'Usa el mismo método con el que entras en SIGUE. Podrás revisar los permisos antes de autorizar.',
    permissionsTitle: 'Permisos solicitados', consentHelp: 'Puedes cancelar ahora o revocar la conexión más tarde desde SIGUE.',
    privacyLink: 'Consulta cómo tratamos tus datos',
    allowButton: 'Autorizar conexión', denyButton: 'Cancelar',
    privacyNote: 'Tus datos originales permanecen en el iPhone. Las copias de consulta vencen a los 7 días; no incluyen notas, rutas GPS ni muestras detalladas de Salud. ChatGPT no puede crear ni iniciar sesiones.',
    homeLink: 'Conoce SIGUE', account: 'Cuenta SIGUE',
    errors: {
      request: 'La solicitud de ChatGPT no es válida. Inicia la conexión de nuevo desde ChatGPT.',
      session: 'La sesión de autorización venció. Inicia la conexión de nuevo desde ChatGPT y permite las cookies.',
      form: 'No pudimos verificar el formulario. Inicia la conexión de nuevo desde ChatGPT.',
      flow: 'Esta autorización ya no está disponible. Inicia la conexión de nuevo desde ChatGPT.',
      invalid_credentials: 'El correo o la contraseña no son correctos.',
      account_not_linked: 'Esta cuenta de Apple o Google aún no está vinculada a una cuenta SIGUE.',
      invalid_google_credential: 'No pudimos verificar la identidad recibida de Google. Vuelve a intentarlo.',
      email_unverified: 'Verifica tu correo electrónico en SIGUE antes de conectar tu cuenta.',
      account_unavailable: 'Esta cuenta no está disponible para conectarse.',
      login_failed: 'No pudimos iniciar sesión ahora. Inténtalo de nuevo.',
      invalid_email: 'Introduce un correo electrónico válido.',
      invalid_reset: 'Comprueba el correo, el código y la nueva contraseña.',
      invalid_code: 'El código no es válido o ha vencido.',
      password_reset: 'Contraseña cambiada. Ya puedes iniciar sesión.',
    },
  },
  en: {
    page: 'Connect with SIGUE', loadingTitle: 'Connect SIGUE to ChatGPT',
    loadingDescription: 'Preparing your connection.', loginTitle: 'Connect SIGUE to ChatGPT',
    loginDescription: 'Sign in to your SIGUE account to connect ChatGPT.',
    consentTitle: 'Authorize connection',
    consentDescription: 'Review what ChatGPT can read or prepare in your account.',
    scopeDescriptions: {
      'profile:read': 'Confirm which SIGUE account you connected.',
      'habits:read': 'Read a temporary copy of your habits and daily results from the last year.',
      'habits:write': 'Prepare new habits and progress records for SIGUE to apply on your iPhone.',
      'routine:read': 'Read a temporary copy of your plans and their results.',
      'routine:write': 'Prepare Routine changes for SIGUE to validate and apply on your iPhone.',
      'sessions:read': 'Read completed sessions from the last 90 days: duration, steps, distance, speed, elevation change, effort, and gym sets and weights when available.',
    },
    forgotTitle: 'Reset your password', forgotDescription: 'We will email a code to your SIGUE account.',
    resetTitle: 'Create a new password', resetDescription: 'Enter the code you received and your new password.',
    unavailableTitle: 'We could not continue the connection',
    unavailable: 'Start the connection again from ChatGPT.',
    loadError: 'We could not load the authorization. Check your connection and try again from ChatGPT.',
    emailLabel: 'Email address', passwordLabel: 'Password', emailButton: 'Sign in to SIGUE',
    forgotLink: 'Forgot your password?', forgotButton: 'Send code', codeLabel: '6-digit code',
    newPasswordLabel: 'New password (at least 12 characters)', resetButton: 'Change password',
    backToLogin: 'Back to sign in', emailDivider: 'Or sign in with your SIGUE email', appleButton: 'Continue with Apple',
    loginHelp: 'Use the same sign-in method you use in SIGUE. You can review permissions before allowing access.',
    permissionsTitle: 'Requested permissions', consentHelp: 'You can cancel now or revoke the connection later in SIGUE.',
    privacyLink: 'See how we handle your data',
    allowButton: 'Authorize connection', denyButton: 'Cancel',
    privacyNote: 'Your original data stays on your iPhone. Read copies expire after 7 days and exclude notes, GPS routes and detailed Health samples. ChatGPT cannot create or start sessions.',
    homeLink: 'Explore SIGUE', account: 'SIGUE account',
    errors: {
      request: 'The ChatGPT request is invalid. Start the connection again from ChatGPT.',
      session: 'Your authorization session expired. Start again from ChatGPT and allow cookies.',
      form: 'We could not verify the form. Start the connection again from ChatGPT.',
      flow: 'This authorization is no longer available. Start again from ChatGPT.',
      invalid_credentials: 'The email or password is incorrect.',
      account_not_linked: 'This Apple or Google account is not linked to an existing SIGUE account.',
      invalid_google_credential: 'We could not verify the identity received from Google. Please try again.',
      email_unverified: 'Verify your SIGUE email address before connecting your account.',
      account_unavailable: 'This account cannot be connected.',
      login_failed: 'We could not sign you in. Please try again.',
      invalid_email: 'Enter a valid email address.',
      invalid_reset: 'Check your email address, code, and new password.',
      invalid_code: 'The code is invalid or has expired.',
      password_reset: 'Password changed. You can now sign in.',
    },
  },
};

let language;
try {
  const saved = localStorage.getItem('sigue-language');
  language = saved === 'es' || saved === 'en' ? saved : (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
} catch {
  language = (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
}
let details = null;
let activeScreen = 'loading';
let currentMessage = null;

function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  const strings = copy[next];
  document.title = `${strings.page} · SIGUE`;
  $('#email-label').textContent = $('#forgot-email-label').textContent = $('#reset-email-label').textContent = strings.emailLabel;
  $('#password-label').textContent = strings.passwordLabel;
  $('#email-button').textContent = strings.emailButton;
  $('#forgot-link').textContent = strings.forgotLink;
  $('#forgot-button').textContent = strings.forgotButton;
  $('#code-label').textContent = strings.codeLabel;
  $('#new-password-label').textContent = strings.newPasswordLabel;
  $('#reset-button').textContent = strings.resetButton;
  $('#email-divider').textContent = strings.emailDivider;
  $('#login-help').textContent = strings.loginHelp;
  $('#permissions-title').textContent = strings.permissionsTitle;
  $('#consent-help').textContent = strings.consentHelp;
  $('#privacy-link').textContent = strings.privacyLink;
  $('#privacy-link').href = next === 'es' ? '/privacidad.html' : '/en/privacy.html';
  $('#apple-button').textContent = strings.appleButton;
  $('#allow-button').textContent = strings.allowButton;
  $('#deny-button').textContent = strings.denyButton;
  $('#privacy-note').textContent = strings.privacyNote;
  $('#home-link').textContent = strings.homeLink;
  $('#home-link').href = $('#brand').href = next === 'es' ? '/es' : '/en';
  document.querySelectorAll('.back-to-login').forEach((button) => { button.textContent = strings.backToLogin; });
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.language === next));
  });
  try { localStorage.setItem('sigue-language', next); } catch { /* The selector works without storage. */ }
  render();
}

function render() {
  const strings = copy[language];
  const grantedScopes = activeScreen === 'consent' && Array.isArray(details?.scopes) ? details.scopes : [];
  for (const screen of ['login', 'forgot', 'reset', 'consent']) $(`#${screen}`).hidden = screen !== activeScreen;
  const titles = { loading: strings.loadingTitle, login: strings.loginTitle, forgot: strings.forgotTitle, reset: strings.resetTitle,
    consent: strings.consentTitle, unavailable: strings.unavailableTitle };
  const descriptions = { loading: strings.loadingDescription, login: strings.loginDescription, forgot: strings.forgotDescription,
    reset: strings.resetDescription, consent: strings.consentDescription,
    unavailable: validUid ? strings.loadError : strings.unavailable };
  $('#title').textContent = titles[activeScreen];
  $('#description').textContent = descriptions[activeScreen];
  $('#privacy-note').textContent = strings.privacyNote;
  $('#permissions').replaceChildren(...grantedScopes.filter((scope) => strings.scopeDescriptions[scope]).map((scope) => {
    const item = document.createElement('li');
    item.textContent = strings.scopeDescriptions[scope];
    return item;
  }));
  const message = currentMessage ? strings.errors[currentMessage] : '';
  $('#message').textContent = message || '';
  $('#message').hidden = !message;
  if (activeScreen === 'consent' && details) {
    const name = details.displayName || strings.account;
    $('#account').textContent = details.displayName ? `${strings.account}: ${name}` : name;
  }
}

function show(screen, message = null) {
  activeScreen = screen;
  currentMessage = message;
  render();
}

function submitIdentity(form, field, value) {
  form.elements[field].value = value;
  form.submit();
}

function updateSocialVisibility() {
  const available = !$('#apple-button').hidden || !$('#google-button').hidden;
  $('#social').hidden = !available;
  $('#email-divider').hidden = !available;
}

function loadGoogle(clientId) {
  window.sigueGoogle = (result) => {
    if (typeof result.credential === 'string') submitIdentity($('#google-form'), 'credential', result.credential);
  };
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.onload = () => {
    try {
      $('#google-button').hidden = false;
      updateSocialVisibility();
      window.google.accounts.id.initialize({ client_id: clientId, callback: window.sigueGoogle, ux_mode: 'popup' });
      window.google.accounts.id.renderButton($('#google-button'), {
        theme: 'outline', size: 'large', text: 'signin_with', width: Math.min($('#google-button').clientWidth, 400),
      });
    } catch { $('#google-button').hidden = true; updateSocialVisibility(); }
  };
  script.onerror = () => { $('#google-button').hidden = true; updateSocialVisibility(); };
  document.head.append(script);
}

function loadApple(info) {
  const button = $('#apple-button');
  button.hidden = false;
  updateSocialVisibility();
  const script = document.createElement('script');
  script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
  script.onload = () => {
    try {
      window.AppleID.auth.init({ clientId: info.appleClientId, redirectURI: info.appleRedirectUri,
        state: info.appleState, nonce: info.appleNonce, usePopup: true });
    } catch { button.hidden = true; updateSocialVisibility(); return; }
    button.disabled = false;
    button.addEventListener('click', async () => {
      button.disabled = true;
      try {
        const result = await window.AppleID.auth.signIn();
        if (result.authorization?.id_token && result.authorization?.state === info.appleState) {
          $('#apple-form').elements.state.value = info.csrf;
          submitIdentity($('#apple-form'), 'identityToken', result.authorization.id_token);
          return;
        }
        show('login', 'login_failed');
      } catch { show('login', 'login_failed'); }
      finally { button.disabled = false; }
    });
  };
  script.onerror = () => { button.hidden = true; updateSocialVisibility(); };
  document.head.append(script);
}

document.querySelectorAll('[data-language]').forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});
$('#forgot-link').addEventListener('click', () => show('forgot'));
document.querySelectorAll('.back-to-login').forEach((button) => button.addEventListener('click', () => show('login')));
setLanguage(language);

if (validUid) {
  const endpoint = `${apiOrigin}/oauth/interaction/${uid}`;
  for (const [form, path] of [['email-form', 'email'], ['google-form', 'google'], ['apple-form', 'apple'],
    ['forgot-form', 'forgot'], ['reset-form', 'reset'], ['consent-form', 'consent']]) {
    $(`#${form}`).action = `${endpoint}/${path}`;
  }
  fetch(`${endpoint}/details`, { credentials: 'include', cache: 'no-store' })
    .then(async (response) => {
      if (!response.ok) throw new Error('Authorization unavailable');
      return response.json();
    })
    .then((payload) => {
      if (!payload || (payload.prompt !== 'login' && payload.prompt !== 'consent') || typeof payload.csrf !== 'string') {
        throw new Error('Invalid authorization details');
      }
      details = payload;
      document.querySelectorAll('.csrf').forEach((input) => { input.value = payload.csrf; });
      if (payload.prompt === 'consent') {
        show('consent');
        return;
      }
      if (payload.googleClientId) loadGoogle(payload.googleClientId);
      if (payload.appleClientId && payload.appleRedirectUri && payload.appleState && payload.appleNonce) loadApple(payload);
      show(mode === 'forgot' || mode === 'reset' ? mode : 'login', error);
    })
    .catch(() => show('unavailable', error));
} else {
  show('unavailable', error);
}
