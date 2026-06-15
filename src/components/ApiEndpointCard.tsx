import type { ApiEndpoint } from '../data/api-docs';
import { CodeBlock } from './CodeBlock';

const methodClass: Record<ApiEndpoint['method'], string> = {
  GET: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  POST: 'bg-blue-50 text-blue-700 border-blue-200',
  PATCH: 'bg-amber-50 text-amber-700 border-amber-200',
  DELETE: 'bg-rose-50 text-rose-700 border-rose-200',
};

export function ApiEndpointCard({ endpoint }: { endpoint: ApiEndpoint }) {
  return (
    <article id={`${endpoint.method}-${endpoint.path}`.replace(/[^a-zA-Z0-9]/g, '-')} className="card lift-card scroll-mt-24 overflow-hidden">
      <div className="h-1 bg-brand/70" />
      <div className="p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`rounded-md border px-2.5 py-1 text-xs font-bold ${methodClass[endpoint.method]}`}>
          {endpoint.method}
        </span>
        <code className="rounded-md bg-panel px-2.5 py-1 text-sm font-semibold text-ink">
          {endpoint.path}
        </code>
        <span className="rounded-md border border-line px-2.5 py-1 text-xs font-medium text-muted">
          {endpoint.auth ? 'Auth required' : 'Public'}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-muted">{endpoint.summary}</p>

      {endpoint.query ? (
        <div className="mt-5">
          <h4 className="text-sm font-semibold text-ink">Query parameters</h4>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {endpoint.query.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {endpoint.body ? (
        <div className="mt-5">
          <CodeBlock label="Request body" code={endpoint.body} />
        </div>
      ) : null}

      <div className="mt-5">
        <CodeBlock label="Response" code={endpoint.response} />
      </div>

      {endpoint.notes ? (
        <div className="mt-5 rounded-lg border border-line bg-panel p-4">
          <h4 className="text-sm font-semibold text-ink">Notes</h4>
          <ul className="mt-2 space-y-1 text-sm leading-6 text-muted">
            {endpoint.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      ) : null}
      </div>
    </article>
  );
}
