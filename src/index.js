const TARGET = "https://guns.lol/ky";

function getMeta(html, key) {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']*)["'][^>]*>`,
    "i"
  );
  return html.match(re)?.[1] || "";
}

function esc(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export default {
  async fetch(request) {
    const ua = request.headers.get("user-agent") || "";

    const isBot =
      /Discordbot|Twitterbot|Slackbot|facebookexternalhit|TelegramBot|WhatsApp/i.test(ua);

    // real users redirect instantly
    if (!isBot) {
      return Response.redirect(TARGET, 302);
    }

    // bots get metadata
    const res = await fetch(TARGET, {
      headers: {
        "User-Agent": "Mozilla/5.0 Discordbot/2.0",
      },
    });

    const html = await res.text();

    const title = getMeta(html, "og:title") || "guns.lol";
    const description = getMeta(html, "og:description") || "";
    const image = getMeta(html, "og:image") || "";

    return new Response(`<!doctype html>
<html>
<head>
  <meta charset="utf-8">

  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${esc(image)}">
  <meta property="og:type" content="website">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(image)}">
</head>
<body></body>
</html>`, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "no-store",
      },
    });
  },
};
