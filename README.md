# Redirect

Simple Cloudflare Worker redirect that keeps embeds/previews working by copying metadata from the original link.

## How it works

- Real users are redirected instantly
- Bots like Discord, Twitter/X, Telegram, etc receive the page metadata instead
- This allows embeds/previews to still show correctly even through a redirect

## Usage

Open `src/index.js` and change:

```js
const TARGET = "https://guns.lol/ky";
```

to your own link.

Deploy it to Cloudflare Workers and connect your domain/route.

## Platforms supported

- Discord
- Twitter/X
- Telegram
- Slack
- Facebook
- WhatsApp

## Support

If you need help setting it up or have any issues, contact me on Discord:
@67jk
