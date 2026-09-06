import type { ReactNode } from "react";
import Image from "next/image";

/* ---------- browser frame ---------- */
export function BrowserFrame({
  url = "app.apogix.com",
  children,
}: {
  url?: string;
  children: ReactNode;
}) {
  return (
    <div className="frame">
      <div className="frame-bar">
        <div className="frame-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span className="frame-url">{url}</span>
      </div>
      <div className="frame-body">{children}</div>
    </div>
  );
}

/* ---------- calendar helpers ---------- */
// August 2026 starts on a Saturday; the 20th is a Thursday.
const AUG_LEAD = [27, 28, 29, 30, 31];
const AUG_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const DOW = ["S", "M", "T", "W", "T", "F", "S"];

function MiniCal() {
  return (
    <div className="mock-card">
      <div className="cal-head">
        <span>August 2026</span>
        <span>‹ ›</span>
      </div>
      <div className="cal-grid">
        {DOW.map((d, i) => (
          <span className="dow" key={`d${i}`}>
            {d}
          </span>
        ))}
        {AUG_LEAD.map((d) => (
          <span className="out" key={`o${d}`}>
            {d}
          </span>
        ))}
        {AUG_DAYS.map((d) => {
          const cls = ["day"];
          if (d === 20) cls.push("sel");
          else if (d === 6 || d === 13) cls.push("dot");
          return (
            <span className={cls.join(" ")} key={`day${d}`}>
              {d}
            </span>
          );
        })}
      </div>
      <div className="cal-chip">Thu 20 Aug · 9:30 AM · 3 channels</div>
    </div>
  );
}

/* ---------- hero: composer + calendar ---------- */
export function HeroMock() {
  return (
    <div className="hero-flow">
      <svg className="flow-lines" viewBox="0 0 760 560" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <marker id="flow-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 0 8 4 0 8Z" className="arrow-head" />
          </marker>
        </defs>
        <path className="dotted" d="M435 220 C505 220 475 32 535 32" markerEnd="url(#flow-arrow)" />
        <path className="solid" d="M435 230 C505 230 490 102 535 102" />
        <path className="solid" d="M435 240 C505 240 500 171 535 171" />
        <path className="solid straight" d="M435 250 C475 250 500 241 535 241" />
        <path className="solid" d="M435 260 C500 260 500 310 535 310" />
        <path className="solid" d="M435 270 C500 270 490 380 535 380" />
        <path className="dotted" d="M435 280 C500 280 475 450 535 450" markerEnd="url(#flow-arrow)" />
        <circle className="route-node" cx="535" cy="102" r="3" />
        <circle className="route-node" cx="535" cy="171" r="3" />
        <circle className="route-node" cx="535" cy="241" r="3" />
        <circle className="route-node" cx="535" cy="310" r="3" />
        <circle className="route-node" cx="535" cy="380" r="3" />
      </svg>
      <div className="flow-draft"><i>✎</i><span><b>Draft ready</b><small>1 post</small></span></div>
      <Image className="flow-composer-image" src="/apogix-hero-composer.png" alt="Apogix new post composer with multi-channel scheduling" width={591} height={665} priority />
      <svg className="flow-lines flow-lines--foreground" viewBox="0 0 760 560" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <marker id="flow-arrow-bottom" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 8 4 0 8Z" className="arrow-head" />
          </marker>
        </defs>
        <path className="dotted soft schedule-route" d="M138 568 C105 568 105 535 145 535 C175 535 190 518 190 492" />
        <circle className="route-end-dot" cx="190" cy="492" r="3.5" />
        <path className="dotted soft success-route" d="M138 568 H500 C550 568 560 594 650 594" markerEnd="url(#flow-arrow-bottom)" />
      </svg>
      <div className="flow-destinations">
        <Destination kind="ig" name="Instagram" state="Adapted" />
        <Destination kind="fb" name="Facebook" state="Adapted" />
        <Destination kind="li" name="LinkedIn" state="Scheduled" />
        <Destination kind="tt" name="TikTok" state="Scheduled" />
        <Destination kind="yt" name="YouTube" state="Scheduled" />
        <Destination kind="pt" name="Pinterest" state="Scheduled" />
        <Destination kind="x" name="X" state="Published" />
      </div>
      <div className="flow-calendar"><span>MON <b>17</b></span><span>TUE <b>18</b></span><span>WED <b>19</b></span><span className="active">THU <b>20</b></span><span>FRI <b>21</b></span></div>
      <div className="flow-success">✓</div>
    </div>
  );
}

type SocialKind = "ig" | "fb" | "li" | "tt" | "yt" | "pt" | "x";
function Destination({ kind, name, state }: { kind: SocialKind; name: string; state: string }) {
  return <div className="flow-destination"><SocialIcon kind={kind} /><span><b>{name}</b><small>{state} &nbsp; ✓</small></span></div>;
}
export function SocialIcon({ kind }: { kind: SocialKind }) {
  const labels: Record<SocialKind, string> = { ig: "Instagram", fb: "Facebook", li: "LinkedIn", tt: "TikTok", yt: "YouTube", pt: "Pinterest", x: "X" };
  return <span className={`social-icon social-icon--${kind}`} aria-label={labels[kind]}>
    {kind === "ig" && <svg viewBox="0 0 24 24"><defs><linearGradient id="instagram-brand" x1="2" y1="22" x2="22" y2="2"><stop stopColor="#ffdc80"/><stop offset=".35" stopColor="#f77737"/><stop offset=".65" stopColor="#e1306c"/><stop offset="1" stopColor="#833ab4"/></linearGradient></defs><rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="url(#instagram-brand)"/><circle cx="12" cy="12" r="4" stroke="url(#instagram-brand)"/><circle cx="17.5" cy="6.8" r="1" fill="#833ab4" stroke="none"/></svg>}
    {kind === "fb" && <svg viewBox="0 0 24 24"><path d="M14.2 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.8-.1-1.6-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2v2.3H8.3V13H11v8h3.2Z" className="fill"/></svg>}
    {kind === "li" && <svg viewBox="0 0 24 24"><rect x="4" y="9" width="3.3" height="11" className="fill"/><circle cx="5.65" cy="5.7" r="1.9" className="fill"/><path d="M10 9h3.1v1.5h.1c.5-.9 1.6-1.9 3.4-1.9 3.5 0 4.2 2.3 4.2 5.4v6h-3.3v-5.3c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V20H10V9Z" className="fill"/></svg>}
    {kind === "tt" && <svg viewBox="0 0 24 24"><path d="M14.5 4c.5 2.6 2 4.1 4.5 4.3v3a8.2 8.2 0 0 1-4.5-1.4v5.7a5.6 5.6 0 1 1-4.8-5.5v3.1a2.6 2.6 0 1 0 1.7 2.4V4h3.1Z" className="fill"/></svg>}
    {kind === "yt" && <svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="4" className="fill"/><path d="m10 9 6 3-6 3V9Z" fill="white" stroke="none"/></svg>}
    {kind === "pt" && <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" className="fill"/><path d="M9 21c.6-.9 1.2-2 1.5-3.2l.7-2.7c.6.9 1.6 1.4 2.8 1.4 3.7 0 6.1-3.2 6.1-7.1 0-3.6-3-6.3-7-6.3-4.9 0-7.5 3.5-7.5 6.5 0 1.6.6 3.5 2 4.1.2.1.4 0 .5-.2l.3-1.2c0-.2 0-.3-.1-.4-.5-.6-.9-1.5-.9-2.4 0-2.5 1.9-4.8 5-4.8 2.7 0 4.5 1.8 4.5 4.3 0 3-1.5 5.2-3.5 5.2-1.1 0-1.9-.9-1.6-2 .3-1.3 1-2.8 1-3.8 0-.9-.5-1.6-1.5-1.6-1.2 0-2.1 1.2-2.1 2.8 0 1 .3 1.7.3 1.7l-1.4 5.9c-.3 1.2-.2 2.6-.1 3.8Z" fill="white" stroke="none"/></svg>}
    {kind === "x" && <svg viewBox="0 0 24 24"><path d="M5 4h4.2l3.5 4.8L16.8 4H19l-5.3 6.3L20 20h-4.2l-4-5.5L7.2 20H5l5.8-7L5 4Zm3.1 1.7 8.6 12.6h1.2L9.3 5.7H8.1Z" className="fill"/></svg>}
  </span>;
}

/* ---------- scheduling: month grid ---------- */
type Cell = { d: number | null; chips?: { label: string; kind?: "alt" | "drag" }[] };

const MONTH: Cell[] = [
  { d: null },
  { d: null },
  { d: null },
  { d: null },
  { d: null },
  { d: 1 },
  { d: 2 },
  { d: 3 },
  { d: 4, chips: [{ label: "IG · 8:00" }] },
  { d: 5 },
  { d: 6, chips: [{ label: "3 ch · 9:30" }] },
  { d: 7 },
  { d: 8 },
  { d: 9 },
  { d: 10 },
  { d: 11, chips: [{ label: "LI · 12:00", kind: "alt" }] },
  { d: 12 },
  { d: 13, chips: [{ label: "2 ch · 18:30" }] },
  { d: 14 },
  { d: 15 },
  { d: 16 },
  { d: 17 },
  { d: 18 },
  { d: 19 },
  { d: 20, chips: [{ label: "3 ch · 9:30", kind: "drag" }] },
  { d: 21 },
  { d: 22 },
  { d: 23 },
  { d: 24 },
  { d: 25, chips: [{ label: "IG · 7:45" }] },
  { d: 26 },
  { d: 27 },
  { d: 28, chips: [{ label: "FB · 11:00", kind: "alt" }] },
];

export function MonthMock() {
  return (
    <BrowserFrame url="app.apogix.com/calendar">
      <div className="cal-head" style={{ marginBottom: "0.6rem" }}>
        <span>August 2026 · Asia/Kolkata</span>
        <span>Month ▾</span>
      </div>
      <div className="month">
        {DOW.map((d, i) => (
          <span
            key={`mh${i}`}
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: "0.58rem",
              color: "var(--muted)",
              textAlign: "center",
              paddingBottom: 2,
            }}
          >
            {d}
          </span>
        ))}
        {MONTH.map((c, i) => (
          <div className={`cell${c.d === null ? " dim" : ""}`} key={`mc${i}`}>
            <span>{c.d ?? ""}</span>
            {c.chips?.map((ch, j) => (
              <span className={`post-chip ${ch.kind ?? ""}`.trim()} key={j}>
                {ch.label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}

/* ---------- compose: master + overrides ---------- */
export function ComposeMock() {
  return (
    <BrowserFrame url="app.apogix.com/compose">
      <div className="mock-card" style={{ marginBottom: "0.7rem" }}>
        <span className="mock-label">Master caption · source</span>
        <div className="mock-caption">
          Monsoon menu is live 🌧️ Two new filter coffees and a cardamom bun — all
          week at our Indiranagar counter. #Bengaluru #FilterCoffee
        </div>
      </div>
      <div style={{ display: "grid", gap: "0.6rem" }}>
        <OverrideRow
          g="IG"
          text="Monsoon menu is live 🌧️☕ Swipe for the cardamom bun."
          meta="220 / 2200 · first comment set"
        />
        <OverrideRow
          g="LI"
          text="Our monsoon menu is now at the Indiranagar counter — two single-origin filter coffees and a cardamom bun, all week."
          meta="no hashtags · link preview on"
        />
        <OverrideRow
          g="FB"
          text="Monsoon menu is live 🌧️ Two new filter coffees and a cardamom bun, all week."
          meta="image 1200×1200 · validated"
        />
      </div>
    </BrowserFrame>
  );
}

function OverrideRow({ g, text, meta }: { g: string; text: string; meta: string }) {
  return (
    <div
      className="mock-card"
      style={{ gridTemplateColumns: "auto 1fr", display: "grid", gap: "0.7rem", alignItems: "start" }}
    >
      <span className="status-row-g g" style={rowGlyph}>
        {g}
      </span>
      <div style={{ display: "grid", gap: "0.35rem" }}>
        <p style={{ fontSize: "0.86rem", color: "var(--ink)", lineHeight: 1.45 }}>{text}</p>
        <span className="mock-label">{meta}</span>
      </div>
    </div>
  );
}

const rowGlyph: React.CSSProperties = {
  width: 26,
  height: 26,
  borderRadius: 7,
  border: "1px solid var(--line-strong)",
  display: "grid",
  placeItems: "center",
  fontFamily: "var(--f-mono)",
  fontSize: "0.62rem",
  color: "var(--ink)",
};

/* ---------- reliability: publish status ---------- */
export function StatusMock() {
  return (
    <BrowserFrame url="app.apogix.com/posts/monsoon-menu">
      <div className="mock-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span className="mock-label">Publish status</span>
          <span className="mock-label">Thu 20 Aug · 9:30 AM</span>
        </div>
        <div>
          <div className="status-row">
            <span className="g">IG</span>
            <div>
              <div className="who">Instagram</div>
              <div className="sub">instagram.com/p/Cx… · 09:30:04</div>
            </div>
            <span className="badge badge--ok">published</span>
          </div>
          <div className="status-row">
            <span className="g">FB</span>
            <div>
              <div className="who">Facebook Page</div>
              <div className="sub">facebook.com/…/posts/9921 · 09:30:02</div>
            </div>
            <span className="badge badge--ok">published</span>
          </div>
          <div className="status-row">
            <span className="g">LI</span>
            <div>
              <div className="who">LinkedIn</div>
              <div className="sub">rate limited — retrying in 40s (attempt 2 of 5)</div>
            </div>
            <span className="badge badge--retry">retrying</span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ---------- workspaces ---------- */
export function WorkspaceMock() {
  return (
    <BrowserFrame url="app.apogix.com/w/filter-and-co">
      <div className="mock-card">
        <span className="mock-label">Workspace</span>
        <div className="field">
          <span>Filter &amp; Co.</span>
          <span className="k">switch ▾</span>
        </div>
        <span className="mock-label">Members</span>
        <div>
          {[
            ["Priya", "Owner", "billing · publish · approve"],
            ["Arjun", "Editor", "create · edit · submit"],
            ["Meera", "Approver", "review · approve / reject"],
            ["Sam", "Viewer", "read-only"],
          ].map(([n, r, perm]) => (
            <div className="status-row" key={n}>
              <span className="g">{n[0]}</span>
              <div>
                <div className="who">
                  {n} — {r}
                </div>
                <div className="sub">{perm}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="cal-chip">2 more client workspaces · fully isolated</div>
      </div>
    </BrowserFrame>
  );
}
