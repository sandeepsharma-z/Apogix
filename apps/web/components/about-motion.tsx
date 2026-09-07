"use client";

import { useEffect } from "react";

export function AboutMotion() {
  useEffect(() => {
    const root = document.querySelector(".about-page");
    if (!root) return;
    const groups = [
      [".about-hero-top > *, .about-hero-heading > *", "rise"],
      [".about-purpose-layout > div:first-child > *", "left"],
      [".about-purpose-copy > *", "rise"],
      [".about-belief-copy > *", "focus"],
      [".about-belief-art", "image"],

      [".about-story-visual", "image"],
      [".about-story-copy > *", "right"],
      [".about-values-intro > *, .about-people-heading > *", "rise"],
      [".about-value", "left"],
      [".about-audiences > div", "rise"],
      [".about-audiences > div > *", "focus"],
      [".about-closing-inner > div:first-child > *", "rise"],
      [".about-closing-art", "image"],
    ];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.setAttribute("data-motion-visible", "true"); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    const targets: HTMLElement[] = [];
    groups.forEach(([selector, motion]) => root.querySelectorAll<HTMLElement>(selector).forEach((element,index) => {
      element.dataset.motion = motion;
      element.style.setProperty("--motion-delay", `${index % 3 * 90}ms`);
      observer.observe(element);
      targets.push(element);
    }));
    return () => { observer.disconnect(); targets.forEach(element => { delete element.dataset.motion; delete element.dataset.motionVisible; }); };
  }, []);
  return null;
}
