"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/icons";
import { brand, whatsappUrl } from "../../../packages/config/brand";

export function ContactForm() {
  const [opened, setOpened] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !message) {
      const field = form.elements.namedItem(!name ? "name" : "message") as HTMLInputElement | HTMLTextAreaElement;
      field.setCustomValidity("Please enter more than spaces.");
      field.reportValidity();
      return;
    }
    window.open(whatsappUrl(`Hi ${brand.name}, I need help with ${data.get("topic")}.\n\nName: ${name}\nEmail: ${data.get("email")}\nWorkspace / company: ${String(data.get("company") ?? "").trim() || "Not provided"}\n\n${message}`), "_blank", "noopener,noreferrer");
    setOpened(true);
  }

  return <form className="contact-form" onSubmit={submit} onInput={(event) => {
    const field = event.target;
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.setCustomValidity("");
    setOpened(false);
  }}>
    <div className="contact-form-heading"><span className="eyebrow">Let’s talk</span><h2>What can we help with?</h2><p>A little context helps us get you to the right answer.</p></div>
    <div className="contact-field-row">
      <label>Full name <span>*</span><input name="name" autoComplete="name" placeholder="Your name" required maxLength={100}/></label>
      <label>Email address <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={200}/></label>
    </div>
    <label>Workspace / company <small>(optional)</small><input name="company" autoComplete="organization" placeholder="Your workspace or company name" maxLength={150}/></label>
    <label>How can we help? <span>*</span><select name="topic" defaultValue="" required><option value="" disabled>Select a topic</option><option>Getting started</option><option>Account connections</option><option>Publishing & scheduling</option><option>Billing & plans</option><option>Agency & sales enquiry</option><option>Something else</option></select></label>
    <label>Your message <span>*</span><textarea name="message" rows={5} placeholder="Tell us what you’re trying to do, or where you’re stuck…" required maxLength={2000}/></label>
    <p className="contact-form-note">Please leave out passwords, access tokens and payment details.</p>
    <button className="btn btn--primary btn--lg" type="submit">Send Message <ArrowRight width={18} height={18}/></button>
    <p className="contact-form-note">Opens a WhatsApp draft with these details. Review it and press Send to contact our team.</p>
    {opened && <p className="contact-form-status" role="status">Your draft is ready in WhatsApp. If it didn’t open, allow pop-ups and try again. Your message is only sent when you press Send there.</p>}
  </form>;
}
