import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Team",
    description:
        "Meet the collaborative team behind BanavatNest — students, faculty, and industry partners working together to drive innovation.",
    openGraph: {
        title: "Our Team | BanavatNest",
        description:
            "Collaborative ecosystem of students, scholars, and experts.",
    },
    alternates: { canonical: "/about/team" },
};

export default function TeamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
