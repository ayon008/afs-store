# Monetico Payment Gateway - Environment Variables Configuration

## Required Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Monetico Payment Gateway Configuration
MONETICO_TPE=your_terminal_number_here
MONETICO_SECRET_KEY=your_secret_key_here
MONETICO_COMPANY=AFS Foiling
MONETICO_ENVIRONMENT=test

# Site URLs (required for payment redirects)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Variable Descriptions

### `MONETICO_TPE`
- **Description**: Terminal number (TPE) provided by Monetico when you set up your merchant account
- **Example**: `1234567`
- **Required**: Yes

### `MONETICO_SECRET_KEY`
- **Description**: Secret key provided by Monetico for MAC (Message Authentication Code) generation
- **Example**: `your-32-character-secret-key-here`
- **Required**: Yes
- **Security**: Keep this secret! Never commit it to version control

### `MONETICO_COMPANY`
- **Description**: Your company name as registered with Monetico
- **Example**: `AFS Foiling`
- **Required**: Yes

### `MONETICO_ENVIRONMENT`
- **Description**: Environment for Monetico payments
- **Values**: `test` or `production`
- **Default**: `test`
- **Required**: No (defaults to test)

### `NEXT_PUBLIC_SITE_URL`
- **Description**: Base URL of your website (used for payment return URLs)
- **Example**: 
  - Development: `http://localhost:3000`
  - Production: `https://your-domain.com`
- **Required**: Yes

## Environment-Specific Configuration

### Development (.env.local)
```bash
MONETICO_TPE=your_test_tpe
MONETICO_SECRET_KEY=your_test_secret_key
MONETICO_COMPANY=AFS Foiling
MONETICO_ENVIRONMENT=test
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production (.env.production)
```bash
MONETICO_TPE=your_production_tpe
MONETICO_SECRET_KEY=your_production_secret_key
MONETICO_COMPANY=AFS Foiling
MONETICO_ENVIRONMENT=production
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

## Security Notes

1. **Never commit sensitive environment variables** to version control
2. **Use different keys for test and production environments**
3. **Regularly rotate your secret keys** as recommended by Monetico
4. **Ensure HTTPS is used in production** for all payment-related URLs

## Testing

To test the integration:

1. Set `MONETICO_ENVIRONMENT=test`
2. Use test credentials provided by Monetico
3. Test payments will be processed in Monetico's sandbox environment
4. Use test card numbers provided by Monetico for testing

## Troubleshooting

### Common Issues:

1. **"Monetico configuration is incomplete"**
   - Check that `MONETICO_TPE` and `MONETICO_SECRET_KEY` are set
   - Verify values don't have trailing spaces

2. **MAC verification failures**
   - Ensure the secret key matches exactly what Monetico provided
   - Check that the environment (test/production) matches your credentials

3. **Payment redirects fail**
   - Verify `NEXT_PUBLIC_SITE_URL` is correctly set
   - Ensure URLs are accessible from the internet (for production)

## Getting Monetico Credentials

1. Sign up for a Monetico merchant account
2. Complete the onboarding process
3. Monetico will provide:
   - Terminal number (TPE)
   - Secret key for MAC generation
   - Access to test and production environments
4. Configure your payment pages in Monetico's back office

## Integration Flow

The integration follows this flow:

1. **Payment Initiation**: Customer selects wire transfer payment
2. **Order Creation**: WooCommerce order is created with pending status
3. **Monetico Setup**: Payment form data is generated with MAC
4. **Redirect**: Customer is redirected to Monetico payment page
5. **Payment Processing**: Customer completes payment on Monetico
6. **Confirmation**: Monetico sends confirmation to your response URL
7. **Order Update**: Order status is updated based on payment result
8. **Customer Return**: Customer is redirected to success/error page