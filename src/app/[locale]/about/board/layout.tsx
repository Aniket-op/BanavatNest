import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Board of Directors",
    description:
        "Meet BanavatNest's Board of Directors — Dr. Sukhdev Singh and Dr. Sangita Roy, providing strategic leadership for research-driven innovation.",
    openGraph: {
        title: "Board of Directors | BanavatNest",
        description:
            "Strategic leadership ensuring alignment between academic excellence and industry needs.",
    },
    alternates: { canonical: "/about/board" },
};

export default function BoardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
