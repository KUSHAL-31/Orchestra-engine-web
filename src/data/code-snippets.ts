export const snippets = {
  install: `npm install orchestra-engine`,
  submitJob: `import { JobEngine } from 'orchestra-engine';

const engine = new JobEngine({
  apiUrl: process.env.ORCHESTRA_API_URL!,
  apiKey: process.env.ORCHESTRA_API_KEY!,
});

const { jobId } = await engine.submitJob({
  type: 'send-email',
  payload: {
    orderId: 'ord_1042',
    email: 'customer@company.com',
  },
  retries: 3,
  backoff: 'exponential',
  priority: 'high',
  idempotencyKey: 'order-email-ord_1042',
});`,
  workflow: `const { workflowId } = await engine.workflow('order-ord_1042')
  .step({
    name: 'charge-payment',
    type: 'charge-payment',
    payload: { orderId: 'ord_1042', amountCents: 12900 },
  })
  .step({
    name: 'reserve-inventory',
    type: 'reserve-inventory',
    payload: { orderId: 'ord_1042', items: [{ sku: 'sku_1', quantity: 2 }] },
    dependsOn: ['charge-payment'],
    parallelGroup: 'fulfillment',
  })
  .step({
    name: 'notify-warehouse',
    type: 'notify-warehouse',
    payload: { orderId: 'ord_1042' },
    dependsOn: ['charge-payment'],
    parallelGroup: 'fulfillment',
  })
  .step({
    name: 'send-receipt',
    type: 'send-email',
    payload: { orderId: 'ord_1042' },
    dependsOn: ['reserve-inventory', 'notify-warehouse'],
  })
  .onFailure({
    type: 'alert-ops',
    payload: { orderId: 'ord_1042', severity: 'high' },
  })
  .submit();`,
  worker: `import { Worker } from 'orchestra-engine';
import { z } from 'zod';

const worker = new Worker();

const PaymentPayload = z.object({
  orderId: z.string().min(1),
  amountCents: z.number().int().positive(),
  idempotencyKey: z.string().min(8),
});

worker.register('charge-payment', async (ctx) => {
  const parsed = PaymentPayload.safeParse(ctx.data);
  if (!parsed.success) {
    await ctx.log(JSON.stringify(parsed.error.flatten()));
    throw new Error('INVALID_PAYMENT_PAYLOAD');
  }

  const data = parsed.data;
  await ctx.log(\`Charging order \${data.orderId}\`);
  await ctx.progress(25);

  const charge = await stripe.paymentIntents.create(
    { amount: data.amountCents, currency: 'usd' },
    { idempotencyKey: data.idempotencyKey }
  );

  await ctx.progress(100);
  return { providerPaymentId: charge.id };
});

await worker.start({
  kafkaBrokers: [process.env.KAFKA_BROKERS!],
  redisHost: process.env.REDIS_HOST!,
  groupId: 'workers',
  apiUrl: process.env.ORCHESTRA_API_URL,
  apiKey: process.env.ORCHESTRA_API_KEY,
});`,
  schedule: `await engine.createSchedule({
  name: 'daily-settlement',
  type: 'cron',
  cronExpr: '0 2 * * *',
  jobType: 'settle-payments',
  payload: { region: 'us-east' },
});`,
  curlJob: `curl -X POST "$ORCHESTRA_URL/jobs" \\
  -H "Authorization: Bearer $ORCHESTRA_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "send-email",
    "payload": { "orderId": "ord_1042" },
    "retries": 3,
    "backoff": "exponential",
    "priority": "high"
  }'`,
};
