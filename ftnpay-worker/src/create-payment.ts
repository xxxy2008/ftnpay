export async function handleCreatePayment(
  request: Request,
  env: any,
): Promise<Response> {
  const { amount, currency } = Object.fromEntries(
    new URL(request.url).searchParams,
  );

  const orderId = `ORD-${Date.now()}`;
  const redirectUrl = `/pay.ts?amount=${amount}&currency=${currency}`;

  const data = {
    orderId,
    currency,
    amount,
    redirectUrl,
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
