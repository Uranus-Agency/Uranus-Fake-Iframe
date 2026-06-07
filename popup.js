const KEYS = {
  height: 'uranus_height',
  htmlUrl: 'uranus_html_url',
  landingUrl: 'uranus_landing_url',
};

document.addEventListener('DOMContentLoaded', () => {
  const heightEl    = document.getElementById('height');
  const htmlUrlEl   = document.getElementById('htmlUrl');
  const landingEl   = document.getElementById('landingUrl');
  const confirmBtn  = document.getElementById('confirmBtn');
  const clearBtn    = document.getElementById('clearBtn');
  const statusEl    = document.getElementById('status');

  heightEl.value  = localStorage.getItem(KEYS.height)    || '';
  htmlUrlEl.value = localStorage.getItem(KEYS.htmlUrl)   || '';
  landingEl.value = localStorage.getItem(KEYS.landingUrl) || '';

  confirmBtn.addEventListener('click', async () => {
    const height    = heightEl.value.trim();
    const htmlUrl   = htmlUrlEl.value.trim();
    const landingUrl = landingEl.value.trim();

    if (!height || !htmlUrl) {
      showStatus('Height و HTML URL الزامی هستند', 'error');
      return;
    }

    localStorage.setItem(KEYS.height,    height);
    localStorage.setItem(KEYS.htmlUrl,   htmlUrl);
    localStorage.setItem(KEYS.landingUrl, landingUrl);

    try {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      await browser.tabs.sendMessage(tab.id, {
        action: 'injectIframe',
        height,
        htmlUrl,
        landingUrl,
      });
      showStatus('✓ Iframe اضافه شد', 'success');
      setTimeout(() => window.close(), 900);
    } catch {
      showStatus('صفحه را رفرش کنید و دوباره امتحان کنید', 'error');
    }
  });

  clearBtn.addEventListener('click', () => {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    heightEl.value  = '';
    htmlUrlEl.value = '';
    landingEl.value = '';
    showStatus('پاک شد', 'success');
  });

  function showStatus(msg, type) {
    statusEl.textContent = msg;
    statusEl.className   = `status ${type}`;
    setTimeout(() => {
      statusEl.textContent = '';
      statusEl.className   = 'status';
    }, 2500);
  }
});
