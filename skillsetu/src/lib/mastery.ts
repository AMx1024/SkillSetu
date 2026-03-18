import { MasteryState } from "../types";
import { getQuestionsForSubskill } from "./data";

const MASTERY_KEY = "skillsetu_mastery";

export const DEMO_MASTERY: MasteryState = {
  "thermodynamics:first_law": 75,
  "thermodynamics:entropy": 50,
  "fluid_mechanics:bernoulli": 60,
  "heat_transfer:conduction": 40,
  "reaction_engineering:kinetics": 85,
  "process_simulation:aspen_hysys": 30
};

export function getMastery(): MasteryState {
  if (typeof window === "undefined") return {};
  
  const data = localStorage.getItem(MASTERY_KEY);
  if (!data) return {};
  
  try {
    return JSON.parse(data) as MasteryState;
  } catch {
    return {};
  }
}

export function getSkillMastery(skillId: string): number {
  const mastery = getMastery();
  
  const scores: number[] = [];
  for (const key in mastery) {
    if (key.startsWith(`${skillId}:`)) {
      scores.push(mastery[key]);
    }
  }
  
  if (scores.length > 0) {
    const sum = scores.reduce((a, b) => a + b, 0);
    return Math.round(sum / scores.length);
  }
  
  return mastery[skillId] || 0;
}

export function updateMastery(skillIdStr: string, isCorrect: boolean): number {
  if (typeof window === "undefined") return 0;
  
  const mastery = getMastery();
  const currentPercentage = mastery[skillIdStr] || 0;
  
  const [skillId, subskillId] = skillIdStr.split(":");
  const questions = getQuestionsForSubskill(skillId, subskillId);
  const maxRawPoints = questions.length > 0 ? questions.length * 15 : 15;
  
  // Convert current percentage back to raw points
  const currentRawPoints = (currentPercentage / 100) * maxRawPoints;
  const increment = isCorrect ? 15 : 5;
  let newRawPoints = currentRawPoints + increment;
  
  if (newRawPoints > maxRawPoints) newRawPoints = maxRawPoints;
  
  const newPercentage = Math.round((newRawPoints / maxRawPoints) * 100);
  
  mastery[skillIdStr] = newPercentage;
  localStorage.setItem(MASTERY_KEY, JSON.stringify(mastery));
  
  return newPercentage;
}

export function seedDemoData(): void {
  if (typeof window === "undefined") return;
  
  const data = localStorage.getItem(MASTERY_KEY);
  if (!data) {
    localStorage.setItem(MASTERY_KEY, JSON.stringify(DEMO_MASTERY));
  }
}

export function resetMastery(): void {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem(MASTERY_KEY);
  seedDemoData();
}
