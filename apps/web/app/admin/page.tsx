import type { Metadata } from "next";
import { Dashboard } from "@/components/dashboard";
export const metadata: Metadata={title:"Administration | Apogix",robots:{index:false,follow:false}};
export default function AdminDashboard(){return <Dashboard admin/>;}
