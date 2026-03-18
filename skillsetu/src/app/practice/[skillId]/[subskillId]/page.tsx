"use client";

import { use, useState, useEffect } from "react";
import { getQuestionsForSubskill } from "@/lib/data";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import MasteryToast from "@/components/MasteryToast";
import { updateMastery, getMastery } from "@/lib/mastery";
import PageTransition from "@/components/PageTransition";

export default function PracticePage({ params }: { params: Promise<{ skillId: string, subskillId: string }> }) {
  const { skillId, subskillId } = use(params);
  
  // Load local specific question block based on ID
  const questions = getQuestionsForSubskill(skillId, subskillId);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  // Initialize with initial mastery so progress bar is accurate on load
  const [masteryGain, setMasteryGain] = useState<number>(0);

  // Load initial mastery just once locally
  useEffect(() => {
    const id = `${skillId}:${subskillId}`;
    const initial = getMastery()[id] || 0;
    setMasteryGain(initial);
  }, [skillId, subskillId]);
  
  // Aggregate Session Stats
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [totalMasteryGained, setTotalMasteryGained] = useState(0);

  // Toast State
  const [showToast, setShowToast] = useState(false);
  const [toastGain, setToastGain] = useState(0);

  const handleSubmit = () => {
    if (!selectedAnswer || isSubmitted) return;

    const question = questions[currentQuestionIndex];
    const correct = selectedAnswer === question.answer;
    
    setIsCorrect(correct);
    
    // Evaluate correctness & inject backwards into local storage tracking metric per Subskill
    const newMastery = updateMastery(`${skillId}:${subskillId}`, correct);
    const gain = correct ? 15 : 5;
    setMasteryGain(newMastery);
    setTotalMasteryGained(prev => prev + gain);
    
    if (correct) {
      setCorrectCount(prev => prev + 1);
    } else {
      setIncorrectCount(prev => prev + 1);
    }

    setToastGain(gain);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setIsCorrect(null);
    setMasteryGain(0);
  };

  // Layout check block if 0 hits initially
  if (!questions || questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">No practice questions available yet.</h1>
      </div>
    );
  }

  // Session Complete Summary
  if (currentQuestionIndex >= questions.length) {
    return (
      <PageTransition>
      <main className="min-h-screen bg-zinc-50 dark:bg-black">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center space-y-6">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Practice Complete</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            You answered {correctCount} out of {questions.length} correctly.
          </p>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-lg border bg-gray-50 border-black/[.08] dark:bg-zinc-800/50 dark:border-white/[.145]">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{correctCount}</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Correct</div>
            </div>
            <div className="p-4 rounded-lg border bg-gray-50 border-black/[.08] dark:bg-zinc-800/50 dark:border-white/[.145]">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{incorrectCount}</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Incorrect</div>
            </div>
            <div className="p-4 rounded-lg border bg-gray-50 border-black/[.08] dark:bg-zinc-800/50 dark:border-white/[.145]">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">+{totalMasteryGained}</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Mastery Gained</div>
            </div>
          </div>
          
          <a
            href={`/subskills/${skillId}/${subskillId}`}
            className="inline-block mt-8 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Return to Subskill
          </a>
        </div>
      </main>
      </PageTransition>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <PageTransition>
    <main className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        
        {/* Practice Header */}
        <div className="flex flex-col space-y-4">
            <div>
              <a href={`/subskills/${skillId}/${subskillId}`} className="text-blue-600 hover:underline text-sm font-medium mb-1 block">
                  &larr; Back to Subskill
              </a>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 capitalize mt-1 mb-1">
                {subskillId.replace(/_/g, ' ')} Practice
              </h1>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Mastery: {masteryGain}%
                </span>
              </div>
            </div>
            
            <ProgressBar value={masteryGain} max={100} />
        </div>

        {/* Dynamic Question Instance Context */}
        <QuestionCard 
            question={question} 
            selectedAnswer={selectedAnswer} 
            setSelectedAnswer={setSelectedAnswer} 
            isSubmitted={isSubmitted} 
        />

        {/* Engine Footer */}
        <div className="flex justify-end pt-2">
             <button
                onClick={handleSubmit}
                disabled={!selectedAnswer || isSubmitted}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
             >
                Submit Answer
             </button>
        </div>

        {/* Feedback Display */}
        {isSubmitted && (
          <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-black/[.08] dark:bg-zinc-800/50 dark:border-white/[.145]">
            <p className={`font-semibold ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isCorrect ? "Correct!" : "Incorrect."}
            </p>
            <p className="text-gray-700 mt-2 dark:text-zinc-300">
              {question.explanation}
            </p>
            <p className="text-blue-600 font-medium mt-2 dark:text-blue-400">
              +{isCorrect ? 15 : 5} mastery gained
            </p>
            
            {currentQuestionIndex >= questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                View Summary
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Next Question
              </button>
            )}
          </div>
        )}

        <MasteryToast visible={showToast} gain={toastGain} />

      </div>
    </main>
    </PageTransition>
  );
}
