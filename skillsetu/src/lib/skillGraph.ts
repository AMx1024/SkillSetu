export type SkillNode = {
  id: string;
  label: string;
  dependsOn?: string[];
};

export const skillGraph: SkillNode[] = [
  { id: "thermodynamics", label: "Thermodynamics" },
  { id: "fluid_mechanics", label: "Fluid Mechanics" },
  { id: "heat_transfer", label: "Heat Transfer", dependsOn: ["thermodynamics", "fluid_mechanics"] },
  { id: "mass_transfer", label: "Mass Transfer", dependsOn: ["fluid_mechanics"] },
  { id: "reaction_engineering", label: "Reaction Engineering", dependsOn: ["thermodynamics"] },
  { id: "process_simulation", label: "Process Simulation", dependsOn: ["heat_transfer", "mass_transfer", "reaction_engineering"] },
  { id: "python_for_engineers", label: "Python for Engineers" },
  { id: "bioinformatics", label: "Bioinformatics", dependsOn: ["python_for_engineers"] },
  { id: "molecular_biology", label: "Molecular Biology" },
  { id: "genetic_engineering", label: "Genetic Engineering", dependsOn: ["molecular_biology"] },
  { id: "bioprocess_design", label: "Bioprocess Design", dependsOn: ["process_simulation", "genetic_engineering"] },
  { id: "upstream_processing", label: "Upstream Processing", dependsOn: ["bioprocess_design"] }
];
