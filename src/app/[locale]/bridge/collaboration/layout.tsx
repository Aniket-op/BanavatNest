import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Collaboration Model",
    description:
        "Learn about BanavatNest's collaboration model bridging academia, industry, and society through co-creation and innovation partnerships.",
    openGraph: {
        title: "Collaboration Model | BanavatNest",
        description:
            "A dynamic bridge between academia, industry, and society.",
    },
    alternates: { canonical: "/bridge/collaboration" },
};

export default function CollaborationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
