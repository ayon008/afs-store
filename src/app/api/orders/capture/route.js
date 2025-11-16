import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';
import paypalClient from '@/lib/paypal';
import wooApi from '@/lib/woocommerce';

export async function POST(req) {
  try {
    const { paypalOrderId, wooOrderId } = await req.json();

    // Validate required data
    if (!paypalOrderId || !wooOrderId) {
      return NextResponse.json(
        { message: 'Missing required PayPal Order ID or WooCommerce Order ID' },
        { status: 400 }
      );
    }

    // Capture payment from PayPal
    const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
    request.requestBody({});

    const capture = await paypalClient.execute(request);
    const captureDetails = capture.result;

    // Check if payment was completed
    if (captureDetails.status !== 'COMPLETED') {
      return NextResponse.json(
        { message: 'Payment not completed', status: captureDetails.status },
        { status: 400 }
      );
    }

    // Get transaction ID from PayPal
    const transactionId = captureDetails.purchase_units[0]?.payments?.captures[0]?.id;

    if (!transactionId) {
      return NextResponse.json(
        { message: 'No transaction ID found in PayPal response' },
        { status: 400 }
      );
    }

    // Update WooCommerce order
    const wooUpdateData = {
      status: "processing",
      transaction_id: transactionId,
      set_paid: true,
    };

    await wooApi.put(`orders/${wooOrderId}`, wooUpdateData);

    // Add order note
    await wooApi.post(`orders/${wooOrderId}/notes`, {
      note: `PayPal payment successful. Transaction ID: ${transactionId}`,
      customer_note: false
    });

    return NextResponse.json({
      success: true,
      wooOrderId: wooOrderId,
      transactionId: transactionId,
      paypalStatus: captureDetails.status
    });
  } catch (err) {
    console.error("Error capturing order:", err);

    // Try to mark the order as failed in WooCommerce
    const { wooOrderId } = await req.json().catch(() => ({}));
    if (wooOrderId) {
      try {
        await wooApi.put(`orders/${wooOrderId}`, { status: "failed" });
        await wooApi.post(`orders/${wooOrderId}/notes`, {
          note: `PayPal payment capture failed: ${err.message}`,
          customer_note: false
        });
      } catch (updateErr) {
        console.error("Failed to update WooCommerce order:", updateErr);
      }
    }

    return NextResponse.json(
      { message: 'Error capturing order', error: err.message },
      { status: 500 }
    );
  }
}
