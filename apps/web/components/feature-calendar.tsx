import Image from "next/image";
import { SocialIcon } from "@/components/mocks";

const days = [
  { day: "MON", date: "17", title: "A fresh perspective", time: "09:30 AM", platform: "ig", status: "Published", image: "/apogix-workflow-coast.webp" },
  { day: "TUE", date: "18", title: "Inside the process", time: "11:00 AM", platform: "li", status: "In review", image: "/apogix-about-studio.webp" },
  { day: "WED", date: "19", title: "Ideas worth sharing", time: "10:00 AM", platform: "fb", status: "Scheduled", image: "/apogix-about-flow.webp" },
] as const;

export function FeatureCalendar() {
  return <div className="fc-preview" aria-label="Illustrative content calendar, August 17 to 19, 2026">
    <div className="fc-toolbar"><div><span className="fc-kicker">YOUR WORKSPACE</span><h3>Content calendar</h3></div><span className="fc-view">Week view</span></div>
    <div className="fc-datebar"><strong>August 2026</strong><span>17 – 19 Aug <small>· Preview</small></span></div>
    <div className="fc-board">{days.map((day,index)=><div className={`fc-column fc-column-${index}`} key={day.date}>
      <div className="fc-day"><span>{day.day}</span><b>{day.date}</b></div>
      <article className="fc-post"><Image src={day.image} alt="" width={300} height={220} sizes="(max-width: 760px) 28vw, 15vw"/><div className="fc-post-copy"><span className="fc-post-time"><SocialIcon kind={day.platform}/>{day.time}</span><h4>{day.title}</h4><span className={`fc-status fc-status-${index}`}><i/>{day.status}</span></div></article>
      <div className="fc-slot" aria-hidden="true"><span>+</span> Room for your next idea</div>
    </div>)}</div>
    <div className="fc-summary"><span><i/> Your week, taking shape.</span><span>3 posts · 3 channels</span></div>
  </div>;
}
