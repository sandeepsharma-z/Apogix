import type { Metadata } from "next";
import { Dashboard } from "@/components/dashboard";
export const metadata: Metadata={title:"Your workspace | Apogix",robots:{index:false,follow:false}};
export default function UserDashboard(){return <Dashboard/>;}
