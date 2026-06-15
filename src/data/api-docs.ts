export type ApiEndpoint = {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  group: string;
  summary: string;
  auth: boolean;
  query?: string[];
  body?: string;
  response: string;
  notes?: string[];
  curl?: string;
};

export const apiGroups = [
  'Health',
  'Jobs',
  'Workflows',
  'Schedules',
  'Dead Letter Queue',
  'Workers',
  'Events',
  'Analytics',
];

export const apiEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/health',
    group: 'Health',
    summary: 'Lightweight service health check. This route does not require authentication.',
    auth: false,
    response: `{ "status": "ok", "service": "api" }`,
  },
  {
    method: 'GET',
    path: '/jobs',
    group: 'Jobs',
    summary: 'List jobs in reverse creation order with Redis progress values merged into the response.',
    auth: true,
    query: ['limit: 1 to 2000, default 50', 'offset: default 0'],
    response: `{
  "data": [
    {
      "id": "job-id",
      "type": "send-email",
      "status": "completed",
      "progress": 100,
      "attempts": 1,
      "maxAttempts": 3,
      "result": {},
      "error": null,
      "createdAt": "2026-03-22T12:00:00.000Z"
    }
  ],
  "total": 42
}`,
  },
  {
    method: 'POST',
    path: '/jobs',
    group: 'Jobs',
    summary: 'Submit a background job. The API writes Postgres first, then emits job.submitted to Kafka.',
    auth: true,
    body: `{
  "type": "send-email",
  "payload": { "orderId": "ord_1042" },
  "retries": 3,
  "backoff": "exponential",
  "delay": 0,
  "priority": "normal",
  "idempotencyKey": "order-email-ord_1042"
}`,
    response: `{ "jobId": "4029e1c0-..." }`,
    notes: ['Duplicate idempotencyKey returns the existing job with HTTP 200.', 'New jobs return HTTP 202.'],
  },
  {
    method: 'GET',
    path: '/jobs/:id',
    group: 'Jobs',
    summary: 'Read a single job with status, progress, attempts, logs, result, and timing fields.',
    auth: true,
    response: `{
  "id": "job-id",
  "type": "send-email",
  "status": "running",
  "progress": 50,
  "attempts": 1,
  "maxAttempts": 3,
  "result": null,
  "error": null,
  "logs": ["[time] Sending email"],
  "createdAt": "2026-03-22T12:00:00.000Z",
  "startedAt": "2026-03-22T12:00:01.000Z",
  "completedAt": null
}`,
  },
  {
    method: 'GET',
    path: '/workflows',
    group: 'Workflows',
    summary: 'List workflows with pagination for dashboards and admin tooling.',
    auth: true,
    query: ['limit: 1 to 2000, default 50', 'offset: default 0'],
    response: `{ "data": [{ "id": "wf-id", "name": "order-flow", "status": "running" }], "total": 12 }`,
  },
  {
    method: 'POST',
    path: '/workflows',
    group: 'Workflows',
    summary: 'Submit a workflow definition. dependsOn uses step names at request time and is stored as step IDs.',
    auth: true,
    body: `{
  "name": "order-processing",
  "steps": [
    { "name": "charge", "type": "charge-payment", "payload": { "orderId": "ord_1042" } },
    { "name": "email", "type": "send-email", "payload": { "orderId": "ord_1042" }, "dependsOn": ["charge"] }
  ],
  "onFailure": { "type": "alert-ops", "payload": { "orderId": "ord_1042" } }
}`,
    response: `{ "workflowId": "workflow-id" }`,
  },
  {
    method: 'GET',
    path: '/workflows/:id',
    group: 'Workflows',
    summary: 'Get workflow metadata and ordered step state, including result, error, dependencies, and timestamps.',
    auth: true,
    response: `{
  "id": "workflow-id",
  "name": "order-processing",
  "status": "completed",
  "steps": [
    {
      "id": "step-id",
      "name": "charge",
      "jobType": "charge-payment",
      "status": "completed",
      "dependsOn": [],
      "parallelGroup": null,
      "executedAt": "2026-03-22T12:00:01.000Z"
    }
  ]
}`,
  },
  {
    method: 'POST',
    path: '/workflows/:id/resume',
    group: 'Workflows',
    summary: 'Resume a failed workflow by resetting failed, pending, and skipped steps while leaving completed steps intact.',
    auth: true,
    response: `{ "message": "Workflow resumed" }`,
  },
  {
    method: 'GET',
    path: '/schedules',
    group: 'Schedules',
    summary: 'List cron and one-shot schedules.',
    auth: true,
    response: `[{ "id": "schedule-id", "name": "daily-report", "type": "CRON", "active": true }]`,
  },
  {
    method: 'POST',
    path: '/schedules',
    group: 'Schedules',
    summary: 'Create a cron or one-shot schedule. The scheduler later submits matching jobs through POST /jobs.',
    auth: true,
    body: `{
  "name": "daily-report",
  "type": "cron",
  "cronExpr": "0 8 * * *",
  "jobType": "generate-report",
  "payload": { "period": "daily" }
}`,
    response: `{ "id": "schedule-id", "nextRunAt": "2026-03-23T08:00:00.000Z", "active": true }`,
  },
  {
    method: 'PATCH',
    path: '/schedules/:id',
    group: 'Schedules',
    summary: 'Update a schedule expression, payload, or active state.',
    auth: true,
    body: `{ "active": false }`,
    response: `{ "id": "schedule-id", "active": false }`,
  },
  {
    method: 'DELETE',
    path: '/schedules/:id',
    group: 'Schedules',
    summary: 'Delete a schedule. Existing job history is not affected.',
    auth: true,
    response: '204 No Content',
  },
  {
    method: 'GET',
    path: '/dlq',
    group: 'Dead Letter Queue',
    summary: 'List the latest dead-lettered jobs, including payload and error history.',
    auth: true,
    response: `[{ "id": "dlq-id", "jobId": "job-id", "jobType": "send-email", "replayedAt": null }]`,
  },
  {
    method: 'POST',
    path: '/dlq/:id/replay',
    group: 'Dead Letter Queue',
    summary: 'Replay a DLQ entry as a fresh job with attempt count reset.',
    auth: true,
    response: `{ "jobId": "new-job-id" }`,
  },
  {
    method: 'DELETE',
    path: '/dlq/:id',
    group: 'Dead Letter Queue',
    summary: 'Permanently delete a DLQ entry.',
    auth: true,
    response: '204 No Content',
  },
  {
    method: 'GET',
    path: '/workers',
    group: 'Workers',
    summary: 'List registered workers and compute liveness from heartbeat timestamps.',
    auth: true,
    response: `[{ "id": "sdk-worker-host-123", "jobTypes": ["send-email"], "status": "ACTIVE", "isAlive": true }]`,
  },
  {
    method: 'POST',
    path: '/workers/register',
    group: 'Workers',
    summary: 'Register an SDK worker with its supported job types. Used by the SDK when apiUrl and apiKey are supplied.',
    auth: true,
    body: `{ "workerId": "sdk-worker-host-123", "jobTypes": ["send-email", "charge-payment"] }`,
    response: `{ "ok": true }`,
  },
  {
    method: 'POST',
    path: '/workers/:id/heartbeat',
    group: 'Workers',
    summary: 'Refresh a worker heartbeat. SDK workers call this every 10 seconds.',
    auth: true,
    response: `{ "ok": true }`,
  },
  {
    method: 'POST',
    path: '/workers/:id/deregister',
    group: 'Workers',
    summary: 'Mark a worker as dead during graceful shutdown.',
    auth: true,
    response: `{ "ok": true }`,
  },
  {
    method: 'GET',
    path: '/events',
    group: 'Events',
    summary: 'Server-Sent Events stream for job and workflow updates. Supports ?key= because EventSource cannot send headers.',
    auth: true,
    query: ['key: API key fallback for browser EventSource clients'],
    response: `event: job.events
data: {"jobId":"job-id","workerId":"worker-id","completedAt":"..."}

event: workflow.events
data: {"workflowId":"workflow-id","status":"completed"}`,
    notes: ['Use Authorization header for non-browser clients.', 'Use /events?key=API_KEY for browser EventSource.'],
  },
  {
    method: 'GET',
    path: '/analytics/stats',
    group: 'Analytics',
    summary: 'Return job and workflow counts for KPI cards.',
    auth: true,
    query: ['from: optional ISO timestamp', 'to: optional ISO timestamp'],
    response: `{ "jobs": { "total": 100, "completed": 92, "failed": 3 }, "workflows": { "total": 12 } }`,
  },
  {
    method: 'GET',
    path: '/analytics/charts',
    group: 'Analytics',
    summary: 'Return chart-ready aggregates for activity, duration, failures, retry distribution, and performance percentiles.',
    auth: true,
    query: ['range: 1H, 6H, 24H, 7D, or 30D'],
    response: `{
  "timeseries": [],
  "durationByType": [],
  "topFailingTypes": [],
  "retryDistribution": [],
  "performance": { "p50": 120, "p95": 420, "p99": 900, "avg": 180 }
}`,
  },
];
