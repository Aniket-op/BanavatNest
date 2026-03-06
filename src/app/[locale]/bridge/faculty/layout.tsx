import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Faculty Engagement",
    description:
        "Faculty engagement at BanavatNest — mentors and domain experts guiding projects with academic rigor and cross-disciplinary collaboration.",
    openGraph: {
        title: "Faculty Engagement | BanavatNest",
        description:
            "Academic mentors and domain experts driving research excellence.",
    },
    alternates: { canonical: "/bridge/faculty" },
};

export default function FacultyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
