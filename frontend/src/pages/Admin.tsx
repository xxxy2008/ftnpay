import React, { useState } from "react";

export default function Admin() {
  const [orderUrl, setOrderUrl] = useState("");

  const createLink = async () => {
    const res = await fetch("/api/create-order", {
      method: "POST",
      body: JSON.stringify({ amount: 100, currency: "USD" }),
    });
    const data = await res.json();
    setOrderUrl(data.redirectUrl);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>管理員頁面</h1>
      <button onClick={createLink}>生成支付鏈接</button>
      {orderUrl && (
        <div>
          <p>支付鏈接：{orderUrl}</p>
          <button onClick={() => navigator.clipboard.writeText(orderUrl)}>
            複製
          </button>
        </div>
      )}
    </div>
  );
}
