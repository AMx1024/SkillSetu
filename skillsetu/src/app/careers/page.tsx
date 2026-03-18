import { getCareers } from "@/lib/data";
import CareerCard from "@/components/CareerCard";
import PageTransition from "@/components/PageTransition";

export default function CareersPage() {
  const careers = getCareers();

  return (
    <PageTransition>
      <main className="min-h-screen bg-zinc-50 dark:bg-black">
        <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Explore Careers
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Choose a career path and start mastering the skills required to succeed in the chemical and biological engineering industries.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {careers.map((career) => (
            <CareerCard key={career.id} career={career} />
          ))}
        </div>
      </div>
    </main>
    </PageTransition>
  );
}
