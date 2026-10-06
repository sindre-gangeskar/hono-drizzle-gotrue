import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useSession from "../hooks/useSession";
import type { Session } from "@supabase/gotrue-js";
import { useState, type ChangeEventHandler, type SubmitEvent } from "react";

async function signIn(email: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }, null, 2),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
  return body;
}
type SignInCredentials = {
  email: string;
  password: string;
}

export default function Login() {
  const { setSession } = useSession();
  const [ email, setEmail ] = useState<string | undefined>(undefined);
  const [ password, setPassword ] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: ({ email, password }: SignInCredentials) => signIn(email, password),
    onSuccess: (session: Session) => { setSession(session); localStorage.setItem('session', JSON.stringify(session, null, 2)); navigate('/'); },
  });

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ email: email ?? "", password: password ?? "" });
  }

  const handleEmailUpdate: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => setEmail(event.target.value);
  const handlePasswordUpdate: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => setPassword(event.target.value);

  return <div className="flex flex-row h-screen">
    <div className="img-wrapper w-fit h-screen max-sm:hidden block ">
      <div id="img-wrapper" className="relative z-0 h-full after:content-[''] after:z-1 after:inset-0 after:absolute after:backdrop-blur-sm">
        <img src="/images/fields.jpg" className="relative z-0 h-full object-cover" alt="" />
      </div>
    </div>
    <Container className="h-screen flex justify-center flex-col max-w-300 space-y-4">
      <p className="text-3xl self-center">Login</p>
      <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center self-center space-y-4 items-center max-w-sm">
        <Input onChange={handleEmailUpdate} className="w-full form-control" type="email" id="email" placeholder="Enter your email" />
        <Input onChange={handlePasswordUpdate} className="w-full form-control" placeholder="Enter your password" type="password" />
        <Button type="submit" className="w-full" loading={isPending}>Log in</Button>
        <Link className="" to="/login">Forgot your password?</Link>
        {isError && <p className="text-sm text-red-400">{error.message}</p>}
      </form>
    </Container>
  </div>
}