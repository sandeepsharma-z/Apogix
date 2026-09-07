import type { Metadata } from "next";
import { AuthScreen } from "@/components/auth-screen";
import { brand } from "../../../../packages/config/brand";
export const metadata: Metadata = { title: `Log in | ${brand.name}`, robots: { index: false, follow: true } };
export default function LoginPage() { return <AuthScreen key="login" mode="login"/>; }
