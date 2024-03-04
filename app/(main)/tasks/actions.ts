"use server";

import { sql } from "@vercel/postgres";
import { z } from "zod";
import { TaskTableHeader } from "../../ui/main/tasks/task-table";

const entryUpdateSchema = z.object({
  entryText: z.string(),
});

/**
 * Update the task table entry in the DB
 *
 * @param id the id of the record to update
 * @param column the task table column corresponding to edited data
 * @param formData form data
 * @todo proper error handling for NaN number coercion for entryText
 */
export async function editTaskTableEntry(id: string, column: TaskTableHeader, formData: FormData) {
  const { entryText } = entryUpdateSchema.parse({
    entryText: formData.get("entryText"),
  });

  switch (column) {
    case "description":
      await sql`
        UPDATE tasks
        SET description=${entryText}
        WHERE id=${id}
      `;
      break;

    case "group":
      await sql`
        UPDATE tasks
        SET category=${entryText}
        WHERE id=${id}
      `;
      break;

    case "earn":
      if (isNaN(Number(entryText))) {
        return; // TODO: Error handling
      }
      await sql`
        UPDATE tasks
        SET earn=${entryText}
        WHERE id=${id}
      `;
      break;
  }
}

// SELF Notes
// Column names cannot be dynamic in SQL. Causes $1 error.
// https://github.com/prisma/prisma/issues/5083
// https://stackoverflow.com/questions/37845663/node-postgres-1-is-null-error
