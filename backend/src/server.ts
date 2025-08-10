import express from "express";
import cors from "cors";
import createOrder from "./createOrder";
import webhook from "./webhook";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-order", createOrder);
app.post("/webhook", webhook);

app.get("/ip-country", (req, res) => {
  res.json({ country: "CN" }); // 測試先寫死，正式用 Workers
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Backend API running on port ${port}`));
