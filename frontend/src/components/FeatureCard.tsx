import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  index = 0,
}: FeatureCardProps) {
  return (
    <div
      className="group relative p-6 rounded-2xl bg-[var(--surface)] border border-white/5 card-hover animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon
          size={22}
          className="text-[var(--accent-primary)] group-hover:text-[var(--accent-secondary)] transition-colors"
        />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-[var(--foreground-dim)] leading-relaxed">
        {description}
      </p>

      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent-primary)] opacity-0 group-hover:opacity-[0.03] rounded-2xl transition-opacity blur-2xl" />
    </div>
  );
}
