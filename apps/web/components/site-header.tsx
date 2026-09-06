"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "@/components/icons";
const menus = [
 {title:"Product", links:[["Master composer","#compose"],["Content calendar","#scheduling"],["Reliability + Analytics","#reliability"]]},
 {title:"Solutions", links:[["Creators & teams","#audiences"],["Client approvals","#scheduling"],["Multi-channel publishing","#platforms"]]},
 {title:"Resources", links:[["How it works","#how-it-works"],["Questions & answers","#faq"],["Plans & pricing","#pricing"]]}
];
export function SiteHeader() {
 const [scrolled,setScrolled]=useState(false); const [open,setOpen]=useState<string|null>(null); const [mobile,setMobile]=useState(false); const root=useRef<HTMLElement>(null);
 useEffect(()=>{const scroll=()=>setScrolled(scrollY>8);scroll();window.addEventListener("scroll",scroll,{passive:true});const outside=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node)){setOpen(null);setMobile(false)}};document.addEventListener("pointerdown",outside);return()=>{window.removeEventListener("scroll",scroll);document.removeEventListener("pointerdown",outside)}},[]);
 return <header ref={root} className="site-header" data-scrolled={scrolled} onKeyDown={e=>{if(e.key==="Escape"){setOpen(null);setMobile(false);root.current?.querySelector<HTMLButtonElement>(`[data-menu="${open}"]`)?.focus()}}}>
 <div className="container nav"><a className="brand" href="#top" aria-label="Apogix home"><Image className="brand-logo" src="/apogix-logo.png" alt="Apogix" width={139} height={40} priority/></a>
 <button className="mobile-nav-toggle" aria-label={mobile?"Close navigation":"Open navigation"} aria-expanded={mobile} aria-controls="main-navigation" onClick={()=>setMobile(!mobile)}>{mobile?"✕":"☰"}</button>
 <nav id="main-navigation" aria-label="Main navigation" className={`nav-links ${mobile?"is-mobile-open":""}`}>
 {menus.slice(0,2).map(menu=><div className="nav-dropdown" key={menu.title}><button data-menu={menu.title} aria-expanded={open===menu.title} aria-controls={`nav-${menu.title}`} onClick={()=>setOpen(open===menu.title?null:menu.title)}>{menu.title}<svg className="nav-chevron" viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5"/></svg></button><div id={`nav-${menu.title}`} className="nav-dropdown-panel" hidden={open!==menu.title}>{menu.links.map(([text,href])=><a key={href} href={href} onClick={()=>{setOpen(null);setMobile(false)}}>{text}</a>)}</div></div>)}
 <a href="#platforms" onClick={()=>{setOpen(null);setMobile(false)}}>Integrations</a><a href="#pricing" onClick={()=>{setOpen(null);setMobile(false)}}>Pricing</a>
 {menus.slice(2).map(menu=><div className="nav-dropdown" key={menu.title}><button data-menu={menu.title} aria-expanded={open===menu.title} aria-controls={`nav-${menu.title}`} onClick={()=>setOpen(open===menu.title?null:menu.title)}>{menu.title}<svg className="nav-chevron" viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5"/></svg></button><div id={`nav-${menu.title}`} className="nav-dropdown-panel" hidden={open!==menu.title}>{menu.links.map(([text,href])=><a key={href} href={href} onClick={()=>{setOpen(null);setMobile(false)}}>{text}</a>)}</div></div>)}
 </nav><div className="nav-actions"><a className="btn btn--primary" href="#pricing">Start creating <ArrowRight width={16} height={16} /></a></div></div></header>
}
