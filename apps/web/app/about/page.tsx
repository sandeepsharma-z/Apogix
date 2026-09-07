import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingActions } from "@/components/floating-actions";
import { ScrollExpandImage } from "@/components/scroll-expand-image";
import { AboutMotion } from "@/components/about-motion";
import { brand } from "../../../../packages/config/brand";

export const metadata: Metadata = {
  title: `About us | ${brand.name}`,
  description: `The purpose behind ${brand.name}: a more thoughtful way for creators, teams and agencies to compose, adapt and schedule social content.`,
};

const principles = [
  { title: "Keep the creator in control.", copy: "Automation should carry the repetitive work. Your voice, your creative choices and the final say belong to you." },
  { title: "Make the next step clear.", copy: "A useful workspace should help you see what needs attention, what comes next and where your content is headed." },
  { title: "Respect every channel.", copy: "A good idea can travel, but context matters. Each version deserves a caption, format and timing that fit its destination." },
  { title: "Build trust into the workflow.", copy: "Official connections, understandable permissions and visible publishing outcomes guide the way we build." },
];

export default function AboutPage() {
  return <><SiteHeader/><main id="top" className="about-page"><AboutMotion/>
    <section className="about-hero"><div className="container">
      <div className="about-hero-top"><span className="eyebrow">About {brand.name}</span><span className="about-edition">Made for the way you create.</span></div>
      <div className="about-hero-heading"><h1>Good ideas deserve<br/><span>room to flow.</span></h1><div><p>We’re building a calmer way to create, adapt and publish social content. So more of your energy goes into the work you love.</p><a href="#our-purpose" className="about-text-link">The purpose behind {brand.name}<ArrowRight width={19} height={19}/></a></div></div>
      <figure className="about-hero-art"><ScrollExpandImage><Image src="/apogix-about-flow.webp" alt="A flowing cobalt ribbon passing through sunlit ivory arches, representing an idea moving between channels" width={1536} height={1024} priority sizes="100vw"/></ScrollExpandImage><figcaption><span>One idea. Many possibilities.</span><span>CREATE → ADAPT → PUBLISH</span></figcaption></figure>
    </div></section>

    <section className="section about-purpose" id="our-purpose"><div className="container about-purpose-layout"><div><span className="eyebrow">01 / Our purpose</span><h2>More space for ideas.<br/><span>Less time in between.</span></h2></div><div className="about-purpose-copy"><p className="about-large-copy">Creating something worth sharing takes thought. Getting it out into the world shouldn’t take all your energy.</p><p>Captions in one document. Feedback in a chat. A calendar somewhere else. When the process is scattered, even a simple post can become a project.</p><p>{brand.name} brings that journey into focus: one place to shape an idea, adapt it for each channel and plan what happens next. That’s the kind of creative flow we’re working toward.</p></div></div></section>

    <section className="about-manifesto"><div className="container about-belief-layout">
      <div className="about-belief-copy"><span className="eyebrow">The belief behind the product</span><h2>Your next great idea<br/>needs <span>your attention.</span></h2><p>Let&apos;s give it more of that. A clear path from the first spark to the final post, with room to focus on what matters.</p><div className="about-manifesto-base"><span className="about-mini-line"/><span>Less repetition. More intention.</span></div></div>
      <div className="about-belief-art"><Image src="/apogix-about-idea.webp" alt="A luminous idea bulb surrounded by a pencil, floating paper and a silver creative orbit" width={1280} height={1280} sizes="(max-width: 760px) 85vw, 40vw"/></div>
    </div></section>

    <section className="section about-story"><div className="container about-story-layout"><div className="about-story-visual"><Image src="/apogix-about-studio.webp" alt="A sunlit creative desk with an open notebook, photography prints and a blue lamp" width={1122} height={1402} sizes="(max-width: 760px) 90vw, 45vw"/><span className="about-image-caption">A little space. A fresh perspective.</span></div><div className="about-story-copy"><span className="eyebrow">02 / The way we see it</span><h2>Thoughtful work.<br/>A simpler way<br/><span>to share it.</span></h2><p>Social publishing is more than filling a calendar. It’s finding your voice, showing up with intention and making every version feel right.</p><p>Our product direction is simple: keep the original idea connected to its channel versions, bring planning into view and make collaboration easier to follow.</p><div className="about-story-note"><span>Our north star</span><p>Create once. Adapt intentionally.<br/>Publish everywhere you choose.</p></div><a className="about-text-link" href="/integrations">Explore the channels<ArrowRight width={18} height={18}/></a></div></div></section>

    <section className="section about-values"><div className="container about-values-layout"><div className="about-values-intro"><span className="eyebrow">03 / What guides us</span><h2>Small principles.<br/>Meaningful<br/><span>differences.</span></h2><p>The choices we return to as we shape the product.</p></div><div className="about-values-list">{principles.map((item,index)=><div className="about-value" key={item.title}><span>0{index+1}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></div>)}</div></div></section>

    <section className="section about-people"><div className="container"><div className="about-people-heading"><span className="eyebrow">04 / Who we’re building for</span><h2>Different days.<br/>The same need for flow.</h2><p>From your own channels to a whole roster of clients, the work deserves a little more breathing room.</p></div><div className="about-audiences"><div><span className="about-audience-label">The independent voice</span><h3>For creators.</h3><p>A place to collect your ideas and plan a consistent presence, without letting the process take over your day.</p><span className="about-audience-word" aria-hidden="true">Imagine.</span></div><div><span className="about-audience-label">The shared ambition</span><h3>For teams.</h3><p>A clearer path from first draft to feedback, with everyone working toward the same publishing plan.</p><span className="about-audience-word" aria-hidden="true">Together.</span></div><div><span className="about-audience-label">The bigger picture</span><h3>For agencies.</h3><p>A considered approach to separate client workspaces, channel versions and the details that make each brand its own.</p><span className="about-audience-word" aria-hidden="true">Grow.</span></div></div></div></section>

    <section className="about-closing"><div className="container about-closing-inner"><div><span className="eyebrow">Let’s make room for what’s next</span><h2>Your ideas.<br/>Our next conversation.</h2><p>Tell us what you’re creating, what slows you down and what a better workflow would look like.</p><a href="/contact" className="btn btn--white btn--lg">Say hello<ArrowRight width={18} height={18}/></a></div><div className="about-closing-art"><Image src="/apogix-about-conversation.webp" alt="Sculptural ivory and silver conversation bubbles with a flowing chrome orbit" width={1280} height={1280} sizes="(max-width: 760px) 80vw, 40vw"/></div></div></section>
  </main><SiteFooter/><FloatingActions/></>;
}
