"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/icons";
import { brand } from "../../../packages/config/brand";

export function AuthScreen({ mode }: { mode: "login" | "signup" | "reset" }) {
  const signup = mode === "signup";
  const reset = mode === "reset";
  const [visible, setVisible] = useState(false);
  const [notice, setNotice] = useState("");
  const [password, setPassword] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (signup) {
      const name = form.elements.namedItem("name") as HTMLInputElement;
      name.setCustomValidity(String(data.get("name")).trim() ? "" : "Please enter your name.");
      if (!form.reportValidity()) return;
    }
    setNotice(reset ? "Password reset is not available yet. No reset email has been sent. Please contact our team for help." : signup ? "Account registration is not available yet. Your account has not been created. Contact our team to discuss getting started." : "Sign-in is not available yet. Please contact our team for access updates.");
  }

  return <main className="auth-page">
    <section className="auth-story" aria-label="The Apogix workspace">
      <Link href="/" className="auth-brand" aria-label={`${brand.name} home`}><Image src="/apogix-logo.webp" alt={brand.name} width={139} height={40} priority/></Link>
      <div className="auth-story-copy"><span className="eyebrow">A little more room to create</span><h2>Your ideas.<br/><span>In good company.</span></h2><p>One place to shape your content, plan your channels and keep the next great idea moving.</p></div>
      <div className="auth-art"><Image src="/apogix-about-flow.webp" alt="A flowing cobalt ribbon connecting sunlit architectural arches" width={1536} height={1024} priority sizes="(max-width: 900px) 100vw, 50vw"/><span>CREATE. ADAPT. FIND YOUR FLOW.</span></div>
      <div className="auth-story-footer"><span>Thoughtful tools. Connected creativity.</span><Link href="/features">Explore the workflow <ArrowRight width={16} height={16}/></Link></div>
    </section>
    <section className="auth-panel">
      <div className="auth-topline"><Link href="/" className="auth-back">← Back to website</Link><span>{signup ? "Already a member?" : "New here?"} <Link href={signup ? "/login" : "/signup"}>{signup ? "Log in" : "Sign up"}</Link></span></div>
      <div className="auth-form-wrap">
        <span className="eyebrow">{reset ? "A fresh start" : signup ? "Make room for your next idea" : "Your creative space"}</span>
        <h1>{reset ? "Forgot your password?" : signup ? "Find your flow." : "Welcome back."}</h1>
        <p className="auth-intro">{reset ? "Enter the email address associated with your account." : signup ? "Start with your details. Bring your ideas along." : "Log in to pick up where your ideas left off."}</p>
        <p className="auth-availability">Account access is coming soon. {reset ? "Password reset" : "Registration and sign-in"} is not enabled yet.</p>
        <form className="auth-form" onSubmit={submit} onInput={event => { setNotice(""); if (event.target instanceof HTMLInputElement) event.target.setCustomValidity(""); }}>
          {signup && <label htmlFor="auth-name">Full name<input id="auth-name" name="name" autoComplete="name" placeholder="Your full name" required maxLength={100}/></label>}
          <label htmlFor="auth-email">Email address<input id="auth-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254}/></label>
          {!reset && <div><div className="auth-password-label"><label htmlFor="auth-password">Password</label>{!signup && <Link href="/forgot-password">Forgot password?</Link>}</div><div className="auth-password"><input id="auth-password" name="password" type={visible ? "text" : "password"} autoComplete={signup ? "new-password" : "current-password"} placeholder={signup ? "Create a password" : "Enter your password"} required minLength={signup ? 8 : undefined} maxLength={128} value={password} onChange={event=>setPassword(event.target.value)} aria-describedby={signup ? "password-help" : undefined}/><button type="button" aria-label={visible ? "Hide password" : "Show password"} aria-pressed={visible} onClick={()=>setVisible(!visible)}>{visible ? "Hide" : "Show"}</button></div>{signup && <p id="password-help" className="auth-help">Use at least 8 characters.</p>}</div>}
          <button className="btn btn--primary auth-submit" type="submit">{reset ? "Send reset link" : signup ? "Create account" : "Log in"}<ArrowRight width={18} height={18}/></button>
          {notice && <div className="auth-notice" role="status">{notice} <Link href="/contact">Contact support <span aria-hidden="true">↗</span></Link></div>}
        </form>
        <div className="auth-switch">{reset ? <Link href="/login">← Back to log in</Link> : <>{signup ? "Already have an account?" : "Don’t have an account?"} <Link href={signup ? "/login" : "/signup"}>{signup ? "Log in" : "Create an account"} <span aria-hidden="true">↗</span></Link></>}</div>
      </div>
      <div className="auth-bottom"><span>© 2026 {brand.name}</span><Link href="/contact">Need a hand? Contact support</Link></div>
    </section>
  </main>;
}
