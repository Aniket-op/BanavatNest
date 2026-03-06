import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Name",
    description:
        "Discover the meaning behind BanavatNest — where 'Banavat' represents making and creating, and 'Nest' symbolizes a nurturing space for innovation.",
    openGraph: {
        title: "Our Name | BanavatNest",
        description:
            "The meaning behind BanavatNest — creation and nurturing innovation.",
    },
    alternates: { canonical: "/about/name" },
};

export default function NameLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
