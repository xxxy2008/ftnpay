import React, { useEffect, useState } from "react";

export default function Pay() {
  const [country, setCountry] = useState("XX");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ip-country")
      .then((res) => res.json())
      .then((data) => {
        setCountry(data.country || "XX");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>支付中心</h1>
      <p>檢測到您的國家：{country}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button>銀行轉帳</button>
        <button>支付寶</button>
        <button>微信</button>
        <button>Stripe</button>
        <button>⚡ 智匯付 TTH（{country}）</button>
      </div>
    </div>
  );
}
