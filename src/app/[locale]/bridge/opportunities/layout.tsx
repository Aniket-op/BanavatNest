import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Student Opportunities",
    description:
        "Explore student opportunities at BanavatNest — project-based learning, early industry exposure, mentorship, and hands-on innovation experience.",
    openGraph: {
        title: "Student Opportunities | BanavatNest",
        description:
            "Project-based learning and early exposure to real-world challenges.",
    },
    alternates: { canonical: "/bridge/opportunities" },
};

export default function OpportunitiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
