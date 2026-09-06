"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string; open?: boolean };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const initialOpen = items.findIndex((item) => item.open);
  const [openIndex, setOpenIndex] = useState(initialOpen >= 0 ? initialOpen : 0);

  return <div className="faq">{items.map((item, index) => {
    const isOpen = openIndex === index;
    return <div className="faq-item" data-open={isOpen} key={item.q}>
      <h3><button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`} onClick={() => setOpenIndex(isOpen ? -1 : index)}><span>{item.q}</span><span className="pm" aria-hidden="true">+</span></button></h3>
      <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={!isOpen}><p className="a">{item.a}</p></div>
    </div>;
  })}</div>;
}
