"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Publish everywhere.",
  "Adapt every version.",
  "Schedule smarter.",
  "Stay in control.",
];

export function HeroTyping() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visibleText, setVisibleText] = useState(phrases[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const phrase = phrases[phraseIndex];
    const complete = visibleText === phrase;
    const empty = visibleText.length === 0;
    const delay = complete && !deleting ? 1500 : deleting ? 42 : 78;

    const timer = window.setTimeout(() => {
      if (complete && !deleting) {
        setDeleting(true);
        return;
      }
      if (empty && deleting) {
        setDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
        return;
      }
      setVisibleText(deleting ? phrase.slice(0, visibleText.length - 1) : phrase.slice(0, visibleText.length + 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, phraseIndex, visibleText]);

  return <span className="grad hero-typing" aria-label={phrases[phraseIndex]}><span>{visibleText}</span><i aria-hidden="true" /></span>;
}
