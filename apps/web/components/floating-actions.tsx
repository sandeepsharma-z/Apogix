"use client";

import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "919818639441";

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const update = () => setShowScrollTop(window.scrollY > 400);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div className="floating-actions">
    <a className="whatsapp-action" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Apogix, I would like to know more.")}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with Apogix on WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a12 12 0 0 0-10.3 18.2L4 28l7-1.8A12 12 0 1 0 16 3Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M11 9c-2 0-2 3-1 5 2 4 5 7 9 8 3 1 5-2 4-3l-4-2-2 2c-3-1-5-3-6-5l2-2-2-3Z" fill="currentColor"/></svg>
    </a>
    {showScrollTop && <button className="scroll-top-action" aria-label="Scroll to top" onClick={() => window.scrollTo({top:0, behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"})}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 13 6-6 6 6M12 7v13"/></svg>
    </button>}
  </div>;
}
