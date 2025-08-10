import React from "react";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
  if (!visible) return null;
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 1000,
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 8,
          maxWidth: "90%",
          maxHeight: "90%",
          overflowY: "auto",
        }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
