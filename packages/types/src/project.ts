import { z } from "zod";

/**
 * Projekt-Schema — Für Projektmanagement-Modul.
 */

export const ProjectStatusSchema = z.enum([
  "draft",
  "active",
  "on_hold",
  "completed",
  "archived",
]);

export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;

export const ProjectSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  description: z.string().nullable(),
  status: ProjectStatusSchema,
  client_id: z.number().int().positive().nullable(),
  budget_cents: z.number().int().nonnegative().nullable(),
  start_date: z.string().date().nullable(),
  due_date: z.string().date().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const CreateProjectSchema = ProjectSchema.pick({
  name: true,
  description: true,
  status: true,
  client_id: true,
  budget_cents: true,
  start_date: true,
  due_date: true,
});

export type CreateProject = z.infer<typeof CreateProjectSchema>;
