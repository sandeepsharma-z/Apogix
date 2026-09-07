import type { Metadata } from "next";
import { AuthScreen } from "@/components/auth-screen";
export const metadata: Metadata = { title: "Reset your password", robots: { index: false, follow: true } };
export default function ResetPage() { return <AuthScreen key="reset" mode="reset"/>; }
