import type { Metadata } from 'next';
import PortfolioPage, { PortfolioData } from '@/components/PortfolioPage';

// TODO: Replace placeholder content with real data
const SANGITA_DATA: PortfolioData = {
    id: 'dr-sangita-roy',
    name: 'Dr. Sangita Roy',
    role: 'Director | PhD (IIT Patna)',
    image: '/images/Director/Sangita.jpeg',

    bio: `Accomplished academic with expertise in Computer Science, specialized in Cybersecurity, BlockChain, and IoT. Experienced in industry-oriented and funded research.

Dr. Sangita Roy holds a PhD from the Indian Institute of Technology Patna and completed her Postdoctoral Fellowship at Tel Aviv University, Israel. She has previously served as a Senior Scientist at the Indian Institute of Technology Bombay. Her research focuses on building secure and decentralized systems for modern connected environments.

As a Director at BanavatNest, Dr. Roy brings her deep expertise in advanced computing domains to guide the company's research direction and foster a culture of technological innovation that translates into real-world, secure applications.`,

    job: {
        summary: 'Dr. Roy guides research within advanced computing domains like Cybersecurity and IoT at BanavatNest. Her role involves stewarding industry-relevant projects and promoting a strong ecosystem of technological innovation.',
        positions: [
            {
                title: 'Director',
                organization: 'BanavatNest Private Limited',
                period: 'Current',
                description: 'As a Director at BanavatNest, Dr. Roy guides the research focus within advanced computing domains like Cybersecurity and IoT. Her role involves stewarding industry-relevant projects and promoting technological innovation that translates to practical, secure applications.',
                highlights: [
                    'Piloting advanced research projects in Cybersecurity and IoT',
                    'Mentoring researchers and establishing project milestones',
                    'Fostering funded research efforts and technology innovation',
                    'Steering the development of Blockchain-enabled architectures',
                ],
            },
            {
                title: 'Senior Scientist',
                organization: 'Indian Institute of Technology (IIT) Bombay',
                period: 'Former',
                description: 'Led research initiatives and fostered technological innovation in applied computing at IIT Bombay.',
                highlights: [],
            },
            {
                title: 'Postdoctoral Researcher',
                organization: 'Tel Aviv University, Israel',
                period: '',
                description: 'Advanced research exploring modern cybersecurity threats, distributed networks, and secure computational frameworks.',
                highlights: [],
            },
        ],
    },

    research: {
        summary: 'Dr. Roy\'s research interests lie in Cybersecurity, Blockchain, and Internet of Things (IoT). She investigates network security, vulnerability detection, and anomaly identification within digital ecosystems, while developing tamper-resistant decentralized systems.',
        publications: [],
        coAuthors: [],
        reviewerJournals: [],
    },

    education: {
        summary: 'Dr. Sangita Roy holds a PhD in Computer Science from IIT Patna and completed a Postdoctoral Fellowship at Tel Aviv University, Israel.',
        degrees: [
            {
                degree: 'Postdoctoral Fellowship',
                institution: 'Tel Aviv University, Israel',
                year: '',
                details: 'Advanced research exploring modern cybersecurity threats, distributed networks, and secure computational frameworks.',
            },
            {
                degree: 'Ph.D. in Computer Science',
                institution: 'Indian Institute of Technology (IIT) Patna',
                year: '',
                details: 'Doctoral research focused on secure systems, cryptography, and network vulnerabilities.',
            },
        ],
        awards: [],
    },

    contact: {
        email: 'info@banavatnest.com',
        phone: ['+91 99340 44777', '+91 80023 96506'],
        profiles: [],
    },
};

export const metadata: Metadata = {
    title: 'Dr. Sangita Roy | Director Portfolio',
    description: 'Portfolio of Dr. Sangita Roy, Director at BanavatNest Private Limited.',
};

export default function SangitaPortfolio() {
    return <PortfolioPage data={SANGITA_DATA} />;
}
