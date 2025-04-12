#!/usr/bin/env node

/**
 * Environment configuration class for Plane API
 */
export class Environment {
  private static instance: Environment;

  private _apiKey: string;
  private _workspaceSlug: string;
  private _baseUrl: string;

  private constructor() {
    if (!process.env.PLANE_API_KEY) {
      throw new Error("PLANE_API_KEY environment variable is not set.");
    }

    if (!process.env.PLANE_WORKSPACE_SLUG) {
      throw new Error("PLANE_WORKSPACE_SLUG environment variable is not set.");
    }

    this._apiKey = process.env.PLANE_API_KEY;
    this._workspaceSlug = process.env.PLANE_WORKSPACE_SLUG;
    this._baseUrl = process.env.PLANE_API_BASE_URL || "https://app.plane.so/api/v1";
  }

  public static getInstance(): Environment {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }
    return Environment.instance;
  }

  get API_KEY(): string {
    return this._apiKey;
  }

  get WORKSPACE_SLUG(): string {
    return this._workspaceSlug;
  }

  get BASE_URL(): string {
    return this._baseUrl;
  }
}

// Export constants for backward compatibility
export const API_KEY = Environment.getInstance().API_KEY;
export const WORKSPACE_SLUG = Environment.getInstance().WORKSPACE_SLUG;
export const BASE_URL = Environment.getInstance().BASE_URL;
