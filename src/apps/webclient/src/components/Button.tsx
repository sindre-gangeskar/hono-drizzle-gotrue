import type { ButtonHTMLAttributes } from "react";
import Loader from "./Loader";

type Color = "primary" | "secondary" | "success" | "warning" | "danger"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void
  role?: React.HTMLAttributes<HTMLButtonElement>[ "role" ]
  className?: React.HTMLAttributes<HTMLButtonElement>[ "className" ]
  color?: Color
}
export default function Button({ children, onClick, role = "button", className, color = "primary", disabled, loading }: ButtonProps) {
  return <button className={`${className} ${getColor(color)} btn`}
    type="button"
    role={role}
    disabled={disabled}
    onClick={onClick}>{loading ? <Loader /> : children}</button>;
}

function getColor(color: Color) {
  const buttonColor: Record<string, string> = {
    primary: 'primary',
    secondary: 'secondary'
  };

  return buttonColor[ color ];
}