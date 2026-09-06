"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Check } from "./icons";
import { SocialIcon } from "./mocks";

const posts = [
  { day: "MON", date: 21, platform: "ig", time: "10:00 AM", status: "Draft", color: "#0871ff", photo: "0% 0%", topic: "skincare launch", progress: 0 },
  { day: "TUE", date: 22, platform: "fb", time: "11:30 AM", status: "In review", color: "#ffb000", photo: "50% 0%", topic: "office announcement", progress: 1 },
  { day: "WED", date: 23, platform: "tt", time: "02:00 PM", status: "Changes requested", color: "#ff3156", photo: "100% 0%", topic: "coffee story", progress: 1 },
  { day: "THU", date: 24, platform: "li", time: "10:30 AM", status: "Approved", color: "#15c89a", photo: "0% 100%", topic: "LinkedIn version", progress: 2 },
  { day: "FRI", date: 25, platform: "yt", time: "09:00 AM", status: "Scheduled", color: "#0871ff", photo: "50% 100%", topic: "travel video", progress: 3 },
  { day: "SAT", date: 26, platform: "x", time: "01:00 PM", status: "Published", color: "#15c89a", photo: "100% 100%", topic: "design story", progress: 3 },
] as const;

export function CalendarShowcase() {
  const [active, setActive] = useState(3);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync(); media.addEventListener("change", sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); media.removeEventListener("change", sync); };
  }, []);
  useEffect(() => {
    if (paused || hovered || focused || reduced || !visible) return;
    const timer = setInterval(() => setActive(index => (index + 1) % posts.length), 3200);
    return () => clearInterval(timer);
  }, [paused, hovered, focused, reduced, visible]);
  const selected = posts[active];
  return (
    <section ref={root} className="section calendar-showcase" id="scheduling" aria-labelledby="calendar-title">
      <div className="container calendar-showcase-inner">
        <header className="calendar-showcase-heading"><span className="eyebrow">Plan. Review. Publish.</span><h2 id="calendar-title">Your content calendar,<br />with every decision attached.</h2><p className="lede">Plan campaigns visually, collect feedback in context and<br className="problem-desktop-break" /> know exactly what is ready to publish.</p></header>
        <a className="calendar-open" href="#pricing">Open the calendar <ArrowRight width={22} height={22}/></a>
        <div className="calendar-scene" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
          <svg className="calendar-stream" viewBox="0 0 1400 650" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="calendar-flow" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#d9ecff" stopOpacity=".55"/><stop offset=".75" stopColor="#a7cdff" stopOpacity=".55"/><stop offset="1" stopColor="#397cff" stopOpacity=".7"/></linearGradient></defs><path className="calendar-ribbon-fill" d="M-80 476C270 371 700 222 1060 143C1135 127 1170 96 1210 58C1179 111 1154 156 1070 183C700 266 285 411-80 524Z"/><path className="calendar-stream-arrow" d="M1168 105C1189 82 1207 65 1235 60m-9-6 9 6-8 7"/></svg>
          <div className="calendar-days" role="group" aria-label="Select a calendar post">
            {posts.map((post,index) => <div className={`calendar-day ${active === index ? "is-active" : ""}`} key={post.date} style={{ "--day-index": index, "--status-color": post.color } as CSSProperties}>
              <div className="calendar-date"><span>{post.day}</span><b>{post.date}</b><i aria-hidden="true">{post.date}</i></div>
              <button type="button" className="calendar-post" aria-pressed={active === index} aria-label={`${post.day} ${post.date}, ${post.status}, ${post.topic}`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
                <span className="calendar-photo" style={{ backgroundPosition: post.photo }}><SocialIcon kind={post.platform}/><span className="calendar-time">{post.time}</span></span>
                <span className="calendar-status"><i/>{post.status}</span><span className="calendar-skeleton" aria-hidden="true"/>
              </button>
            </div>)}
            <div className="calendar-sunday"><div className="calendar-date"><span>SUN</span><b>27</b><i aria-hidden="true">27</i></div><p>Approved content<br />automatically goes live</p><svg className="calendar-note-arrow" viewBox="0 0 70 95" aria-hidden="true"><path d="M48 4C59 32 37 63 13 82m3-16-3 16 16-5"/></svg><div className="calendar-network">{(["ig", "fb", "li", "tt", "yt", "x"] as const).map(kind => <SocialIcon key={kind} kind={kind}/>)}</div></div>
          </div>
          <div className={`calendar-feedback ${active === 3 ? "is-linked" : ""}`} style={{ "--active-day": active } as CSSProperties}>
            <div className="calendar-comments" key={active}><p><b>SC</b><span>Can we shorten the opening?</span><small>10:14 AM</small></p><p><b>PR</b><span>Updated the {selected.topic}.</span><small>10:28 AM</small></p><p><b>AK</b><span>{selected.progress >= 2 ? "Approved — ready to schedule." : selected.status === "Changes requested" ? "Please update before approval." : "Ready for the next review."}</span><small>10:32 AM</small></p></div>
            <div className="calendar-progress">{["Draft", "Review", "Approved", "Scheduled"].map((label,index) => <span className={index <= selected.progress ? "is-complete" : ""} key={label}><i>{index <= selected.progress && <Check width={16} height={16}/>}</i>{label}</span>)}</div>
          </div>
          <aside className="calendar-context"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 5h22v18H14l-7 5v-5H5Z"/></svg><h3>Feedback stays beside<br />the content — not buried<br />in email threads.</h3></aside>
        </div>
        <footer className="calendar-benefits"><span><b aria-hidden="true">✥</b>Drag to reschedule</span><span><b aria-hidden="true">◎</b>Timezone-aware publishing</span><span><b aria-hidden="true">♧</b>Client-ready approvals</span></footer>
        {!reduced && <button type="button" className="calendar-animation-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? "Resume" : "Pause"} preview</button>}
      </div>
    </section>
  );
}
