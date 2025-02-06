import { Hono } from "hono";
import { handle } from "hono/vercel";
import authAPI from "@/features/authentication/server/api/backend/route";


const api = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = api
      .route("/auth", authAPI)


export type ApiType = typeof routes;
export const GET = handle(api);
export const POST = handle(api);
export const PATCH = handle(api);
export const DELETE = handle(api);