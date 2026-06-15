import { Link, NavLink } from 'react-router-dom';
import { links } from '../config/links';
import { site } from '../config/site';

const navItems = [
  { label: 'Product', href: '/#features' },
  { label: 'Architecture', href: '/#architecture' },
  { label: 'Dashboard', href: '/#dashboard' },
  { label: 'API Docs', href: '/api-docs' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white shadow-sm">
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-sm font-bold text-white">
            OE
          </span>
          <span className="text-sm font-semibold text-ink sm:text-base">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) =>
            item.href.startsWith('/#') ? (
              <a
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-panel hover:text-ink"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  [
                    'rounded-md px-3 py-2 text-sm font-medium hover:bg-panel',
                    isActive ? 'text-brand' : 'text-muted hover:text-ink',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md border border-line px-3 py-2 text-sm font-semibold text-ink hover:border-brand hover:text-brand sm:inline-flex"
          >
            GitHub
          </a>
          <a
            href={links.npm}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-ink px-3 py-2 text-sm font-semibold text-white hover:bg-brand"
          >
            Install
          </a>
        </div>
      </div>
    </header>
  );
}
