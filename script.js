const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuButton.focus();
  }
});
document.documentElement.classList.add('js');
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(filter => {
      filter.classList.toggle('active', filter === button);
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    let count = 0;
    document.querySelectorAll('.cake-card').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) count++;
    });
    document.querySelector('#gallery-status').textContent = `${count} ${count === 1 ? 'cake' : 'cakes'} shown.`;
  });
});
const now = new Date();
document.querySelector('#year').textContent = now.getFullYear();
document.querySelector('#cake-date').min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
const form = document.querySelector('#cake-request');
const status = document.querySelector('#form-status');
const submit = form.querySelector('[type="submit"]');
const endpoint = window.CAKES_CONFIG?.formspreeEndpoint || '';
const configured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint);
if (configured) {
  status.textContent = '';
  submit.disabled = false;
  submit.textContent = 'Send cake request';
}
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!configured || submit.disabled || !form.reportValidity()) return;
  submit.disabled = true;
  submit.textContent = 'Sending your request…';
  form.setAttribute('aria-busy', 'true');
  status.textContent = '';
  status.classList.remove('error', 'success');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(endpoint, {
      method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal,
    });
    if (!response.ok) throw new Error('Submission failed');
    status.textContent = 'Thanks for sending me a cake request! I’ll get back to you about availability and pricing. Your cake isn’t booked until I confirm it with you.';
    status.classList.add('success');
    form.reset();
  } catch (error) {
    status.textContent = error.name === 'AbortError'
      ? 'The connection timed out. Your request may have arrived, but it wasn’t possible to confirm. Your details are still here if you need to try again.'
      : 'Your request didn’t go through. Your details are still here. Please check your connection and try again.';
    status.classList.add('error');
  } finally {
    clearTimeout(timeout);
    form.removeAttribute('aria-busy');
    submit.disabled = false;
    submit.textContent = 'Send cake request';
  }
});
