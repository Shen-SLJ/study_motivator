"use server";

import { sql } from "@vercel/postgres";
import { Task } from "@/app/api/tasks/route";
import { z } from "zod";

const taskSchema = z.object({
  id: z.string(),
  description: z.string(),
  category: z.string(),
  earn: z.number()
});


/**
 * Update the task table entry in the DB
 *
 * @param task the task to update
 * @todo type validation via zod (ts is a runtime language)
 */
export async function editTaskTableDBEntry(task: Task) {
  const { id, description, category, earn } = taskSchema.parse({
    id: task.id,
    description: task.description,
    category: task.category,
    earn: task.earn
  })
  
  await sql`
    UPDATE tasks
    SET description=${description}, category=${category}, earn=${earn}
    WHERE id=${id}
  `
}

// SELF Notes
// Column names cannot be dynamic in SQL. Causes $1 error.
// https://github.com/prisma/prisma/issues/5083
// https://stackoverflow.com/questions/37845663/node-postgres-1-is-null-error

// Need type validation despite TS strong-typing (auto validation). TS still allows wrong types to be passed! TS only shows editor side errors