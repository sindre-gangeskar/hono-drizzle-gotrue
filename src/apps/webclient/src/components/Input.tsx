import type { InputHTMLAttributes } from "react"
export default function Input({ type, value, placeholder, onChange, className }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`input ${className}`} onChange={onChange} placeholder={placeholder} type={type} value={value} />
}