import { createClient } from "next-sanity";
import { sanityEnv } from "@/lib/sanity/env";

export const sanityClient = createClient({
  projectId: sanityEnv.projectId || "alx1snmd",
  dataset: sanityEnv.dataset || "production",
  apiVersion: sanityEnv.apiVersion,
  useCdn: true,
  token: sanityEnv.token,
});

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {})
}