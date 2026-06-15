import { Link } from 'react-router-dom';
import { ApiEndpointCard } from '../components/ApiEndpointCard';
import { CodeBlock } from '../components/CodeBlock';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { SectionHeader } from '../components/SectionHeader';
import { apiEndpoints, apiGroups } from '../data/api-docs';

const authSnippet = `Authorization: Bearer orchestra-dev-api-key-12345
Content-Type: application/json`;

const errorSnippet = `{
  "error": "Missing or invalid Authorization header"
}`;

const fullFlowSnippet = `# 1. Submit a workflow
curl -X POST "$ORCHESTRA_URL/workflows" \\
  -H "Authorization: Bearer $ORCHESTRA_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"order-flow","steps":[{"name":"charge","type":"charge-payment","payload":{"orderId":"ord_1042"}}]}'

# 2. Check workflow state
curl "$ORCHESTRA_URL/workflows/{workflowId}" \\
  -H "Authorization: Bearer $ORCHESTRA_KEY"

# 3. Stream live updates in browser clients
new EventSource('/api/events?key=orchestra-dev-api-key-12345')`;

export function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar />

      <main>
        <section className="grid-surface border-b border-line bg-panel">
          <div className="section-shell py-14 sm:py-16">
            <p className="eyebrow">Developer reference</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-ink sm:text-5xl">
              Orchestra Engine API documentation
            </h1>
            <p className="lead mt-5 max-w-3xl">
              Full REST and SSE reference for jobs, workflows, schedules, dead letters, workers,
              analytics, and health checks. Use this directly or through the TypeScript SDK.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:border-brand hover:text-brand"
              >
                Back to product
              </Link>
              <a
                href="#jobs"
                className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-brand"
              >
                Browse endpoints
              </a>
            </div>
          </div>
        </section>

        <section className="section-shell py-12">
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="card p-5">
              <h2 className="text-lg font-semibold text-ink">Base URL</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                Local Compose defaults to <code className="rounded bg-panel px-1">http://localhost:3000</code>.
                Production should expose the API internally or behind your own gateway.
              </p>
            </div>
            <div className="card p-5">
              <h2 className="text-lg font-semibold text-ink">Authentication</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                All non-health routes require an API key. Browser SSE clients can pass the key as a
                query parameter because EventSource cannot send headers.
              </p>
            </div>
            <div className="card p-5">
              <h2 className="text-lg font-semibold text-ink">Data format</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                Requests and responses use JSON. Timestamps are ISO 8601 strings. Status values are
                lowercased in API responses.
              </p>
            </div>
          </div>
        </section>

        <section className="section-band border-y border-line py-12">
          <div className="section-shell grid gap-6 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Auth"
                title="Pass API keys as bearer tokens."
                body="API keys are stored hashed in Postgres. Rate limiting uses Redis counters per API key. The default development seed key can be replaced through environment variables."
              />
            </div>
            <CodeBlock label="Headers" code={authSnippet} />
          </div>
        </section>

        <section className="section-shell py-12">
          <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
            <aside className="hidden lg:sticky lg:top-20 lg:block lg:self-start">
              <div className="flex rounded-lg border border-line bg-white p-4 lg:h-[calc(100vh-6rem)] lg:flex-col">
                <h2 className="text-sm font-semibold text-ink">Endpoint groups</h2>
                <nav className="mt-4 grid flex-1 content-start gap-1 overflow-auto">
                  {apiGroups.map((group) => (
                    <a
                      key={group}
                      href={`#${group.toLowerCase().replaceAll(' ', '-')}`}
                      className="rounded-md px-3 py-2 text-sm text-muted hover:bg-panel hover:text-brand"
                    >
                      {group}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="space-y-10">
              {apiGroups.map((group) => {
                const endpoints = apiEndpoints.filter((endpoint) => endpoint.group === group);
                return (
                  <section key={group} id={group.toLowerCase().replaceAll(' ', '-')} className="scroll-mt-24">
                    <div className="mb-4">
                      <p className="eyebrow">{group}</p>
                      <h2 className="mt-2 text-2xl font-semibold text-ink">{group} API</h2>
                    </div>
                    <div className="space-y-5">
                      {endpoints.map((endpoint) => (
                        <ApiEndpointCard key={`${endpoint.method}-${endpoint.path}`} endpoint={endpoint} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-band border-y border-line py-12">
          <div className="section-shell grid gap-6 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Errors"
                title="Error responses are intentionally small."
                body="The API returns a JSON object with an error string. Typical cases are 400 for bad input, 401 for missing or invalid keys, 404 for missing resources, 429 for rate limit, and 500 for unexpected server errors."
              />
            </div>
            <CodeBlock label="Error response" code={errorSnippet} />
          </div>
        </section>

        <section className="section-shell py-12">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionHeader
              eyebrow="End-to-end"
              title="A minimal integration flow."
              body="Most companies submit jobs or workflows from their backend, run one or more SDK workers with registered handlers, and use the dashboard or API to inspect state."
            />
            <CodeBlock label="Workflow flow" code={fullFlowSnippet} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
