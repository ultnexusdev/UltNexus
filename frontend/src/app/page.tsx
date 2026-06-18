import { ListChecks, Star, Compass, Share2 } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeatureCard from "@/components/FeatureCard";
import { categoryMeta } from "@/lib/mockData";
import { fetchTrending, fetchMovies, fetchSeries, fetchAnimes, fetchBooks } from "@/lib/api";
import Link from "next/link";

const features = [
  {
    icon: ListChecks,
    title: "Track Everything",
    description:
      "Keep a detailed log of every movie watched, series binged, anime followed, and book read.",
  },
  {
    icon: Star,
    title: "Rate & Review",
    description:
      "Share your thoughts with ratings and reviews in any language — no character restrictions.",
  },
  {
    icon: Compass,
    title: "Discover New Gems",
    description:
      "Get personalized recommendations based on your taste and explore curated collections.",
  },
  {
    icon: Share2,
    title: "Share Your Lists",
    description:
      "Create public or private lists and share them with friends or the entire community.",
  },
];

export default async function Home() {
  const [trendingContent, movies, series, animes, books] = await Promise.all([
    fetchTrending(),
    fetchMovies(),
    fetchSeries(),
    fetchAnimes(),
    fetchBooks(),
  ]);

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Trending */}
        <section id="trending" className="pt-8 pb-4">
          <CategorySection
            title="Trending Now"
            href="#"
            items={trendingContent}
            accentColor="#f59e0b"
          />
        </section>

        {/* Category Showcases */}
        <CategorySection
          title={categoryMeta.MOVIE.label}
          href="/movies"
          items={movies.slice(0, 6)}
          accentColor={categoryMeta.MOVIE.color}
        />

        <CategorySection
          title={categoryMeta.SERIES.label}
          href="/series"
          items={series.slice(0, 6)}
          accentColor={categoryMeta.SERIES.color}
        />

        <CategorySection
          title={categoryMeta.ANIME.label}
          href="/animes"
          items={animes.slice(0, 6)}
          accentColor={categoryMeta.ANIME.color}
        />

        <CategorySection
          title={categoryMeta.BOOK.label}
          href="/books"
          items={books.slice(0, 6)}
          accentColor={categoryMeta.BOOK.color}
        />

        {/* Features */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why <span className="gradient-text">UltNexus</span>?
            </h2>
            <p className="text-[var(--foreground-muted)] max-w-xl mx-auto">
              Everything you need to manage your entertainment journey, all in
              one beautifully designed platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 mb-12 rounded-3xl overflow-hidden">
          {/* BG */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/20 via-[#06b6d4]/10 to-transparent rounded-3xl" />
          <div className="absolute inset-0 border border-white/5 rounded-3xl" />

          <div className="relative z-10 text-center px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-[var(--foreground-muted)] max-w-lg mx-auto mb-8">
              Join thousands of entertainment enthusiasts who track, rate, and
              share their favorites on UltNexus.
            </p>
            <Link href="#" className="btn-primary text-base px-10 py-4">
              Create Free Account
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
