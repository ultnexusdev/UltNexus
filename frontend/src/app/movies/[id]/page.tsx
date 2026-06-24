import { notFound } from "next/navigation";
import { fetchMovieById } from "@/lib/api";
import { Star, Clock, Calendar, Video } from "lucide-react";
import MovieTabs from "./components/MovieTabs";
import MovieActions from "./components/MovieActions";
import UserReviews from "./components/UserReviews";
import Link from "next/link";

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const movie = await fetchMovieById(resolvedParams.id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Backdrop Header (Letterboxd Style) */}
      <div className="relative h-[60vh] w-full">
        {movie.backdrop ? (
          <img
            src={movie.backdrop}
            alt={`${movie.title} backdrop`}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]" />
        )}
        {/* Linear gradient fade from top (clear) to bottom (background color) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/60 to-[var(--background)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Poster */}
          <div className="flex flex-col flex-shrink-0 mx-auto md:mx-0 w-64 md:w-80">
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-2xl shadow-2xl border border-white/10"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-[var(--surface)] rounded-2xl border border-white/10 flex items-center justify-center">
                <span className="text-[var(--foreground-dim)]">No Image</span>
              </div>
            )}
            <div className="mt-6">
              <MovieActions movie={movie} />
            </div>
          </div>

          {/* Details */}
          <div className="flex-grow flex flex-col pt-4 md:pt-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-[var(--foreground-dim)] mb-8">
              {movie.year && (
                <div className="flex items-center gap-1.5">
                  <Calendar size={18} className="text-[var(--accent-primary)]" />
                  <span>{movie.year}</span>
                </div>
              )}
              {movie.runtime > 0 && (
                <div className="flex items-center gap-1.5">
                  <Clock size={18} className="text-[var(--accent-secondary)]" />
                  <span>{movie.runtime} min</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-full font-semibold border border-[var(--accent-primary)]/20">
                <Star size={16} fill="currentColor" />
                <span>{movie.rating ? movie.rating.toFixed(1) : 'N/A'}</span>
              </div>
              {movie.director && (
                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  Directed by <Link href={`/person/${movie.directorId || ''}`} className="font-medium text-white hover:text-emerald-400 transition-colors">{movie.director}</Link>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Overview</h3>
                <p className="text-[var(--foreground-dim)] leading-relaxed text-lg">
                  {movie.description || "No description available."}
                </p>
              </div>
            </div>

            <MovieTabs movie={movie} />
            <UserReviews />
          </div>
        </div>
      </div>
    </div>
  );
}
