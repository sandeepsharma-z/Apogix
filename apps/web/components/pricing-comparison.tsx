"use client";

import { useState } from "react";
import { Check } from "@/components/icons";

const plans = ["Starter", "Professional", "Agency"] as const;
const features = [
  ["Connected accounts", "3", "8", "25"],
  ["Publishing destinations / month", "30", "150", "500"],
  ["Team members", "1", "3", "10"],
  ["Media storage", "2 GB", "10 GB", "50 GB"],
  ["Scheduling", true, true, true],
  ["Platform customization", true, true, true],
  ["Approval workflow", false, true, true],
  ["Client workspaces", false, false, true],
  ["Basic analytics", true, true, true],
  ["Support", "Email", "Priority email", "Priority support"],
] as const;

export function PricingComparison() {
  const [selected, setSelected] = useState(1);
  return <div className="pricing-compare-wrap">
    <div className="pricing-mobile-tabs" aria-label="Select a plan to compare">
      {plans.map((plan,index)=><button type="button" className={selected===index?"active":""} onClick={()=>setSelected(index)} key={plan}>{plan}</button>)}
    </div>
    <table className="pricing-compare-table">
      <thead><tr><th>Feature</th>{plans.map((plan,index)=><th className={`plan-col-${index} ${index===1?"featured":""}`} key={plan}>{plan}</th>)}</tr></thead>
      <tbody>{features.map(row=><tr key={row[0] as string}><th>{row[0]}</th>{row.slice(1).map((value,index)=><td className={`plan-col-${index} ${index===1?"featured":""}`} key={index}>{typeof value==="boolean" ? value?<><Check width={18} height={18}/><span className="sr-only">Included</span></>:<span className="pricing-dash">—</span> : value}</td>)}</tr>)}</tbody>
    </table>
    <style jsx>{`@media(max-width:700px){.pricing-compare-table :global(.plan-col-0),.pricing-compare-table :global(.plan-col-1),.pricing-compare-table :global(.plan-col-2){display:none}.pricing-compare-table :global(.plan-col-${selected}){display:table-cell}}`}</style>
  </div>;
}
