import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: [
                    "/",
                    "/en/about/board/dr-sangita-roy",
                    "/hi/about/board/dr-sangita-roy",
                    "/pa/about/board/dr-sangita-roy",
                    "/bn/about/board/dr-sangita-roy",
                    "/en/about/board/dr-sukhdev-singh",
                    "/hi/about/board/dr-sukhdev-singh",
                    "/pa/about/board/dr-sukhdev-singh",
                    "/bn/about/board/dr-sukhdev-singh",
                ],
                disallow: ["/api/", "/_next/"],
            },
        ],
        sitemap: "https://banavatnest.com/sitemap.xml",
    };
}
