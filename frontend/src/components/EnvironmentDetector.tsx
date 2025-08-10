import React, { useEffect, useState } from "react";

export function isWeChatBrowser() {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.includes("micromessenger");
}

export const EnvironmentDetector: React.FC<{ onWechatDetected: () => void }> = ({ onWechatDetected }) => {
  useEffect(() => {
    if (isWeChatBrowser()) {
      onWechatDetected();
    }
  }, [onWechatDetected]);

  return null;
};
