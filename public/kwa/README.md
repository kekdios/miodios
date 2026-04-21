# Kenya Women Aid — static bundle

These files (`index.html`, `style.css`, `script.js`) work together as a standalone site. You can host them anywhere static files are served.

## Quick test locally

From this folder:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080` (open `index.html` via the directory listing or rename flow as needed).

## Hosting options

- **Netlify / Cloudflare Pages / Vercel static**: Deploy this folder as the site root (or subdirectory; if you use a subpath, update `style.css` / `script.js` links in `index.html` to absolute paths like `/kwa/style.css`).
- **GitHub Pages**: Put these files in the published branch (or `/docs`) and enable Pages; ensure asset paths match your repo’s base URL (use a `base` tag or full paths if the site is not at domain root).
- **Mio Dios (this repo)**: The app exposes the same content at **`/kwa`** via the Next.js route, which embeds this HTML in a full-viewport iframe pointing to **`/kwa/index.html`**.

## Hero banner

The header title uses **`kwa_logo-nobg.png`** (replace that file to update the logo). The hero strip uses **`kwa_banner.png`**. For remote URLs instead, update the corresponding `<img src="...">` in `index.html` and adjust `width` / `height`.

## Canonical & social URLs

`index.html` uses **`https://miodios.com`** for `rel="canonical"`, Open Graph, Twitter cards, and JSON-LD. If the site is served from another domain, search/replace that base URL in the `<head>`.

## QR codes

- Thumbnails and the pop-up use `https://api.qrserver.com/` with the exact wallet string as `data`.
- To swap addresses, update the text in each card, each `data-copy` / `data-address`, and each thumbnail `src` query `data=` value (URL-encoded automatically in the pop-up script).
