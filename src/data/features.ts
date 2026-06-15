export const features = [
  {
    title: 'Durable Job Submission',
    summary:
      'The API writes jobs to Postgres before producing Kafka messages, so a submitted job has a durable record even if downstream services are restarting.',
    points: ['REST and SDK submission', 'Priority and delay fields', 'Idempotency keys for duplicate-safe actions'],
  },
  {
    title: 'Workflow DAGs',
    summary:
      'Model real business processes with steps, dependencies, parallel groups, fan-out, and fan-in instead of scattered queue chains.',
    points: ['Sequential dependsOn execution', 'Parallel groups', 'Resume failed workflows without replaying completed steps'],
  },
  {
    title: 'Worker Runtime',
    summary:
      'Company-owned worker processes register handlers, validate payloads, run business logic, and report progress and logs back to Redis.',
    points: ['Redlock job execution guard', 'ctx.progress and ctx.log', 'Horizontal scaling through Kafka consumer groups'],
  },
  {
    title: 'Retries and Dead Letters',
    summary:
      'Failures are first-class. Failed jobs move through retrying and eventually dead, with a DLQ entry that can be inspected or replayed.',
    points: ['Fixed, linear, and exponential backoff', 'DLQ replay API', 'Error history persisted for operations'],
  },
  {
    title: 'Cron and One-Shot Scheduling',
    summary:
      'Schedules live in the engine database and are fired by a locked scheduler, avoiding duplicate cron executions across replicas.',
    points: ['5-part cron support', 'One-shot runAt jobs', 'Scheduler lock with TTL'],
  },
  {
    title: 'Live Operations Dashboard',
    summary:
      'SSE-powered views expose job status, workflow steps, workers, schedules, DLQ entries, and analytics without writing database queries.',
    points: ['Real-time job events', 'Workflow step graph', 'Worker heartbeat visibility'],
  },
];

export const dashboardImages = [
  {
    src: '/dashboard/analytics-overview.png',
    title: 'Analytics overview',
    body: 'Track volume, success rate, active workers, running jobs, and queue pressure from the first screen.',
  },
  {
    src: '/dashboard/jobs-list.png',
    title: 'Jobs list',
    body: 'Inspect every job by type, status, attempt count, progress, creation time, and terminal state.',
  },
  {
    src: '/dashboard/workflow-detail.png',
    title: 'Workflow detail',
    body: 'See every step, dependency, execution timestamp, and status in a workflow pipeline.',
  },
  {
    src: '/dashboard/analytics-workers.png',
    title: 'Workers and performance',
    body: 'Understand worker health, latency percentiles, retry rates, and job type volume.',
  },
];
