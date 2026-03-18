"use client";

import { useEffect, useState } from "react";
import { getMastery, resetMastery } from "@/lib/mastery";
import ProgressBar from "@/components/ProgressBar";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";

function getColor(score: number){
  if(score <= 20) return "bg-red-200"
  if(score <= 40) return "bg-orange-200"
  if(score <= 60) return "bg-yellow-200"
  if(score <= 80) return "bg-green-200"
  return "bg-green-500"
}

export default function DashboardPage() {
  const [mastery, setMastery] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMastery(getMastery());
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null; // Avoid hydration layout shifts

  const entries = Object.entries(mastery);

  // Compute Metrics
  const skillsPracticed = new Set(Object.keys(mastery).map(k => k.split(":")[0])).size;

  const avgMastery = entries.length > 0
    ? Math.round(entries.reduce((a, [_, val]) => a + val, 0) / entries.length)
    : 0;

  // Aggregate Skill Maps
  const skillMap: Record<string, number[]> = {};
  for (const key in mastery) {
    const [skill] = key.split(":");
    if (!skillMap[skill]) skillMap[skill] = [];
    skillMap[skill].push(mastery[key]);
  }

  let topSkill = "None";
  let maxAvg = -1;
  const skillAverages: Record<string, number> = {};

  for (const skill in skillMap) {
    const scores = skillMap[skill];
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    skillAverages[skill] = avg;
    
    if (avg > maxAvg) {
      maxAvg = avg;
      topSkill = skill.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    }
  }
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all progress?")) {
      resetMastery();
      window.location.reload();
    }
  };

  return (
    <PageTransition>
    <main className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Learning Dashboard</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">Track your mastery progress across skills.</p>
          </div>
          <button 
            onClick={handleReset}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm font-medium transition dark:border-white/[.145]"
          >
            Reset Progress
          </button>
        </header>

        {/* Dashboard Stats (Packet 33) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border bg-gray-50 border-black/[.08] text-center dark:bg-zinc-800/50 dark:border-white/[.145]">
            <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-2">Skills Practiced</h3>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{skillsPracticed}</p>
          </div>
          <div className="p-6 rounded-xl border bg-gray-50 border-black/[.08] text-center dark:bg-zinc-800/50 dark:border-white/[.145]">
            <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-2">Average Mastery</h3>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{avgMastery}%</p>
          </div>
          <div className="p-6 rounded-xl border bg-gray-50 border-black/[.08] text-center dark:bg-zinc-800/50 dark:border-white/[.145]">
            <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-2">Top Skill</h3>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 truncate">{topSkill}</p>
          </div>
        </section>

        {/* Skill Mastery Cards (Packet 34) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillAverages).map(([skill, avg]) => (
            <div key={skill} className="p-6 rounded-xl border bg-white shadow-sm border-black/[.08] space-y-4 dark:bg-zinc-900 dark:border-white/[.145]">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 capitalize">
                  {skill.replace(/_/g, " ")}
                </h3>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{avg}%</span>
              </div>
              <ProgressBar value={avg} max={100} />
              <div className="pt-2">
                <a
                  href={`/skills/${skill}`}
                  className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Practice
                </a>
              </div>
            </div>
          ))}
          {entries.length === 0 && (
             <div className="col-span-full p-8 text-center text-zinc-500 dark:text-zinc-400 border border-dashed rounded-xl border-black/[.08] dark:border-white/[.145]">
               <p className="mb-4">Start practicing skills to see your progress here.</p>
               <Link href="/careers" className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600">
                 Explore Careers
               </Link>
             </div>
          )}
        </section>

        {entries.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Skill Mastery Heatmap</h2>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {entries.map(([key, score]) => {
                const [skill, subskill] = key.split(":");
                const formattedSkill = skill.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
                const formattedSubskill = subskill.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
                return (
                  <div
                    key={key}
                    className={`w-8 h-8 rounded ${getColor(score)}`}
                    title={`${formattedSkill} — ${formattedSubskill} (${score}%)`}
                  ></div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
    </PageTransition>
  );
}
