import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with BanavatNest. Reach out for research collaborations, innovation partnerships, and academic engagements.",
    openGraph: {
        title: "Contact Us | BanavatNest",
        description:
            "Get in touch with BanavatNest for research collaborations and innovation partnerships.",
    },
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
