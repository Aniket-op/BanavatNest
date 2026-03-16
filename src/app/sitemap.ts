import type { MetadataRoute } from "next";

const locales = ["en", "hi", "pa", "bn"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://banavatnest.com";

    const pages = [
        { path: "", changeFrequency: "daily" as const, priority: 1.0 },
        // About
        { path: "/about/name", changeFrequency: "weekly" as const, priority: 0.8 },
        { path: "/about/philosophy", changeFrequency: "weekly" as const, priority: 0.8 },
        { path: "/about/mission", changeFrequency: "weekly" as const, priority: 0.8 },
        { path: "/about/team", changeFrequency: "monthly" as const, priority: 0.7 },
        { path: "/about/board", changeFrequency: "monthly" as const, priority: 0.7 },
        // What We Do - Focus Areas
        { path: "/what-we-do/focus", changeFrequency: "weekly" as const, priority: 0.9 },
        { path: "/what-we-do/focus/research-and-development", changeFrequency: "weekly" as const, priority: 0.8 },
        { path: "/what-we-do/focus/product-prototyping", changeFrequency: "weekly" as const, priority: 0.8 },
        { path: "/what-we-do/focus/industry-academia-collaboration", changeFrequency: "weekly" as const, priority: 0.8 },
        { path: "/what-we-do/focus/innovation-technology-transfer", changeFrequency: "weekly" as const, priority: 0.8 },
        // What We Do - Domains
        { path: "/what-we-do/domains", changeFrequency: "weekly" as const, priority: 0.9 },
        { path: "/what-we-do/domains/ai-ml-data-science", changeFrequency: "weekly" as const, priority: 0.8 },
        { path: "/what-we-do/domains/cybersecurity-iot-blockchain", changeFrequency: "weekly" as const, priority: 0.8 },
        { path: "/what-we-do/domains/smart-systems-healthcare-sustainability", changeFrequency: "weekly" as const, priority: 0.8 },
        { path: "/what-we-do/domains/agriculture-smart-farming", changeFrequency: "weekly" as const, priority: 0.8 },
        // Bridge
        { path: "/bridge/collaboration", changeFrequency: "weekly" as const, priority: 0.9 },
        { path: "/bridge/opportunities", changeFrequency: "weekly" as const, priority: 0.8 },
        { path: "/bridge/faculty", changeFrequency: "weekly" as const, priority: 0.8 },
        { path: "/bridge/partnerships", changeFrequency: "weekly" as const, priority: 0.8 },
        // Other
        { path: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
        { path: "/disclaimer", changeFrequency: "yearly" as const, priority: 0.3 },
        { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
        { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
    ];

    const entries: MetadataRoute.Sitemap = [];

    for (const page of pages) {
        for (const locale of locales) {
            const languages: Record<string, string> = {};
            for (const altLocale of locales) {
                languages[altLocale] = `${baseUrl}/${altLocale}${page.path}`;
            }

            entries.push({
                url: `${baseUrl}/${locale}${page.path}`,
                lastModified: new Date(),
                changeFrequency: page.changeFrequency,
                priority: page.priority,
                alternates: {
                    languages,
                },
            });
        }
    }

    return entries;
}
