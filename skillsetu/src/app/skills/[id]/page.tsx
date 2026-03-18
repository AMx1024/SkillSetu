"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getSkillById, getQuestionsForSubskill } from "@/lib/data";
import { getMastery } from "@/lib/mastery";
import PageTransition from "@/components/PageTransition";

export default function SkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const skill = getSkillById(id);
  const [masteryState, setMasteryState] = useState<Record<string, number>>({});

  useEffect(() => {
    if (skill) {
      setMasteryState(getMastery());
    }
  }, [skill]);

  if (!skill) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Skill not found</h1>
      </div>
    );
  }

  return (
    <PageTransition>
    <main className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        
        {/* Skill Header */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-black/[.08] dark:bg-zinc-900 dark:border-white/[.145]">
          <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-4">
            {skill.name}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 font-medium">
            {skill.description}
          </p>


        </section>

        {/* Subskills Section */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-black/[.08] dark:bg-zinc-900 dark:border-white/[.145]">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            Subskills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skill.subskills.map((subskill) => {
              const masteryPercent = masteryState[`${skill.id}:${subskill.id}`] || 0;
              
              return (
              <Link
                key={subskill.id} 
                href={`/subskills/${skill.id}/${subskill.id}`}
                className="flex flex-col p-5 rounded-xl border border-black/[.08] bg-white transition-all cursor-pointer hover:shadow-lg hover:bg-blue-200 hover:scale-[1.02] dark:bg-zinc-800 dark:border-white/[.145] hover:dark:bg-zinc-800/80"
              >
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {subskill.name}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {subskill.resources.length} learning resources
                </span>
                
                <div className="mt-4 mt-auto pt-2">
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-zinc-600 dark:text-zinc-400">Mastery</span>
                    <span className="text-blue-600 dark:text-blue-400">{masteryPercent}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-700 ease-out" 
                      style={{ width: `${masteryPercent}%` }} 
                    />
                  </div>
                </div>
              </Link>
            )})}
          </div>
        </section>

      </div>
    </main>
    </PageTransition>
  );
}
