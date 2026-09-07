import Image from "next/image";
import { ContactMotion } from "@/components/contact-motion";
import type { Metadata } from "next";
import { ArrowRight } from "@/components/icons";
import { ContactForm } from "@/components/contact-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { FloatingActions } from "@/components/floating-actions";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { brand, whatsappUrl } from "../../../../packages/config/brand";

export const metadata: Metadata = {
  title: `Contact & Support | ${brand.name}`,
  description: `Get help with ${brand.name} account connections, publishing, scheduling and plans, or talk to us about your team's needs.`,
};

const topics = [
  { number: "01", title: "Connecting your channels", copy: "Account eligibility, permissions and reconnecting your social profiles.", href: "/integrations", link: "Explore integrations" },
  { number: "02", title: "Finding the right plan", copy: "Compare account allowances, team seats and monthly publishing limits.", href: "/pricing", link: "Compare plans" },
  { number: "03", title: "Getting into your flow", copy: "See how composing, adapting and scheduling fit into one workflow.", href: "/#how-it-works", link: "See how it works" },
];

const faqs = [
  { q: "What should I include in a support request?", a: "Share your workspace name, the affected social channel, what you expected to happen and the error text, if any. For scheduling issues, include the planned date, time and timezone. Never send passwords, access tokens or full payment details." },
  { q: "How do I send my enquiry?", a: "Complete the form and choose Send Message. Your details open as a draft so you can review them before pressing Send. You can also start a conversation directly using the WhatsApp link on this page." },
  { q: "My social account won’t connect. Where should I start?", a: "Check the Integrations page for the account type required by your platform. Make sure you are signing in to the correct provider account and have the required Page or organization permissions. If you are still stuck, send us the platform name and the error you see." },
  { q: "Can we discuss an agency or team setup?", a: "Yes. Select Agency & sales enquiry and tell us how many clients, social accounts and team members you need to manage. Include any approval or collaboration requirements so we can discuss a suitable setup." },
  { q: "Can you help with a billing question?", a: "Choose Billing & plans and describe your question. For a payment query, include a transaction reference and the date of the charge in your conversation, but leave out card numbers and other sensitive payment information." },
];

export default function ContactPage() {
  return <><SiteHeader/><main id="top" className="contact-page"><ContactMotion/>
    <section className="contact-hero"><div className="container contact-hero-inner"><div className="contact-hero-copy">
      <span className="eyebrow">Contact / Support</span>
      <h1>A little help.<br/><span>A lot more flow.</span></h1>
      <p>From your first connected channel to your next big idea.<br className="contact-desktop-break"/> Let’s find the right next step, together.</p>
      <a href="#contact-form" className="contact-hero-link">Talk to our team <ArrowRight width={18} height={18}/></a>
      <div className="contact-hero-caption"><span/>Questions welcome. Ideas, too.</div>
    </div><div className="contact-hero-art"><Image src="/apogix-contact-support.webp" alt="Ivory support headset around a lavender conversation bubble" width={1280} height={1280} priority sizes="(max-width: 760px) 80vw, 40vw"/></div></div><span className="contact-orbit contact-orbit-one" aria-hidden="true"/><span className="contact-orbit contact-orbit-two" aria-hidden="true"/></section>

    <section className="section contact-main" id="contact-form"><div className="container contact-layout">
      <aside className="contact-aside"><span className="eyebrow">A conversation starts here</span><h2>Good questions<br/>deserve clear answers.</h2><p>Need a hand with your workspace? Exploring {brand.name} for your team? Tell us what’s on your mind.</p>
        <a className="contact-direct" href={whatsappUrl(`Hi ${brand.name}, I would like some help.`)} target="_blank" rel="noopener noreferrer"><span className="contact-chat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2V11.5A9.5 9.5 0 0 1 21 11.5Z"/><path d="M7 10h9M7 14h6"/></svg></span><span><strong>Prefer a direct chat?</strong><small>Start a conversation on WhatsApp</small></span><ArrowRight width={20} height={20}/></a>
        <div className="contact-checklist"><span className="eyebrow">Help us help you</span><p>For a smoother conversation, have these handy:</p><ol><li>Your workspace or company name</li><li>The channel or feature you’re asking about</li><li>What happened, and what you expected</li></ol></div>
        <span className="contact-aside-signoff">Less friction. More creating.</span>
      </aside>
      <ContactForm/>
    </div></section>

    <section className="section contact-resources"><div className="container"><div className="contact-section-heading"><span className="eyebrow">Find your next step</span><h2>A good place to start.</h2><p>A few useful stops while you explore.</p></div><div className="contact-topic-list">{topics.map(topic => <a className="contact-topic" href={topic.href} key={topic.number}><span className="contact-topic-number">{topic.number}</span><h3>{topic.title}</h3><p>{topic.copy}</p><span className="contact-topic-link">{topic.link}<ArrowRight width={18} height={18}/></span></a>)}</div></div></section>

    <section className="section contact-faq"><div className="container contact-faq-layout"><div><span className="eyebrow">A few quick answers</span><h2>Before you<br/>say hello.</h2><p>Helpful details for getting your conversation started.</p></div><FaqAccordion items={faqs}/></div></section>
    <section className="contact-closing"><div className="container"><span className="eyebrow">For your next chapter</span><h2>Big team. Small question.<br/>Let’s talk.</h2><a className="btn btn--white btn--lg" href="#contact-form">Start a conversation<ArrowRight width={18} height={18}/></a></div></section>
  </main><SiteFooter/><FloatingActions/></>;
}
