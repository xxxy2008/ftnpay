import React, { useState } from "react";
import { Modal } from "./components/Modal";
import { EnvironmentDetector } from "./components/EnvironmentDetector";
import { PaymentButtons } from "./components/PaymentButtons";
import { PAYMENT_METHODS, TOP_IMAGE_URL, BUTTON_COLOR } from "./config";

// 模拟IP识别得到币种和国家数据（后续改成动态）
const currencyCode = "CNY"; // 货币代码
const paymentAmount = 100; // 付款金额数字
const countryCode = "US";
const countryName = "美国";

export function App() {
  const [wechatDetected, setWechatDetected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  function handlePaymentClick(id: string) {
    setSelectedPayment(id);
    setModalVisible(true);
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 16 }}>
      <EnvironmentDetector onWechatDetected={() => setWechatDetected(true)} />

      {/* 顶部图片居中，宽300px */}
      <div style={{ textAlign: "center" }}>
        <img
          src={TOP_IMAGE_URL}
          alt="顶部图片"
          style={{ width: 300, height: "auto", margin: "0 auto" }}
        />
      </div>

      {/* 智汇付 TTH 付款信息，两行居中，字体颜色和按钮颜色一致 */}
      <div
        style={{
          color: BUTTON_COLOR,
          textAlign: "center",
          marginTop: 16,
          fontWeight: "bold",
          fontSize: 18,
          lineHeight: "1.4",
        }}
      >
        <div>⚡ 智汇付 TTH</div>
        <div>
          付款金额: {currencyCode} {paymentAmount}
        </div>
        <div>
          国家代码: {countryCode} {countryName}
        </div>
      </div>

      <PaymentButtons methods={PAYMENT_METHODS} onClick={handlePaymentClick} />

      {/* 微信环境检测弹窗 */}
      <Modal visible={wechatDetected} onClose={() => setWechatDetected(false)}>
        <h3>检测到您在微信中打开</h3>
        <p>请使用系统浏览器完成支付。</p>
        <button
          onClick={() => {
            // 跳转示例，后续根据实际url替换
            window.open("https://www.example.com", "_blank");
            setWechatDetected(false);
          }}
          style={{
            backgroundColor: BUTTON_COLOR,
            border: "none",
            padding: "8px 16px",
            color: "#fff",
            cursor: "pointer",
            borderRadius: 4,
            marginTop: 16,
          }}
        >
          跳转系统浏览器
        </button>
      </Modal>

      {/* 支付方式选择弹窗 */}
      <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <h3>您选择了支付方式: {selectedPayment}</h3>
        <p>这里可以显示具体的支付流程或者二维码、跳转链接等。</p>
        <button
          onClick={() => setModalVisible(false)}
          style={{
            backgroundColor: BUTTON_COLOR,
            border: "none",
            padding: "8px 16px",
            color: "#fff",
            cursor: "pointer",
            borderRadius: 4,
            marginTop: 16,
          }}
        >
          关闭
        </button>
      </Modal>
    </div>
  );
}

