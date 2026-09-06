import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check } from "@/components/icons";
import { FaqAccordion } from "@/components/faq-accordion";
import { FloatingActions } from "@/components/floating-actions";
import { SocialIcon } from "@/components/mocks";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Social media integrations | Apogix",
  description: "Explore the social channels planned for Apogix, their publishing capabilities, account requirements and secure connection flow.",
};

const platforms = [
  { kind: "ig", name: "Instagram", account: "Professional account", copy: "Plan feed media for a professional account connected through Meta authorization.", detail: "Professional feed publishing is part of the launch plan; each format still requires capability and app-review checks." },
  { kind: "fb", name: "Facebook Pages", account: "Facebook Page", copy: "Create and schedule Page content while keeping personal passwords private.", detail: "Page publishing is part of the launch plan. Personal profile automation is not supported." },
  { kind: "li", name: "LinkedIn", account: "Company Page", copy: "Prepare professional updates for an authorized organization identity.", detail: "Company Page publishing is planned for launch after role validation and approved OAuth scopes." },
  { kind: "yt", name: "YouTube", account: "YouTube channel", copy: "Bring video publishing and processing status into the same calendar.", detail: "Video and Shorts publishing is planned for a later release and remains subject to Google quota." },
  { kind: "pt", name: "Pinterest", account: "Business account", copy: "Organize Pins by board without rebuilding the content workflow.", detail: "Pinterest developer access and board selection are planned for a later release." },
  { kind: "tt", name: "TikTok", account: "Eligible TikTok account", copy: "Prepare short-form video versions alongside every other destination.", detail: "Direct posting depends on Content Posting API access, scopes and platform audit." },
  { kind: "x", name: "X", account: "X account", copy: "Adapt concise updates and track delivery from one publishing record.", detail: "X is planned as a metered add-on because API requests carry usage charges." },
] as const;

const matrix = [
  ["Facebook Pages", "Page", "Planned", "Planned", "Review", "Review", "—"],
  ["Instagram", "Professional", "—", "Planned", "Review", "Review", "Review"],
  ["LinkedIn", "Company Page", "Planned", "Planned", "—", "Review", "—"],
  ["YouTube", "Channel", "—", "—", "—", "Planned", "Planned"],
  ["Pinterest", "Business", "Planned", "Planned", "—", "Planned", "—"],
  ["TikTok", "Eligible account", "Planned", "—", "—", "Planned", "Planned"],
  ["X", "User account", "Planned", "Planned", "—", "Planned", "—"],
] as const;

const faqs = [
  { q: "Can I connect a personal social account?", a: "Account eligibility differs by platform. Facebook publishing requires a Page, Instagram requires a Professional account, and the launch LinkedIn plan is focused on Company Pages. The connection screen will show only identities that the provider authorizes." },
  { q: "What happens if an account disconnects?", a: "Apogix is designed to flag expired or revoked access, identify affected scheduled destinations and guide you through reconnecting before the next post goes live." },
  { q: "Is every native post format supported?", a: "No. Every platform exposes different formats through its official API. Apogix will show a format as available only after its permission, validation and production publishing path have been verified." },
  { q: "Can I add multiple accounts from the same platform?", a: "The product plan supports multiple authorized destinations, subject to your subscription allowance and the identities returned by the platform during authorization." },
  { q: "Do you store my social password?", a: "No. Authorization happens on the platform's own consent screen. Apogix receives scoped tokens and is designed to encrypt them server-side." },
  { q: "Which integrations are live today?", a: "This repository currently contains the public website, not completed production adapters. Every integration is therefore labelled Coming soon until connect, refresh, publish, retry, error and disconnect flows have passed production checks." },
];

export default function IntegrationsPage() {
  return <>
    <SiteHeader />
    <main id="top" className="integrations-page">
      <section className="integration-hero">
        <div className="integration-hero-grid" aria-hidden="true" />
        <div className="container integration-hero-layout">
          <div className="integration-hero-copy">
            <span className="eyebrow">Official connections. One clear workflow.</span>
            <h1>Your channels.<br/><span>One workspace.</span></h1>
            <p>Bring every authorized social destination into one calm publishing system—then adapt, schedule and follow each version from the same place.</p>
            <a className="btn btn--primary btn--lg" href="#explore">Connect your accounts <ArrowRight width={18} height={18}/></a>
            <small><Check width={16} height={16}/> Password-free authorization through official platform consent</small>
          </div>
          <div className="integration-orbit" aria-label="Seven social platforms surrounding the Apogix publishing hub">
            <svg viewBox="0 0 620 620" aria-hidden="true"><circle cx="310" cy="310" r="205"/><circle cx="310" cy="310" r="130"/><path d="M310 105v410M105 310h410M165 165l290 290M455 165 165 455"/></svg>
            <div className="integration-orbit-hub"><Image src="/apogix-logo.webp" alt="Apogix" width={158} height={46}/><span><i/>Connection center</span></div>
            {platforms.map((platform,index)=><span className={`integration-orbit-icon orbit-${index+1}`} key={platform.kind}><SocialIcon kind={platform.kind}/></span>)}
          </div>
        </div>
      </section>

      <section className="section integration-directory" id="explore">
        <div className="container">
          <div className="integration-section-intro"><div><span className="eyebrow">Explore integrations</span><h2>Every destination,<br/>clearly accounted for.</h2></div><p>Availability reflects verified product implementation. Planned launch channels are not labelled live until their complete production flow passes.</p></div>
          <div className="integration-rows">
            {platforms.map((platform,index)=><Reveal className="integration-row" key={platform.kind}>
              <span className="integration-index">0{index+1}</span><SocialIcon kind={platform.kind}/>
              <div className="integration-row-copy"><h3>{platform.name}</h3><p>{platform.copy}</p><small>{platform.account}</small></div>
              <span className="integration-status is-soon"><i/>Coming soon</span>
              <button className="integration-details" type="button" popoverTarget={`integration-${platform.kind}`}>View details <ArrowRight width={17} height={17}/></button>
              <div className="integration-popover" id={`integration-${platform.kind}`} popover="auto"><SocialIcon kind={platform.kind}/><h3>{platform.name}</h3><p>{platform.detail}</p><button type="button" popoverTarget={`integration-${platform.kind}`} popoverTargetAction="hide">Close</button></div>
            </Reveal>)}
          </div>
        </div>
      </section>

      <section className="section integration-capabilities">
        <div className="container">
          <div className="section-head"><span className="eyebrow">What can you publish?</span><h2>A capability map without vague promises.</h2><p className="lede">These are planned API capabilities. “Review” means access, format rules or approval still needs production verification.</p></div>
          <Reveal className="capability-table-wrap"><table className="capability-table"><thead><tr><th>Platform</th><th>Required account</th><th>Text</th><th>Image</th><th>Carousel</th><th>Video</th><th>Short-form</th></tr></thead><tbody>{matrix.map(row=><tr key={row[0]}>{row.map((cell,index)=><td key={`${row[0]}-${index}`}><span className={cell==="Planned"?"matrix-planned":cell==="Review"?"matrix-review":""}>{cell}</span></td>)}</tr>)}</tbody></table></Reveal>
          <p className="capability-note"><span>Current status:</span> no production integration is presented as Available until its official app permissions and complete publishing lifecycle are verified.</p>
        </div>
      </section>

      <section className="section integration-steps">
        <div className="container">
          <div className="integration-section-intro"><div><span className="eyebrow">Connect in three steps</span><h2>From consent<br/>to calendar.</h2></div><p>A short, provider-controlled connection flow keeps setup understandable and credentials private.</p></div>
          <div className="connection-path" aria-hidden="true"><span/><span/><span/></div>
          <div className="connection-steps">
            <Reveal className="connection-step"><span className="connection-number">01</span><div className="step-mini step-platforms"><SocialIcon kind="ig"/><SocialIcon kind="fb"/><SocialIcon kind="li"/></div><h3>Choose platform</h3><p>Select the destination you want to bring into your workspace.</p></Reveal>
            <Reveal className="connection-step"><span className="connection-number">02</span><div className="step-mini step-authorize"><span className="step-shield"><Check width={26} height={26}/></span><i/><i/></div><h3>Authorize account</h3><p>Review requested permissions on the platform's official consent screen.</p></Reveal>
            <Reveal className="connection-step"><span className="connection-number">03</span><div className="step-mini step-schedule"><span>24</span><i/><b><Check width={18} height={18}/></b></div><h3>Start scheduling</h3><p>Pick an eligible account, create a version and choose when it should publish.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="section integration-security" id="security">
        <div className="container integration-security-layout">
          <Reveal className="integration-security-visual"><span className="security-ring"/><Image src="/apogix-integration-security.webp" alt="Secure account authorization, encrypted connections and account health monitoring" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 55vw"/></Reveal>
          <div className="integration-security-copy"><span className="eyebrow">Connection security & account health</span><h2>Your password stays with the platform.</h2><p className="lede">Apogix is designed around official authorization, scoped access and visible connection health.</p><ul>
            <li><span>01</span><div><h3>Official consent</h3><p>Sign in on the provider's authorization screen and approve only the permissions shown.</p></div></li>
            <li><span>02</span><div><h3>Encrypted tokens</h3><p>Access tokens stay server-side and are designed to be encrypted outside the database.</p></div></li>
            <li><span>03</span><div><h3>Disconnect anytime</h3><p>Remove a destination from Apogix and revoke access from the platform whenever needed.</p></div></li>
            <li><span>04</span><div><h3>Reconnect alerts</h3><p>Expired access is surfaced before it silently affects scheduled publishing.</p></div></li>
          </ul></div>
        </div>
      </section>

      <section className="section integration-faq"><div className="container integration-faq-layout"><div className="integration-faq-copy"><span className="eyebrow">Integration FAQs</span><h2>Before you connect.</h2><p>Clear answers about eligibility, formats and account access.</p></div><Reveal><FaqAccordion items={faqs}/></Reveal></div></section>

      <section className="integration-closing"><div className="container"><div className="integration-closing-inner"><div><span className="eyebrow">One workspace. Every approved channel.</span><h2>Bring your channels together.</h2><p>Build one clear publishing workflow while each platform version keeps its own requirements.</p></div><a className="btn btn--white btn--lg" href="/#pricing">Connect your accounts <ArrowRight width={18} height={18}/></a></div></div></section>
    </main>
    <SiteFooter/><FloatingActions/>
  </>;
}
