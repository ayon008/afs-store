import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';
import paypalClient from '@/lib/paypal';
import wooApi from '@/lib/woocommerce';

export async function POST(req) {
  try {
    const { cartData, customerData } = await req.json();

    // Validate required data
    if (!cartData || !customerData) {
      return NextResponse.json(
        { message: 'Missing required cart or customer data' },
        { status: 400 }
      );
    }

    // Create WooCommerce order first (set_paid: false)
    const wooOrderData = {
      payment_method: "paypal",
      payment_method_title: "PayPal",
      set_paid: false,
      billing: customerData.billing,
      shipping: customerData.shipping || customerData.billing,
      line_items: cartData.lineItems,
      shipping_lines: cartData.shippingLines || [],
    };

    const wooResponse = await wooApi.post("orders", wooOrderData);
    const wooOrder = wooResponse.data;
    const wooOrderId = wooOrder.id;
    const wooOrderTotal = wooOrder.total;

    // Create PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: { 
          currency_code: 'EUR', // Changed to EUR for European store
          value: wooOrderTotal 
        },
        invoice_id: wooOrderId.toString(),
        description: `Order #${wooOrderId} from AFS Foiling`,
      }],
      application_context: {
        brand_name: 'AFS Foiling',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?step=3`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?step=2`,
      }
    });

    const paypalOrder = await paypalClient.execute(request);

    return NextResponse.json({
      paypalOrderId: paypalOrder.result.id,
      wooOrderId: wooOrderId,
      status: paypalOrder.result.status
    });
  } catch (err) {
    console.error("Error creating order:", err);
    return NextResponse.json(
      { message: 'Error creating order', error: err.message },
      { status: 500 }
    );
  }
}
