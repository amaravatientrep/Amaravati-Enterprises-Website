// Tells Bing and other IndexNow search engines that the site's pages have changed.
// Reads every URL from the live sitemap and submits them in one request.
// Run after a production deploy: `npm run indexnow` (also run by .github/workflows/indexnow.yml).

const SITE = "https://www.amaravatienterprises.com";
const KEY = "4e5d831a9272ea3dfbafda6d92730c01"; // must match public/<KEY>.txt

const sitemap = await fetch(`${SITE}/sitemap.xml`).then((r) => {
  if (!r.ok) throw new Error(`sitemap.xml returned ${r.status}`);
  return r.text();
});
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (!urlList.length) throw new Error("No URLs found in sitemap.xml");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});

// 200 = accepted, 202 = accepted and the key is still being checked
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
