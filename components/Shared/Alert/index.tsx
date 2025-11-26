import React from "react";
import { StyledAlert } from "./index.styled";

interface AlertProps {
  children: React.ReactNode;
  show?: boolean;
  variant?: "filled" | "outlined" | "standard";
  severity?: "error" | "warning" | "info" | "success";
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  children,
  show = true,
  variant = "filled",
  severity = "error",
}) => {
  if (!show) {
    return null;
  }

  return (
    <StyledAlert variant={variant} severity={severity}>
      {children}
    </StyledAlert>
  );
};

export default Alert;
