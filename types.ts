
export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Project {
  title: string;
  description: string;
  link?: string;
  github?: string;
  tech: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}
