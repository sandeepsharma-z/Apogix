const columns = [
  { h: "Product", links: [["Composer", "#compose"], ["Calendar", "#scheduling"], ["Analytics", "#reliability"]] },
  { h: "Solutions", links: [["Workspaces", "#audiences"], ["Integrations", "#platforms"], ["Pricing", "#pricing"]] },
  { h: "Resources", links: [["How it works", "#how-it-works"], ["FAQs", "#faq"], ["Security & access", "#faq"]] },
];

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container">
      <div className="foot-grid">
        <div className="footer-intro">
          <span className="brand"><video className="footer-logo-video" src="/apogix-logo-video.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Apogix" /></span>
          <p>Write once, adapt per channel, schedule to a date. Apogix publishes everywhere you chose.</p>
          <a className="footer-appointment" href="https://wa.me/919818639441?text=Hi%20Apogix%2C%20I%20would%20like%20to%20book%20an%20appointment." target="_blank" rel="noopener noreferrer">
            <span>Book Appointment</span>
            <span className="footer-appointment-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
          </a>
        </div>
        {columns.map((column) => <div key={column.h}>
          <h4>{column.h}</h4>
          <ul>{column.links.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul>
        </div>)}
      </div>
      <div className="foot-base"><span>© 2026 Apogix</span><span>Built for teams worldwide · Secure online billing</span></div>
    </div>
  </footer>;
}
