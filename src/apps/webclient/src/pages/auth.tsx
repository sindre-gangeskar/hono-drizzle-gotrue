import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import { Link, useLocation, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useSession from "../hooks/useSession";
import type { Session } from "@supabase/gotrue-js";
import { useRef, useState, type ChangeEventHandler, type ReactNode, type SubmitEvent } from "react";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { FormCard } from "../components/Card";
import Background from "../components/Background";

type AuthMode = "login" | "signup" | "verify" | "forgot-password";

type UserCredentials = {
  email: string;
  password: string;
}

type FormConfig = {
  title: string;
  submitLabel: string;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  isPending: boolean;
  onChange: ChangeEventHandler[];
  footer: ReactNode;
};

async function submit(authMode: AuthMode, data: UserCredentials) {
  const { email, password } = data;
  const response = await fetch(`/api/auth/${authMode}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }, null, 2)
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
  return body;
}
export default function Login() {
  const { setSession } = useSession();
  const [ email, setEmail ] = useState<string | undefined>(undefined);
  const [ password, setPassword ] = useState<string | undefined>(undefined);
  const [ responseMessage, setResponseMessage ] = useState<string | undefined>();
  const tlRef = useRef<boolean>(false);
  const submissionRef = useRef<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { mutate: login, error: loginError, isPending: loginPending } = useMutation({
    mutationFn: ({ email, password }: UserCredentials) => submit("login", { email, password }),
    onSuccess: (session: Session) => {
      setSession(session); localStorage.setItem('session',
        JSON.stringify(session, null, 2)); setResponseMessage("Login successful!");
      navigate('/')
    },
    onSettled: () => { submissionRef.current = false },
    onError: e => { setResponseMessage(e.message); }
  });
  const { mutate: signUp, error: signupError, isPending: signupPending } = useMutation({
    mutationFn: ({ email, password }: UserCredentials) => submit("signup", { email, password }),
    onSuccess: () => { setResponseMessage('Please verify your email'); },
    onError: e => { setResponseMessage(e.message); }
  });
  const handleLoginSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionRef.current) return;
    submissionRef.current = true;
    login({ email: email ?? "", password: password ?? "" });
  }
  const handleSignupSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUp({ email: email ?? "", password: password ?? "" });
  }
  const handleEmailUpdate: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => setEmail(event.target.value);

  const handlePasswordUpdate: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => setPassword(event.target.value);

  useGSAP(() => {
    if (tlRef.current) return;
    const tl = gsap.timeline({ onComplete: () => tlRef.current = false });
    tlRef.current = true;
    tl.to('#response-message', { filter: 'blur(0px)', opacity: 1, duration: 0.6, y: 50, ease: 'power3.out' });
    tl.to('#response-message', { filter: 'blur(12px)', opacity: 0, duration: 0.6, y: 0, delay: 3, ease: 'power3.in' });
  }, [ signupError, loginError ])

  const loginConfig: FormConfig = {
    title: 'Sign in', submitLabel: 'Sign in', onChange: [ handleEmailUpdate, handlePasswordUpdate ], onSubmit: handleLoginSubmit, isPending: loginPending, footer: <>
      <Link className="link" to="/reset" viewTransition>
        Reset password
      </Link>
      <Link to={"/auth/signup"} className="link">
        Create account
      </Link>
    </>
  }
  const signupConfig: FormConfig = {
    title: 'Sign Up', submitLabel: 'Submit', onChange: [ handleEmailUpdate, handlePasswordUpdate ], onSubmit: handleSignupSubmit,
    isPending: signupPending,
    footer: <Link className="link" to="/login">
      I already have an account
    </Link>
  }

  return (
    <>
      <Background />
      <Container className="relative w-full flex justify-center max-w-300">
        <div className="relative form-wrapper form">
          {location.pathname.startsWith('/auth/login') && <Form onChange={loginConfig.onChange} onSubmit={loginConfig.onSubmit} title={loginConfig.title} submitLabel={loginConfig.submitLabel} isPending={loginConfig.isPending} footer={loginConfig.footer} />}
          {location.pathname.startsWith('/auth/signup') && <Form onChange={signupConfig.onChange} onSubmit={signupConfig.onSubmit} title={signupConfig.title} submitLabel={signupConfig.submitLabel} isPending={signupConfig.isPending} footer={signupConfig.footer} />}
          <p
            className={`absolute text-sm ${(loginError || signupError) ? 'text-red-500' : ''} text-center mx-auto w-100 -z-10 blur-md`}
            style={{ opacity: 0, bottom: 0 }}
            id="response-message"
          >
            {responseMessage ?? ""}
          </p>
        </div>
      </Container>
    </>
  );
}



function Form({ onSubmit, onChange, title, submitLabel, isPending, footer: footers }: FormConfig) {
  return <FormCard className="form-card">
    <form
      onSubmit={onSubmit}
      className="form"
    >
      <p className="text-3xl self-center">{title}</p>
      <Input
        onChange={onChange[ 0 ]}
        className="w-full form-control shrink"
        type="email"
        id="email"
        placeholder="Enter your email"
      />
      <Input
        onChange={onChange[ 1 ]}
        className="w-full form-control"
        placeholder="Enter your password"
        type="password"
      />
      <Button type="submit" className="w-full" loading={isPending} disabled={isPending}>
        {submitLabel}
      </Button>
      {footers && (
        <div className="footer-wrapper links-wrapper flex flex-col text-center text-sm my-auto align-middle space-y-2">
          {footers}
        </div>
      )}
    </form>
  </FormCard>
}
