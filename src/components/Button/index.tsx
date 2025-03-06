"use client";

import { ButtonHTMLAttributes, CSSProperties, useState } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export const Button = ({ label, style, ...rest }: ButtonProps) => {
  const [hover, setHover] = useState(false);

  const baseStyle: CSSProperties = {
    width: "80%",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 300ms ease",
    background: hover
      ? "linear-gradient(135deg, #2575fc, #6a11cb)"
      : "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#fff",
    boxShadow: hover ? "0 8px 16px rgba(0, 0, 0, 0.2)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
    outline: "none",
  };

  const combinedStyle = { ...baseStyle, ...style };

  return (
    <button
      style={combinedStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {label}
    </button>
  );
};
