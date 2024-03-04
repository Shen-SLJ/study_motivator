"use server"

import { sql } from "@vercel/postgres"
import { z } from "zod"

const entryUpdateSchema = z.object({
  entryText: z.string()
})

export async function editTaskTableEntry(id: string, formData: FormData) {
  const { entryText } = entryUpdateSchema.parse({
    entryText: formData.get("entryText")
  })
  await sql`
    UPDATE tasks
    SET description=${entryText}
    WHERE id=${id}
  `
}