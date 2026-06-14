export type TemplateType = 'ATS_OPTIMIZED' | 'MODERN_MINIMAL';

export interface PersonalIdentity {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  professionalTitle: string;
  professionalSummary: string;
  photoUrl?: string;
  photoShape?: 'round' | 'square';
  photoOutline?: boolean;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  x?: string;
  instagram?: string;
  website?: string;
  [key: string]: string | undefined;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100 for progress bar in modern template
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Course {
  id: string;
  name: string;
  provider: string;
  date: string;
}

export interface License {
  id: string;
  name: string;
  issuer: string;
  number?: string;
  date: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  contact: string;
}

export interface CVData {
  personalIdentity: PersonalIdentity;
  socialLinks: SocialLinks;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certificates: Certificate[];
  courses: Course[];
  licenses: License[];
  references: Reference[];
}

export const defaultCVData: CVData = {
  personalIdentity: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    professionalTitle: '',
    professionalSummary: '',
    photoShape: 'round',
    photoOutline: true
  },
  socialLinks: {
    linkedin: '',
    github: '',
    x: '',
    instagram: '',
    website: ''
  },
  experience: [],
  education: [],
  skills: [],
  certificates: [],
  courses: [],
  licenses: [],
  references: []
};
