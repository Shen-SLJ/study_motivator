import { sql } from '@vercel/postgres'

export const dynamic = 'force-dynamic'

export type Task = {
  id: string;
  description: string;
  category: string;
  earn: number;
}

/**
 * Gets tasks for task table in tasks webpage
 */
export async function GET() {
  const tasks = await sql<Task>`
    SELECT * FROM tasks`;

  return Response.json(tasks.rows)
}

// Self Notes
// Why stale data? https://github.com/orgs/vercel/discussions/4696. Reason for export const dynamic here
// - Check here https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering making the dashboard dynamic
// - force dynamic prevents route handler caching [i.e data caching]