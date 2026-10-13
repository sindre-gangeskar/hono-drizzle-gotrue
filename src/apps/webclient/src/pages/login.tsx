import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useSession from "../hooks/useSession";
import type { Session } from "@supabase/gotrue-js";
import { useRef, useState, type ChangeEventHandler, type SubmitEvent } from "react";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { FormCard } from "../components/Card";
import Background from "../components/Background";
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
  const [ errorMessage, setErrorMessage ] = useState<string | undefined>();
  const tlRef = useRef<boolean>(false);
  const submissionRef = useRef<boolean>(false);
  const navigate = useNavigate();

  const { mutate, error, isPending } = useMutation({
    mutationFn: ({ email, password }: SignInCredentials) => signIn(email, password),
    onSuccess: (session: Session) => { setSession(session); localStorage.setItem('session', JSON.stringify(session, null, 2)); navigate('/'); },
    onSettled: () => { submissionRef.current = false },
    onError: e => { setErrorMessage(e.message) }
  });

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionRef.current) return;
    submissionRef.current = true;
    mutate({ email: email ?? "", password: password ?? "" });
  }

  const handleEmailUpdate: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => setEmail(event.target.value);
  const handlePasswordUpdate: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => setPassword(event.target.value);

  useGSAP(() => {
    if (tlRef.current) return;
    if (errorMessage) {
      const tl = gsap.timeline({ onComplete: () => tlRef.current = false });
      tlRef.current = true;
      tl.to('#error-message', { opacity: 1, duration: 0.8, y: 50, ease: 'power3.out' });
      tl.to('#error-message', { opacity: 0, duration: 0.8, y: 0, delay: 3, ease: 'power3.in' });
    }
  }, [ error ])

  return (
    <>
      <Background />
      <Container className="relative w-full flex justify-center max-w-300">
        <FormCard className="relative self-center z-1">
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col justify-center self-center space-y-4 items-center max-w-sm mx-auto w-lg"
          >
            <p className="text-3xl self-center">Sign in</p>
            <Input
              onChange={handleEmailUpdate}
              className="w-full form-control"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
            <Input
              onChange={handlePasswordUpdate}
              className="w-full form-control"
              placeholder="Enter your password"
              type="password"
            />
            <Button type="submit" className="w-full" loading={isPending} disabled={isPending}>
              Log in
            </Button>
            <div className="links-wrapper flex flex-col text-center text-sm my-auto align-middle space-y-2">
              <Link className="link" to="/reset" viewTransition>
                Reset password
              </Link>
              <Link to={"/signup"} className="link">
                Create account
              </Link>

            </div>
          </form>
          <p
            className="absolute text-sm text-red-400 text-center mx-auto w-100 -z-10"
            style={{ opacity: 0, bottom: 0 }}
            id="error-message"
          >
            {errorMessage ? errorMessage : ""}
          </p>
        </FormCard>
      </Container>
    </>
  );
}