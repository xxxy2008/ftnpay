import React, { useEffect, useState } from "react";

const BUTTON_COLOR = "#1E90FF"; // 统一按钮颜色（之前给的色号）
const API_BASE_URL = "https://pay.ftnpay.com/api"; // 你的 API 基础地址

export default function PayPage() {
  const [countryCode, setCountryCode] = useState("CN");
  const [countryName, setCountryName] = useState("中国");
  const [amount, setAmount] = useState("100");
  const [lang, setLang] = useState("zh");

  const labels = {
    zh: {
      title: "⚡ 选择支付方式",
      subtitle: "智汇TTH · 安全快速",
      amount: "付款金额",
      bank: "🏦 银行转账",
      alipay: "💰 支付宝",
      wechat: "💬 微信",
      stripe: "💳 Stripe",
      tth: "⚡ 智汇付 TTH",
    },
    en: {
      title: "⚡ Select Payment Method",
      subtitle: "TTH · Safe & Fast",
      amount: "Amount",
      bank: "🏦 Bank Transfer",
      alipay: "💰 Alipay",
      wechat: "💬 WeChat Pay",
      stripe: "💳 Stripe",
      tth: "⚡ TTH Pay",
    },
  };

  // 获取 URL 参数
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const amt = params.get("amount");
    const langParam = params.get("lang");
    const countryParam = params.get("country");
    const nameParam = params.get("countryName");

    if (amt) setAmount(amt);
    if (langParam) setLang(langParam);
    if (countryParam) setCountryCode(countryParam);
    if (nameParam) setCountryName(nameParam);

    if (!countryParam) {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          setCountryCode(data.country || "CN");
          setCountryName(data.country_name || "中国");
        });
    }
  }, []);

  // 按钮样式
  const buttonStyle = {
    backgroundColor: BUTTON_COLOR,
    color: "#fff",
    padding: "12px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    width: "100%",
    cursor: "pointer",
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center", fontFamily: "Arial" }}>
      {/* 标题区 */}
      <h2 style={{ fontWeight: "bold", marginBottom: "10px" }}>{labels[lang].title}</h2>
      <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>{labels[lang].subtitle}</h3>
      <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
        {labels[lang].amount}: CNY {amount}
      </p>
      <p style={{ fontWeight: "bold", marginBottom: "20px" }}>
        {countryCode} {countryName}
      </p>

      {/* 支付按钮 */}
      <button style={buttonStyle}>{labels[lang].bank}</button>
      <button style={buttonStyle}>{labels[lang].alipay}</button>
      <button style={buttonStyle}>{labels[lang].wechat}</button>
      <button style={buttonStyle}>{labels[lang].stripe}</button>
      <button style={buttonStyle}>
        {labels[lang].tth}（{countryCode}）
      </button>
    </div>
  );
}
