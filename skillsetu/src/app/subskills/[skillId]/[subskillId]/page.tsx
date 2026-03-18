"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { getSubskill, getResourcesForSubskill, getQuestionsForSubskill } from "@/lib/data";
import { getMastery } from "@/lib/mastery";
import ProgressBar from "@/components/ProgressBar";
import PageTransition from "@/components/PageTransition";

export default function SubskillPage({ params }: { params: Promise<{ skillId: string, subskillId: string }> }) {
  const { skillId, subskillId } = use(params);
  
  const subskill = getSubskill(skillId, subskillId);
  const resources = getResourcesForSubskill(skillId, subskillId);
  const questions = getQuestionsForSubskill(skillId, subskillId);
  const questionCount = questions.length;

  const [mastery, setMastery] = useState(0);

  useEffect(() => {
    const m = getMastery();
    setMastery(m[`${skillId}:${subskillId}`] || 0);
  }, [skillId, subskillId]);

  if (!subskill) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Subskill not found</h1>
      </div>
    );
  }

  return (
    <PageTransition>
    <main className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        
        {/* Subskill Header */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-black/[.08] dark:bg-zinc-900 dark:border-white/[.145]">
          <Link href={`/skills/${skillId}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-block flex items-center gap-1 dark:text-blue-400 dark:hover:text-blue-300">
            &larr; Back to Skill
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
            <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
              {subskill.name}
            </h1>
            <div className="w-full md:w-64 shrink-0">
              <div className="flex justify-between items-center text-sm font-semibold mb-1">
                <span className="text-zinc-700 dark:text-zinc-300">Mastery Progress</span>
                <span className="text-blue-600 dark:text-blue-400">{mastery}%</span>
              </div>
              <ProgressBar value={mastery} max={100} />
            </div>
          </div>
        </section>

        {/* Learning Resources Section */}
        {resources && resources.length > 0 && (
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-black/[.08] dark:bg-zinc-900 dark:border-white/[.145]">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              Learning Resources
            </h2>
            <div className="space-y-4">
              {resources.map((resource, i) => (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg border border-black/[.08] bg-white transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-[1.02] dark:bg-zinc-800 dark:border-white/[.145] hover:dark:bg-zinc-800/80"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {resource.title}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-zinc-300">
                        {resource.type}
                      </span>
                      {resource.duration && (
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          • {resource.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Practice Section */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-black/[.08] dark:bg-zinc-900 dark:border-white/[.145]">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Practice
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-zinc-900 font-medium dark:text-zinc-100">
                Practice Questions Available
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {questionCount} questions
              </p>
            </div>
            
            <Link 
              href={`/practice/${skillId}/${subskillId}`}
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Start Practice
            </Link>
          </div>
        </section>

      </div>
    </main>
    </PageTransition>
  );
}
