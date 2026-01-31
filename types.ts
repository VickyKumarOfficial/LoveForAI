
export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  companyUrl?: string;
  image: string;
  bio: string;
  linkedin: string;
}

export interface Session {
  id: string;
  time: string;
  title: string;
  speaker: string;
  description: string;
  type: 'Keynote' | 'Workshop' | 'Panel' | 'Networking';
}

export interface NavItem {
  label: string;
  href: string;
}
