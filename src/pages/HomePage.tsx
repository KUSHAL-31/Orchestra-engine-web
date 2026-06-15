import { Link } from 'react-router-dom';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { CodeBlock } from '../components/CodeBlock';
import { CodeTabs } from '../components/CodeTabs';
import { DashboardGallery } from '../components/DashboardGallery';
import { FeatureGrid } from '../components/FeatureGrid';
import { Footer } from '../components/Footer';
import { LifecycleDiagram } from '../components/LifecycleDiagram';
import { Navbar } from '../components/Navbar';
import { SectionHeader } from '../components/SectionHeader';
import { links } from '../config/links';
import { site } from '../config/site';
import { snippets } from '../data/code-snippets';

const proofPoints = [
  { label: 'Runtime apps', value: 'API, Orchestrator, Worker, Scheduler, Dashboard' },
  { label: 'Event model', value: 'Job, workflow, retry, DLQ, schedule lifecycle topics' },
  { label: 'Storage model', value: 'Postgres durability, Redis locks/cache, Kafka distribution' },
  { label: 'Interfaces', value: 'Typed SDK, REST API, SSE stream, React dashboard' },
];

const codeTabs = [
  {
    id: 'submit',
    label: 'Submit job',
    title: 'Submit background work from a normal backend route.',
    body:
      'Use the SDK when your application needs to move side effects out of the request path. Idempotency keys protect retry-prone code paths.',
    code: snippets.submitJob,
  },
  {
    id: 'workflow',
    label: 'Workflow',
    title: 'Model a business process as a dependency graph.',
    body:
      'Steps can run sequentially or in parallel. The orchestrator unlocks downstream steps only when their dependencies are complete.',
    code: snippets.workflow,
  },
  {
    id: 'worker',
    label: 'Worker',
    title: 'Run company-owned handler code with validation.',
    body:
      'Handlers live in the company repo. Validate ctx.data before side effects, write progress and logs, then return a structured result.',
    code: snippets.worker,
  },
  {
    id: 'schedule',
    label: 'Schedule',
    title: 'Move cron jobs into an auditable platform.',
    body:
      'Schedules are stored in Postgres and fired through the same API path as regular jobs, preserving validation and durability rules.',
    code: snippets.schedule,
  },
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar />

      <main>
        <section className="grid-surface border-b border-line bg-panel">
          <div className="section-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand shadow-sm">
                Open-source workflow engine
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-normal text-ink sm:text-5xl lg:text-6xl">
                {site.name}
              </h1>
              <p className="mt-5 max-w-2xl text-xl leading-8 text-muted">
                {site.tagline} Submit jobs, chain workflows, schedule recurring work, and watch
                production execution in real time without giving up your infrastructure.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand"
                >
                  View GitHub
                </a>
                <a
                  href={links.npm}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm hover:border-brand hover:text-brand"
                >
                  Install SDK
                </a>
                <Link
                  to="/api-docs"
                  className="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm hover:border-brand hover:text-brand"
                >
                  Read API Docs
                </Link>
              </div>
              <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
                {proofPoints.map((point) => (
                  <div key={point.label} className="rounded-lg border border-line bg-white/95 p-4 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                      {point.label}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-muted">{point.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-line bg-white/90 p-3 shadow-soft backdrop-blur sm:p-5">
              <CodeBlock label="Install and submit" code={`${snippets.install}\n\n${snippets.submitJob}`} />
            </div>
          </div>
        </section>

        <section className="section-shell py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeader
              eyebrow="Why it exists"
              title="The space between a queue and a heavyweight orchestrator."
              body="Small queues are easy until jobs become workflows. Enterprise orchestrators are powerful until a team needs to operate them. Orchestra Engine gives TypeScript teams a practical middle path: durable jobs, workflow state, retries, schedules, and visibility in one self-hosted system."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'Emails, invoices, reports, payment side effects, webhooks, and data sync leave the request path.',
                'Workflow dependencies become explicit instead of living in brittle callback chains.',
                'Operations teams get DLQ replay, logs, progress, and worker heartbeats from a dashboard.',
                'The company owns the infrastructure: Kafka, Redis, Postgres, Docker, and Kubernetes.',
              ].map((item) => (
                <div key={item} className="lift-card rounded-lg border border-line bg-white p-5 text-sm leading-6 text-muted shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="mesh-band border-y border-line py-16 sm:py-20">
          <div className="section-shell">
            <SectionHeader
              eyebrow="Features"
              title="Everything a production job system needs."
              body="The product is more than a library. It includes the API, orchestrator, scheduler, SDK, dashboard, shared types, Docker Compose, and Helm deployment assets."
              align="center"
            />
            <div className="mt-10">
              <FeatureGrid />
            </div>
          </div>
        </section>

        <section id="architecture" className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Architecture"
            title="Designed around durable state and event-driven execution."
            body="The API is the public boundary. Postgres is the source of truth. Kafka distributes work and events. Redis coordinates locks, progress, logs, and SSE fan-out. The orchestrator owns workflow transitions."
          />
          <div className="mt-10">
            <ArchitectureDiagram />
          </div>
        </section>

        <section className="mesh-band border-y border-line py-16 sm:py-20">
          <div className="section-shell">
            <SectionHeader
              eyebrow="Implementation"
              title="From submission to handler execution."
              body="The website should show the real integration pattern: submit from app code, define workflows when work has dependencies, register handlers in workers, and schedule recurring jobs through the engine."
              align="center"
            />
            <div className="mt-10">
              <CodeTabs tabs={codeTabs} />
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-panel py-16 sm:py-20">
          <div className="section-shell">
            <SectionHeader
              eyebrow="Reliability"
              title="Retries, dead letters, and lifecycle visibility."
              body="Each status transition is visible to the platform. Workers publish started, completed, and failed events. The orchestrator decides retry versus DLQ and stores terminal state."
              align="center"
            />
            <div className="mt-10">
              <LifecycleDiagram />
            </div>
          </div>
        </section>

        <section id="dashboard" className="mesh-band py-16 sm:py-20">
          <div className="section-shell">
            <SectionHeader
              eyebrow="Dashboard"
              title="A control room for background work."
              body="The dashboard turns job systems from invisible infrastructure into an operational surface. Teams can inspect jobs, workflows, schedules, workers, DLQ entries, and analytics without database access."
            />
            <div className="mt-10">
              <DashboardGallery />
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-panel py-16 sm:py-20">
          <div className="section-shell grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Scheduling"
                title="Replace scattered cron jobs with auditable schedules."
                body="Cron and one-shot schedules are stored in Postgres. The scheduler takes a Redis lock before polling, then submits jobs through the API so normal durability and auth rules still apply."
              />
              <div className="mt-8 rounded-lg border border-line bg-white p-5 shadow-sm">
                <div className="grid gap-4 sm:grid-cols-3">
                  {['Create schedule', 'Acquire lock', 'Submit job'].map((step, index) => (
                    <div key={step} className="lift-card rounded-lg border border-line bg-panel p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                        Step {index + 1}
                      </div>
                      <div className="mt-2 text-sm font-semibold text-ink">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <SectionHeader
                eyebrow="Self hosting"
                title="Runs locally with Compose and ships to Kubernetes."
                body="The repo includes Dockerfiles, Nginx configuration for the website dashboard proxy, Docker Compose for local development, and a Helm chart skeleton for production deployments."
              />
              <div className="mt-8 grid gap-3 text-sm text-muted">
                {['PostgreSQL 16', 'Redis 7', 'Kafka and Zookeeper', 'API, Orchestrator, Worker, Scheduler, Dashboard'].map((item) => (
                  <div key={item} className="lift-card rounded-lg border border-line bg-white p-4 shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mesh-band py-16 sm:py-20">
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <SectionHeader
                eyebrow="API"
                title="Every feature is exposed over HTTP."
                body="Use the SDK for TypeScript ergonomics or call the REST API directly from internal services. The API docs include request bodies, responses, auth details, SSE, worker registration, and analytics endpoints."
              />
              <div className="card p-6">
                <CodeBlock label="Submit with curl" code={snippets.curlJob} />
                <Link
                  to="/api-docs"
                  className="mt-5 inline-flex rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-brand"
                >
                  Open API documentation
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-ink py-16 text-white sm:py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Built by</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{site.author.name}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{site.author.bio}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a href={links.portfolio} target="_blank" rel="noreferrer" className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-panel">
                Portfolio
              </a>
              <a href={links.github} target="_blank" rel="noreferrer" className="rounded-md border border-slate-600 px-5 py-3 text-sm font-semibold text-white hover:border-white">
                GitHub
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="rounded-md border border-slate-600 px-5 py-3 text-sm font-semibold text-white hover:border-white">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
