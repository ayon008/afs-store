import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { code } = await req.json()
    if (!code) return NextResponse.json({ valid: false, message: 'No code provided' }, { status: 400 })

    // Mocked coupon validation logic
    const normalized = String(code).trim().toUpperCase()
    if (normalized === 'SAVE10') {
      return NextResponse.json({ valid: true, code: normalized, discount_percent: 10 })
    }
    if (normalized === 'FREESHIP') {
      return NextResponse.json({ valid: true, code: normalized, discount_amount: 0, free_shipping: true })
    }

    return NextResponse.json({ valid: false, message: 'Coupon not found' }, { status: 404 })
  } catch (err) {
    return NextResponse.json({ valid: false, message: 'Invalid request' }, { status: 400 })
  }
}

export async function GET() {
  // For now, return available coupons (mocked)
  return NextResponse.json({ coupons: [{ code: 'SAVE10', discount_percent: 10 }, { code: 'FREESHIP', free_shipping: true }] })
}
