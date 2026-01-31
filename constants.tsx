
import { Speaker, Session, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Speakers', href: '#speakers' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Venue', href: '#venue' },
  { label: 'About', href: '#about' },
  { label: 'Community', href: '#community' },
];

export const SPEAKERS: Speaker[] = [
  {
    id: '1',
    name: 'Shahar Banu',
    role: 'Senior DevOps Specialist',
    company: 'Equisoft',
    companyUrl: 'https://www.equisoft.com/',
    image: '/public/assets/shahar.png',
    bio: 'AWS Cloud Engineer and DevOps expert with 12+ years of experience & keynote speaker.',
    linkedin: 'https://www.linkedin.com/in/shaharbanu/'
  },
  {
    id: '2',
    name: 'Srini Adiraju',
    role: 'CTO',
    company: 'Aruze Gaming Global',
    companyUrl: 'https://aruzeglobal.com/',
    image: '/public/assets/srini.jpeg',
    bio: 'Global gaming tech executive and patent-holding systems strategist.',
    linkedin: 'https://www.linkedin.com/in/sriniadiraju/'
  },
  {
    id: '3',
    name: 'Subhajit Saha',
    role: 'CEO',
    companyUrl: 'https://resolutegoc.com/',
    company: 'Resolute IP Services LLP',
    image: '/public/assets/subhajit.jpeg',
    bio: 'A veteran IP strategist and Patent Agent with 22+ years of global expertise.',
    linkedin: 'https://www.linkedin.com/in/subhajit-saha-a9961518/'
  },
  {
    id: '4',
    name: 'Surya Prakash',
    role: 'Lead scrum master',
    companyUrl: 'https://www.wellsfargo.com/',
    company: 'Wells Fargo',
    image: '/public/assets/suryaprakash.JPG',
    bio: 'An well experienced in the Software Eng. and Automation field',
    linkedin: 'https://www.linkedin.com/in/suryaprakash-i-34305921?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
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
