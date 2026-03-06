import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Use",
    description:
        "BanavatNest's Terms of Use — platform purpose, IP ownership, user responsibilities, academic use, and ethical guidelines.",
    robots: { index: true, follow: true },
    alternates: { canonical: "/terms" },
};

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
