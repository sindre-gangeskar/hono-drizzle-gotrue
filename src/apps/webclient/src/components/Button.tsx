type Color = "primary" | "secondary" | "success" | "warning" | "danger"

interface ButtonProps {
  label?: string
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void
  role?: React.HTMLAttributes<HTMLButtonElement>[ "role" ]
  className?: React.HTMLAttributes<HTMLButtonElement>[ "className" ]
  color?: Color
}
export default function Button({ label, onClick, role = "button", className, color = "primary", disabled }: ButtonProps) {
  return <button className={`${className} ${getColor(color)} btn rounded-lg p-4 min-h-12  max-h-fit max-w-fit`}
    type="button"
    role={role}
    disabled={disabled}
    onClick={onClick}>{label}</button>;
}

function getColor(color: Color) {
  const buttonColor: Record<string, string> = {
    primary: 'primary',
    secondary: 'secondary'
  };

  return buttonColor[ color ];
}