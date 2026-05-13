import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Industry & Startups",
    description:
        "Partner with BanavatNest for innovation-driven R&D collaborations, prototyping, technical feasibility studies, and technology transfer.",
    openGraph: {
        title: "Industry & Startups | BanavatNest",
        description:
            "Innovation-driven solutions and technology transfer partnerships.",
    },
    alternates: { canonical: "/bridge/partnerships" },
};

export default function PartnershipsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
