import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { type ZodType } from "zod";

/**
 * Typisierter API-Client für die OMNIPULSE Laravel-API.
 *
 * Unterstützt zwei Auth-Modi:
 * - Cookie-basiert (Sanctum SPA) für Web
 * - Token-basiert (Sanctum Token) für Mobile/Drittanbieter
 */

export interface ApiClientConfig {
  baseURL: string;
  authMode: "cookie" | "token";
  token?: string;
}

export class ApiClient {
  private readonly http: AxiosInstance;
  private readonly authMode: "cookie" | "token";

  constructor(config: ApiClientConfig) {
    this.authMode = config.authMode;

    this.http = axios.create({
      baseURL: config.baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: config.authMode === "cookie",
      timeout: 30000,
    });

    if (config.authMode === "token" && config.token) {
      this.setToken(config.token);
    }

    this.setupInterceptors();
  }

  /**
   * Token setzen/aktualisieren (für Mobile/API-Zugriff)
   */
  setToken(token: string): void {
    this.http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  /**
   * Token entfernen (Logout)
   */
  clearToken(): void {
    delete this.http.defaults.headers.common["Authorization"];
  }

  /**
   * GET-Request mit Zod-Validierung der Response
   */
  async get<T>(url: string, schema: ZodType<T>, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse = await this.http.get(url, config);
    return schema.parse(response.data);
  }

  /**
   * POST-Request mit Zod-Validierung der Response
   */
  async post<T>(
    url: string,
    data: unknown,
    schema: ZodType<T>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse = await this.http.post(url, data, config);
    return schema.parse(response.data);
  }

  /**
   * PUT-Request mit Zod-Validierung der Response
   */
  async put<T>(
    url: string,
    data: unknown,
    schema: ZodType<T>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse = await this.http.put(url, data, config);
    return schema.parse(response.data);
  }

  /**
   * PATCH-Request mit Zod-Validierung der Response
   */
  async patch<T>(
    url: string,
    data: unknown,
    schema: ZodType<T>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse = await this.http.patch(url, data, config);
    return schema.parse(response.data);
  }

  /**
   * DELETE-Request (kein Schema nötig — gibt void zurück)
   */
  async delete(url: string, config?: AxiosRequestConfig): Promise<void> {
    await this.http.delete(url, config);
  }

  /**
   * Sanctum CSRF-Cookie initialisieren (nur für Cookie-Auth/SPA)
   */
  async initCsrf(): Promise<void> {
    if (this.authMode !== "cookie") return;
    await this.http.get("/sanctum/csrf-cookie");
  }

  /**
   * Axios-Instanz direkt (für Sonderfälle)
   */
  get raw(): AxiosInstance {
    return this.http;
  }

  private setupInterceptors(): void {
    // Response-Interceptor für Error-Handling
    this.http.interceptors.response.use(
      (response) => response,
      (error) => {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;

          // 401: Token abgelaufen / nicht authentifiziert
          if (status === 401) {
            this.clearToken();
            // Event emittieren für Auth-State-Management
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("omnipulse:auth:expired"));
            }
          }

          // 422: Validation Errors (Laravel-Format)
          if (status === 422) {
            const validationErrors = error.response?.data?.errors;
            if (validationErrors) {
              error.validationErrors = validationErrors;
            }
          }

          // 429: Rate Limited
          if (status === 429) {
            const retryAfter = error.response?.headers["retry-after"];
            if (retryAfter) {
              error.retryAfter = parseInt(retryAfter, 10);
            }
          }
        }

        return Promise.reject(error);
      },
    );
  }
}
