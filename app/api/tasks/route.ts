import { sql } from '@vercel/postgres'

type TaskTable = {
  id: string;
  description: string;
  category: string;
  earn: number;
}

/**
 * Gets tasks for task table in tasks webpage
 */
export async function GET() {
  const tasks = await sql<TaskTable>`
    SELECT * FROM tasks`;

  return Response.json(tasks.rows)
}