import React from "react";
import { CardContainer } from "./index.styled";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return <CardContainer className={className}>{children}</CardContainer>;
};

export default Card;
