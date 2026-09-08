"use client";
import { useEffect, useRef, useState } from "react";
import { DashboardIcon } from "@/components/dashboard-icon";
import Image from "next/image";
import { SocialIcon } from "@/components/mocks";
export type CalendarPost={title:string;channel:"ig"|"li"|"fb";image:string;status:string;time:string;scheduledAt?:string};
const key=(d:Date)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const monday=(date:Date)=>{const d=new Date(date);d.setDate(d.getDate()-((d.getDay()+6)%7));d.setHours(0,0,0,0);return d};
const times=Array.from({length:48},(_,i)=>`${String(Math.floor(i/2)).padStart(2,"0")}:${i%2?"30":"00"}`);
export function PublishingCalendar({posts,onOpen,onAdd}:{posts:CalendarPost[];onOpen:(title:string)=>void;onAdd:(date:string)=>void}){
 const [anchor,setAnchor]=useState<Date|null>(null),[today,setToday]=useState<Date|null>(null),[view,setView]=useState("Week");
 const scroller=useRef<HTMLDivElement>(null);
 useEffect(()=>{const d=new Date();setToday(d);setAnchor(d);if(window.matchMedia("(max-width:650px)").matches)setView("Agenda")},[]);
 useEffect(()=>{if(view==="Week"&&scroller.current)scroller.current.scrollTop=18*64},[view,!!anchor]);
 if(!anchor||!today)return <section className="db-panel">Loading calendar...</section>;
 const start=view!=="Month"?monday(anchor):monday(new Date(anchor.getFullYear(),anchor.getMonth(),1));
 const days=Array.from({length:view!=="Month"?7:42},(_,i)=>{const d=new Date(start);d.setDate(d.getDate()+i);return d});
 const events=posts.filter(p=>p.status!=="Draft").map((p,i)=>{const d=p.scheduledAt?new Date(p.scheduledAt):monday(today);if(!p.scheduledAt){i=Math.max(0,["A fresh perspective","Inside our creative process","Make room for your ideas"].indexOf(p.title));d.setDate(d.getDate()+[0,2,4][i%3]);d.setHours([9,13,16][i%3])}return {...p,date:d}}).filter(p=>!Number.isNaN(p.date.getTime()));
 function move(direction:number){const d=new Date(anchor!);if(view!=="Month")d.setDate(d.getDate()+direction*7);else {d.setDate(1);d.setMonth(d.getMonth()+direction)}setAnchor(d)}
 const range=view==="Month"?anchor.toLocaleDateString("en-US",{month:"long",year:"numeric"}):`${days[0].toLocaleDateString("en-US",{month:"short",day:"numeric"})} - ${days[6].toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`;
 function eventCard(event:typeof events[number],i:number){return <button className="pc-event" key={event.title+i} onClick={()=>onOpen(event.title)} aria-label={`${event.title}, ${event.date.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}, ${event.status}`}><Image src={event.image} alt="" width={180} height={110}/><small>{event.date.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</small><strong>{event.title}</strong><span><SocialIcon kind={event.channel}/><em>{event.status}</em></span></button>}
 return <section className="db-panel pc-panel pc-interactive"><div className="db-panel-head"><div><h2>Your publishing {view.toLowerCase()}</h2><p data-calendar-range>{range} · {Intl.DateTimeFormat().resolvedOptions().timeZone}</p></div><div className="pc-controls"><button onClick={()=>setAnchor(new Date())}>Today</button><button aria-label="Previous calendar period" onClick={()=>move(-1)}><DashboardIcon kind="Left"/></button><button aria-label="Next calendar period" onClick={()=>move(1)}><DashboardIcon kind="Right"/></button><select aria-label="Calendar view" value={view} onChange={e=>setView(e.target.value)}><option>Week</option><option>Month</option><option>Agenda</option></select></div></div><div className="pc-caption">Click a date or a time slot to add a post. All 24 hours are available in week view.</div><div ref={scroller} className={`pc-scroll ${view==="Week"?"pc-time-scroll":""}`}><div className={`pc-grid pc-${view.toLowerCase()}`}>
 {view==="Week"&&<div className="pc-times"><div/>{times.map(time=><span key={time}>{time}</span>)}</div>}
 {days.map(day=>{const dateKey=key(day);const dayEvents=events.filter(e=>key(e.date)===dateKey).sort((a,b)=>a.date.getTime()-b.date.getTime());return <div key={dateKey} className={`pc-day ${dateKey===key(today)?"pc-today":""} ${view==="Month"&&day.getMonth()!==anchor.getMonth()?"pc-muted":""}`}><button className="pc-date" aria-label={`Add post on ${dateKey}`} onClick={()=>onAdd(`${dateKey}T09:00`)}><span>{day.toLocaleDateString("en-US",{weekday:"short"})}</span><b>{day.getDate()}</b><DashboardIcon kind="Plus"/></button>
 {view==="Week"?<div className="pc-time-slots">{times.map((time,index)=><div className="pc-time-slot" key={time}><button className="pc-slot-add" aria-label={`Add post on ${dateKey} at ${time}`} onClick={()=>onAdd(`${dateKey}T${time}`)}><DashboardIcon kind="Plus"/><span>{time}</span></button><div className="pc-slot-posts">{dayEvents.filter(e=>Math.floor((e.date.getHours()*60+e.date.getMinutes())/30)===index).map(eventCard)}</div></div>)}</div>:<div className="pc-events">{dayEvents.map(eventCard)}<button className="pc-day-add" onClick={()=>onAdd(`${dateKey}T09:00`)} aria-label={`Add another post on ${dateKey}`}><DashboardIcon kind="Plus"/>{dayEvents.length?"Add post":"Plan a post"}</button></div>}</div>})}
 </div></div></section>;
}
