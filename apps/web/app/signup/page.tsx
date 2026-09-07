import type { Metadata } from "next";
import { AuthScreen } from "@/components/auth-screen";
import { brand } from "../../../../packages/config/brand";
export const metadata: Metadata = { title: `Sign up | ${brand.name}`, robots: { index: false, follow: true } };
export default function SignupPage() { return <AuthScreen key="signup" mode="signup"/>; }
