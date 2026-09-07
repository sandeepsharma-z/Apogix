"use client";
import { useEffect } from "react";
export function ContactMotion() {
  useEffect(() => {
    const root = document.querySelector(".contact-page");
    if (!root) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting){entry.target.setAttribute("data-contact-visible","true");observer.unobserve(entry.target);}
    }),{threshold:.08});
    const nodes = root.querySelectorAll<HTMLElement>(".contact-hero-copy > *, .contact-hero-art, .contact-aside > *, .contact-form, .contact-section-heading > *, .contact-topic, .contact-faq-layout > div:first-child > *, .contact-faq .faq-item, .contact-closing .container > *");
    nodes.forEach((node,index)=>{node.dataset.contactMotion="true";node.style.setProperty("--contact-delay",`${index%3*75}ms`);observer.observe(node)});
    return ()=>{observer.disconnect();nodes.forEach(node=>{delete node.dataset.contactMotion;delete node.dataset.contactVisible})};
  },[]);
  return null;
}
