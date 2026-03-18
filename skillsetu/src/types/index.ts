export interface Career {
  id: string;
  name: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  avgSalary: string;
  learningTime: string;
  skills: string[];
}

export interface Subskill {
  id: string;
  name: string;
  resources: Resource[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  subskills: Subskill[];
  dependsOn?: string[];
}

export interface Resource {
  type: "video" | "article" | "course" | "book";
  title: string;
  url: string;
  duration?: string;
}

export interface Question {
  id: string;
  skill: string;
  subskill?: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  difficulty: number;
}

export type MasteryState = Record<string, number>;
