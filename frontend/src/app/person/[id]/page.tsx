import { notFound } from "next/navigation";
import { fetchPersonById } from "@/lib/api";
import ContentCard from "@/components/ContentCard";
import { Star } from "lucide-react";

export default async function PersonDetailPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const person = await fetchPersonById(resolvedParams.id);

  if (!person) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left Column: Image & Rate */}
          <div className="flex flex-col flex-shrink-0 mx-auto md:mx-0 w-64 md:w-80">
            {person.profile_path ? (
              <img
                src={person.profile_path}
                alt={person.name}
                className="w-full rounded-2xl shadow-2xl border border-white/10"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-[var(--surface)] rounded-2xl border border-white/10 flex items-center justify-center">
                <span className="text-[var(--foreground-dim)]">No Image</span>
              </div>
            )}
            
            {/* RATE PERSON Module */}
            <div className="mt-6 bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col items-center shadow-xl">
              <div className="flex items-center justify-center w-full mb-3">
                  <span className="text-xs text-zinc-400 uppercase tracking-wider font-bold">
                    Rate Person
                  </span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <button
                    key={star}
                    className="focus:outline-none transition-transform hover:scale-125"
                  >
                    <Star className="w-5 h-5 md:w-6 md:h-6 text-zinc-700 hover:fill-amber-400 hover:text-amber-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Details & Movies */}
          <div className="flex-grow flex flex-col pt-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
              {person.name}
            </h1>
            <p className="text-emerald-500 font-semibold mb-8 tracking-widest uppercase text-sm">
              {person.known_for_department}
            </p>

            {person.biography && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4 text-white tracking-wide">Biography</h3>
                <div className="text-[var(--foreground-dim)] leading-relaxed text-base md:text-lg max-h-64 overflow-y-auto custom-scrollbar pr-4">
                  {person.biography.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-4">{para}</p>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-xl font-semibold mb-6 text-white tracking-wide uppercase">
                Films Featuring {person.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {person.movies && person.movies.length > 0 ? (
                  person.movies.map((movie, index) => (
                    <ContentCard key={movie.id} item={movie} index={index} />
                  ))
                ) : (
                  <p className="text-[var(--foreground-dim)]">No filmography data available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
