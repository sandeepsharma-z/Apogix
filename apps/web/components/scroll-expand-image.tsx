"use client";

import { useEffect, useRef, type ReactNode } from "react";

const chapters = [
  { label: "01 / THE IDEA", title: "It starts with a spark.", copy: "A thought worth sharing. A story only you can tell. Give it room to become something." },
  { label: "02 / THE EXPRESSION", title: "One idea. Your many voices.", copy: "Shape every version for its channel, without losing the thought that brought it to life." },
  { label: "03 / THE RHYTHM", title: "Find your publishing flow.", copy: "Bring your drafts, decisions and dates together. Make space for a more intentional rhythm." },
  { label: "04 / THE POSSIBILITY", title: "Make room for what’s next.", copy: "Less energy spent repeating the process. More attention for your next great idea." },
];

export function ScrollExpandImage({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let disposed = false;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const top = rect.top + scrollY;
      const progress = motion.matches ? 0 : Math.min(1, Math.max(0, scrollY / Math.max(1, top - 90)));
      const eased = progress * progress * (3 - 2 * progress);
      element.style.setProperty("--image-expand", `${Math.max(0, rect.left) * eased}px`);
      const travel = Math.max(1, element.offsetHeight - (innerHeight - 90));
      const story = Math.max(0, Math.min(.9999, (90 - rect.top) / travel));
      const active = Math.min(3, Math.floor(story * 4));
      const visible = progress >= .995 && !motion.matches;
      element.dataset.story = String(visible);
      element.style.setProperty("--story-progress", String(story));
      element.querySelectorAll<HTMLElement>(".about-scroll-chapter").forEach((chapter, index) => {
        chapter.dataset.active = String(active === index);
        chapter.setAttribute("aria-hidden", String(!motion.matches && (!visible || active !== index)));
      });
    };
    const schedule = () => { if (!disposed && !frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(element);
    document.fonts.ready.then(schedule);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    update();
    return () => { disposed = true; removeEventListener("scroll", schedule); removeEventListener("resize", schedule); motion.removeEventListener("change", schedule); observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  return <div className="about-image-expand" ref={root}>
    <div className="about-scroll-sticky"><div className="about-scroll-stage">
      {children}<div className="about-scroll-shade"/>
      <div className="about-scroll-copy">{chapters.map((chapter,index) => <div className="about-scroll-chapter" data-active={index===0} key={chapter.label}><span>{chapter.label}</span><h2>{chapter.title}</h2><p>{chapter.copy}</p></div>)}</div>
      <div className="about-scroll-progress" aria-hidden="true"><span>THE APOGIX WAY</span><i><b/></i><span>KEEP EXPLORING ↓</span></div>
    </div></div>
  </div>;
}
