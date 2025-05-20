import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  bgColor?: string;
  textColor?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  children,
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md ${bgColor} ${textColor} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
