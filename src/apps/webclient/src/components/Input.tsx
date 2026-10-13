import { AtSign, KeyRound } from "lucide-react"
import type { InputHTMLAttributes } from "react"
export default function Input({ type, value, placeholder, onChange, className }: InputHTMLAttributes<HTMLInputElement>) {
  return <div className="form-control w-full flex-row flex min-w-full items-center space-x-2 justify-center border border-neutral-900 bg-neutral-950/80 rounded">
    {type === "email" && <AtSign className="input-symbol bg-inherit mx-auto min-w-fit shrink-0" />}
    {type === "password" && <KeyRound className="input-symbol bg-inherit mx-auto min-w-fit shrink-0" />}
    <input className={`input ${className}`} onChange={onChange} placeholder={placeholder} type={type} value={value} />
  </div>
}