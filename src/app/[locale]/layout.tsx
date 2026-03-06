import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari, Noto_Sans_Bengali } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-inter",
});

const notoDevanagari = Noto_Sans_Devanagari({
    subsets: ["devanagari"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-devanagari",
});

const notoBengali = Noto_Sans_Bengali({
    subsets: ["bengali"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-bengali",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://banavatnest.com"),
    title: {
        default: "BanavatNest",
        template: "%s | BanavatNest",
    },
    description:
        "BanavatNest transforms curiosity into practical, scalable, and impactful solutions through systematic investigation in AI, Cybersecurity, Smart Systems, and Agriculture.",
    keywords: [
        "Research",
        "Innovation",
        "AI",
        "Machine Learning",
        "Cybersecurity",
        "Agriculture",
        "Smart Systems",
        "BanavatNest",
        "R&D",
        "IoT",
        "Data Science",
        "Technology Transfer",
    ],
    authors: [{ name: "BanavatNest Private Limited" }],
    creator: "BanavatNest Private Limited",
    publisher: "BanavatNest Private Limited",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "BanavatNest | Research-Led Innovation Ecosystem",
        description:
            "BanavatNest transforms curiosity into practical, scalable, and impactful solutions through systematic investigation.",
        url: "https://banavatnest.com",
        siteName: "BanavatNest",
        images: [
            {
                url: "/logo.jpg",
                width: 1200,
                height: 630,
                alt: "BanavatNest — Research-Led Innovation Ecosystem",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "BanavatNest | Research-Led Innovation Ecosystem",
        description:
            "BanavatNest transforms curiosity into practical, scalable, and impactful solutions through systematic investigation.",
        images: ["/logo.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/logo.jpg",
        apple: "/logo.jpg",
    },
    alternates: {
        canonical: "https://banavatnest.com",
    },
};

// JSON-LD Structured Data
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BanavatNest Private Limited",
    alternateName: "BanavatNest",
    url: "https://banavatnest.com",
    logo: "https://banavatnest.com/logo.jpg",
    description:
        "BanavatNest transforms curiosity into practical, scalable, and impactful solutions through systematic investigation in AI, Cybersecurity, Smart Systems, and Agriculture.",
    contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-99340-44777",
        contactType: "General Inquiry",
        email: "info@banavatnest.com",
        availableLanguage: ["English", "Hindi", "Punjabi", "Bengali"],
    },
    sameAs: [
        "https://www.linkedin.com/company/banavatnest-pvt-ltd/",
        "https://www.facebook.com/profile.php?id=61587883936129",
    ],
    foundingDate: "2024",
    founders: [
        {
            "@type": "Person",
            name: "Dr. Sukhdev Singh",
            jobTitle: "Director",
        },
        {
            "@type": "Person",
            name: "Dr. Sangita Roy",
            jobTitle: "Director",
        },
    ],
    address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
    },
    areaServed: "IN",
    knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Cybersecurity",
        "Internet of Things",
        "Precision Agriculture",
        "Smart Systems",
        "Data Science",
        "Blockchain",
    ],
};

export default async function LocaleLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as typeof routing.locales[number])) {
        notFound();
    }

    // Load messages for the current locale
    const messages = await getMessages();

    // Select font based on locale
    const getFontClass = () => {
        switch (locale) {
            case 'hi':
                return `${inter.variable} ${notoDevanagari.variable} font-sans`;
            case 'pa':
                return `${inter.variable} ${notoDevanagari.variable} font-sans`;
            case 'bn':
                return `${inter.variable} ${notoBengali.variable} font-sans`;
            default:
                return `${inter.variable} font-sans`;
        }
    };

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {/* Inline script to prevent flash of wrong theme */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
                    }}
                />
            </head>
            <body
                className={`${getFontClass()} antialiased min-h-screen flex flex-col selection:bg-[#84CC16]/20 selection:text-[#5D3A1A] dark:selection:text-zinc-100 transition-colors bg-zinc-50 dark:bg-[#09090b]`}
            >
                <NextIntlClientProvider messages={messages}>
                    <Navbar />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
