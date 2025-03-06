"use client";

import { ChangeEvent, CSSProperties, useState } from "react";

type TextAreaProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
};

export const TextArea = ({ value, onChange, placeholder }: TextAreaProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  const style: CSSProperties = {
    width: "100%",
    flexGrow: 1,
    padding: "16px",
    border: "2px solid",
    borderColor: focused ? "#6a11cb" : "#ddd",
    borderRadius: "8px",
    background: focused ? "linear-gradient(135deg, #6a11cb, #2575fc)" : "#fff",
    color: focused ? "#fff" : "#333",
    fontSize: "16px",
    resize: "vertical",
    outline: "none",
    transition: "all 300ms ease",
    boxShadow: focused ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
  };

  return (
    <textarea
      style={style}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};
