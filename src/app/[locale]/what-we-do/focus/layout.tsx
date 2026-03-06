import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Focus Areas",
    description:
        "Explore BanavatNest's key focus areas — AI & Machine Learning, Cybersecurity & IoT, Smart Systems & Healthcare, and Precision Agriculture.",
    openGraph: {
        title: "Focus Areas | BanavatNest",
        description:
            "Research focus spanning AI, Cybersecurity, Smart Systems, and Agriculture.",
    },
    alternates: { canonical: "/what-we-do/focus" },
};

export default function FocusLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
