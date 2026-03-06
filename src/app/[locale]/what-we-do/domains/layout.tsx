import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Research Domains",
    description:
        "BanavatNest's research domains include AI & ML, Cybersecurity & IoT, Smart Systems & Healthcare, and Precision Agriculture — driving systematic innovation.",
    openGraph: {
        title: "Research Domains | BanavatNest",
        description:
            "Technology verticals driving real-world impact through research and experimentation.",
    },
    alternates: { canonical: "/what-we-do/domains" },
};

export default function DomainsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
