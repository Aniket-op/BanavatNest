import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mission & Vision",
    description:
        "BanavatNest's mission is to create and nurture ideas through R&D, shaping curiosity-driven concepts into innovative, practical, and scalable solutions.",
    openGraph: {
        title: "Mission & Vision | BanavatNest",
        description:
            "Research-driven innovation nurturing ideas from curiosity to impact.",
    },
    alternates: { canonical: "/about/mission" },
};

export default function MissionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
