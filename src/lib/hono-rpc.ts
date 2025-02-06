import { ApiType } from "@/app/api/[[...Route]]/route";
import { public_app_url } from "@/configuration";
import { hc } from "hono/client";

export const client = hc<ApiType>(public_app_url)