# Uranus Fake Iframe

A Firefox browser extension that injects a fixed-position iframe at the bottom of any web page.

## What it does

Clicking the toolbar icon opens a small popup where you enter:
- **Height** — iframe height in pixels
- **HTML URL** — the URL to load inside the iframe
- **Landing URL** — appended as `?click_url=<landing_url>` to the HTML URL

After clicking **تایید**, an iframe is injected into the current page with these styles:

```css
height: <your input>px;
width: 100%;
position: fixed;
left: 0;
bottom: 0;
z-index: 999999;
border: none;
```

The `src` is built as:
```
<HTML URL>?click_url=<Landing URL>
```

Your inputs are saved automatically and restored the next time you open the popup. The **Clear** button wipes all saved values.

---

## Installation (Local — no release needed)

### Requirements

- Firefox 57 or later

---

### Option A — Temporary (easiest, removed on Firefox restart)

1. Open Firefox and go to:
   ```
   about:debugging
   ```

2. Click **This Firefox** in the left sidebar.

3. Click **Load Temporary Add-on…**

4. Navigate to the `uranus-fake-iframe` folder and select **`manifest.json`**.

5. The Uranus icon appears in your toolbar — you're done.

> Re-do steps 1–4 after every Firefox restart.

---

### Option B — Permanent (stays after restart, no signing)

> This disables signature verification for all extensions. Only do this on a dev/personal profile.

**Step 1 — Disable signature requirement:**

1. Go to `about:config` in Firefox.
2. Search for `xpinstall.signatures.required`.
3. Double-click it to set it to `false`.

**Step 2 — Package the extension:**

```bash
cd uranus-fake-iframe
zip -r uranus-fake-iframe.zip manifest.json popup.html popup.js content.js icons/
```

**Step 3 — Install the package:**

1. Go to `about:addons` in Firefox.
2. Click the **gear icon ⚙** (top-right).
3. Select **Install Add-on From File…**
4. Select the `uranus-fake-iframe.zip` file you just created.
5. Click **Add** when prompted.

The extension is now permanently installed and survives restarts.

---

## Usage

1. Navigate to any web page.
2. Click the **Uranus Fake Iframe** icon in the Firefox toolbar.
3. Fill in the fields:

   | Field | Example |
   |-------|---------|
   | Height (px) | `150` |
   | HTML URL | `https://example.com/ad.html` |
   | Landing URL | `https://landing.example.com` |

4. Click **تایید** → the iframe is injected at the bottom of the page.
5. Click **Clear** → all saved values are erased.

> If injection fails with an error, **refresh the page** and try again.  
> The content script must load on the page before messaging is possible.

---

## Project structure

```
uranus-fake-iframe/
├── manifest.json   — Extension manifest (MV2)
├── popup.html      — Popup UI
├── popup.js        — Input handling, localStorage, messaging
├── content.js      — Receives message, creates and injects iframe
└── icons/
    └── icon.svg    — Toolbar icon
```
# Uranus-Fake-Iframe
