import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Disclaimer",
    description:
        "Disclaimer for BanavatNest website. All information is for informational purposes only.",
    robots: { index: true, follow: true },
    alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
