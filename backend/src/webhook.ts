import { Request, Response } from "express";

export default function webhook(req: Request, res: Response) {
  console.log("Webhook received:", req.body);
  res.sendStatus(200);
}
