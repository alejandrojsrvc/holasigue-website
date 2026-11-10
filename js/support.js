const supportForm = document.querySelector('[data-support-form]');

if (supportForm) {
  const subject = supportForm.elements.namedItem('subject');
  const body = supportForm.elements.namedItem('body');
  const copyButton = supportForm.querySelector('[data-support-copy]');
  const status = supportForm.querySelector('[data-support-status]');
  const english = document.documentElement.lang === 'en';

  const validate = () => {
    [subject, body].forEach((field) => {
      field.setCustomValidity(field.value.trim() ? '' : field.dataset.requiredMessage);
    });
    return supportForm.reportValidity();
  };

  [subject, body].forEach((field) => {
    field.addEventListener('input', () => {
      field.setCustomValidity('');
      status.textContent = '';
    });
  });

  supportForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validate()) return;

    const message = body.value.trim().replace(/\r?\n/g, '\r\n');
    const url = `${supportForm.action}?subject=${encodeURIComponent(subject.value.trim())}&body=${encodeURIComponent(message)}`;
    status.textContent = english
      ? 'Review and send the email from your email app. If it does not open, use “Copy message” and email it to soporte@holasigue.com. Nothing has been sent from this page.'
      : 'Revisa y envía el correo desde tu app de correo. Si no se abre, utiliza «Copiar mensaje» y envíalo a soporte@holasigue.com. No se ha enviado nada desde esta página.';
    window.location.href = url;
  });

  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    if (!validate()) return;
    const message = `${english ? 'To' : 'Para'}: soporte@holasigue.com\n${english ? 'Subject' : 'Asunto'}: ${subject.value.trim()}\n\n${body.value.trim()}`;
    try {
      await navigator.clipboard.writeText(message);
      status.textContent = english
        ? 'Message copied. Paste it into an email to soporte@holasigue.com and send it from there.'
        : 'Mensaje copiado. Pégalo en un correo a soporte@holasigue.com y envíalo desde allí.';
    } catch {
      body.focus();
      body.select();
      status.textContent = english
        ? 'Automatic copying is unavailable. Copy the selected text and the subject, then email them to soporte@holasigue.com.'
        : 'No se pudo copiar automáticamente. Copia el texto seleccionado y el asunto y envíalos a soporte@holasigue.com.';
    }
  });
}
