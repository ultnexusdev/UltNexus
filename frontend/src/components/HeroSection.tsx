import { Zap, Compass, Star, Users } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="orb w-[600px] h-[600px] bg-purple-600 -top-40 -left-40" />
      <div className="orb w-[500px] h-[500px] bg-cyan-500 -bottom-20 -right-20" />
      <div className="orb w-[300px] h-[300px] bg-blue-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[var(--foreground-muted)] mb-8 animate-fade-in-up">
          <Zap size={12} className="text-[var(--accent-primary)]" />
          Your Ultimate Entertainment Hub
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 animate-fade-in-up delay-1">
          Track Everything
          <br />
          You{" "}
          <span className="gradient-text">Love</span> to Watch
          <br />
          &amp; Read
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed mb-10 animate-fade-in-up delay-2">
          Discover, rate, and organize your favorite movies, series, animes, and books.
          Join a global community of entertainment enthusiasts.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-3">
          <Link href="#" className="btn-primary text-base px-8 py-3.5">
            <Compass size={18} />
            Start Exploring
          </Link>
          <Link href="#trending" className="btn-secondary text-base px-8 py-3.5">
            <Star size={18} />
            See What&apos;s Trending
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-in-up delay-4">
          {[
            { value: "50K+", label: "Movies" },
            { value: "12K+", label: "Series" },
            { value: "8K+", label: "Animes" },
            { value: "100K+", label: "Books" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--foreground-dim)] mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Floating users indicator */}
        <div className="mt-10 inline-flex items-center gap-3 animate-fade-in-up delay-5">
          <div className="flex -space-x-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-[var(--background)] flex items-center justify-center text-[10px] font-bold text-white"
                style={{
                  background: `hsl(${260 + i * 30}, 70%, ${45 + i * 5}%)`,
                }}
              >
                <Users size={12} />
              </div>
            ))}
          </div>
          <span className="text-sm text-[var(--foreground-dim)]">
            Join <span className="text-white font-semibold">10,000+</span> users
          </span>
        </div>
      </div>
    </section>
  );
}
