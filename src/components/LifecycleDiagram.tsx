const jobStates = ['pending', 'running', 'completed'];
const retryStates = ['failed', 'retrying', 'dead'];

export function LifecycleDiagram() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card lift-card p-6">
        <h3 className="text-lg font-semibold text-ink">Happy path</h3>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {jobStates.map((state, index) => (
            <div key={state} className="flex items-center gap-3">
              <span className="rounded-lg border border-line bg-panel px-4 py-3 text-sm font-semibold text-ink">
                {state}
              </span>
              {index < jobStates.length - 1 ? <span className="text-muted">to</span> : null}
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-muted">
          A worker acquires a Redis lock, emits started, runs the handler, emits completed, and the
          orchestrator commits terminal state.
        </p>
      </div>

      <div className="card lift-card p-6">
        <h3 className="text-lg font-semibold text-ink">Failure path</h3>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {retryStates.map((state, index) => (
            <div key={state} className="flex items-center gap-3">
              <span className="rounded-lg border border-line bg-panel px-4 py-3 text-sm font-semibold text-ink">
                {state}
              </span>
              {index < retryStates.length - 1 ? <span className="text-muted">to</span> : null}
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-muted">
          Retry policy controls backoff. Exhausted jobs move to the dead-letter queue where teams
          can inspect, replay, or delete them.
        </p>
      </div>
    </div>
  );
}
