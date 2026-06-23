import { notFound } from "next/navigation";
import { fetchPersonById } from "@/lib/api";
import PersonMoviesFilter from "./components/PersonMoviesFilter";
import PersonActions from "./components/PersonActions";

export default async function PersonPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const person = await fetchPersonById(resolvedParams.id);

  if (!person) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar: Photo and Info */}
        <div className="flex flex-col flex-shrink-0 mx-auto md:mx-0 w-64 md:w-80">
          {person.profile_path ? (
            <img
              src={person.profile_path}
              alt={person.name}
              className="w-full rounded-2xl shadow-2xl border border-white/10"
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
              <span className="text-white/50">No Image</span>
            </div>
          )}

          <div className="mt-6 bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="text-white/70 text-xs uppercase tracking-wider mb-1">Known For</h3>
            <p className="text-white">{person.known_for_department}</p>
          </div>
          <PersonActions personName={person.name} />
        </div>

        {/* Main Content: Bio and Movies */}
        <div className="flex-grow flex flex-col">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            {person.name}
          </h1>

          {person.biography && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-4">Biography</h2>
              <p className="text-white/70 leading-relaxed whitespace-pre-wrap">
                {person.biography}
              </p>
            </div>
          )}

          <PersonMoviesFilter movies={person.movies} personName={person.name} />
        </div>
      </div>
    </div>
  );
}
