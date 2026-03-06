import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "BanavatNest's Privacy Policy — how we handle user information, data protection, confidentiality, and responsible data practices.",
    robots: { index: true, follow: true },
    alternates: { canonical: "/privacy" },
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
