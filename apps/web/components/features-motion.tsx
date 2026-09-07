"use client";

import { useEffect } from "react";

export function FeaturesMotion() {
  useEffect(() => {
    const root = document.querySelector(".features-page");
    if (!root) return;
    const groups = [
      [".features-hero-copy > *", "rise"],
      [".features-hero-preview", "zoom"],
      [".features-nav a", "rise"],
      [".features-intro .container > *", "focus"],
      [".feature-detail-copy > .eyebrow, .feature-detail-copy > h2", "left"],
      [".feature-description, .feature-detail-copy > a", "rise"],
      [".feature-detail-copy li", "left"],
      [".feature-detail-visual", "zoom"],
      [".feature-detail-scheduling .feature-detail-visual, .feature-detail-approvals .feature-detail-visual", "left"],
      [".feature-outcome", "rise"],
      [".fc-post", "rise"],
      [".features-handoff .eyebrow, .features-handoff h2", "focus"],
      [".features-process > div", "rise"],
      [".features-faq-layout > div:first-child > *", "left"],
      [".features-faq .faq-item", "rise"],
      [".features-closing .container > div > *", "rise"],
      [".features-closing .container > img", "tilt"],
    ];
    const nodes = new Set<HTMLElement>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-fx-shown", "true");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: "0px 0px -25px 0px" });
    groups.forEach(([selector, effect]) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((node,index) => {
        node.dataset.fx = effect;
        node.style.setProperty("--fx-delay", `${(index % 3) * 85}ms`);
        observer.observe(node);
        nodes.add(node);
      });
    });
    const sections = root.querySelectorAll<HTMLElement>("section");
    const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.setAttribute("data-fx-active", String(entry.isIntersecting));
    }), { threshold: 0 });
    sections.forEach(section => activeObserver.observe(section));
    return () => {
      observer.disconnect(); activeObserver.disconnect();
      nodes.forEach(node => { delete node.dataset.fx; delete node.dataset.fxShown; node.style.removeProperty("--fx-delay"); });
      sections.forEach(section => delete section.dataset.fxActive);
    };
  }, []);
  return null;
}
