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

## Replace the hero image

Edit `index.html` and change the `src` of the hero `<img>` to any **HTTPS** image URL you have rights to use. Keep `width` / `height` or `aspect-ratio` in CSS for layout stability.

## QR codes

- Thumbnails and the pop-up use `https://api.qrserver.com/` with the exact wallet string as `data`.
- To swap addresses, update the text in each card, each `data-copy` / `data-address`, and each thumbnail `src` query `data=` value (URL-encoded automatically in the pop-up script).
