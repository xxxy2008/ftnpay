import React from "react";
import { PaymentMethod } from "../types";
import { BUTTON_COLOR } from "../config";

interface Props {
  methods: PaymentMethod[];
  onClick: (id: string) => void;
}

export const PaymentButtons: React.FC<Props> = ({ methods, onClick }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 400,
        margin: "24px auto",
        textAlign: "center",
      }}
    >
      {methods.map(({ id, name, iconUrl }) => (
        <button
          key={id}
          onClick={() => onClick(id)}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: BUTTON_COLOR,
            border: "none",
            borderRadius: 6,
            padding: "12px 20px",
            color: "#fff",
            fontSize: 16,
            cursor: "pointer",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <img src={iconUrl} alt={name} style={{ width: 24, height: 24 }} />
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
};

