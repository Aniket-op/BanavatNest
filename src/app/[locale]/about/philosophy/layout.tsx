import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Philosophy & Values",
    description:
        "BanavatNest's philosophy centers on building with purpose, analytical thinking, nurturing curiosity, and translating research into scalable solutions.",
    openGraph: {
        title: "Philosophy & Values | BanavatNest",
        description:
            "Our unified philosophy where ideas are built with purpose and nurtured with care.",
    },
    alternates: { canonical: "/about/philosophy" },
};

export default function PhilosophyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
