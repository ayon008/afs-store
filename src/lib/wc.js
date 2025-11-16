// Minimal server-side adapter for the WooCommerce helper.
// Re-exports the server-only implementation from ./wc.server.
// IMPORTANT: Do NOT import this file from client-side code.

if (typeof window !== 'undefined') {
  throw new Error("@/lib/wc must not be imported from client-side code")
}

module.exports = require('./wc.server')
