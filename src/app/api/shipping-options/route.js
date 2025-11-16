import { NextResponse } from 'next/server'

async function fetchFromWoo() {
  const base = process.env.WOO_BASE_URL
  const key = process.env.WOO_CONSUMER_KEY
  const secret = process.env.WC_CONSUMER_SECRET
  if (!base || !key || !secret) return null
  // We'll fetch all zones and then for each zone fetch its methods
  const baseUrl = base.replace(/\/$/, '')
  const auth = `consumer_key=${encodeURIComponent(key)}&consumer_secret=${encodeURIComponent(secret)}`

  function extractCost(settings) {
    if (!settings) return '0.00'
    // Common shape: { cost: { id: 'cost', value: '12.00' } } or { cost: '12.00' }
    try {
      if (typeof settings === 'object') {
        if ('cost' in settings) {
          const c = settings.cost
          if (c && typeof c === 'object' && 'value' in c) return String(c.value)
          if (typeof c === 'string') return c
        }
        // fallback: look for any numeric-looking value
        for (const v of Object.values(settings)) {
          if (v && typeof v === 'object' && 'value' in v) return String(v.value)
          if (typeof v === 'string' && /\d/.test(v)) return v
        }
      }
    } catch (e) {}
    return '0.00'
  }

  try {
    const zonesRes = await fetch(`${baseUrl}/wp-json/wc/v3/shipping/zones?${auth}`)
    if (!zonesRes.ok) return null
    const zones = await zonesRes.json()

    const resultZones = []
    const flat = []

    // For each zone, fetch methods
    for (const zone of zones) {
      const zoneMethodsRes = await fetch(`${baseUrl}/wp-json/wc/v3/shipping/zones/${zone.id}/methods?${auth}`)
      let methods = []
      if (zoneMethodsRes.ok) {
        try { methods = await zoneMethodsRes.json() } catch (e) { methods = [] }
      }

      const transformed = (methods || []).map((m) => {
        const cost = extractCost(m.settings)
        const id = `${zone.id}:${m.id}`
        const item = { id, zoneId: zone.id, zoneName: zone.name || 'Zone', methodId: m.id, title: m.title, cost, enabled: m.enabled, settings: m.settings }
        flat.push({ id, title: `${m.title} (${zone.name})`, cost })
        return item
      })

      resultZones.push({ id: zone.id, name: zone.name, methods: transformed })
    }

    // Also try to fetch global (no zone) methods: some stores expose /shipping/methods
    try {
      const globalRes = await fetch(`${baseUrl}/wp-json/wc/v3/shipping/methods?${auth}`)
      if (globalRes.ok) {
        const globalMethods = await globalRes.json()
        const transformedGlobal = (globalMethods || []).map((m) => {
          const cost = extractCost(m.settings)
          const id = `0:${m.id}`
          const item = { id, zoneId: 0, zoneName: 'All locations', methodId: m.id, title: m.title, cost, enabled: m.enabled, settings: m.settings }
          flat.push({ id, title: `${m.title} (All locations)`, cost })
          return item
        })
        if (transformedGlobal.length) resultZones.push({ id: 0, name: 'All locations', methods: transformedGlobal })
      }
    } catch (e) {
      // ignore
    }

    return { zones: resultZones, options: flat }
  } catch (err) {
    return null
  }
}

export async function GET() {
  // Try real WooCommerce first
  const fromWoo = await fetchFromWoo()
  if (fromWoo && ((fromWoo.options && fromWoo.options.length) || (fromWoo.zones && fromWoo.zones.length))) return NextResponse.json(fromWoo)

  // Fallback mocked shipping options
  const mock = [
    { id: 'collect_factory', title: 'Collection at the factory (Pencran)', cost: '0.00' },
    { id: 'collect_shop', title: 'Collection at the Surfone shop (Leucate)', cost: '0.00' },
    { id: 'delivery_relay', title: 'Delivery to DPD relay point within 48/72 hours', cost: '12.00' },
    { id: 'delivery_home', title: 'Delivery within 48/72 hours to your home with DPD Predict', cost: '17.50' },
  ]
  return NextResponse.json({ options: mock, zones: [{ id: 'mock', name: 'Store', methods: mock.map(m => ({ id: m.id, title: m.title, cost: m.cost })) }] })
}
