const flow = [
  {
    title: 'Submit',
    items: ['Company app calls SDK/REST', 'API authenticates and validates', 'Postgres row is created first'],
  },
  {
    title: 'Execute',
    items: ['Kafka distributes job events', 'Worker takes Redis lock', 'Handler writes progress/logs'],
  },
  {
    title: 'Orchestrate',
    items: ['Worker emits lifecycle events', 'Orchestrator updates workflow state', 'Dashboard receives live SSE updates'],
  },
];

const topics = [
  'job.submitted',
  'job.retry',
  'job.started',
  'job.completed',
  'job.failed',
  'job.dlq',
  'workflow.created',
  'workflow.step.done',
  'workflow.completed',
  'schedule.tick',
];

export function ArchitectureDiagram() {
  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-3">
        {flow.map((stage, index) => (
          <article key={stage.title} className="card lift-card p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="text-xl font-semibold text-ink">{stage.title}</h3>
            </div>
            <div className="mt-5 grid gap-3">
              {stage.items.map((item) => (
                <div key={item} className="rounded-lg border border-line bg-panel p-4 text-sm leading-6 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="card p-6">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Core rule</p>
            <h3 className="mt-3 text-2xl font-semibold text-ink">
              Postgres is the source of truth. Kafka is the movement layer.
            </h3>
            <p className="mt-4 text-sm leading-6 text-muted">
              The API never directly triggers workers. Workers never directly mutate workflow step
              state. Redis coordinates locks, progress, logs, pub/sub, and heartbeats.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Kafka topics</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <code
                  key={topic}
                  className="rounded-md border border-line bg-panel px-2.5 py-1.5 text-xs font-semibold text-brand"
                >
                  {topic}
                </code>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
