/**
 * This is a cloufront worker 
 */

const ACCESS_KEY = "Add your own pirsch.io generated access key";
const PIRSCH_SCRIPT_URL = "https://api.pirsch.io/pa.js";
const PIRSCH_PAGE_VIEW_URL = "https://api.pirsch.io/api/v1/hit";

const SCRIPT_PATH = "/static/files/pa.js";
const PAGE_VIEW_PATH = "/p/pv";

const MAX_REQUESTS = 30;

const RATE_LIMIT_WINDOW_SECONDS = 5 * 60;
const RATE_LIMIT_WINDOW_MILLIS = RATE_LIMIT_WINDOW_SECONDS * 1000;

const BASE_BLOCK_TIME_MILLIS = 10 * 60 * 1000;

const MAX_BLOCK_TIME_SECONDS = 12 * 60 * 60 * 1000;
const MAX_BLOCK_TIME_MILLIS = MAX_BLOCK_TIME_SECONDS * 1000;

export default {
  async fetch(request) {
    return await handleRequest(request);
  }
}

async function handleRequest(request) {
  const path = new URL(request.url).pathname;
  let result;

  if (path === SCRIPT_PATH) {
    result = await getScript(request, PIRSCH_SCRIPT_URL);
  } else if (path === PAGE_VIEW_PATH) {
    const ip = request.headers.get("CF-Connecting-IP")
    const url = new URL(request.url);
    const communityId = url.searchParams.get("tag_community").toLowerCase()

    const isInvalidCommunityId = !(communityId.length === 36 && /^[0-9A-F-]{36}$/i.test(communityId));
    if (isInvalidCommunityId) {
      return new Response("Invalid community id provided", { status: 400 });
    }

    if (await isRequestDenied(request, ip)) {
      return new Response("Too many requests, please try again later.", { status: 429 });
    }

    result = await handlePageView(request, ip, url, communityId);
  } else {
    result = new Response(null, {
      status: 404
    });
  }

  const response = new Response(result.body, result);
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Accept-CH", "Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-CH-UA-Platform-Version, Sec-CH-Width, Sec-CH-Viewport-Width");

  return response;
}

async function getScript(request, script) {
  let response = await caches.default.match(request);

  if (!response) {
    response = await fetch(script);
    await caches.default.put(request, response.clone());
  }

  return response;
}

async function handlePageView(request, ip, url, communityId) {
  const body = {
    ip: ip,
    referrer: communityId,
    url: url.searchParams.get("url"),
    code: url.searchParams.get("code"),
    user_agent: request.headers.get("User-Agent"),
    accept_language: request.headers.get("Accept-Language"),
    sec_ch_ua: request.headers.get("Sec-CH-UA"),
    sec_ch_ua_mobile: request.headers.get("Sec-CH-UA-Mobile"),
    sec_ch_ua_platform: request.headers.get("Sec-CH-UA-Platform"),
    sec_ch_ua_platform_version: request.headers.get("Sec-CH-UA-Platform-Version"),
    sec_ch_width: request.headers.get("Sec-CH-Width"),
    sec_ch_viewport_width: request.headers.get("Sec-CH-Viewport-Width"),
    screen_width: Number.parseInt(url.searchParams.get("w"), 10),
    screen_height: Number.parseInt(url.searchParams.get("h"), 10)
  };

  const response = await fetch(PIRSCH_PAGE_VIEW_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ACCESS_KEY}`
    },
    body: JSON.stringify(body)
  });

  return new Response(response.body, {
    status: response.status
  });
}

async function isRequestDenied(request, ip) {
  const currentTime = Date.now();

  const historyKey = new Request(`https://rate-history/${ip}`, request);
  const blockKey = new Request(`https://rate-limit/${ip}`, request);

  // Short circuit if blocked
  const block = await caches.default.match(blockKey);
  if (block) {
    const blockUntil = Number(await block.text());
    if (currentTime < blockUntil) {
      return true;
    }
  }

  // Timestamps and strikes logic (blocking with exponential backoff)
  let historyUpdate = { timestamps: [], strikes: 0 };

  const history = await caches.default.match(historyKey);
  if (history) {
    historyUpdate = await history.json();
    historyUpdate.timestamps = historyUpdate.timestamps.filter(ts => (currentTime - ts) < RATE_LIMIT_WINDOW_MILLIS);
  }

  if (historyUpdate.timestamps.length > MAX_REQUESTS) {
    const newBlockTime = historyUpdate.strikes > 3
      ? MAX_BLOCK_TIME_MILLIS
      : Math.min(3 ** historyUpdate.strikes * BASE_BLOCK_TIME_MILLIS, MAX_BLOCK_TIME_MILLIS);

    await caches.default.put(blockKey, new Response(String(currentTime + newBlockTime), {
      headers: { "Cache-Control": `max-age=${newBlockTime / 1000}` }
    }));

    historyUpdate.strikes += 1;
  } else {
    historyUpdate.timestamps.push(currentTime);
  }

  await caches.default.put(historyKey, new Response(JSON.stringify(historyUpdate), {
    headers: { "Cache-Control": `max-age=${MAX_BLOCK_TIME_SECONDS * 7}` }
  }));

  return historyUpdate.timestamps.length > MAX_REQUESTS;
}
