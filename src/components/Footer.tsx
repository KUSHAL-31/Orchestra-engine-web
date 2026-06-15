import { Link } from 'react-router-dom';
import { links } from '../config/links';
import { site } from '../config/site';

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="section-shell py-10">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-sm font-bold text-white">
                OE
              </span>
              <span className="font-semibold text-ink">{site.name}</span>
            </div>
            <p className="max-w-lg text-sm leading-6 text-muted">{site.description}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink">Product</h3>
            <div className="grid gap-2 text-sm text-muted">
              <Link to="/" className="hover:text-brand">Home</Link>
              <Link to="/api-docs" className="hover:text-brand">API Docs</Link>
              <a href={links.github} target="_blank" rel="noreferrer" className="hover:text-brand">GitHub</a>
              <a href={links.npm} target="_blank" rel="noreferrer" className="hover:text-brand">npm</a>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink">Built by</h3>
            <p className="text-sm leading-6 text-muted">{site.author.name}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <a href={links.portfolio} target="_blank" rel="noreferrer" className="font-medium text-brand hover:text-ink">Portfolio</a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="font-medium text-brand hover:text-ink">LinkedIn</a>
              <a href={links.email} target="_blank" rel="noreferrer" className="font-medium text-brand hover:text-ink">Email</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
