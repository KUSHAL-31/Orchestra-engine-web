import { features } from '../data/features';

export function FeatureGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <article key={feature.title} className="card lift-card relative overflow-hidden p-6">
          <div className="absolute left-0 top-0 h-1 w-full bg-brand/70" />
          <h3 className="text-lg font-semibold text-ink">{feature.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{feature.summary}</p>
          <ul className="mt-5 space-y-2">
            {feature.points.map((point) => (
              <li key={point} className="flex gap-2 text-sm text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
