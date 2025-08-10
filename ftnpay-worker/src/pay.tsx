// pay.ts
import { useState, useEffect } from "react";

// 國際化文本
const i18n = {
  zh: {
    title: "选择支付方式",
    wechatTip: "请在系统浏览器中打开以完成支付",
    bank: "🏦 银行转账",
    alipay: "💰 支付宝",
    wechat: "💬 微信支付",
    stripe: "💳 Stripe",
    tth: "⚡ 智汇付 TTH",
    back: "返回",
  },
  en: {
    title: "Choose Payment Method",
    wechatTip: "Please open in system browser to complete payment",
    bank: "🏦 Bank Transfer",
    alipay: "💰 Alipay",
    wechat: "💬 WeChat Pay",
    stripe: "💳 Stripe",
    tth: "⚡ TTH Pay",
    back: "Back",
  },
};

// 工具方法
const getQueryParam = (name: string) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || "";
};

const isWeChatBrowser = () => /micromessenger/i.test(navigator.userAgent);

// UI 按鈕組件
function PayButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 px-4 text-lg font-semibold bg-white border border-gray-300 rounded-xl shadow hover:shadow-lg transition"
    >
      {label}
    </button>
  );
}

export default function PayPage() {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [country, setCountry] = useState("CN");
  const [orderId, setOrderId] = useState("");
  const [wechatEnv, setWechatEnv] = useState(false);

  useEffect(() => {
    // 讀取 URL 參數
    const urlLang = getQueryParam("lang").toLowerCase();
    if (urlLang === "en") setLang("en");

    const urlCountry = getQueryParam("country");
    if (urlCountry) setCountry(urlCountry.toUpperCase());

    const urlOrderId = getQueryParam("orderId");
    if (urlOrderId) setOrderId(urlOrderId);

    // IP 國別識別（如果沒有參數）
    if (!urlCountry) {
      fetch("https://ipapi.co/country/")
        .then((res) => res.text())
        .then((code) => setCountry(code.toUpperCase()))
        .catch(() => {});
    }

    // 檢測微信
    setWechatEnv(isWeChatBrowser());
  }, []);

  const t = i18n[lang];

  const handlePayment = (method: string) => {
    // 銀行 URL Scheme 支持
    if (method === "bank") {
      window.location.href = "bankapp://transfer?orderId=" + orderId;
      return;
    }
    // 跳轉到對應支付頁面
    window.location.href = `/pay/redirect?orderId=${orderId}&method=${method}&country=${country}&lang=${lang}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "zh" | "en")}
            className="border rounded-lg px-2 py-1"
          >
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </div>

        {wechatEnv && (
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg text-sm">
            {t.wechatTip}
          </div>
        )}

        <div className="space-y-3">
          <PayButton label={t.bank} onClick={() => handlePayment("bank")} />
          <PayButton label={t.alipay} onClick={() => handlePayment("alipay")} />
          <PayButton label={t.wechat} onClick={() => handlePayment("wechat")} />
          <PayButton label={t.stripe} onClick={() => handlePayment("stripe")} />
          <PayButton
            label={`${t.tth} (${country})`}
            onClick={() => handlePayment("tth")}
          />
        </div>
      </div>
    </div>
  );
}
