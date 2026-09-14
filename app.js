const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);

document.querySelectorAll('.nav-item').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
  document.querySelectorAll('.content').forEach((view) => view.classList.add('hidden'));
  button.classList.add('active');
  $(`#view-${button.dataset.view}`).classList.remove('hidden');
  $('#composer').classList.toggle('hidden', button.dataset.view !== 'chat');
}));

function sendMessage(text) {
  if (!text.trim()) return;
  const conversation = $('#conversation');
  conversation.innerHTML += `<div class="message user">${escapeHtml(text)}</div><div class="message assistant"><span class="brand-mark"><svg><use href="#spark"/></svg></span><p>我已收到。让我们从这个想法开始，一起把它变得清晰而特别。</p></div>`;
  $('#message').value = '';
  conversation.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
$('#send').addEventListener('click', () => sendMessage($('#message').value));
$('#message').addEventListener('keydown', (event) => { if (event.key === 'Enter') sendMessage(event.target.value); });
document.querySelectorAll('.suggestion').forEach((button) => button.addEventListener('click', () => sendMessage(button.dataset.prompt)));

$('#open-api').addEventListener('click', () => $('#api-modal').classList.remove('hidden'));
$('#close-modal').addEventListener('click', () => $('#api-modal').classList.add('hidden'));
$('#api-modal').addEventListener('click', (event) => { if (event.target === $('#api-modal')) $('#api-modal').classList.add('hidden'); });
$('#api-form').addEventListener('submit', (event) => {
  event.preventDefault(); const data = new FormData(event.target);
  $('#api-list').insertAdjacentHTML('beforeend', `<div class="api-item"><span class="status"></span><div><b>${escapeHtml(data.get('name'))}</b><small>${escapeHtml(data.get('url'))}</small></div><svg><use href="#chevron"/></svg></div>`);
  event.target.reset(); $('#api-modal').classList.add('hidden');
});
