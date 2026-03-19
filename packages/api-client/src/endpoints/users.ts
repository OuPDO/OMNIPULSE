import {
  UserSchema,
  PaginatedUsersSchema,
  CreateUserSchema,
  UpdateUserSchema,
  type User,
  type PaginatedUsers,
  type CreateUser,
  type UpdateUser,
} from "@omnipulse/types";
import { type ApiClient } from "../client";

/**
 * User-API-Endpunkte
 *
 * Korrespondiert mit: apps/backend/app/Http/Controllers/Api/V1/UserController.php
 */
export class UsersEndpoint {
  private readonly client: ApiClient;
  private readonly basePath = "/api/v1/users";

  constructor(client: ApiClient) {
    this.client = client;
  }

  async list(params?: { page?: number; per_page?: number }): Promise<PaginatedUsers> {
    return this.client.get(this.basePath, PaginatedUsersSchema, { params });
  }

  async get(id: number): Promise<User> {
    return this.client.get(`${this.basePath}/${id}`, UserSchema);
  }

  async create(data: CreateUser): Promise<User> {
    // Client-seitige Validierung vor API-Call
    CreateUserSchema.parse(data);
    return this.client.post(this.basePath, data, UserSchema);
  }

  async update(id: number, data: UpdateUser): Promise<User> {
    UpdateUserSchema.parse(data);
    return this.client.patch(`${this.basePath}/${id}`, data, UserSchema);
  }

  async delete(id: number): Promise<void> {
    return this.client.delete(`${this.basePath}/${id}`);
  }

  /**
   * Aktuell eingeloggter User
   */
  async me(): Promise<User> {
    return this.client.get("/api/v1/me", UserSchema);
  }
}
