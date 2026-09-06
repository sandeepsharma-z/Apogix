import type { Metadata } from "next";
import { ArrowRight, Check } from "@/components/icons";
import { FaqAccordion } from "@/components/faq-accordion";
import { FloatingActions } from "@/components/floating-actions";
import { PricingComparison } from "@/components/pricing-comparison";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title:"Pricing plans | Apogix", description:"Compare Apogix plans for connected social accounts, publishing destinations, approvals, storage and team collaboration." };

const plans = [
  { name:"Starter", price:"19", copy:"For a solo creator keeping a few channels active.", accounts:"3 social accounts", members:"1 member", limit:"30 destinations / month", storage:"2 GB media", cta:"Start free", featured:false },
  { name:"Professional", price:"49", copy:"For a small team that reviews content before it goes live.", accounts:"8 social accounts", members:"3 members", limit:"150 destinations / month", storage:"10 GB media", cta:"Start free", featured:true },
  { name:"Agency", price:"99", copy:"For teams coordinating a roster of separate clients.", accounts:"25 social accounts", members:"10 members", limit:"500 destinations / month", storage:"50 GB media", cta:"Contact us", featured:false },
] as const;

const faqs = [
  { q:"Can I upgrade or downgrade my plan?", a:"Yes. You can change plans for the next billing period. If a downgrade would exceed the new plan's account or storage limits, you will need to reduce usage before it takes effect." },
  { q:"Can I cancel at any time?", a:"Yes. Cancellation stops the next renewal, while access continues until the end of the paid monthly billing period." },
  { q:"Do you offer refunds?", a:"Monthly fees are generally non-refundable once a billing period begins. If a duplicate or incorrect charge occurs, contact support so the payment can be reviewed." },
  { q:"What happens if a payment fails?", a:"We will notify the workspace owner and allow time to update the payment method. Publishing access may be paused if payment remains unresolved." },
  { q:"Do unused publishing limits roll over?", a:"No. Publishing destination limits reset each month and unused capacity does not carry into the next billing period." },
  { q:"Are taxes included in the displayed price?", a:"Displayed prices exclude applicable taxes. Any required tax is calculated from the billing location and shown before payment is confirmed." },
];

export default function PricingPage(){ return <>
  <SiteHeader/>
  <main id="top" className="pricing-page">
    <section className="pricing-hero"><div className="pricing-hero-grid"/><div className="container pricing-hero-inner">
      <span className="eyebrow">Clear monthly pricing</span>
      <h1>Simple plans for your<br/><span>publishing needs.</span></h1>
      <p>Choose the account capacity, collaboration tools and monthly publishing allowance that fit the way you work.</p>
      <div className="billing-choice" aria-label="Billing period"><span>Monthly billing</span><small>Cancel anytime</small></div>
    </div></section>

    <section className="section pricing-plans" id="plans"><div className="container">
      <div className="pricing-title"><span className="eyebrow">Choose your plan</span><h2>Start focused. Grow when you need to.</h2></div>
      <div className="pricing-columns">{plans.map((plan,index)=><Reveal className={`pricing-column ${plan.featured?"featured":""}`} key={plan.name}>
        <div className="pricing-column-top"><span className="pricing-plan-index">0{index+1}</span>{plan.featured&&<span className="pricing-popular">Most chosen</span>}<h3>{plan.name}</h3><p>{plan.copy}</p></div>
        <div className="pricing-price"><strong><small>$</small>{plan.price}</strong><span>USD<br/>per month</span></div>
        <ul><li><Check width={17} height={17}/>{plan.accounts}</li><li><Check width={17} height={17}/>{plan.members}</li><li><Check width={17} height={17}/>{plan.limit}</li><li><Check width={17} height={17}/>{plan.storage}</li></ul>
        <a className={`btn ${plan.featured?"btn--primary":"btn--outline"}`} href={plan.name==="Agency"?"https://wa.me/919818639441?text=Hi%20Apogix%2C%20I%20want%20to%20discuss%20the%20Agency%20plan.":"https://wa.me/919818639441?text=Hi%20Apogix%2C%20I%20want%20to%20start%20a%20plan."} target="_blank" rel="noopener noreferrer">{plan.cta}<ArrowRight width={17} height={17}/></a>
      </Reveal>)}</div>
    </div></section>

    <section className="section pricing-comparison"><div className="container"><div className="section-head"><span className="eyebrow">Compare all features</span><h2>See what every plan includes.</h2><p className="lede">Compare capacity, collaboration and support in one clear view.</p></div><PricingComparison/></div></section>

    <section className="section pricing-limits"><div className="container pricing-limits-layout"><div><span className="eyebrow">Understand your limits</span><h2>Know exactly what counts.</h2><p className="lede">Simple rules make account capacity and monthly usage easy to predict.</p></div><div className="limit-examples">
      <Reveal className="limit-example limit-example-main"><span>Publishing destinations</span><strong>1 post × 3 social accounts = <b>3 destinations</b></strong><p>Each account that receives a post counts once, even when those versions share the same master content.</p></Reveal>
      <Reveal className="limit-example"><span>Connected accounts</span><strong>Each authorized destination counts.</strong><p>Accounts remain counted until they are disconnected from the workspace.</p></Reveal>
      <Reveal className="limit-example"><span>Monthly reset</span><strong>Usage resets every billing month.</strong><p>Unused publishing capacity does not roll over. Storage remains occupied until media is removed.</p></Reveal>
      <Reveal className="limit-example"><span>Failures and retries</span><strong>Failed attempts do not count twice.</strong><p>A retry for the same destination counts only when that destination publishes successfully. A newly created publish attempt counts separately.</p></Reveal>
    </div></div></section>

    <section className="section pricing-faq"><div className="container pricing-faq-layout"><div className="pricing-faq-copy"><span className="eyebrow">Billing FAQs</span><h2>Clear answers before checkout.</h2><p>Understand plan changes, billing outcomes and monthly limits.</p></div><FaqAccordion items={faqs}/></div></section>
    <section className="pricing-final"><div className="container"><div className="pricing-final-inner"><div><span className="eyebrow">Ready when you are</span><h2>Find your plan.<br/>Start publishing.</h2></div><a className="btn btn--white btn--lg" href="#plans">Choose your plan<ArrowRight width={18} height={18}/></a></div></div></section>
  </main>
  <SiteFooter/><FloatingActions/>
</> }
