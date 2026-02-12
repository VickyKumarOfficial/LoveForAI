
import { Speaker, Session, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Speakers', href: '#speakers' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Live Events', href: '/Live Events' },
  { label: 'Committee', href: '/committee' },
  { label: 'Contact', href: '/contact' },
];

export const SPEAKERS: Speaker[] = [
  {
    id: '1',
    name: 'Srini Adiraju',
    role: 'CTO',
    company: 'Aruze Gaming Global',
    companyUrl: 'https://aruzeglobal.com/',
    image: '/assets/srini.webp',
    bio: 'Global gaming tech executive and patent-holding systems strategist.',
    linkedin: 'https://www.linkedin.com/in/sriniadiraju/'
  },
  {
    id: '2',
    name: 'Subhajit Saha',
    role: 'CEO',
    companyUrl: 'https://resolutegoc.com/',
    company: 'Resolute IP Services LLP',
    image: '/assets/subhajit.webp',
    bio: 'A veteran IP strategist and Patent Agent with 22+ years of global expertise.',
    linkedin: 'https://www.linkedin.com/in/subhajit-saha-a9961518/'
  },
  {
    id: '3',
    name: 'Surya Prakash',
    role: 'Lead scrum master',
    companyUrl: 'https://www.wellsfargo.com/',
    company: 'Wells Fargo',
    image: '/assets/suryaprakash.webp',
    bio: 'An well experienced in the Software Eng. and Automation field',
    linkedin: 'https://www.linkedin.com/in/suryaprakash-i-34305921?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
  },
  {
    id: '4',
    name: 'Mohammed Faiz Ahmed',
    role: 'Co-Founder',
    company: 'Dendrites',
    companyUrl: 'https://www.dendrites.ai/',
    image: '/assets/faiz.webp',
    bio: 'Building commerce-grade crypto payments with predictable fees, reversible transactions, & for Web3.',
    linkedin: ''
  }
];

export const PANEL_MEMBERS: Speaker[] = [
  {
    id: 'p1',
    name: 'Aditya Atluri',
    role: 'Co-Founder',
    company: 'Zensens AI',
    companyUrl: 'https://www.zensens.ai',
    image: '/assets/Aditya_Alturi.webp',
    bio: 'Mental wellness AI platform. Expertise: Strategy, Innovation, Entrepreneurship, Startup founder, Venture capital',
    linkedin: ''
  },
  {
    id: 'p2',
    name: 'Shahar Banu',
    role: 'Senior DevOps Specialist',
    company: 'Equisoft',
    companyUrl: 'https://www.equisoft.com/',
    image: '/assets/shahar.webp',
    bio: 'AWS Cloud Engineer and DevOps expert with 12+ years of experience & keynote speaker.',
    linkedin: 'https://www.linkedin.com/in/shaharbanu/'
  },
  {
    id: 'p3',
    name: 'Hemanth Reddy',
    role: 'Founder & CEO',
    company: 'Ament Capital',
    companyUrl: 'https://www.amentcapital.com/',
    image: '/assets/hemanthreddy.jpeg',
    bio: 'Founder of Ament Capital, a VC firm funding seed & series rounds. CTO at Data Solutions.',
    linkedin: 'https://www.linkedin.com/in/hemanth-reddy-guntaka/'
  },
  {
    id: 'p4',
    name: 'Ranjith Raj Vasam',
    role: 'Platform Eng',
    company: 'Nokia',
    companyUrl: 'https://www.nokia.com/',
    image: '/assets/ranjith.webp',
    bio: 'Platform Engineer - AI & Cloud Native Solutions, Ex - Fiserv & Ex - IBM',
    linkedin: 'https://www.linkedin.com/in/ranjithrajv/'
  }
];

export const SCHEDULE: Session[] = [
  {
    id: 's1',
    time: '09:00 AM',
    title: 'Opening Keynote: The Heart of the Machine',
    speaker: 'Dr. Elena Vance',
    description: 'Exploring how emotional intelligence will drive the next decade of AI innovation.',
    type: 'Keynote'
  },
  {
    id: 's2',
    time: '11:00 AM',
    title: 'Workshop: Building Real-time Multimodal Apps',
    speaker: 'Marcus Holloway',
    description: 'Hands-on session using the latest SDKs for audio and visual streaming.',
    type: 'Workshop'
  },
  {
    id: 's3',
    time: '01:30 PM',
    title: 'Panel: Love, Trust, and the Algorithmic Future',
    speaker: 'Sarah Connor & Guests',
    description: 'A deep dive into social implications of human-AI relationships.',
    type: 'Panel'
  },
  {
    id: 's4',
    time: '04:00 PM',
    title: 'Networking & AI Showcase',
    speaker: 'All Attendees',
    description: 'Live demos from top college research labs and partner startups.',
    type: 'Networking'
  }
];
