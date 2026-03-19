/**
 * @omnipulse/api-client — Typisierter Laravel-API-Client
 *
 * Wird von Web (Cookie-Auth) und Mobile (Token-Auth) genutzt.
 * Validiert alle API-Responses mit Zod-Schemas aus @omnipulse/types.
 */

export { ApiClient, type ApiClientConfig } from "./client";
export { UsersEndpoint } from "./endpoints/users";

// Re-export Types für Convenience
export type {
  User,
  CreateUser,
  UpdateUser,
  PaginatedUsers,
  UserRole,
  Project,
  CreateProject,
  ProjectStatus,
} from "@omnipulse/types";
