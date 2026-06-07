browser.runtime.onMessage.addListener((message) => {
  if (message.action !== 'injectIframe') return;

  const existing = document.getElementById('uranus-fake-iframe');
  if (existing) existing.remove();

  document.querySelectorAll('[id^="yn-bnr-banner"], .YN').forEach(el => el.remove());

  const iframe = document.createElement('iframe');
  iframe.id = 'uranus-fake-iframe';

  const separator = message.htmlUrl.includes('?') ? '&' : '?';
  iframe.src = message.landingUrl
    ? `${message.htmlUrl}${separator}click_url=${encodeURIComponent(message.landingUrl)}`
    : message.htmlUrl;

  iframe.style.cssText =
    `height:${message.height}px;` +
    'width:100%;' +
    'position:fixed;' +
    'left:0;' +
    'bottom:0;' +
    'z-index:999999;' +
    'border:none;' +
    'display:block;';

  document.body.appendChild(iframe);
});
