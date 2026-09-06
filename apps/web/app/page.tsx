import { FloatingActions } from "@/components/floating-actions";
import { FaqAccordion } from "@/components/faq-accordion";
import { CalendarShowcase } from "@/components/calendar-showcase";
import { Check, ArrowRight, LinkIcon, Pencil, CalendarIcon } from "@/components/icons";
import Image from "next/image";
import {
  BrowserFrame,
  ComposeMock,
  HeroMock,
  StatusMock,
  SocialIcon,
} from "@/components/mocks";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <TrustRail />
        <PublishingProblem />
        <HowItWorks />
        <Compose />
        <CalendarShowcase />
        <ReliabilityAnalytics />
        <ConnectedPlatforms />
        <Workspaces />
        <Pricing />
        <Faq />
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}

/* ---------- social publishing problem ---------- */
function PublishingProblem() {
  return (
    <section className="section problem-section" id="problem" aria-labelledby="problem-title">
      <div className="container publishing-problem-layout">
        <div className="publishing-problem-copy">
          <span className="eyebrow">The work behind one post</span>
          <h2 id="problem-title">One idea shouldn&apos;t become seven separate jobs.</h2>
          <p className="lede">Creating the content is only the beginning. Copying, resizing, rewriting and checking every platform turns publishing into busywork.</p>
          <div className="publishing-problem-resolution">
            <h3>Apogix brings every version<br className="problem-desktop-break" /> back into one focused workflow.</h3>
            <a className="publishing-problem-link" href="#how-it-works">See the simpler way <ArrowRight width={22} height={22} /></a>
          </div>
        </div>
        <div className="publishing-problem-visual">
          <span className="publishing-problem-number" aria-hidden="true">07</span>
          <Image className="publishing-problem-image" src="/apogix-publishing-collage.webp" alt="Seven separate social publishing editors with repeated cropping, caption edits, upload errors and scheduling issues" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 65vw" />
        </div>
      </div>
    </section>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <h1>Create once. <span className="grad">Publish everywhere.</span></h1>
          <p className="sub">
            Plan your content, customize every post for each platform, and schedule it across all your social channels from one organized workspace.
          </p>
          <div className="cta-row hero-actions">
            <a className="btn btn--primary btn--lg" href="#pricing">
              Start creating <ArrowRight width={16} height={16} />
            </a>
            <a className="btn btn--secondary btn--lg" href="#scheduling">See how it works <ArrowRight width={16} height={16} /></a>
          </div>
          <div className="hero-proof"><strong>No credit card required · Cancel anytime</strong></div>
        </div>

        <div className="hero-visual">
          <div className="hero-window"><HeroMock /></div>
        </div>
      </div>
    </section>
  );
}

const trustSteps = [
  ["link", "Official API connections", "Approved platform access"],
  ["lock", "Secure OAuth", "Your password stays private"],
  ["key", "Encrypted tokens", "Protected at rest"],
  ["health", "Account health", "Expiry and reconnect alerts"],
  ["status", "Clear publishing status", "No silent failures"],
] as const;

function TrustRail() {
  return (
    <section className="trust-rail" aria-labelledby="trust-title">
      <div className="container trust-rail__inner">
        <div className="trust-intro">
          <span className="eyebrow">Built for trust</span>
          <h2 id="trust-title">Connect with confidence.<br />Publish with control.</h2>
          <p>Official integrations, secure authorization and clear account health—without sharing social passwords.</p>
        </div>
        <div className="trust-steps">
          <span className="trust-steps__entry" aria-hidden="true" />
          {trustSteps.map(([icon, title, copy], index) => (
            <div className="trust-step" key={title}>
              <span className="trust-step__icon"><TrustIcon kind={icon} /></span>
              <strong><i>{index + 1}</i><span>{title}</span></strong>
              <small>{copy}</small>
            </div>
          ))}
        </div>
        <div className="trust-platforms" aria-label="Supported social platforms">
          <svg className="trust-platforms__line" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="trust-instagram" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#ffb343"/><stop offset=".45" stopColor="#f02972"/><stop offset="1" stopColor="#7137c8"/></linearGradient></defs><path d="M0 68 40 40H1000" fill="none" stroke="#aecdf5" strokeWidth="2.5" strokeDasharray="1 7" strokeLinecap="round" vectorEffect="non-scaling-stroke"/></svg>
          <span className="trust-platforms__start" />
          {(["ig", "fb", "li", "tt", "yt", "pt", "x"] as const).map((kind) => (
            <span className="trust-platform" key={kind}><SocialIcon kind={kind} /></span>
          ))}
          <span className="trust-platforms__arrow" aria-hidden="true" />
          <Image className="trust-logo" src="/apogix-logo.webp" alt="Apogix" width={190} height={55} />
        </div>
        <p className="trust-note"><svg viewBox="0 0 36 40" aria-hidden="true"><path d="M18 2 3 9v12c0 8 6 13 15 17 9-4 15-9 15-17V9Z" fill="white" stroke="#708caf" strokeWidth="2.3"/><path d="m10 20 5 5 11-12" fill="none" stroke="#00c995" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Platform availability depends on official API permissions and app approval.</p>
      </div>
    </section>
  );
}

function TrustIcon({ kind }: { kind: typeof trustSteps[number][0] }) {
  if (kind === "lock") return <svg viewBox="0 0 64 64"><path d="M21 27V19a11 11 0 0 1 22 0v8"/><rect x="13" y="27" width="38" height="31" rx="4"/><circle cx="32" cy="40" r="3.5" className="icon-fill"/><path d="M32 42v7" style={{ strokeWidth: 4 }}/></svg>;
  if (kind === "key") return <svg viewBox="0 0 64 64"><path d="M29 27a15 15 0 1 1 11 11L27 51h-6v6h-8v-9Z"/><circle cx="45" cy="18" r="3"/></svg>;
  if (kind === "health") return <svg viewBox="0 0 64 64"><path d="M32 57S6 42 6 25C6 9 23 5 32 17 41 5 58 9 58 25c0 5-2 10-5 14"/><path d="M7 33h14l4-9 8 19 6-16 4 7h13"/><circle className="verify-fill" cx="52" cy="53" r="13"/><path className="verify-check" style={{ strokeWidth: 2.2 }} d="m46 53 4 4 8-8"/></svg>;
  if (kind === "status") return <svg viewBox="0 0 64 64"><path stroke="#0866ff" strokeWidth="2.6" strokeDasharray="1.5 5" d="M31 17H15a10 10 0 0 0 0 20h14a10 10 0 0 1 0 20h-9"/><circle className="verify-fill" cx="49" cy="17" r="13"/><path className="verify-check" style={{ strokeWidth: 2.2 }} d="m43 17 4 4 8-8"/></svg>;
  return <svg viewBox="0 0 64 64"><path d="M32 5 10 15v16c0 14 9 23 22 29 13-6 22-15 22-29V15Z"/><path d="m29 29 7-7a6 6 0 0 1 8 8l-7 7a6 6 0 0 1-8 0m6-2-7 7a6 6 0 0 1-8-8l7-7a6 6 0 0 1 8 0M27 37l10-10"/></svg>;
}

/* ---------- platform strip ---------- */
function PlatformStrip() {
  return (
    <section className="section section--alt" style={{ paddingBlock: "2.5rem" }}>
      <div className="container strip">
        <span className="lbl">Create once · publish directly to</span>
        {[
          ["IG", "Instagram Professional"],
          ["FB", "Facebook Pages"],
          ["LI", "LinkedIn"],
        ].map(([g, name]) => (
          <span className="plat" key={name}>
            <span className="g">{g}</span>
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- scheduling ---------- */

/* ---------- compose ---------- */
function Compose() {
  return (
    <section className="section section--dark compose-section composer-showcase" id="compose" aria-labelledby="composer-title">
      <svg className="composer-orbits" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true"><path d="M-150 20C480 100-160 700 780 960M-120 500C350 400 540-180 1050-90M200 980C550 570 1180 1050 1690 470M-50 70C600-70 1090 190 1620 20"/></svg>
      <div className="container composer-showcase-layout">
        <div className="composer-artwork">
          <span className="composer-badge composer-badge--platforms"><LinkIcon width={22} height={22}/>5 platforms selected</span>
          <Image className="composer-product-image" src="/apogix-master-composer.webp" alt="Apogix branded master composer with five social destinations, a master caption, coastal media and a live LinkedIn preview" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 62vw"/>
          <span className="composer-badge composer-badge--valid"><Check width={22} height={22}/>All formats valid</span>
        </div>
        <div className="composer-showcase-copy">
          <span className="eyebrow">Master post composer</span>
          <h2 id="composer-title">One idea. Every version. One focused workspace.</h2>
          <p className="lede">Write your core message once, then tailor captions, media and timing for every selected platform without duplicating the work.</p>
          <ul className="composer-feature-list">
            <li><svg viewBox="0 0 28 28" aria-hidden="true"><path d="M7 3h10l5 5v17H7ZM17 3v6h5M11 14h7M11 19h7"/></svg><span>Platform-specific captions</span></li>
            <li><svg viewBox="0 0 28 28" aria-hidden="true"><path d="m14 3 10 4v8c0 5-5 8-10 11C9 23 4 20 4 15V7Z"/><path d="m9 14 3 3 7-7"/></svg><span>Live format validation</span></li>
            <li><svg viewBox="0 0 28 28" aria-hidden="true"><path d="M2 14s4-9 12-9 12 9 12 9-4 9-12 9S2 14 2 14Z"/><circle cx="14" cy="14" r="4"/></svg><span>Accurate content previews</span></li>
            <li><svg viewBox="0 0 28 28" aria-hidden="true"><path d="M4 11a10 10 0 0 1 17-5l3 3M24 3v6h-6M24 17a10 10 0 0 1-17 5l-3-3M4 25v-6h6"/></svg><span>Automatic draft saving</span></li>
          </ul>
          <div className="cta-row composer-actions"><a className="btn btn--secondary" href="#scheduling">Explore the composer <ArrowRight width={18} height={18}/></a><a className="btn btn--primary" href="#how-it-works">Watch the workflow <ArrowRight width={18} height={18}/></a></div>
          <p className="composer-footnote">Your post stays editable until the moment it is published.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- platform customization ---------- */

/* ---------- connected platforms ---------- */
function ConnectedPlatforms() {
  const platforms = [
    ["ig", "Instagram", "Reels, posts & carousels"], ["fb", "Facebook", "Pages & media posts"],
    ["li", "LinkedIn", "Profiles & company pages"], ["tt", "TikTok", "Short-form video"],
    ["yt", "YouTube", "Videos & Shorts"], ["pt", "Pinterest", "Pins & boards"], ["x", "X", "Posts & threads"],
  ] as const;
  return (
    <section className="section platforms-section" id="platforms">
      <div className="container platforms-layout">
        <div className="platforms-copy">
          <span className="eyebrow">Connected social platforms</span>
          <h2>Every channel.<br />One clear view.</h2>
          <p className="lede">Connect through official authorization and manage every destination without sharing account passwords.</p>
          <div className="platforms-proof"><span><Check width={17} height={17} />Official connections</span><span><Check width={17} height={17} />One secure workspace</span></div>
          <a className="btn btn--primary" href="#pricing">Explore integrations <ArrowRight width={18} height={18}/></a>
        </div>
        <Reveal className="platform-network">
          <svg className="platform-network-lines" viewBox="0 0 700 560" aria-hidden="true">
            <path d="M350 280 115 92M350 280 350 58M350 280 585 92M350 280 620 280M350 280 585 468M350 280 350 505M350 280 115 468"/>
          </svg>
          <div className="platform-hub"><Image src="/apogix-logo.webp" alt="Apogix" width={150} height={44}/><small>Publishing hub</small><span><i/>7 channels ready</span></div>
          {platforms.map(([kind,name,copy], index) => <div className={`platform-card platform-card--${index + 1}`} key={kind}><div><b>{name}</b><small>{copy}</small></div><SocialIcon kind={kind} /><span><i/>Ready</span></div>)}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- approvals ---------- */

/* ---------- analytics ---------- */
function ReliabilityAnalytics() {
  return (
    <section className="section reliability-analytics" id="reliability" aria-labelledby="reliability-title">
      <div className="container reliability-analytics-layout">
        <div className="reliability-analytics-art">
          <Image src="/apogix-reliability-analytics.webp" alt="Publishing overview with published, failed and retrying posts alongside reach, engagement and post performance charts" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 58vw" />
        </div>
        <div className="reliability-analytics-copy" id="analytics">
          <span className="eyebrow">Reliability + Analytics</span>
          <h2 id="reliability-title">Know what went live.<br />See what works.</h2>
          <p className="lede">Track publishing success, resolve failed posts and follow performance in one clear view. Every post has a status. Every result helps you plan what comes next.</p>
          <div className="reliability-features">
            <div><span className="reliability-feature-icon is-success"><Check width={22} height={22}/></span><div><h3>Clear publishing status</h3><p>See successful and failed posts for each destination, with the next action always visible.</p></div></div>
            <div><span className="reliability-feature-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9a8 8 0 0 1 13-4l3 3M20 3v5h-5M20 15a8 8 0 0 1-13 4l-3-3M4 21v-5h5"/></svg></span><div><h3>Retries that keep you informed</h3><p>Follow automatic retries for temporary failures and reconnect accounts when attention is needed.</p></div></div>
            <div><span className="reliability-feature-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3v17h17M8 15l4-5 4 2 5-7"/></svg></span><div><h3>Performance at a glance</h3><p>Review available reach, engagement and post totals across your connected channels.</p></div></div>
          </div>
          <a className="btn btn--primary" href="#pricing">Explore the overview <ArrowRight width={18} height={18}/></a>
          <p className="reliability-analytics-note">Available metrics depend on each platform&apos;s API permissions.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- reliability ---------- */

/* ---------- how it works ---------- */
function HowItWorks() {
  return (
    <section className="section workflow-section" id="how-it-works" aria-labelledby="workflow-title">
      <div className="container workflow-canvas">
        <header className="workflow-heading">
          <span className="eyebrow">How Apogix works</span>
          <h2 id="workflow-title">From first thought<br />to every feed.</h2>
          <p className="lede">Move from one idea to every social channel<br className="problem-desktop-break" /> through one clear, connected workflow.</p>
        </header>
        <a className="workflow-explore" href="#compose">Explore the product <ArrowRight width={22} height={22} /></a>
        <svg className="workflow-curves" viewBox="0 0 1280 720" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="workflow-blue"><stop stopColor="#abdfff"/><stop offset=".3" stopColor="#1680ff"/><stop offset=".5" stopColor="#82c8ff"/><stop offset=".7" stopColor="#bee5ff"/><stop offset="1" stopColor="#0671ff"/></linearGradient>
            <marker id="workflow-tip" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="2.2" markerHeight="2.2" orient="auto"><path d="m2 1 8 5-8 5 2-5Z" fill="#1680ff"/></marker>
          </defs>
          <path className="workflow-contour" d="M-70 150C200 360-200 640 200 690S450 860 480 710 770 535 930 550 1340 530 1340 300M430 330C430 130 680 30 820-100"/>
          <path className="workflow-ribbon" d="M0 485C135 585 255 505 330 405S510 250 615 365C720 480 805 550 895 507C975 465 990 330 1060 330"/>
          <path className="workflow-traveler" d="M0 485C135 585 255 505 330 405S510 250 615 365C720 480 805 550 895 507C975 465 990 330 1060 330" pathLength="100"/>
          <path d="m1050 315 30 15-30 15 8-15Z" fill="#1680ff"/>
          <path className="workflow-branch" d="M330 405C365 410 355 286 410 286M330 405C365 422 380 468 410 468M1080 330C1110 320 1105 220 1160 220M1080 330C1110 325 1120 268 1160 268M1080 330C1110 330 1130 316 1160 316M1080 330C1110 340 1130 364 1160 364M1080 330C1110 350 1120 412 1160 412M1080 330C1110 365 1110 460 1160 460"/>
          <circle cx="330" cy="405" r="5" fill="white" stroke="#1680ff" strokeWidth="3"/>
        </svg>
        <span className="workflow-start-badge" aria-hidden="true"><Pencil width={25} height={25}/></span>
        <div className="workflow-stage workflow-create">
          <div className="workflow-label"><span className="workflow-number">01</span><h3>Create</h3><p>Write once and bring<br />your media together.</p></div>
          <div className="workflow-card workflow-composer"><p>New perspectives<br />lead to brighter days. <span className="workflow-caret">&#10022;</span></p><Image src="/apogix-workflow-coast.webp" alt="Sunlit coastal cliffs beside a turquoise ocean" width={1536} height={1024} sizes="(max-width: 760px) 70vw, 220px"/><div className="workflow-tools" aria-hidden="true"><Pencil width={18} height={18}/><span>GIF</span><CalendarIcon width={18} height={18}/><span>&#9786;</span></div></div>
        </div>
        <div className="workflow-stage workflow-adapt">
          <div className="workflow-label"><span className="workflow-number">02</span><h3>Adapt</h3><p>Fine-tune every platform<br />without starting over.</p></div>
          <div className="workflow-versions">{(["ig", "li", "x"] as const).map((kind) => <div className="workflow-card workflow-version" key={kind}><SocialIcon kind={kind}/><p>New perspectives<br />lead to brighter days.{kind === "ig" && <span className="workflow-tags">#travel #explore #wander</span>}{kind === "li" && <span>Discover how a fresh approach can help your brand grow.</span>}</p></div>)}</div>
        </div>
        <div className="workflow-stage workflow-approve">
          <div className="workflow-label"><span className="workflow-number">03</span><h3>Approve</h3><p>Review the exact version<br />before it goes live.</p></div>
          <div className="workflow-review"><div className="workflow-avatars"><span>JD</span><span>SK</span></div><div className="workflow-card workflow-comment"><b>JD</b><p>Looks great! Let&apos;s publish this.<small>2 min ago</small></p></div><span className="workflow-review-line"/><span className="workflow-approved"><Check width={28} height={28}/></span><span className="workflow-approved-text">Approved</span></div>
        </div>
        <div className="workflow-stage workflow-publish">
          <div className="workflow-label"><span className="workflow-number">04</span><h3>Publish</h3><p>Post now or schedule<br />every destination.</p></div>
          <div className="workflow-destinations">{(["ig", "li", "x", "tt", "yt", "pt"] as const).map((kind,index)=><div className="workflow-destination" key={kind}><SocialIcon kind={kind}/><span className={`workflow-card workflow-result ${index % 2 ? "is-scheduled" : "is-published"}`}>{index % 2 ? <CalendarIcon width={15} height={15}/> : <Check width={15} height={15}/>}<span>{index % 2 ? "Scheduled" : "Published"}{index % 2 === 1 && <small>Apr 24, 10:00 AM</small>}</span></span></div>)}</div>
        </div>
        <div className="workflow-summary"><h3>One idea. Four clear steps.<br /><span>Every channel in sync.</span></h3></div>
      </div>
    </section>
  );
}

/* ---------- workspaces (dark) ---------- */
function Workspaces() {
  return (
    <section className="section audience-section" id="audiences">
      <div className="container split">
        <Reveal className="split-visual generated-visual-stage team-art-stage">
          <div className="art-glow" aria-hidden="true" />
          <Image className="generated-art team-art" src="/apogix-team-visual.webp" alt="Team collaborating on content approvals in a secure workspace" width={768} height={512} />
        </Reveal>
        <div className="split-copy stack">
          <span className="eyebrow">Built for creators, teams and agencies</span>
          <h2>One flexible workflow for every way you create.</h2>
          <p className="lede">
            Work solo, collaborate with an internal team or manage a full client roster. Apogix keeps accounts, content and permissions organized in dedicated workspaces.
          </p>
          <div className="audience-types"><span><b>Creators</b><small>Plan and publish consistently</small></span><span><b>Teams</b><small>Collaborate with clear roles</small></span><span><b>Agencies</b><small>Separate every client workspace</small></span></div>
          <ul className="checks">
            <Item b="Five roles">Owner, Admin, Editor, Approver, Viewer.</Item>
            <Item b="Approvals">
              editors submit, approvers sign off on the exact version.
            </Item>
            <Item b="Strict isolation">
              no data crosses workspaces — enforced at the database.
            </Item>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- pricing ---------- */
function Pricing() {
  const plans = [
    {
      name: "Starter",
      amt: "$19",
      desc: "For a solo creator keeping a few channels alive.",
      feats: ["3 social accounts", "1 member", "30 destinations / month", "2 GB media"],
      cta: "Start free",
      featured: false,
    },
    {
      name: "Professional",
      amt: "$49",
      desc: "For a small team that reviews before it posts.",
      feats: [
        "8 social accounts",
        "3 members",
        "150 destinations / month",
        "Approvals workflow",
        "10 GB media",
      ],
      cta: "Start free",
      featured: true,
    },
    {
      name: "Agency",
      amt: "$99",
      desc: "For managing a roster of separate clients.",
      feats: [
        "25 social accounts",
        "10 members",
        "500 destinations / month",
        "Client workspaces",
        "50 GB media",
      ],
      cta: "Talk to us",
      featured: false,
    },
  ];
  return (
    <section className="section section--alt" id="pricing">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Pricing plans</span>
          <h2>Plans that grow from one channel to a client roster.</h2>
          <p className="lede" style={{ maxWidth: "48ch" }}>
            Every plan includes scheduling, per-channel overrides, retries and the
            calendar. Simple monthly billing with no long-term contract.
          </p>
        </div>
        <Reveal className="prices">
          {plans.map((p) => (
            <div
              className={`price-card${p.featured ? " price-card--featured" : ""}`}
              key={p.name}
            >
              {p.featured && <span className="tag">Most chosen</span>}
              <span className="pname">{p.name}</span>
              <div className="amt">
                {p.amt} <small>/ month</small>
              </div>
              <p className="desc">{p.desc}</p>
              <ul>
                {p.feats.map((f) => (
                  <li key={f}>
                    <Check width={15} height={15} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                className={`btn ${p.featured ? "btn--primary" : "btn--secondary"}`}
                href="#"
              >
                {p.cta} <ArrowRight width={16} height={16} />
              </a>
            </div>
          ))}
        </Reveal>
        <p className="muted-note" style={{ marginTop: "1.5rem" }}>
          We count destinations, not posts. One post sent to three channels uses
          three.
        </p>
      </div>
    </section>
  );
}

/* ---------- faq ---------- */
function Faq() {
  const items = [
  {
    "q": "What can I do with Apogix?",
    "a": "Create a master post, adapt it for individual channels, plan it on a calendar, collect approvals and follow publishing outcomes and performance.",
    "open": true
  },
  {
    "q": "Which social platforms are supported?",
    "a": "Instagram Professional, Facebook Pages and LinkedIn are the launch platforms. TikTok, YouTube, Pinterest and X are planned integrations. Availability depends on official API permissions and app approval.",
    "open": false
  },
  {
    "q": "Do I need to share my social passwords?",
    "a": "No. Connect through the platform?s official authorization screen. You can revoke access from your social account settings.",
    "open": false
  },
  {
    "q": "Can I customize one post for different channels?",
    "a": "Yes. Start with a master caption, then tailor the caption, media and timing for each selected destination without starting again.",
    "open": false
  },
  {
    "q": "Can I preview content before publishing?",
    "a": "The composer shows a channel preview and format checks. Final appearance and available formats can vary by platform.",
    "open": false
  },
  {
    "q": "Can I schedule posts and change the date later?",
    "a": "Use the visual calendar to plan posts and reschedule content that has not published. Check the selected timezone before confirming a new time.",
    "open": false
  },
  {
    "q": "Does publishing work when my computer is off?",
    "a": "Scheduled publishing runs on the server, so you do not need to keep a browser tab or your computer open.",
    "open": false
  },
  {
    "q": "How do team and client approvals work?",
    "a": "Submit a post for review, keep comments alongside its content and track draft, review, changes requested and approved states. Approval access depends on your plan.",
    "open": false
  },
  {
    "q": "What happens when a post fails?",
    "a": "Each destination has its own status. Temporary failures can be retried; account or permission problems need attention. The overview shows which destination failed and the next action.",
    "open": false
  },
  {
    "q": "Will retrying create duplicate posts?",
    "a": "The publishing flow is designed to avoid duplicate delivery. Check the latest platform status before manually submitting a separate copy of a failed post.",
    "open": false
  },
  {
    "q": "What if my connected account expires?",
    "a": "Account health alerts identify connections that need to be renewed. Reconnect the account and review any affected scheduled posts.",
    "open": false
  },
  {
    "q": "What analytics can I see?",
    "a": "The overview brings publishing outcomes together with available reach, engagement and post totals. Metrics and update timing depend on each platform?s API.",
    "open": false
  },
  {
    "q": "Can I manage multiple brands or clients?",
    "a": "Workspaces keep brand content, channels and team collaboration organized. Choose a plan that matches the number of workspaces and destinations you need.",
    "open": false
  },
  {
    "q": "How are publishing limits counted?",
    "a": "Usage is counted by destination. One post sent to three social channels uses three publishing destinations.",
    "open": false
  },
  {
    "q": "Which plan includes approvals?",
    "a": "Professional and Agency plans include the team approval workflow shown here. Compare the pricing cards for the allowances included in each plan.",
    "open": false
  },
  {
    "q": "How does billing and cancellation work?",
    "a": "Plans are billed monthly by card. You can cancel future renewals; current access continues until the end of the billing period.",
    "open": false
  },
  {
    "q": "Can I edit or delete a post after it goes live?",
    "a": "Drafts and scheduled posts can be edited before publishing. Editing or deleting a published post depends on the destination platform and may need to be done there.",
    "open": false
  },
  {
    "q": "Are the dashboard numbers on this page live data?",
    "a": "The dashboard images and animated calendar are product previews with illustrative content. They do not show live account performance.",
    "open": false
  }
];
  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2>The things people ask first.</h2>
        </div>
        <Reveal><FaqAccordion items={items} /></Reveal>
      </div>
    </section>
  );
}

/* ---------- final CTA ---------- */

/* ---------- shared ---------- */
function Item({ b, children }: { b: string; children: React.ReactNode }) {
  return (
    <li>
      <Check width={17} height={17} />
      <span>
        <b>{b}</b> — {children}
      </span>
    </li>
  );
}
