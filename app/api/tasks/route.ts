import { sql } from '@vercel/postgres'

type TaskTable = {
  id: string;
  description: string;
  category: string;
  earn: number;
}

export async function GET() {
  const tasks = await sql<TaskTable>`
    SELECT * FROM customers`;

  return Response.json(tasks)
}