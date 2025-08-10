import { Request, Response } from "express";

export default function createOrder(req: Request, res: Response) {
  const { amount, currency } = req.body;
  const orderId = Date.now().toString();
  const redirectUrl = `https://pay.ftnpay.com/pay?orderId=${orderId}`;
  res.json({
    orderId,
    currency,
    amount,
    redirectUrl,
  });
}
