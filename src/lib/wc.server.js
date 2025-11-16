// Server-only helper for WooCommerce & Store API calls (JS)
const WP_BASE_URL = process.env.WP_BASE_URL
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET

if (!WP_BASE_URL) {
  console.warn('[v0] WP_BASE_URL is not set. Configure it in Vars.')
}if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
  console.warn('[v0] WooCommerce keys not set. Configure WC_CONSUMER_KEY and WC_CONSUMER_SECRET.')
}

function percentEncode(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase())
}

function generateNonce() {
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
}

function getTimestamp() {
  return Math.floor(Date.now() / 1000).toString()
}

function createSignatureBaseString(method, url, params) {
  const encodedParams = Object.keys(params).sort().map(key => `${percentEncode(key)}=${percentEncode(params[key])}`).join('&')
  return [method.toUpperCase(), percentEncode(url), percentEncode(encodedParams)].join('&')
}

function createOAuthSignature(baseString, consumerSecret, tokenSecret = '') {
  const signingKey = `${percentEncode(consumerSecret)}&${percentEncode(tokenSecret)}`
  const crypto = require('crypto')
  return crypto.createHmac('sha1', signingKey).update(baseString).digest('base64')
}

function getOAuth1Header(method, url, consumerKey, consumerSecret, additionalParams = {}) {
  const oauthParams = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: generateNonce(),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: getTimestamp(),
    oauth_version: '1.0',
    ...additionalParams,
  }
  const signatureBaseString = createSignatureBaseString(method, url, oauthParams)
  oauthParams.oauth_signature = createOAuthSignature(signatureBaseString, consumerSecret)
  const headerParams = Object.keys(oauthParams).map(key => `${percentEncode(key)}="${percentEncode(oauthParams[key])}"`).join(', ')
  return `OAuth ${headerParams}`
}

function getAuthHeader() {
  if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) return {}
  const token = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64')
  return { Authorization: `Basic ${token}` }
}

function getWcApiBaseFromEnv(envBase) {
  const trimmed = envBase.replace(/\/$/, '')
  if (trimmed.includes('/wp-json/wc/')) return trimmed.replace(/\/wp-json\/wc\/v\d+$/, '/wp-json/wc/v3')
  if (trimmed.includes('/wp-json/wp/')) return trimmed.replace(/\/wp-json\/wp\/v\d+$/, '/wp-json/wc/v3')
  if (trimmed.includes('/wp-json')) return trimmed.replace(/\/wp-json(?:\/.*)?$/, '/wp-json/wc/v3')
  return `${trimmed}/wp-json/wc/v3`
}

function getStoreApiBaseFromEnv(envBase) {
  const trimmed = envBase.replace(/\/$/, '')
  if (trimmed.includes('/wp-json/wc/store/')) return trimmed.replace(/\/wp-json\/wc\/store\/v\d+$/, '/wp-json/wc/store/v1')
  if (trimmed.includes('/wp-json/wp/')) return trimmed.replace(/\/wp-json\/wp\/v\d+$/, '/wp-json/wc/store/v1')
  if (trimmed.includes('/wp-json')) return trimmed.replace(/\/wp-json(?:\/.*)?$/, '/wp-json/wc/store/v1')
  return `${trimmed}/wp-json/wc/store/v1`
}

function parseCookieHeader(cookieHeader) {
  const jar = {}
  if (!cookieHeader) return jar
  cookieHeader.split(';').forEach((part) => {
    const [k, ...rest] = part.trim().split('=')
    if (!k) return
    jar[k] = rest.join('=')
  })
  return jar
}

function mergeCookieJar(jar, setCookies) {
  for (const sc of setCookies) {
    const seg = sc.split(';')[0]
    const [k, ...rest] = seg.split('=')
    if (!k) continue
    jar[k.trim()] = rest.join('=')
  }
  return jar
}

function jarToHeader(jar) {
  return Object.entries(jar).map(([k, v]) => `${k}=${v}`).join('; ')
}

async function wcFetch(path, init = {}) {
  if (!WP_BASE_URL) throw new Error('WP_BASE_URL not configured')
  const base = getWcApiBaseFromEnv(WP_BASE_URL)
  const url = new URL(`${base}${path.startsWith('/') ? path : `/${path}`}`)
  const sp = init.searchParams || {}
  Object.entries(sp).forEach(([k, v]) => { if (v !== undefined && v !== null) url.searchParams.set(k, String(v)) })
  
  // Always add consumer keys for authentication - either in URL or headers
  if (WC_CONSUMER_KEY && WC_CONSUMER_SECRET) {
    // For GET requests, we can use URL parameters for simpler auth
    if ((init.method || 'GET').toUpperCase() === 'GET') {
      url.searchParams.set('consumer_key', WC_CONSUMER_KEY)
      url.searchParams.set('consumer_secret', WC_CONSUMER_SECRET)
    } else {
      // For POST/PUT/DELETE, use URL parameters as well (more reliable than just headers)
      url.searchParams.set('consumer_key', WC_CONSUMER_KEY)
      url.searchParams.set('consumer_secret', WC_CONSUMER_SECRET)  
    }
  }
  
  console.log(`[wcFetch] ${init.method || 'GET'} ${url.toString()}`)
  console.log(`[wcFetch] Headers:`, { 'Content-Type': 'application/json', ...(init.headers || {}), ...getAuthHeader() })
  
  const res = await fetch(url.toString(), { ...init, headers: { 'Content-Type': 'application/json', ...(init.headers || {}), ...getAuthHeader() }, cache: 'no-store' })
  console.log(`[wcFetch] Response status: ${res.status}`)
  
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    let msg = text
    try { 
      const json = JSON.parse(text)
      msg = json?.message || text 
      console.log(`[wcFetch] Error response JSON:`, json)
    } catch {
      console.log(`[wcFetch] Error response text:`, text)
    }
    console.error('[wcFetch] WooCommerce fetch error', res.status, msg)
    throw new Error(`WooCommerce error ${res.status}: ${msg}`)
  }
  
  const responseData = await res.json()
  console.log(`[wcFetch] Success response:`, Array.isArray(responseData) ? `Array(${responseData.length})` : typeof responseData)
  return responseData
}

async function wcFetchWithMeta(path, init = {}) {
  if (!WP_BASE_URL) throw new Error('WP_BASE_URL not configured')
  const base = getWcApiBaseFromEnv(WP_BASE_URL)
  const url = new URL(`${base}${path.startsWith('/') ? path : `/${path}`}`)
  const sp = init.searchParams || {}
  Object.entries(sp).forEach(([k, v]) => { if (v !== undefined && v !== null) url.searchParams.set(k, String(v)) })
  
  // Always add consumer keys for authentication
  if (WC_CONSUMER_KEY && WC_CONSUMER_SECRET) {
    url.searchParams.set('consumer_key', WC_CONSUMER_KEY)
    url.searchParams.set('consumer_secret', WC_CONSUMER_SECRET)
  }
  
  const res = await fetch(url.toString(), { ...init, headers: { 'Content-Type': 'application/json', ...(init.headers || {}), ...getAuthHeader() }, cache: 'no-store' })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    let msg = text
    try { const json = JSON.parse(text); msg = json?.message || text } catch {}
    console.error('[v0] WooCommerce fetch error', res.status, msg)
    throw new Error(`WooCommerce error ${res.status}: ${msg}`)
  }
  const data = await res.json()
  const total = Number(res.headers.get('X-WP-Total') || res.headers.get('x-wp-total') || 0)
  const totalPages = Number(res.headers.get('X-WP-TotalPages') || res.headers.get('x-wp-totalpages') || 0)
  return { data, total, totalPages }
}

async function storeFetch(path, init = {}) {
  if (!WP_BASE_URL) throw new Error('WP_BASE_URL not configured')
  const base = getStoreApiBaseFromEnv(WP_BASE_URL)
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`
  const headers = { 'Content-Type': 'application/json' }
  if (init.headers) Object.assign(headers, init.headers)
  if (init.cookieJar) headers.cookie = jarToHeader(init.cookieJar)
  else if (init.incomingCookie) headers.cookie = init.incomingCookie
  if ((init.method || 'GET').toUpperCase() !== 'GET') {
    try {
      const nonceRes = await fetch(`${base}/batch`, { method: 'GET', headers: { 'Content-Type': 'application/json', ...(headers.cookie ? { cookie: headers.cookie } : {}) }, cache: 'no-store' })
      if (nonceRes.ok) {
        const nonce = nonceRes.headers.get('X-WC-Store-API-Nonce') || nonceRes.headers.get('nonce') || nonceRes.headers.get('X-WP-Nonce')
        if (nonce) headers['X-WC-Store-API-Nonce'] = nonce
      }
    } catch (e) { console.warn('[v0] Failed to fetch nonce for Store API, continuing without:', e) }
  }
  const res = await fetch(url, { method: init.method || 'GET', body: init.body, headers, cache: 'no-store' })
  const setCookie = res.headers.getSetCookie?.() || []
  if (!res.ok) {
    const txt = await res.text().catch(() => '')
    let msg = txt
    try { const json = JSON.parse(txt); msg = json?.message || txt } catch {}
    console.error('[v0] Store API error', res.status, msg)
    throw new Error(`Store API error ${res.status}: ${msg}`)
  }
  const data = await res.json()
  let jar = init.cookieJar || parseCookieHeader(init.incomingCookie)
  jar = mergeCookieJar(jar, setCookie)
  return { data, setCookies: setCookie, cookieJar: jar }
}

module.exports = { wcFetch, wcFetchWithMeta, storeFetch, getSiteBaseFromEnv: (b) => { const t = b.replace(/\/$/, ''); const idx = t.indexOf('/wp-json'); return idx >= 0 ? t.slice(0, idx) : t }, getWcApiBaseFromEnv }
