import paypal from '@paypal/checkout-server-sdk';

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// Determine the PayPal environment based on configuration
function getEnvironment() {
  const mode = process.env.PAYPAL_MODE || 'sandbox';
  if (mode === 'live') {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  }
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

const environment = getEnvironment();
const client = new paypal.core.PayPalHttpClient(environment);

export default client;
