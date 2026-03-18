import careersJson from "../data/careers.json";
import skillsJson from "../data/skills.json";
import questionsJson from "../data/questions.json";
import { Career, Skill, Subskill, Question, Resource } from "../types";

export function getCareers(): Career[] {
  return careersJson as Career[];
}

export function getCareerById(id: string): Career | undefined {
  return (careersJson as Career[]).find((c) => c.id === id);
}

export function getSkillsForCareer(careerId: string): Skill[] {
  const career = getCareerById(careerId);
  if (!career) return [];
  
  return (skillsJson as Skill[]).filter((skill) => 
    career.skills.includes(skill.id)
  );
}

export function getSkillById(skillId: string): Skill | undefined {
  return (skillsJson as Skill[]).find((s) => s.id === skillId);
}

export function getSubskillsForSkill(skillId: string): Subskill[] {
  const skill = getSkillById(skillId);
  return skill ? skill.subskills : [];
}

export function getSubskill(skillId: string, subskillId: string): Subskill | undefined {
  const skill = getSkillById(skillId);
  return skill?.subskills.find((sub) => sub.id === subskillId);
}

export function getResourcesForSubskill(skillId: string, subskillId: string): Resource[] {
  const subskill = getSubskill(skillId, subskillId);
  return subskill ? subskill.resources : [];
}

export function getQuestionsForSubskill(skillId: string, subskillId: string): Question[] {
  return (questionsJson as Question[]).filter((q) => q.skill === skillId && q.subskill === subskillId);
}

export function validateDataset(): void {
  const careers = getCareers();
  const skills = skillsJson as Skill[];
  const questions = questionsJson as Question[];

  console.log("=== Dataset Validation ===");

  careers.forEach(c => {
    c.skills.forEach(sid => {
      const skill = skills.find(s => s.id === sid);
      if (!skill) console.warn(`Missing Skill Ref: Career '${c.name}' references unknown skill '${sid}'`);
    });
  });

  skills.forEach(s => {
    s.subskills.forEach(sub => {
      const qs = questions.filter(q => q.skill === s.id && q.subskill === sub.id);
      if (qs.length === 0) {
        console.warn(`Missing Questions: Subskill '${sub.name}' under Skill '${s.name}' has 0 questions.`);
      }
      if (sub.resources.length === 0) {
        console.warn(`Missing Resources: Subskill '${sub.name}' has 0 resources.`);
      }
    });
  });

  console.log("Validation complete.");
}
