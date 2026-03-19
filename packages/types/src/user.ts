import { z } from "zod";

/**
 * User-Schema — Proof of Concept für die Zod-basierte Typdefinition.
 * Alle Schemas in packages/types/ sind Single Source of Truth
 * für Web, Mobile und API-Client.
 */

// Basis-Rollen (RBAC via Spatie Laravel-Permission + Filament Shield)
export const UserRoleSchema = z.enum([
  "super_admin",
  "admin",
  "team_member",
  "client_admin",
  "client_user",
]);

export type UserRole = z.infer<typeof UserRoleSchema>;

// User-Schema für API-Responses
export const UserSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  name: z.string().min(1).max(255),
  avatar_url: z.string().url().nullable(),
  role: UserRoleSchema,
  email_verified_at: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;

// Schema für User-Erstellung (FormRequest-kompatibel)
export const CreateUserSchema = UserSchema.pick({
  email: true,
  name: true,
  role: true,
}).extend({
  password: z.string().min(8).max(128),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwörter stimmen nicht überein",
  path: ["password_confirmation"],
});

export type CreateUser = z.infer<typeof CreateUserSchema>;

// Schema für User-Update (alle Felder optional)
export const UpdateUserSchema = CreateUserSchema.partial().omit({
  password_confirmation: true,
});

export type UpdateUser = z.infer<typeof UpdateUserSchema>;

// Paginierte API-Response
export const PaginatedResponseSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: z.object({
      current_page: z.number().int().positive(),
      last_page: z.number().int().positive(),
      per_page: z.number().int().positive(),
      total: z.number().int().nonnegative(),
    }),
    links: z.object({
      first: z.string().url().nullable(),
      last: z.string().url().nullable(),
      prev: z.string().url().nullable(),
      next: z.string().url().nullable(),
    }),
  });

export const PaginatedUsersSchema = PaginatedResponseSchema(UserSchema);
export type PaginatedUsers = z.infer<typeof PaginatedUsersSchema>;
